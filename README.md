# unocss-preset-theme

This preset will help you easily make dynamic theme switching. Inspired by [here](https://github.com/unocss/unocss/issues/1390)

## Installation

```bash
npm i -D unocss-preset-theme
```

```ts
import presetTheme from 'unocss-preset-theme'

Unocss({
  theme: {},
  presets: [
    presetTheme({
      theme: {
        dark: {
        },
        compact: {
        }
      }
    }),
  ],
})
```

## Usages

Usually you just need to set your `light theme` to `unocss` and your `dark theme` to `presetTheme`. This preset will transform your provide theme into css variables, then you just need to set the `dark` class or `compact` class (Depends on your theme name) in your html and you're done.

## Examples

Please refer to the [playground](/playground/vite.config.ts) 


## License

MIT License
