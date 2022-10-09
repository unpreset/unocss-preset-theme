import type { Preset } from 'unocss'
import { mergeDeep } from 'unocss'
import { toVar } from './helpers'

const PRESET_THEME_RULE = 'PRESET_THEME_RULE'

export interface PresetTheme<Theme> {
  theme: Record<'dark' | 'light', Theme>
  /**
   * @default --un-preset-theme
   */
  prefix?: string
}

const getThemeVal = (theme: any, keys: string[], index = 0) => {
  for (const key of keys) {
    theme = theme[key]
    if (theme === undefined)
      return
  }
  return Array.isArray(theme) ? theme[index] : theme
}

interface ThemeValue {
  light?: string
  dark?: string
  name: string
}

export const presetTheme = <T extends {}>(options: PresetTheme<T>): Preset<T> => {
  const { prefix = '--un-preset-theme' } = options
  const { dark, light } = options.theme
  const varsRE = new RegExp(`var\\((${prefix}.*)\\)`)
  const themeValues = new Map<string, ThemeValue>()
  const usedTheme: Array<ThemeValue> = []

  return {
    name: 'unocss-preset-theme',
    extendTheme(originalTheme) {
      const recursiveTheme = (theme: Record<string, any>, preKeys: string[] = []) => {
        Object.keys(theme).forEach((key) => {
          const val = Reflect.get(theme, key)
          const themeKeys = preKeys.concat(key)

          const setThemeValue = (name: string, index = 0) => {
            const defaultValue = getThemeVal(originalTheme, themeKeys) ?? ''
            themeValues.set(name, {
              light: getThemeVal(light, themeKeys, index) ?? defaultValue,
              dark: getThemeVal(dark, themeKeys, index) ?? defaultValue,
              name,
            })
          }

          if (Array.isArray(val)) {
            val.forEach((_, index) => {
              const name = [prefix, ...themeKeys, index].join('-')
              val[index] = toVar(name)
              setThemeValue(name, index)
            })
          }
          else if (typeof val === 'string') {
            const name = [prefix, ...themeKeys].join('-')
            theme[key] = toVar(name)
            setThemeValue(name)
          }
          else {
            recursiveTheme(val, themeKeys)
          }
        })
        return theme
      }

      Object.assign(originalTheme, mergeDeep(originalTheme, recursiveTheme(mergeDeep(dark, light))))
    },
    rules: [
      [
        new RegExp(`^${PRESET_THEME_RULE}$`),
        (_, context) => {
          const isDark = Array.from(context.variantMatch[3].values()).some(({ name }) => {
            return name === 'dark'
          })
          return usedTheme.reduce((obj, e) => {
            return {
              ...obj,
              [e.name]: isDark ? e.dark : e.light,
            }
          }, {})
        },
      ],
    ],
    layers: {
      theme: 0,
      default: 1,
    },
    preflights: [
      {
        layer: 'theme',
        async getCSS(context) {
          await context.generator.generate('', { preflights: false })
          const { css } = (await context.generator.generate(`light:${PRESET_THEME_RULE} dark:${PRESET_THEME_RULE}`, {
            preflights: false,
          }))
          const isMedia = css.includes('@media (prefers-color-scheme')
          return css
            .replace(/\/\* layer: .* \*\/\n/, '')
            .replace(new RegExp(`\.(dark|light).*${PRESET_THEME_RULE}\{(.*)\}`, 'gm'), (full, th, targetCSS) => {
              if (isMedia)
                return targetCSS
              if (th === 'dark')
                return `.dark{${targetCSS}}`
              else
                return `root{${targetCSS}}`
            })
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
