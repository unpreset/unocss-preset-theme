import { createGenerator, presetUno } from 'unocss'
import type { Theme } from 'unocss/preset-uno'
import { describe, expect, test } from 'vitest'
import presetTheme from '../src'

describe('theme', () => {
  const uno = createGenerator({
    theme: {
      colors: {
        main: {
          100: '#000001',
          200: '#000002',
          300: '#000003',
          400: '#000004',
          500: '#000004',
          600: '#000006',
          700: '#000007',
          800: '#000008',
        },
      },
    },
    presets: [
      presetUno(),
      presetTheme<Theme>({
        theme: {
          dark: {
            colors: {
              main: {
                100: '#fffff1',
                200: '#fffff2',
                300: '#fffff3',
                400: '#fffff4',
                500: '#fffff4',
                600: '#fffff6',
                700: '#fffff7',
                800: '#fffff8',
              },
            },
          },
          compact: {
            fontSize: {
              xs: ['1.75rem', '2rem'],
              sm: ['1.875rem', '2.25rem'],
            },
          },
        },
      }),
    ],
  })

  test('basic', async () => {
    const targets = [
      'text-main-100',
      'bg-main-200',
      'border-main-500',
      'border-main-6',
      'text-sm',
      'text-xs',
    ]

    const { css } = await uno.generate(targets.join('\n'))
    expect(css).toMatchInlineSnapshot(`
      "/* layer: preflights */
      *,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
      /* layer: theme */
      .dark{--un-preset-theme-colors-main-100:#fffff1;--un-preset-theme-colors-main-500:#fffff4;--un-preset-theme-colors-main-200:#fffff2;}
      :root{--un-preset-theme-colors-main-100:#000001;--un-preset-theme-colors-main-500:#000004;--un-preset-theme-fontsize-sm-0:0.875rem;--un-preset-theme-fontsize-sm-1:0.875rem;--un-preset-theme-fontsize-xs-0:0.75rem;--un-preset-theme-fontsize-xs-1:0.75rem;--un-preset-theme-colors-main-200:#000002;}
      .compact{--un-preset-theme-fontsize-sm-0:1.875rem;--un-preset-theme-fontsize-sm-1:2.25rem;--un-preset-theme-fontsize-xs-0:1.75rem;--un-preset-theme-fontsize-xs-1:2rem;}
      /* layer: default */
      .border-main-500{border-color:var(--un-preset-theme-colors-main-500);}
      .bg-main-200{background-color:var(--un-preset-theme-colors-main-200);}
      .text-sm{font-size:var(--un-preset-theme-fontsize-sm-0);line-height:var(--un-preset-theme-fontsize-sm-1);}
      .text-xs{font-size:var(--un-preset-theme-fontsize-xs-0);line-height:var(--un-preset-theme-fontsize-xs-1);}
      .text-main-100{color:var(--un-preset-theme-colors-main-100);}"
    `)
  })
})
test('media dark mode', async () => {
  const uno = createGenerator({
    theme: {
      colors: {
        primary: '#123456'
      },
      fontSize: {
        xs: ['1.75rem', '2rem'],
      }
    },
    presets: [
      presetUno({
        dark: 'media',
      }),
      presetTheme<Theme>({
        theme: {
          dark: {
            colors: {
              primary: '#654321',
            }
          },
          compact: {
            fontSize: {
              xs: ['0.75rem', '1rem'],
            },
          },
        },
      }),
    ],
  })

  const targets = ['text-xs', 'text-primary']
  const { css } = await uno.generate(targets.join('\n'))
  expect(css).toMatchInlineSnapshot(`
    "/* layer: preflights */
    *,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
    /* layer: theme */
    .compact{--un-preset-theme-fontsize-xs-0:0.75rem;--un-preset-theme-fontsize-xs-1:1rem;}
    @media (prefers-color-scheme: dark){
    --un-preset-theme-colors-primary:#654321;
    }
    @media (prefers-color-scheme: light){
    --un-preset-theme-colors-primary:#123456;--un-preset-theme-fontsize-xs-0:1.75rem;--un-preset-theme-fontsize-xs-1:1.75rem;
    }
    /* layer: default */
    .text-xs{font-size:var(--un-preset-theme-fontsize-xs-0);line-height:var(--un-preset-theme-fontsize-xs-1);}
    .text-primary{color:var(--un-preset-theme-colors-primary);}"
  `)
})
