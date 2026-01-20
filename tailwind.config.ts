export default {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#022c3b',       // Deep Teal (Darkened for better contrast)
                    'dark-hover': '#043c50',
                    'dark-active': '#011c26',

                    light: '#F5E6D3',      // Cream (Lightened for better contrast)
                    'light-hover': '#EED9BE',
                    'light-active': '#E0C098',

                    // Functional tones derived from the palette
                    gold: '#C5A880',       // Darker version of light for accents
                    teal: '#0A5C75',       // Lighter version of dark for accents
                }
            },
            fontFamily: {
                sans: ['Space Grotesk', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
