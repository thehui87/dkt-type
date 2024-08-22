import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [currentRoute, setCurrentRoute] = useState('/');
    const location = useLocation();

    useEffect(() => {
        setCurrentRoute(location.pathname);
    }, [location.pathname]);

    return (
        <div className="flex max-sm:flex-wrap  justify-between py-5 bg-teal-900 text-teal-600 border-b-2 border-teal-800 items-center">
            <Link
                to={'/'}
                className="max-sm:w-full max-sm:flex max-sm:flex-col max-sm:items-center ml-2 px-2 py-2 rounded-md border-teal-800"
            >
                <div className="flex items-center">
                    <div className="font-bold text-orange-400 text-4xl">[</div>
                    <div className="flex items-end justify-center">
                        <div className="font-medium bg-white w-6 h-6 rounded-md block align-center justify-center text-orange-400 text-3xl leading-5">
                            +
                        </div>
                        <div className="font-bold text-white mx-1 text-lg">
                            DT...
                        </div>
                    </div>
                    <div className="font-bold text-orange-400 text-4xl">]</div>
                    <div className="font-bold text-white ml-1 text-2xl">
                        dwarftype
                    </div>
                </div>
                <div className="font-bold pt-2 text-base text-teal-600">
                    Simple typing tutor
                </div>
            </Link>
            <ul className="flex justify-evenly w-full">
                <li
                    className={`font-bold hover:text-white ${
                        currentRoute === '/' ? 'font-bold text-teal-200' : ''
                    }`}
                >
                    <Link to={'/'}>Home</Link>
                </li>
                <li
                    className={`font-bold hover:text-white ${
                        currentRoute === '/about'
                            ? 'font-bold text-teal-200'
                            : ''
                    }`}
                >
                    <Link to={'/about'}>About</Link>
                </li>
                <li
                    className={`font-bold hover:text-white ${
                        currentRoute === '/profile'
                            ? 'font-bold text-teal-200'
                            : ''
                    }`}
                >
                    <Link to={'/profile'}>Profile</Link>
                </li>
            </ul>
        </div>
    );
};

export { Navbar };
