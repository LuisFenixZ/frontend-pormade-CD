/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        body: "#212121",
        input: "#414141",
        green1: "#509D46",
        green2: "#3CB62C",
        'grey1': '#0a0a0a',
        'grey2': '#212121',
        'grey3': 'rgb(41 41 41)',
        cartmessage: "#8C8C8C"
      },
      backgroundColor:{
        'grey1': '#0a0a0a',
        'grey2': '#212121',
        'grey3': 'rgb(41 41 41)',
        'grey4': '#191919',
        'grey5': '#0c0c0c',
        'green1': '#509D46',
        'green2': '#3CB62C',
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        'montserrat-800': ['Montserrat-Bold', 'sans-serif'],
        'montserrat-900': ['Montserrat-ExtraBold', 'sans-serif'],
      },
      fontSize: {
        'size-button': '25px'
      },
      width: {
        
      },
      height: {
        
      },
      borderRadius: {
        
      },
    },
  },
  plugins: [],
}