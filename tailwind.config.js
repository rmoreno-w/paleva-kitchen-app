/** @type {import('tailwindcss').Config} */
export default {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    content: [],
    theme: {
        fontSize: {
            sm: ['0.8rem'],
            base: ['16px', '24px'],
            lg: ['1.25rem'],
            xl: ['1.5625rem'],
            '2xl': ['2rem'],
            '3xl': ['2.4415rem'],
            '5xl': ['3rem'],
            '6xl': ['5rem'],
        },
        extend: {
            colors: {
                projectPurple: '#9448bc',
                projectPurpleLighter: '#ae54de',
                projectGreen: '#3ddd78',
                projectGreenDark: '#2c9e58',
                projectWhite: '#f5f5fa',
                projectPaperWhite: '#e4e4e8',
                projectBlack: '#343434',
                projectRed: '#cc2936',
                projectOrange: '#E68900',
            },
        },
    },
    plugins: [],
};
