import type { Theme } from 'unocss/preset-uno'
import vue from '@vitejs/plugin-vue'
import { presetIcons, presetUno } from 'unocss'
import unocss from 'unocss/vite'
import presetTheme from 'unocss-preset-theme'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), unocss<Theme>({
    theme: {
      colors: {
        'primary': '#1677ff',
        'primary-border': '#1677ff',
        'text': 'rgba(0, 0, 0, 0.88)',
        'container': '#ffffff',
        'border': '#d9d9d9',
      },
      spacing: {
        xss: '4px',
        xs: '8px',
        sm: '12px',
        base: '16px',
        lg: '24px',
        xl: '32px',
      },
    },
    presets: [
      presetUno(),
      presetIcons(),
      presetTheme<Theme>({
        theme: {
          dark: {
            colors: {
              'primary': '#1668dc',
              'primary-border': '#1668dc',
              'border': '#424242',
              'container': '#141414',
              'text': 'rgba(255, 255, 255, 0.85)',
            },
          },
          compact: {
            spacing: {
              xss: '2px',
              xs: '4px',
              sm: '6px',
              base: '8px',
              lg: '12px',
              xl: '16px',
            },
          },
        },
      }),
    ],
  })],
})
