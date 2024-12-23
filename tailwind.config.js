/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Đường dẫn đến các file React
  ],
  theme: {
    extend: {      
      height: {
      '100vh': '100vh', // Thêm giá trị 90vh
      
    },
    fontFamily: {
      pacifico: ['Pacifico', 'cursive'],
    },},
  },
  plugins: [],
};
