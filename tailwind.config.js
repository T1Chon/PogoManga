/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
    },
    backgroundColor: {
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
    
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}