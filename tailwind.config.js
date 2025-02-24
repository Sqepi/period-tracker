/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'hsl(var(--primary))',
        'primary-hover': 'hsl(var(--primary-hover))',
        'accent': 'hsl(var(--accent))',
        'background': 'hsl(var(--background))',
        'foreground': 'hsl(var(--foreground))',
      },
    },
  },
  plugins: [],
}

