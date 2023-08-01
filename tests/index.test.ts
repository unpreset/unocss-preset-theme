import type { UserConfig } from '@unocss/core'
import { createGenerator, mergeDeep } from '@unocss/core'
import { presetUno } from '@unocss/preset-uno'
import type { PresetUnoOptions, Theme } from '@unocss/preset-uno'
import { describe, expect, test } from 'vitest'
import type { PresetThemeOptions } from '../src'
import presetTheme from '../src'

describe('theme', () => {
  const createUno = (userConfig?: UserConfig<Theme>, options: {
    unoOptions?: PresetUnoOptions
    themeOptions?: PresetThemeOptions<Theme>
  } = {}) => createGenerator<Theme>(mergeDeep({
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
      presetUno(options.unoOptions),
      presetTheme<Theme>(mergeDeep({
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
          star: {
            colors: {
              main: {
                100: '#1ffff1',
                200: '#1ffff2',
                300: '#1ffff3',
                400: '#1ffff4',
                500: '#1ffff4',
                600: '#1ffff6',
                700: '#1ffff7',
                800: '#1ffff8',
              },
            },
          },
        },
      }, options.themeOptions as any)),
    ],
  } as UserConfig<Theme>, userConfig as UserConfig<Theme>))

  test('basic', async () => {
    const targets = [
      'text-main-100',
      'bg-main-200',
      'border-main-500',
      'border-main-6',
      'text-sm',
      'text-xs',
    ]

    const uno = createUno()
    const { css } = await uno.generate(targets.join('\n'))
    expect(css).toMatchInlineSnapshot(`
      "/* layer: preflights */
      *,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
      /* layer: theme */
      :root{--un-preset-theme-colors-main-100:0, 0, 1;--un-preset-theme-colors-main-500:0, 0, 4;--un-preset-theme-colors-main-200:0, 0, 2;--un-preset-theme-fontSize-sm-0:0.875rem;--un-preset-theme-fontSize-sm-1:0.875rem;--un-preset-theme-fontSize-xs-0:0.75rem;--un-preset-theme-fontSize-xs-1:0.75rem;}
      .compact{--un-preset-theme-fontSize-sm-0:1.875rem;--un-preset-theme-fontSize-sm-1:2.25rem;--un-preset-theme-fontSize-xs-0:1.75rem;--un-preset-theme-fontSize-xs-1:2rem;}
      .dark{--un-preset-theme-colors-main-100:255, 255, 241;--un-preset-theme-colors-main-500:255, 255, 244;--un-preset-theme-colors-main-200:255, 255, 242;}
      .star{--un-preset-theme-colors-main-100:31, 255, 241;--un-preset-theme-colors-main-500:31, 255, 244;--un-preset-theme-colors-main-200:31, 255, 242;}
      /* layer: default */
      .border-main-500{--un-border-opacity:1;border-color:rgba(var(--un-preset-theme-colors-main-500),var(--un-border-opacity));}
      .bg-main-200{--un-bg-opacity:1;background-color:rgba(var(--un-preset-theme-colors-main-200),var(--un-bg-opacity));}
      .text-sm{font-size:var(--un-preset-theme-fontSize-sm-0);line-height:var(--un-preset-theme-fontSize-sm-1);}
      .text-xs{font-size:var(--un-preset-theme-fontSize-xs-0);line-height:var(--un-preset-theme-fontSize-xs-1);}
      .text-main-100{--un-text-opacity:1;color:rgba(var(--un-preset-theme-colors-main-100),var(--un-text-opacity));}"
    `)
  })
  test('media dark mode', async () => {
    const uno = createGenerator({
      theme: {
        colors: {
          primary: '#123456',
        },
        fontSize: {
          xs: ['1.75rem', '2rem'],
        },
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
              },
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
      @media (prefers-color-scheme: dark){
      :root{--un-preset-theme-colors-primary:101, 67, 33;}
      }
      @media (prefers-color-scheme: light){
      :root{--un-preset-theme-colors-primary:18, 52, 86;--un-preset-theme-fontSize-xs-0:1.75rem;--un-preset-theme-fontSize-xs-1:1.75rem;}
      }
      .compact{--un-preset-theme-fontSize-xs-0:0.75rem;--un-preset-theme-fontSize-xs-1:1rem;}
      /* layer: default */
      .text-xs{font-size:var(--un-preset-theme-fontSize-xs-0);line-height:var(--un-preset-theme-fontSize-xs-1);}
      .text-primary{--un-text-opacity:1;color:rgba(var(--un-preset-theme-colors-primary),var(--un-text-opacity));}"
    `)
  })
  test('selectors', async () => {
    const uno = createGenerator({
      theme: {
        colors: {
          primary: '#123456',
        },
      },
      presets: [
        presetUno(),
        presetTheme<Theme>({
          theme: {
            dark: {
              colors: {
                primary: '#654321',
              },
            },
          },
          selectors: {
            dark: 'body.dark',
            light: '.light',
          },
        }),
      ],
    })

    const targets = ['text-primary']
    const { css } = await uno.generate(targets.join('\n'))
    expect(css).toMatchInlineSnapshot(`
      "/* layer: preflights */
      *,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
      /* layer: theme */
      .light{--un-preset-theme-colors-primary:18, 52, 86;}
      body.dark{--un-preset-theme-colors-primary:101, 67, 33;}
      /* layer: default */
      .text-primary{--un-text-opacity:1;color:rgba(var(--un-preset-theme-colors-primary),var(--un-text-opacity));}"
    `)
  })

  test('color opacity', async () => {
    const uno = createUno({
      theme: {
        colors: {
          rgb: 'rgb(255, 0, 0)',
          rgba: 'rgba(255, 0, 0, 0.5)',
          hsl: 'hsl(0, 100%, 50%)',
          hsla: 'hsl(0, 100%, 50%, 0.5)',
        },
      },
    }, {
      themeOptions: {
        theme: {
          dark: {
            colors: {
              rgb: 'rgb(0, 255, 0)',
              rgba: 'rgba(0, 255, 0, 0.5)',
              hsl: 'hsl(0, 100%, 50%)',
              hsla: 'hsl(100, 100%, 50%, 0.5)',
            },
          },
        },
      },
    })

    const { css } = await uno.generate('text-main text-rgb text-rgba text-rgb/40 text-rgba/50 text-hsl text-hsl/60 text-hsla text-hsla/60')
    expect(css).toMatchInlineSnapshot(`
      "/* layer: preflights */
      *,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
      /* layer: theme */
      :root{--un-preset-theme-colors-rgb:255, 0, 0;--un-preset-theme-colors-rgba:255, 0, 0;--un-preset-theme-colors-hsl:0, 100%, 50%;--un-preset-theme-colors-hsla:0, 100%, 50%;}
      .dark{--un-preset-theme-colors-rgb:0, 255, 0;--un-preset-theme-colors-rgba:0, 255, 0;--un-preset-theme-colors-hsl:0, 100%, 50%;--un-preset-theme-colors-hsla:100, 100%, 50%;}
      /* layer: default */
      .text-hsl{--un-text-opacity:1;color:hsla(var(--un-preset-theme-colors-hsl),var(--un-text-opacity));}
      .text-hsl\\\\/60{color:hsla(var(--un-preset-theme-colors-hsl),0.6);}
      .text-hsla,
      .text-hsla\\\\/60{color:hsl(var(--un-preset-theme-colors-hsla) 0.5);}
      .text-rgb{--un-text-opacity:1;color:rgba(var(--un-preset-theme-colors-rgb),var(--un-text-opacity));}
      .text-rgb\\\\/40{color:rgba(var(--un-preset-theme-colors-rgb),0.4);}
      .text-rgba,
      .text-rgba\\\\/50{color:rgba(var(--un-preset-theme-colors-rgba),0.5);}"
    `)
  })

  test('spacing', async () => {
    const uno = createUno({}, {
      themeOptions: {
        theme: {
          dark: {
            spacing: {
              lg: '15px',
            },
          },
          compact: {
            spacing: {
              lg: '12px',
              md: '10px',
            },
          },
        },
      },
    })
    const { css } = await uno.generate('px-5 py-6 pt-7 pb-8 px-md p-lg')
    expect(css).toMatchInlineSnapshot(`
      "/* layer: preflights */
      *,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
      /* layer: theme */
      :root{--un-preset-theme-spacing-lg:1.125rem;}
      .compact{--un-preset-theme-spacing-md:10px;--un-preset-theme-spacing-lg:12px;}
      .dark{--un-preset-theme-spacing-lg:15px;}
      /* layer: default */
      .p-lg{padding:var(--un-preset-theme-spacing-lg);}
      .px-5{padding-left:1.25rem;padding-right:1.25rem;}
      .px-md{padding-left:var(--un-preset-theme-spacing-md);padding-right:var(--un-preset-theme-spacing-md);}
      .py-6{padding-top:1.5rem;padding-bottom:1.5rem;}
      .pb-8{padding-bottom:2rem;}
      .pt-7{padding-top:1.75rem;}"
    `)
  })

  test('color-keyword-and-custom-vars', async () => {
    const uno = createGenerator({
      theme: {
        colors: {
          primary: '#123456',
          colorKey: 'red',
          customVar: 'var(--fd-color-light)',
        },
      },
      presets: [
        presetUno(),
        presetTheme<Theme>({
          theme: {
            dark: {
              colors: {
                primary: '#654321',
                colorKey: 'blue',
                customVar: 'var(--fd-color-dark)',
              },
            },
          },
        }),
      ],
    })

    const targets = ['text-color-key', 'text-custom-var']
    const { css } = await uno.generate(targets.join('\n'))
    expect(css).toMatchInlineSnapshot(`
      "/* layer: preflights */
      *,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
      /* layer: theme */
      .dark{--un-preset-theme-colors-colorKey:blue;--un-preset-theme-colors-customVar:var(--fd-color-dark);}
      :root{--un-preset-theme-colors-colorKey:red;--un-preset-theme-colors-customVar:var(--fd-color-light);}
      /* layer: default */
      .text-color-key{color:var(--un-preset-theme-colors-colorKey);}
      .text-custom-var{color:var(--un-preset-theme-colors-customVar);}"
    `)
  })
})
