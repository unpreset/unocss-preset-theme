export const wrapVar = (name: string) => {
  return `var(${name})`
}

export const wrapRGBA = (v: string, alpha?: string | number) => {
  if (alpha === undefined)
    return `rgb(${v})`

  return `rgba(${v}, ${alpha})`
}

export const getThemeVal = (theme: any, keys: string[], index = 0) => {
  for (const key of keys) {
    theme = theme[key]
    if (theme === undefined)
      return
  }
  return Array.isArray(theme) ? theme[index] : theme
}
