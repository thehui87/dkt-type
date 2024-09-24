import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    IoHomeSharp,
    IoLogIn,
    IoPersonCircleSharp,
    IoInformationCircle,
} from 'react-icons/io5';
import { useAuth } from '../context/authContext';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const navMenuList = [
    {
        name: 'Home',
        linkTo: '/',
        icon: <IoHomeSharp />,
        // auth: false,
    },
    {
        name: 'About',
        linkTo: '/about',
        icon: <IoInformationCircle />,
        // auth: false,
    },
    // {
    //     name: 'Profile',
    //     linkTo: '/profile',
    //     icon: <IoPersonCircleSharp />,
    //     auth: true,
    // },
    // {
    //     name: 'Login',
    //     linkTo: '/login',
    //     icon: <IoLogIn />,
    // },
];

const hamburgerMenuStyle =
    'w-6 rounded-lg tertiary-color mb-1 transform transition-transform duration-300 hover:tertiary-color';
const hamburgerMenuStyleHeight = { height: '0.2rem' };

const Navbar = () => {
    const [currentRoute, setCurrentRoute] = useState('/');
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useAuth();
    const { userLoggedIn } = useSelector((state: RootState) => state.auth);

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

    const handleLogout = () => {
        const onSuccessCallback = (res: any) => {
            navigate('/login');
        };

        const onErrorCallback = (res: any) => {
            console.error(res);
        };
        logout(onSuccessCallback, onErrorCallback);
    };

    const handleUserStatus = () => {
        if (userLoggedIn) {
            handleLogout();
        } else {
            navigate('/login');
        }
        setIsOpen(false);
    };

    return (
        <div className="flex justify-between py-5 px-3 bg-component-color text-color border-b-2 border-teal-800 items-center">
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
                    <div className="font-bold text-active-color ml-1 text-2xl">
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
                {userLoggedIn && (
                    <li
                        key={'nav-menu-profile'}
                        className={`flex items-center font-bold hover:text-active-color ${
                            currentRoute === '/profile'
                                ? 'font-bold text-active-color'
                                : ''
                        }`}
                    >
                        <span className="mr-2 text-xl">
                            <IoPersonCircleSharp />
                        </span>
                        <Link to={'/profile'}>{'Profile'}</Link>
                    </li>
                )}

                <li
                    key={'nav-menu-auth'}
                    className={`flex items-center font-bold hover:text-active-color ${
                        currentRoute === '/login'
                            ? 'font-bold text-active-color'
                            : ''
                    }`}
                >
                    <span className="mr-2 text-xl">{<IoLogIn />}</span>
                    <button onClick={handleUserStatus}>
                        {userLoggedIn ? 'Logout' : 'Login'}
                    </button>
                </li>
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
                        </a>
                    );
                })}
                {userLoggedIn && (
                    <a
                        key={'nav-menu-auth-mobile'}
                        className="w-full block py-7 px-3 transition hover:bg-white/5 cursor-pointer"
                        onClick={handleUserStatus}
                    >
                        <p
                            className={`font-semibold  flex items-center ${currentRoute === '/profile' ? 'text-active-color' : 'text-color'}`}
                        >
                            <span className="mr-2 text-xl">
                                <IoPersonCircleSharp />
                            </span>
                            {'Profile'}
                        </p>
                    </a>
                )}

                <a
                    key={'nav-menu-auth-mobile'}
                    className="w-full block py-7 px-3 transition hover:bg-white/5 cursor-pointer"
                    onClick={handleUserStatus}
                >
                    <p
                        className={`font-semibold  flex items-center ${currentRoute === '/login' ? 'text-active-color' : 'text-color'}`}
                    >
                        <span className="mr-2 text-xl">
                            <IoLogIn />
                        </span>
                        {userLoggedIn ? 'Logout' : 'Login'}
                    </p>
                </a>
                {/* <li
                    key={'nav-menu-auth'}
                    className={`flex items-center font-bold hover:text-active-color ${
                        currentRoute === '/login'
                            ? 'font-bold text-active-color'
                            : ''
                    }`}
                >
                    <span className="mr-2 text-xl">{<IoLogIn />}</span>
                    <button onClick={handleUserStatus}>
                        {userLoggedIn ? 'Logout' : 'Login'}
                    </button>
                </li> */}
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
