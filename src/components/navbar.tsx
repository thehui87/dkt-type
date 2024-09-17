import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    IoHomeSharp,
    IoLogIn,
    IoPersonCircleSharp,
    IoInformationCircle,
} from 'react-icons/io5';

const navMenuList = [
    {
        name: 'Home',
        linkTo: '/',
        icon: <IoHomeSharp />,
    },
    {
        name: 'About',
        linkTo: '/about',
        icon: <IoInformationCircle />,
    },
    {
        name: 'Profile',
        linkTo: '/profile',
        icon: <IoPersonCircleSharp />,
    },
    {
        name: 'Login',
        linkTo: '/login',
        icon: <IoLogIn />,
    },
];

const hamburgerMenuStyle =
    'w-6 rounded-lg tertiary-color mb-1 transform transition-transform duration-300 hover:tertiary-color';
const hamburgerMenuStyleHeight = { height: '0.2rem' };

const Navbar = () => {
    const [currentRoute, setCurrentRoute] = useState('/');
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navMenuClick = (link: string) => {
        navigate(link);
        setIsOpen(false);
    };

    useEffect(() => {
        setCurrentRoute(location.pathname);
    }, [location.pathname]);

    return (
        <div className="flex justify-between py-5 px-3 primary-color text-color border-b-2 border-teal-800 items-center">
            <Link
                to={'/'}
                className=" flex flex-col py-2 rounded-md border-teal-800"
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
                <div className="font-bold pt-2 text-base text-color">
                    Simple typing tutor
                </div>
            </Link>
            {/* Desktop menu */}
            <ul className="hidden md:flex justify-evenly w-full">
                {navMenuList.map((item, index) => {
                    return (
                        <li
                            key={'nav-menu-' + item.name + index}
                            className={`flex items-center font-bold hover:text-active-color ${
                                currentRoute === item.linkTo
                                    ? 'font-bold text-active-color'
                                    : ''
                            }`}
                        >
                            <span className="mr-2 text-xl">{item.icon}</span>
                            <Link to={item.linkTo}>{item.name}</Link>
                        </li>
                    );
                })}
            </ul>
            {/* Mobile menu */}
            <button
                className="block md:hidden focus:outline-none"
                onClick={toggleMenu}
            >
                <div
                    className={`${hamburgerMenuStyle} ${isOpen ? `rotate-45` : ''}`}
                    style={{
                        ...hamburgerMenuStyleHeight,
                        ...(isOpen ? { '--tw-translate-y': '0.45rem' } : ''),
                    }}
                />
                <div
                    className={`${hamburgerMenuStyle} ${isOpen ? 'opacity-0' : 'opacity-100'}`}
                    style={hamburgerMenuStyleHeight}
                />
                <div
                    className={`${hamburgerMenuStyle} ${isOpen ? `-rotate-45 ` : ''}`}
                    style={{
                        ...hamburgerMenuStyleHeight,
                        ...(isOpen ? { '--tw-translate-y': '-0.45rem' } : ''),
                    }}
                />
            </button>
            <div
                className={`fixed top-0 right-0 w-64 h-full flex items-center flex-col justify-center bg-color text-color transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-20`}
            >
                {navMenuList.map((item, index) => {
                    return (
                        <a
                            key={'nav-menu-' + item.name + index}
                            className="w-full block py-7 px-3 transition hover:bg-white/5 cursor-pointer"
                            onClick={() => navMenuClick(item.linkTo)}
                        >
                            <p
                                className={`font-semibold  flex items-center ${currentRoute === item.linkTo ? 'text-active-color' : 'text-color'}`}
                            >
                                <span className="mr-2 text-xl">
                                    {item.icon}
                                </span>
                                {item.name}
                            </p>
                            {/* <p className="text-white/50">
                                Measure actions your users take
                            </p> */}
                        </a>
                    );
                })}
            </div>

            {/* Optional overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-10"
                    onClick={toggleMenu}
                ></div>
            )}
        </div>
    );
};

export { Navbar };
