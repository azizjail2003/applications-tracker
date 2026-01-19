export default {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue'
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#043c50',       // Main Dark Background
                    'dark-hover': '#064e66',
                    'dark-active': '#032b3a',

                    light: '#EED9BE',      // Main Light Background/Text
                    'light-hover': '#f5e6d0',
                    'light-active': '#dcc0a0',

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
