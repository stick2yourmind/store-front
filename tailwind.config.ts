import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          500: '#14b8a6',
          800: '#083344',
          900: '#070B15',
        },
        secondary: {
          100: '#fafafa',
          200: '#E3E7EE',
          800: '#475569',
          900: '#182138',
        },
        success: {
          700: '#1d7561',
        },
        warning: {
          700: '#ea580c',
        },
        'gradient-primary': 'linear-gradient(127deg, #F10808 9.24%, #6B90F4 109.33%)',
      },
    },
  },
  plugins: [],
};
export default config;
