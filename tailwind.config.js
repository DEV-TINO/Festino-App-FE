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
            'light-68': 'rgba(255, 152, 212, 0.68)',
            'light-40': 'rgba(255, 152, 212, 0.4)',
            'light-20': 'rgba(255, 152, 212, 0.2)',
            'light-16': 'rgba(255, 152, 212, 0.16)',
            'light-12': 'rgba(255, 152, 212, 0.12)',
            'light-6': 'rgba(255, 152, 212, 0.06)',
          },
          700: {
            DEFAULT: '#FF85CC',
            light: 'rgba(255, 133, 204, 0.4)',
          },
          50: {
            DEFAULT: '#FFFCFE',
          },
        },
        secondary: {
          700: {
            DEFAULT: '#222222',
            'light-50': 'rgba(34, 34, 34, 0.5)',
            'light-3': 'rgba(0, 0, 0, 0.03)',
          },
          500: {
            DEFAULT: '#444444',
            'light-20': 'rgba(68, 68, 68, 0.2)',
          },
          400: '#888888',
          300: '#999999',
          100: '#CCCCCC',
          50: {
            DEFAULT: '#EEEEEE',
            light: '#E1E1E1',
          },
        },
        'prepared': {
          DEFAULT: '#66CF55',
          light:'#E2F4E1'
        },
        'cooking': {
          DEFAULT: '#3082F6',
          light: '#DAE8FA'
        },
        'cancel': {
          DEFAULT: '#888888',
        },
        'waiting': {
          DEFAULT: '#FF6D6D',
          light: '#FBE4E4'
        },
        'close': {
          DEFAULT: "#F00E00",
          light: 'rgba(240, 14, 0, 0.12)'
        },
        'open': {
          DEFAULT: "#0073F0",
          light: 'rgba(0, 115, 240, 0.12)'
        },
      },
      textColor: (theme) => ({
        ...theme('colors'),
        danger: '#FF3F3F',
        warning: '#FF5252',
      }),
      backgroundColor: (theme) => ({
        ...theme('colors'),
        'map-color': 'rgba(211, 211, 211, 0.1)',
        'instagram-bg': '#F5F6F8',
        'error': 'rgba(255, 109, 109, 0.16)',
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
        'header-tino-logo': "url('/icons/festino-logo.svg')",
        'header-team-introduction': "url('/icons/festino-icon.svg')",
        'booth-banner': "url('/images/booth/booth-banner.svg')",
        'tino-thumbs-up': "url('/images/tinos/tino-thumbs-up.svg')",
        'tabling-banner': "url('/images/tinos/tabling-banner.svg')",
        'back-arrow': "url('/icons/arrow.png')",
        'more-arrow': "url('/icons/arrow-right.png')",
        'slide-banner-1': "url('/images/banner/slide-banner-1.png')",
        'slide-banner-2': "url('/images/banner/slide-banner-2.png')",
        'slide-banner-3': "url('/images/banner/slide-banner-3.png')",
        'tino-sing': "url('/images/tinos/tino-sing.svg')",
        'booth-reservation-status': "url('/images/booth/booth-reservation-status.png')",
        'booth-detail-banner': "url('/images/booth/booth-detail-banner.svg')",
        'x-button': "url('/icons/x.png')",
        'instagram': "url('/icons/instagram.png')",
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
        'teams': "url('/images/teams/teams.png')",
      },
      borderRadius: {
        'lg-xl': '0.625rem', //10px
        '3xl': '1.25rem', // 20px
        '3.5xl': '1.5rem', // 24px
        '10xl': '3.125rem', //50px
      },
      borderColor: (theme) => ({
        ...theme('colors'),
      }),
      borderWidth: {
        1: '0.5px',
        2: '1px',
      },
      boxShadow: {
        's-primary-900': '0 1px 0 0 #0073F0',
        's-secondary-500-20': '0 1px 0 0 rgba(68, 68, 68, 0.2)',
        'xs': '0 0 12px 0 rgba(0, 0, 0, 0.08)',
        '3xl': '0 1px 10px rgba(0, 115, 240, 0.01), 0 1px 10px rgba(0, 115, 240, 0.01)',
        '4xl': '0px 0px 16px rgba(0, 0, 0, 0.04)',
        '5xl': '0 0 20px rgba(0, 0, 0, 0.16)',
        '6xl': '0 0 12px rgba(0, 0, 0, 0.06)',
      },
      dropShadow: {
        'title': '0 2px 2px rgba(255, 124, 196, 1)',
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