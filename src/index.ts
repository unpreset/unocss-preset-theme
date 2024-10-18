import type { Preset } from '@unocss/core'
import { mergeDeep } from '@unocss/core'
import { parseCssColor } from '@unocss/rule-utils'
import { escapeStringRegexp, getThemeVal, wrapCSSFunction, wrapVar } from './helpers'

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

export function presetTheme<T extends Record<string, any>>(options: PresetThemeOptions<T>): Preset<T> {
  const { prefix = '--un-preset-theme', theme } = options
  const selectors: Selectors = { light: ':root', ...options.selectors }
  let originalThemeKey: 'dark' | 'light' = 'light'
  if (!theme.dark) {
    theme.dark = {} as T
    originalThemeKey = 'dark'
  }
  if (!theme.light) {
    theme.light = {} as T
    originalThemeKey = 'light'
  }
  const keys = Object.keys(theme)
  const varsRE = new RegExp(`var\\((${escapeStringRegexp(prefix)}[\\w-]*)\\)`)
  const themeValues = new Map<string, ThemeValue>()
  const usedTheme: Array<ThemeValue> = []

  return {
    name: 'unocss-preset-theme',
    extendTheme(originalTheme) {
      const recursiveTheme = (curTheme: Record<string, any>, preKeys: string[] = []) => {
        Object.keys(curTheme).forEach((configKey) => {
          const val = Reflect.get(curTheme, configKey)
          const themeKeys = preKeys.concat(configKey)

          const setThemeValue = (name: string, index = 0, isColor = false) => {
            themeValues.set(name, {
              theme: keys.reduce(
                (obj, themeKey) => {
                  let themeValue
                    = getThemeVal(theme[themeKey], themeKeys, index)
                    || (themeKey === originalThemeKey ? getThemeVal(originalTheme, themeKeys) : null)
                  let themeAlphaValue: string | undefined
                  if (themeValue) {
                    if (isColor) {
                      const cssColor = parseCssColor(themeValue)
                      if (cssColor?.alpha !== undefined && cssColor?.alpha !== null) {
                        if (new RegExp(`var\\((${escapeStringRegexp(`${prefix}-${preKeys.join('-')}-${configKey}--alpha`)}), 1\\)`).test(cssColor.alpha.toString())) {
                          const values = themeValues.get(name)
                          if (values)
                            themeAlphaValue = values.theme[themeKey][`${name}--alpha`]
                        }
                        else {
                          themeAlphaValue = `${cssColor.alpha}`
                        }
                      }
                      if (cssColor?.components) {
                        if (cssColor.components.length === 1 && new RegExp(`var\\((${escapeStringRegexp(`${prefix}-${preKeys.join('-')}-${configKey}`)})\\)`).test(cssColor.components[0].toString())) {
                          const values = themeValues.get(name)
                          if (values)
                            themeValue = values.theme[themeKey][name]
                        }
                        else {
                          themeValue = cssColor.components.join(' ')
                        }
                      }
                    }
                    obj[themeKey] = {
                      [name]: themeValue,
                    }
                    if (themeAlphaValue !== undefined)
                      obj[themeKey][`${name}--alpha`] = themeAlphaValue
                  }

                  return obj
                },
                {} as ThemeValue['theme'],
              ),
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
            const isColor = themeKeys[0] === 'colors'
            setThemeValue(name, 0, isColor)
            curTheme[configKey] = wrapVar(name)
            if (isColor) {
              const cssColor = parseCssColor(val) || val
              if (typeof cssColor !== 'string')
                curTheme[configKey] = wrapCSSFunction(cssColor.type, curTheme[configKey], wrapVar(`${name}--alpha`, '1'))
            }
          }
          else {
            recursiveTheme(val, themeKeys)
          }
        })
        return curTheme
      }

      return mergeDeep(
        originalTheme,
        recursiveTheme(
          keys.reduce((obj, key) => {
            return mergeDeep(obj, theme[key])
          }, {} as T),
        ),
      )
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
                const themeName = input.match(/:([\w-]+)\\:\d+/)![1]
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
          const { css } = await context.generator.generate(
            // Add Date.now() to avoid cache
            keys.map(
              key => `${defaultThemeNames.includes(key) ? `${key}:` : ''}${PRESET_THEME_RULE}:${key}:${Date.now()}`,
            ),
            { preflights: false },
          )
          let inMediaPrefersColorScheme = ''
          const res: string[] = []
          css
            .replace(/,\n/g, ',')
            .split('\n')
            .slice(1)
            .forEach((line) => {
              if (line === '@media (prefers-color-scheme: dark){') {
                inMediaPrefersColorScheme = selectors.dark || '.dark'
                res.push(line)
                return
              }
              if (line === '@media (prefers-color-scheme: light){') {
                inMediaPrefersColorScheme = selectors.light
                res.push(line)
                return
              }
              if (inMediaPrefersColorScheme && line === '}') {
                inMediaPrefersColorScheme = ''
                res[res.length - 1] += line
                return
              }
              if (inMediaPrefersColorScheme) {
                if (line.startsWith(`${inMediaPrefersColorScheme}{`)) {
                  res[res.length - 1] += line.replace(`${inMediaPrefersColorScheme}{`, ':root{')
                  return
                }
                return
              }
              const regexStr = new RegExp(
                keys
                  .map(
                    key =>
                      `((.${key}) ((${
                        selectors[key] ? escapeStringRegexp(selectors[key]) : `.${key}`
                      }[{|,])|(.${key}\\\\:)))`,
                  )
                  .join('|'),
                'g',
              )
              const replacedLine = line.replace(regexStr, (matchStr, ...params) => {
                const matchGroup = params.slice(0, -2)
                let replacement = ''
                for (let i = 0; i < matchGroup.length / 5; i++) {
                  const startIndex = i * 5
                  if (!matchGroup[startIndex])
                    continue
                  if (matchGroup[startIndex + 3]) {
                    // ".light .lightclass" => ".lightclass"
                    // ".dark [data-theme="dark"]" => "[data-theme="dark"]"
                    replacement = matchGroup[startIndex + 3]
                  }
                  else {
                    // ".light .light\\:" => ".lightclass .light\\:"
                    // ".dark .dark\\:" => "[data-theme="dark"] .dark\\:"
                    const key = matchGroup[startIndex + 1].substring(1)
                    replacement = `${selectors[key]} ${matchGroup[startIndex + 2]}`
                  }
                  break
                }
                return replacement
              })
              res.push(replacedLine)
            })

          return res
            .sort((a, b) => {
              const regexStr = `^${selectors[originalThemeKey]}|^@media \\(prefers-color-scheme:`
              if (a.match(regexStr)?.length)
                return b.match(regexStr)?.length ? 0 : -1
              return 1
            })
            .join('\n')
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
