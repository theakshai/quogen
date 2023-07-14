/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      'lcSac': ["lcSac"],
      'euclidRegular':["euclidRegular"],
      'euclidMedium':["euclidMedium"],
      'euclidSemibold':["euclidSemibold"],
    },
    colors:{
      'qblue':'#26262e',
      'qwhite':'#fcf8f2',
    },
    extend: {
    },
  },
  plugins: [],
}

