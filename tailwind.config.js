/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Material 3 Design Tokens (Approximate for a generic theme)
                primary: '#6750A4',
                onPrimary: '#FFFFFF',
                primaryContainer: '#EADDFF',
                onPrimaryContainer: '#21005D',

                secondary: '#625B71',
                onSecondary: '#FFFFFF',
                secondaryContainer: '#E8DEF8',
                onSecondaryContainer: '#1D192B',

                tertiary: '#7D5260',
                onTertiary: '#FFFFFF',
                tertiaryContainer: '#FFD8E4',
                onTertiaryContainer: '#31111D',

                error: '#B3261E',
                onError: '#FFFFFF',
                errorContainer: '#F9DEDC',
                onErrorContainer: '#410E0B',

                background: '#FFFBFE',
                onBackground: '#1C1B1F',

                surface: '#FFFBFE',
                onSurface: '#1C1B1F',

                surfaceVariant: '#E7E0EC',
                onSurfaceVariant: '#49454F',

                outline: '#79747E',
                outlineVariant: '#CAC4D0',
            },
            fontFamily: {
                sans: ['Roboto', 'sans-serif'],
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem', // Material 3 Large
                '3xl': '1.75rem', // Material 3 Extra Large
            }
        },
    },
    plugins: [],
}
