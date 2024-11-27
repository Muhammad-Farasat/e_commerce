/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
      'Rajdhani' : ['Rajdhani'],
      'Rajdhani-Regular' : ['Rajdhani-Regular'],
      'Rajdhani-Medium' : ['Rajdhani-Medium']
    },
      backgroundImage:{
        'hero' : 'url("./public/Images/banner_image.jpg")',
        'login_img' :'url("./public/Images/login_page_img.jpg")'
      }
  },
  },
  plugins: [],
}