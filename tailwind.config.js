/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Adjust paths as needed
  theme: {
    extend: {
      colors: {
        customBlue: '#3E66DF',
        lightblue: '#BDF1F6' ,
        bgblue:' #F2FCFC',
        borderBLue :'#8FBAF3',
        blueborder: '#0245A3',
      },
    },
  },
  plugins: [],
};
