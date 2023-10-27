export function wrapVar(name: string) {
  return `var(${name})`
}

export function wrapRGBA(v: string, alpha?: string | number) {
  if (alpha === undefined)
    return `rgb(${v})`

  return `rgba(${v}, ${alpha})`
}

export function wrapCSSFunction(name: string, v: string, alpha: string | number | undefined) {
  if (name[name.length - 1] === 'a')
    name = name.slice(0, -1)

  return `${name}(${[v, alpha].filter(value => value !== undefined).join('/')})`
}

export function getThemeVal(theme: any, keys: string[], index = 0) {
  for (const key of keys) {
    theme = theme[key]
    if (theme === undefined)
      return
  }
  return Array.isArray(theme) ? theme[index] : theme
}
