import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [theme, setTheme] = useState('light');

    // Check user's preference on first load
    // useEffect(() => {
    //     if (localStorage && localStorage.getItem('theme')) {
    //         setTheme(localStorage.getItem('theme'));
    //     } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //         setTheme('dark');
    //     }
    // }, []);

    // Update theme in localStorage and HTML class
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    // Toggle theme
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div>
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
            >
                {theme === 'dark'
                    ? 'Switch to Light Mode'
                    : 'Switch to Dark Mode'}
            </button>
        </div>
    );
};

export default ThemeToggle;
