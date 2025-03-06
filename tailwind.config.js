/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  important: true,
  theme: {
    extend: {
      colors: {
        'white-opacity': 'rgba(255, 255, 255, 0.68)',
        primary: {
          900: {
            DEFAULT: '#FF98D4',
            light: 'rgba(0, 115, 240, 0.2)',
            lighter: 'rgba(0, 115, 240, 0.12)',
            lightest: 'rgba(0, 115, 240, 0.06)',
          },
        },
        secondary: {
          200: '#F2F4F6',
          100: '#CCCCCC',
        },
      },
      textColor: {
        primary: {
          900: {
            DEFAULT: '#FF98D4',
            light: 'rgba(0, 115, 240, 0.2)',
            'light-68': 'rgba(0, 115, 240, 0.68)',
            'light-16': 'rgba(0, 115, 240, 0.16)',
            'light-6': 'rgba(0, 115, 240, 0.06)',
          },
          800: {
            DEFAULT: '#F00E00',
            light: 'rgba(240, 14, 0, 0.12)',
          },
          700: {
            DEFAULT: '#FF85CC',
            light: 'rgba(48, 130, 246, 0.4)',
          },
          600: '#54A6FF',
          500: '#4fa3ff',
          300: '#cfe3ff',
          100: '#f5f6f8',
          50: 'rgba(0, 0, 0, 0.03)',
        },
        secondary: {
          700: {
            DEFAULT: '#222222',
            'light-50': 'rgba(34, 34, 34, 0.5)',
          },
          500: {
            DEFAULT: '#444444',
            'light-20': 'rgba(68, 68, 68, 0.2)',
          },
          400: '#888888',
          300: '#999999',
          200: '#F2F4F6',
          100: '#CCCCCC',
          50: {
            DEFAULT: '#EEEEEE',
            light: '#E1E1E1',
          },
        },
        third: {
          700: '#E2F4E1',
          600: '#DAE8FA',
          500: '#FBE4E4',
          400: {
            DEFAULT: '#888888',
            lighter: 'rgba(136, 136, 136, 0.1)',
          },
          300: { DEFAULT: '#66CF55', lighter: 'rgba(102, 207, 85, 0.1)' },
          200: {
            DEFAULT: '#3082F6',
            lighter: 'rgba(48, 130, 246, 0.1)',
          },
          100: {
            DEFAULT: '#FF6D6D',
            lighter: 'rgba(255, 109, 109, 0.1)',
          },
        },
        'notification-bg': '#FBFCFF',
        'instagram-bg': '#F5F6F8',
        danger: '#FF3F3F',
        warning: '#FF5252',
        error: 'rgba(255, 109, 109, 0.16)',
      },
      backgroundColor: (theme) => ({
        ...theme('textColor'),
        'primary-900-light-12': 'rgba(0, 115, 240, 0.12)',
        'primary-900-light-16': 'rgba(0, 115, 240, 0.16)',
        'map-color': 'rgba(211, 211, 211, 0.1)',
      }),
      fontSize: {
        '3xs': '0.5rem', // 8px
        '2xs': '0.625rem', // 10px
        '3xl': '1.75rem', // 28px
        '10xl': '6.25rem', //100px
      },
      fontFamily: {
        pretendard: ['Pretendard Variable'],
        jalnan2: ['jalnan2'],
      },
      backgroundImage: {
        'tino-cheer-up': "url('/images/tinos/tino-cheer-up.png')",
        'tino-no-arm': "url('/images/tinos/tino-no-arm.png')",
        'tino-no-arm-v2': "url('/images/tinos/tino-no-arm-v2.png')",
        'tino-arm4x': "url('/images/tinos/tino-arm4x.png')",
        'tino-arm': "url('/images/tinos/tino-arm.png')",
        'tino-arm-only-4x': "url('/images/tinos/tino-arm-only-4x.png')",
        'header-tino-logo': "url('/icons/festino-logo.svg')",
        'header-team-introduction': "url('/icons/festino-icon.svg')",
        'booth-banner': "url('/images/booth/booth-banner.png')",
        'tino-thumbs-up': "url('/images/tinos/tino-thumbs-up.png')",
        'back-arrow': "url('/icons/arrow.png')",
        'more-arrow': "url('/icons/arrow-right.png')",
        'slide-banner-1': "url('/images/banner/slide-banner-1.png')",
        'slide-banner-2': "url('/images/banner/slide-banner-2.png')",
        'slide-banner-3': "url('/images/banner/slide-banner-3.png')",
        'tino-sing': "url('/images/tinos/tino-sing.png')",
        'booth-reservation-status': "url('/images/booth/booth-reservation-status.png')",
        'booth-detail-banner': "url('/images/booth/booth-detail-banner.png')",
        'x-button': "url('/icons/x.png')",
        instagram: "url('/icons/instagram.png')",
        'pin-icon': "url('/icons/pin.svg')",
        'back-arrow-white': "url('/icons/arrow-back-white.png')",
        'board-icon': "url('/icons/orders/board.svg')",
        'tino-cd': "url('/icons/tino-cd.svg')",
        'booth-default-image': "url('/images/booth/booth-default-image.png')",
        'booth-map': "url('/images/booth/map.svg')",
        'link-icon': "url('/icons/link.svg')",
        'tino-error': "url('/icons/error-tino.svg')",
        'tino-error-half': "url('/icons/error-tino-half.svg')",
        'tino-error-timetable': "url('/icons/error-tino-timetable.svg')",
        'more-marker': "url('/icons/booth/more.svg')",
        'talent-icon': "url('/icons/talent.svg')",
        teams: "url('/images/teams/teams.png')",
      },
      borderRadius: {
        'lg-xl': '0.625rem', //10px
        '3xl': '1.25rem', // 20px
        '3.5xl': '1.5rem', // 24px
        '10xl': '3.125rem', //50px
      },
      borderColor: (theme) => ({
        ...theme('textColor'),
        primary: 'rgba(255, 181, 224, 0.5)',
        'primary-900':'#FF98D4',
        'primary-700': 'rgba(48, 130, 246, 0.6)',
        'primary-700-default': theme('textColor.primary.700'),
        'secondary-300': theme('textColor.secondary.300'),
        'primary-900-light-40': 'rgba(0, 115, 240, 0.40)',
      }),
      borderWidth: {
        1: '0.5px',
        2: '1px',
      },
      boxShadow: {
        's-primary-900': '0 1px 0 0 #0073F0',
        's-secondary-500-20': '0 1px 0 0 rgba(68, 68, 68, 0.2)',
        xs: '0 0 12px 0 rgba(0, 0, 0, 0.08)',
        '3xl': '0 1px 10px rgba(0, 115, 240, 0.01), 0 1px 10px rgba(0, 115, 240, 0.01)',
        '4xl': '0px 0px 16px rgba(0, 0, 0, 0.04)',
        '5xl': '0 0 20px rgba(0, 0, 0, 0.16)',
        '6xl': '0 0 12px rgba(0, 0, 0, 0.06)',
      },
    },
    screens: {
      xs: '405px',
      sm: '470px',
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.dynamic-padding': {
          paddingLeft: 'calc(20 / 430 * 100%)',
          paddingRight: 'calc(20 / 430 * 100%)',
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
