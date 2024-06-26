/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
		colors: {
			'black': '#000000',
			'white' : '#ffffff',
			'grey' : '#f5f5f5',
			'd-blue' : '#004aad',
			'l-blue' : '#aec3de',
			'error' : '#ffe6ff'
		},
		screens: {
			'xs': '480px',
		},
		width: {
			'420': '420px',
			'465': '465px',
		},
		fontFamily: {
			livvic: ['Livvic', 'sans-serif'],
			montserrat: ['Montserrat', 'sans-serif']
		},
		keyframes: {
		'accordion-down': {
			from: { height: 0 },
			to: { height: 'var(--radix-accordion-content-height)' },
		},
		'accordion-up': {
			from: { height: 'var(--radix-accordion-content-height)' },
			to: { height: 0 },
		},
		},
		animation: {
		'accordion-down': 'accordion-down 0.2s ease-out',
		'accordion-up': 'accordion-up 0.2s ease-out',
		},
	},
  },
  plugins: [require("tailwindcss-animate")],
}