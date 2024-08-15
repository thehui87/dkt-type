/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            lineHeight: {
                'extra-loose': '2.5',
                12: '3rem',
            },
            fontFamily: {
                RobotoMono: ['RobotoMono-Medium', 'sans-serif'],
            },
        },
        fontSize: {
            xs: ['0.7rem', '1rem'],
            sm: ['0.8rem', '1.25rem'],
            base: ['1rem', '1.5rem'],
            lg: ['1.125rem', '1.75rem'],
            xl: ['1.25rem', '1.75rem'],
            '2xl': ['1.563rem', '2rem'],
            '3xl': ['2.0rem', '3.0rem'],
            '4xl': ['2.441rem', '2.25rem'],
            '5xl': ['3.052rem', '2.5rem'],
        },
    },
    plugins: [],
};
