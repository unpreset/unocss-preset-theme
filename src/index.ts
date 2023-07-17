import type { Preset } from '@unocss/core'
import { mergeDeep } from '@unocss/core'
import { parseCssColor } from '@unocss/preset-mini/utils'
import { getThemeVal, wrapCSSFunction, wrapVar } from './helpers'

const defaultThemeNames = ['dark', 'light']
const PRESET_THEME_RULE = 'PRESET_THEME_RULE'

interface Selectors {
  [themeName: string]: string
}

export interface PresetThemeOptions<Theme extends Record<string, any>> {
  /**
   * Multiple themes
   */
  theme: Record<string, Theme>
  /**
   * Themes for different media queries
   */
  mediaThemes?: Record<string, Theme>
  /**
   * The prefix of the generated css variables
   * @default --un-preset-theme
   */
  prefix?: string
  /**
   * Customize the selectors of the generated css variables
   * @default { light: ':root', [themeName]: '.[themeName]' }
   */
  selectors?: Selectors
}

/**
 * @deprecated use `PresetThemeOptions` instead
 * @see PresetThemeOptions
 */
export type PresetTheme<Theme extends Record<string, any>> = PresetThemeOptions<Theme>

interface ThemeValue {
  theme: Record<string, Record<string, string>>
  name: string
}

const defaultBreakpoints = {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',

}

export function presetTheme<T extends Record<string, any>>(options: PresetThemeOptions<T>): Preset<T> {
  const { prefix = '--un-preset-theme', theme, mediaThemes = {} } = options
  const selectors: Selectors = { light: ':root', ...options.selectors }
  if (!theme.light)
    theme.light = {} as T
  const keys = Object.keys(theme)
  const varsRE = new RegExp(`var\\((${prefix}[\\w-]*)\\)`)
  const themeValues = new Map<string, ThemeValue>()
  const usedTheme: Array<ThemeValue> = []

  return {
    name: 'unocss-preset-theme',
    extendTheme(originalTheme) {
      const recursiveTheme = (curTheme: Record<string, any>, preKeys: string[] = []) => {
        Object.keys(curTheme).forEach((key) => {
          const val = Reflect.get(curTheme, key)
          const themeKeys = preKeys.concat(key)

          const setThemeValue = (name: string, index = 0, isColor = false) => {
            themeValues.set(name, {
              theme: keys.reduce((obj, key) => {
                let themeValue = getThemeVal(theme[key], themeKeys, index) || (key === 'light' ? getThemeVal(originalTheme, themeKeys) : null)
                if (themeValue) {
                  if (isColor) {
                    const cssColor = parseCssColor(themeValue)
                    if (cssColor?.components)
                      themeValue = cssColor.components.join(', ')
                  }
                  obj[key] = {
                    [name]: themeValue,
                  }
                }

                return obj
              }, {} as ThemeValue['theme']),
              name,
            })
          }

          if (Array.isArray(val)) {
            val.forEach((_, index) => {
              const name = [prefix, ...themeKeys, index].join('-')
              setThemeValue(name, index)
              val[index] = wrapVar(name)
            })
          }
          else if (typeof val === 'string') {
            const name = [prefix, ...themeKeys].join('-')
            if (themeKeys[0] === 'colors') {
              const cssColor = parseCssColor(val)
              if (cssColor) {
                setThemeValue(name, 0, true)
                curTheme[key] = wrapCSSFunction(cssColor.type, wrapVar(name), cssColor?.alpha)
              }
            }
            else {
              setThemeValue(name, 0)
              curTheme[key] = wrapVar(name)
            }
          }
          else {
            recursiveTheme(val, themeKeys)
          }
        })
        return curTheme
      }

      return mergeDeep(originalTheme, recursiveTheme(
        keys.reduce((obj, key) => {
          return mergeDeep(obj, theme[key])
        }, {} as T),
      ))
    },
    rules: [
      [
        new RegExp(`^${PRESET_THEME_RULE}\:(.*)\:`),
        (re) => {
          return usedTheme.reduce((obj, e) => {
            const key = re?.[1]
            if (!key || !e.theme[key])
              return obj
            return {
              ...obj,
              ...e.theme[key],
            }
          }, {})
        },
      ],
    ],
    variants: [
      {
        name: 'preset-theme-rule',
        match(matcher) {
          if (matcher.includes(PRESET_THEME_RULE)) {
            return {
              matcher,
              selector(input) {
                const themeName = input.match(/\:(\w+)\\\:\d+/)![1]
                return selectors[themeName] || `.${themeName}`
              },
            }
          }
        },
      },
    ],
    layers: {
      theme: 0,
      default: 1,
    },
    preflights: [
      {
        layer: 'theme',
        async getCSS(context) {
          let cssOutput = ''
          for (const key of keys) {
            const { css } = await context.generator.generate(
              `${defaultThemeNames.includes(key) ? `${key}:` : ''}${PRESET_THEME_RULE}:${key}:${Date.now()}`,
              { preflights: false },
            )
            const cssLines = css.split('\n').slice(1)
            for (const mediaKey of Object.keys(mediaThemes)) {
              const mediaCssLines = cssLines.map((line) => {
                const prevLine = cssLines[cssLines.indexOf(line) - 1] || ''
                if (prevLine.includes('@media')) {
                  // convert .light{} to :root{}
                  line = line.replace(/.*?{/, ':root{')
                }
                else {
                  // convert .light .themename{} to .themename{}
                  line = line.replace(/\..*?\s(.*\{)/, '$1')
                }
                return `@media (min-width: ${(defaultBreakpoints as any)[mediaKey]}) { ${line} }`
              }).join('\n')
              cssOutput += mediaCssLines
            }
          }
          return cssOutput
        },
      },
    ],

    postprocess(util) {
      util.entries.forEach(([, val]) => {
        if (typeof val === 'string') {
          const varName = val.match(varsRE)?.[1]
          if (varName) {
            const values = themeValues.get(varName)
            if (values)
              usedTheme.push(values)
          }
        }
      })
    },
  }
}

export default presetTheme
