import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#FF5B26',
                    hover: '#FF5B26',
                    border: colors.orange[400],
                    text: colors.orange[500],
                    dark: colors.orange[800],
                    ['dark-hover']: colors.orange[900],
                },
                secondary: {
                    DEFAULT: colors.neutral[200],
                    hover: colors.neutral[100],
                    border: colors.neutral[400],
                    text: colors.neutral[500],
                    dark: colors.neutral[800],
                    ['dark-hover']: colors.neutral[900],
                },
                green: '#1EB482',
                blue: '#05AAFF',
                black: '#191B1D',
                yellowLight: '#FFF9E5',
                grey: {
                    DEFAULT: '#4E5358',
                    text: colors.gray[500],
                },
            },
            fontSize: {
                h1: ['48px', { lineHeight: '1' }],
                h2: ['36px', { lineHeight: '1' }],
                h3: ['28px', { lineHeight: '2.5rem' }],
                h4: ['24px', { lineHeight: '2.25rem' }],
                h5: ['20px', { lineHeight: '1.75rem' }],
            },
        },
    },
    plugins: [],
};
