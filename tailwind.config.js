const colors = require('tailwindcss/colors');

// Shisure uses a deliberately compressed charcoal scale. Keeping the existing
// Tailwind colour names lets the upstream components inherit the new system
// without replacing their behaviour or scattering one-off overrides.
const gray = {
    50: '#F5F7F5',
    100: '#E5E9E6',
    200: '#C7CEC9',
    300: '#9CA39E',
    400: '#7B837D',
    500: '#626963',
    600: '#151A16',
    700: '#0D110F',
    800: '#0B0E0C',
    900: '#070908',
};

const shisure = {
    50: '#F0FFE9',
    100: '#D8FFCA',
    200: '#B8FFA2',
    300: '#92FF70',
    400: '#78FF4D',
    500: '#65FF35',
    600: '#48D91F',
    700: '#31A915',
    800: '#247E14',
    900: '#18550F',
};

module.exports = {
    content: [
        './resources/scripts/**/*.{js,ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                header: ['"IBM Plex Sans"', '"Roboto"', 'system-ui', 'sans-serif'],
            },
            colors: {
                black: '#080D0F',
                // "primary" and "neutral" are deprecated, prefer the use of "blue" and "gray"
                // in new code.
                primary: shisure,
                gray: gray,
                neutral: gray,
                cyan: shisure,
                shisure,
            },
            fontSize: {
                '2xs': '0.625rem',
            },
            transitionDuration: {
                250: '250ms',
            },
            borderColor: theme => ({
                default: theme('colors.neutral.400', 'currentColor'),
            }),
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
    ]
};
