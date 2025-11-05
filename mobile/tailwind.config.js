/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
        fontFamily:{
        "rubik": ["Rubik-Regular", "sans-serif"],
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"]
      },
      colors:{
        primary:  "#005FFF",
        light:{
          DEFAULT:"#FCFCFC",
          "secondary":"#F2F2F2",
          "border":"#ECEBEB"
        },
        dark:{
          DEFAULT:"#070A0D",
          50:"#101418",
          "secondary":"#13151B",
          "border":"#1C1E22"
        },
        text:"#7A7A7A",
        danger:"#FF3742"
      }
    },
  },
  darkMode: "media",
  plugins: [],
}