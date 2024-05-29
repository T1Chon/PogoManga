/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'msm': '460px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        'redHeader': {
          '50': '#fef3f2',
          '100': '#ffe2e1',
          '200': '#ffcac8',
          '300': '#ffa6a2',
          '400': '#fc736d',
          '500': '#f4473f',
          '600': '#e22a22',
          '700': '#be1e17',
          '800': '#9d1d17',
          '900': '#821e1a',
          '950': '#470b08',
        },
        'bgfooter': {
          '50': '#f7f7f7',
          '100': '#ededed',
          '200': '#d9d9d9',
          '300': '#c8c8c8',
          '400': '#adadad',
          '500': '#999999',
          '600': '#888888',
          '700': '#7b7b7b',
          '800': '#676767',
          '900': '#545454',
          '950': '#363636',
        },
        'silver': {
          '50': '#f8f8f8',
          '100': '#f0f0f0',
          '200': '#e4e4e4',
          '300': '#c8c7c7',
          '400': '#b5b4b4',
          '500': '#9a9999',
          '600': '#828080',
          '700': '#6b6a6a',
          '800': '#5b5959',
          '900': '#4e4e4e',
          '950': '#282727',
      },  
        'custom-pink': '#9e004a',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}