import {
  defineConfig,
  definePreset,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
} from 'unocss'
import presetTheme from 'unocss-preset-theme'
import type { Theme } from 'unocss/preset-uno'

const TestPreset = definePreset({
  name: 'components',
  shortcuts: [
    { 'app-container': 'sm:max-w-1296px mx-auto' },
    { 'app-tracking': 'tracking-[-2%]' },
    { 'display-lg': 'text-52px leading-56px app-tracking' },
    { 'display-sm': 'text-44px leading-48px app-tracking' },
    { heading1: 'text-36px sm:text-40px leading-44px sm:leading-48px app-tracking' },
    { heading2: 'text-32px sm:text-36px leading-40px sm:leading-44px app-tracking' },
    { heading3: 'text-28px sm:text-32px leading-36px sm:leading-40px app-tracking' },
    { heading4: 'text-24px sm:text-28px leading-32px sm:leading-36px sm:app-tracking' },
    { heading5: 'text-20px sm:text-24px leading-28px sm:leading-32px sm:app-tracking' },
    { heading6: 'text-18px sm:text-20px leading-24px sm:leading-28px sm:app-tracking' },
    { 'paragraph-lg': 'text-18px leading-28px' },
    { 'paragraph-md': 'text-16px leading-24px' },
    { 'paragraph-sm': 'text-14px leading-20px' },
    { 'paragraph-xs': 'text-12px leading-20px' },
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      warn: true,
      customizations: {
        transform(svg, collection) {
          if (collection === 'app')
            svg = svg.replace(/stroke="#[a-zA-Z0-9]+"/, 'stroke="currentColor"')
          return svg
        },
      },
      collections: {
        app: {
          dot: '<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3Z" fill="currentColor"/> </svg>',
          menu: '<svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2 2.25H28M2 12H28M2 21.75H28" stroke="#111827" stroke-width="2.67" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
          user: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11.7601 10.86C13.3783 10.86 14.6901 9.54819 14.6901 7.93C14.6901 6.31181 13.3783 5 11.7601 5C10.1419 5 8.83008 6.31181 8.83008 7.93C8.83008 9.54819 10.1419 10.86 11.7601 10.86Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M5.84009 19.0001V17.3301C5.84009 15.3801 7.42009 13.8101 9.36009 13.8101H14.6301C16.5801 13.8101 18.1501 15.3901 18.1501 17.3301V19.0001" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
        },
        images: {
        },
      },
    }),
    presetTypography(
    ),
    presetWebFonts({
      provider: 'google',
      fonts: {
        inter: 'Inter:300,600',
      },
    }),
    presetTheme<Theme>({
      theme: {
        dark: {
          colors: {
            neutral: {
              50: '#F9FAFB',
              100: '#F3F4F6',
              200: '#E5E7EB',
              300: '#D1D5DB',
              400: '#9CA3AF',
              500: '#6B7280',
              600: '#4B5563',
              700: '#374151',
              800: '#1F2937',
              900: '#111827',
            },
            primary: {
              10: '#FFFAF2',
              50: '#FFF5E4',
              100: '#FFF0D6',
              200: '#FFE8C2',
              300: '#FFDC99',
              400: '#FFCF66',
              500: '#880808',
              600: '#CC9F00',
              700: '#997700',
              800: '#665000',
              900: '#332800',
            },
          },
        },
      },
    }),
  ],
  theme: {
    colors: {
      neutral: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
      },
      primary: {
        10: '#FFFAF2',
        50: '#FFF5E4',
        100: '#FFF0D6',
        200: '#FFE8C2',
        300: '#FFDC99',
        400: '#FFCF66',
        500: '#FFC700',
        600: '#CC9F00',
        700: '#997700',
        800: '#665000',
        900: '#332800',
      },
      info: {
        50: '#E6F7FF',
        100: '#BAE7FF',
        200: '#91D5FF',
        300: '#69C0FF',
        400: '#40A9FF',
        500: '#1890FF',
        600: '#096DD9',
        700: '#0050B3',
        800: '#003A8C',
        900: '#002766',
      },
      success: {
        50: '#F0FDF4',
        100: '#DCFCE7',
        200: '#BBF7D0',
        300: '#86EFAC',
        400: '#4ADE80',
        500: '#22C55E',
        600: '#16A34A',
        700: '#15803D',
        800: '#166534',
        900: '#14532D',
      },
      warning: {
        50: '#FFFBEB',
        100: '#FEF3C7',
        200: '#FDE68A',
        300: '#FCD34D',
        400: '#FBBF24',
        500: '#F59E0B',
        600: '#D97706',
        700: '#B45309',
        800: '#92400E',
        900: '#78350F',
      },
      destructive: {
        50: '#FEF2F2',
        100: '#FEE2E2',
        200: '#FECACA',
        300: '#FCA5A5',
        400: '#F87171',
        500: '#EF4444',
        600: '#DC2626',
        700: '#B91C1C',
        800: '#7F1D1D',
        900: '#7F1D1D',
      },
      purple: {
        50: '#F9F0FF',
        100: '#EFDBFF',
        200: '#D3ADF7',
        300: '#B37FEB',
        400: '#9254DE',
        500: '#722ED1',
        600: '#531DAB',
        700: '#391085',
        800: '#22075E',
        900: '#120338',
      },
      shades: {
        0: '#fff',
        100: '#000',
        black: '#121212',
      },
    },
    // extend: {
    //   fontFamily: {
    //     body: ['Inter', 'sans-serif'],
    //   },
    // },
  },
})

export default defineConfig<Theme>({
  presets: [
    TestPreset,
  ],
})
