import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"Lato"', 'sans-serif'],
      serif: ['"Noto Serif"', 'serif'],
    },
    colors: {
      transparent: 'transparent',
      white: 'hsl(0, 0%, 100%)',
      black: 'hsl(0, 0%, 0%)',
      blue: {
        50: 'hsl(203, 87%, 97%)',
        100: 'hsl(205, 75%, 94%)',
        200: 'hsl(201, 77%, 86%)',
        300: 'hsl(199, 77%, 74%)',
        400: 'hsl(198, 76%, 60%)',
        500: 'hsl(199, 72%, 48%)',
        600: 'hsl(200, 79%, 39%)',
        700: 'hsl(201, 78%, 32%)',
        800: 'hsl(201, 73%, 27%)',
        900: 'hsl(202, 66%, 24%)',
        950: 'hsl(204, 65%, 16%)',
      },
      green: {
        50: 'hsl(96, 29%, 97%)',
        100: 'hsl(96, 26%, 93%)',
        200: 'hsl(97, 24%, 85%)',
        300: 'hsl(99, 24%, 72%)',
        400: 'hsl(99, 21%, 58%)',
        500: 'hsl(100, 22%, 45%)',
        600: 'hsl(99, 23%, 36%)',
        700: 'hsl(98, 22%, 29%)',
        800: 'hsl(101, 20%, 24%)',
        900: 'hsl(98, 18%, 20%)',
        950: 'hsl(102, 25%, 10%)',
      },
      purple: {
        50: 'hsl(233, 67%, 98%)',
        100: 'hsl(240, 67%, 94%)',
        200: 'hsl(240, 71%, 92%)',
        300: 'hsl(241, 68%, 85%)',
        400: 'hsl(244, 67%, 76%)',
        500: 'hsl(247, 65%, 66%)',
        600: 'hsl(251, 61%, 58%)',
        700: 'hsl(252, 51%, 50%)',
        800: 'hsl(252, 51%, 42%)',
        900: 'hsl(252, 49%, 35%)',
        950: 'hsl(250, 54%, 23%)',
      },
      yellow: {
        50: 'hsl(55, 92%, 95%)',
        100: 'hsl(54, 100%, 90%)',
        200: 'hsl(52, 100%, 77%)',
        300: 'hsl(50, 100%, 63%)',
        400: 'hsl(47, 99%, 53%)',
        500: 'hsl(44, 97%, 47%)',
        600: 'hsl(40, 99%, 40%)',
        700: 'hsl(35, 95%, 33%)',
        800: 'hsl(31, 84%, 29%)',
        900: 'hsl(27, 76%, 26%)',
        950: 'hsl(25, 86%, 14%)',
      },
      gray: {
        50: 'hsl(0, 0%, 97%)',
        100: 'hsl(0, 0%, 93%)',
        200: 'hsl(0, 0%, 87%)',
        300: 'hsl(0, 0%, 83%)',
        400: 'hsl(0, 0%, 68%)',
        500: 'hsl(0, 0%, 60%)',
        600: 'hsl(0, 0%, 53%)',
        700: 'hsl(0, 0%, 48%)',
        800: 'hsl(0, 0%, 40%)',
        900: 'hsl(0, 0%, 33%)',
        950: 'hsl(0, 0%, 21%)',
      },
      red: {
        50: 'hsl(0, 86%, 97%)',
        100: 'hsl(0, 93%, 94%)',
        200: 'hsl(0, 96%, 89%)',
        300: 'hsl(0, 94%, 82%)',
        400: 'hsl(0, 91%, 71%)',
        500: 'hsl(0, 84%, 60%)',
        600: 'hsl(0, 72%, 51%)',
        700: 'hsl(0, 74%, 42%)',
        800: 'hsl(0, 70%, 35%)',
        900: 'hsl(0, 63%, 31%)',
        950: 'hsl(0, 75%, 15%)',
      },
    },
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
