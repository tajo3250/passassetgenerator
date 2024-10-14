/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js,css}"],
  themes: {
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      "sunset",
    ]
  }
}