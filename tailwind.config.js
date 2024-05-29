/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
  	theme: {
    	extend: {
			colors: {
				'dark-blue': '004AAD',
				'light-blue': 'F5F5F5',
				'white' : 'FFFFFF',
				'black' : '000000'
			},
			fontFamily: {
				livvic: ['Livvic', 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif'],
				montserratLight: ['Montserrat-Light', 'sans-serif']
			}
		},
  	},
  	plugins: [import('tailwindcss-animate')],
}

