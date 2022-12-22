# unocss-preset-theme

This preset will help you easily make dynamic theme switching. Inspired by [here](https://github.com/unocss/unocss/issues/1390)

> Next, I will build [unocss-preset-antd](https://github.com/Dunqing/unocss-preset-antd) based on this preset

## Installation

```bash
npm i -D unocss-preset-theme
```


## Usages

Usually you just need to set your `light theme` to `unocss` and your `dark theme` to `presetTheme`. This preset will transform your provide theme into css variables, then you just need to set the `dark` class or `compact` class (Depends on your theme name) in your html and you're done.

Just like this

```typescript
import Unocss from 'unocss/vite'
import type { Theme } from 'unocss/preset-uno'
import { presetUno } from 'unocss'
import presetTheme from 'unocss-preset-theme'

Unocss<Theme>({
  // Configure light themes
  theme: {
  },
  presets: [
    presetUno<Theme>(),
    presetTheme<Theme>({
      theme: {
        // Configure dark themes
        dark: {
        },
        // Configure compact themes
        compact: {
        }
      }
    })
  ]
})
```

This will be the final generated css

```css
/* darkMode: class */
.dark{}
:root{}
.compact{}

/* If you set darkMode to media, the css will look like this */
.compact{}
@media (prefers-color-scheme: dark){}
@media (prefers-color-scheme: light){}
```

Then, you simply apply it as follows

```html
<div class="dark">
  Dark mode
  <div class="compact">
    <div class="px-md">Use compact theme</div>
  </div>
</div>
```

## Options

### prefix

The prefix of the generated css variables, default is `--un-preset-theme`

### theme

Your different theme. like `{ dark: {}, other: {} }`

### selectors

Customize the selectors of the generated css variables `{ light: ':root', [themeName]: '.[themeName]' }`


## Examples

Please refer to the [playground](/playground/vite.config.ts) 


## License

MIT License
