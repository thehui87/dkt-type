import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import {
    setPunctuationToggle,
    setNumberToggle,
    setMenuToggle,
    setTimerValueToggle,
    setTextLengthValueToggle,
    setQuoteLengthValueToggle,
    setToggleModal,
    setToggleShowIncorrectWord,
    setToggleShowIncorrectCounter,
} from '../redux/toolbar/toolbar.slice';
import {
    menuList,
    timeList,
    textLengthList,
    quoteList,
} from '../constants/menuListItems';
import { IoClose } from 'react-icons/io5';
import { SliderButton } from './sliderButton';
import Tooltip from './Tooltip';
import { ReactComponent as WrongKeyIcon } from '../assets/wrongKey.svg';

const menuStyle = 'cursor-pointer mx-2 leading-10';
const activeMenuStyle = 'text-active-color underline underline-offset-8';
const hoverMenuStyle =
    'hover:text-color hover:underline hover:underline-offset-8';

const ConfigToolbar = () => {
    const {
        punctuationBool,
        numberBool,
        toggleMenuValue,
        toggleTimerValue,
        toggleTexLengthValue,
        toggleQuoteLengthValue,
        showLeftTabs,
        openModal,
        showIncorrectWord,
        showIncorrectCounter,
    } = useSelector((state: RootState) => state.toolbar);
    const dispatch = useDispatch();

    const setLeftTab = (value: string) => {
        switch (value) {
            case 'punctuation':
                dispatch(setPunctuationToggle(!punctuationBool));
                break;
            case 'number':
                dispatch(setNumberToggle(!numberBool));
                break;
            default:
                dispatch(setPunctuationToggle(false));
                dispatch(setNumberToggle(false));
                break;
        }
    };

    const setMenu = (value: string) => {
        dispatch(setMenuToggle(value));
    };

    const setTime = (value: number) => {
        dispatch(setTimerValueToggle(value));
    };

    const setTextLength = (value: number) => {
        dispatch(setTextLengthValueToggle(value));
    };

    const setQuoteLength = (value: string) => {
        dispatch(setQuoteLengthValueToggle(value));
    };

    return (
        <div>
            <div
                className={`${openModal ? 'flex' : 'hidden'} lg:hidden fixed inset-0 bg-gray-800 bg-opacity-50  justify-center items-center z-10 ${openModal ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            ></div>
            {/* <div
                className={`w-full h-full flex justify-center items-center absolute top-0 left-0`}
            > */}
            <ul
                className={`${openModal ? 'block absolute top-30  m-auto left-0 right-0 max-height-auto' : 'hidden'} lg:relative lg:flex flex-col sm:flex-row bg-component-color justify-evenly items-center rounded-md text-color p-3 pt-10 lg:pt-3 transition-all ease-in-out duration-300 mb-5 z-20 w-96 lg:w-auto`}
            >
                {openModal && (
                    <div
                        onClick={() => dispatch(setToggleModal())}
                        className={`lg:hidden absolute top-4 right-4 text-red-500 font-bold cursor-pointer`}
                    >
                        <IoClose className="text-2xl" />
                    </div>
                )}
                {/* toolbar left tab */}
                {showLeftTabs && (
                    <li
                        className={`${menuStyle} ${hoverMenuStyle} ${punctuationBool ? activeMenuStyle : ''}`}
                        onClick={() => setLeftTab('punctuation')}
                    >
                        punctutation
                    </li>
                )}
                {showLeftTabs && (
                    <li
                        className={`${menuStyle} ${hoverMenuStyle} ${numberBool ? activeMenuStyle : ''}`}
                        onClick={() => setLeftTab('number')}
                    >
                        number
                    </li>
                )}
                {/* toolbar separator */}
                {showLeftTabs && (
                    <li className="w-full flex justify-center py-4 lg:py-0">
                        <span className="foreground-color w-5 lg:w-1 h-1 lg:h-5 flex justify-center rounded-sm"></span>
                    </li>
                )}
                {/* toolbar main menu */}
                {menuList.map((menuItem, index) => {
                    return (
                        <li
                            key={`menu-item-${menuItem.value}-${index}`}
                            className={`${menuItem?.disabled ? 'disabled' : ''} ${menuStyle} ${hoverMenuStyle} ${toggleMenuValue === menuItem.value ? activeMenuStyle : ''}`}
                            onClick={() => setMenu(menuItem.value)}
                        >
                            {menuItem.name}
                        </li>
                    );
                })}
                {/* toolbar separator */}
                {toggleMenuValue !== 'zen' && (
                    <li className="w-full flex justify-center py-4 lg:py-0">
                        <span className="foreground-color w-5 lg:w-1 h-1 lg:h-5 flex justify-center rounded-sm"></span>
                    </li>
                )}
                {/* toolbar right tab */}
                {toggleMenuValue === 'time' && (
                    <ul className="flex flex-col lg:flex-row justify-evenly ">
                        {timeList.map((item, index) => {
                            return (
                                <li
                                    key={`time-value-${index}`}
                                    className={`${menuStyle} ${hoverMenuStyle} ${toggleTimerValue === item.value ? activeMenuStyle : ''}`}
                                    onClick={() => setTime(item.value)}
                                >
                                    {item.name}
                                </li>
                            );
                        })}
                    </ul>
                )}
                {toggleMenuValue === 'word' && (
                    <ul className="flex flex-col lg:flex-row justify-evenly ">
                        {textLengthList.map((textItem, index) => {
                            return (
                                <li
                                    key={`time-value-${index}`}
                                    className={`${menuStyle} ${hoverMenuStyle} ${toggleTexLengthValue === textItem.value ? activeMenuStyle : ''}`}
                                    onClick={() =>
                                        setTextLength(textItem.value)
                                    }
                                >
                                    {textItem.name}
                                </li>
                            );
                        })}
                    </ul>
                )}
                {toggleMenuValue === 'quote' && (
                    <ul className="flex flex-col lg:flex-row justify-evenly ">
                        {quoteList.map((quoteItem, index) => {
                            return (
                                <li
                                    key={`time-value-${index}`}
                                    className={`${menuStyle} ${hoverMenuStyle} ${toggleQuoteLengthValue === quoteItem.value ? activeMenuStyle : ''}`}
                                    onClick={() =>
                                        setQuoteLength(quoteItem.value)
                                    }
                                >
                                    {quoteItem.name}
                                </li>
                            );
                        })}
                    </ul>
                )}
                {toggleMenuValue === 'custom' && (
                    <ul className="flex flex-row justify-evenly ">
                        <li className={`${menuStyle} ${hoverMenuStyle} `}>
                            change
                        </li>
                    </ul>
                )}
            </ul>
            <div className={'flex mb-8 justify-between'}>
                <div className={'flex mb-8'}>
                    <Tooltip
                        message="show incorrect letters"
                        position={'bottom'}
                    >
                        <SliderButton
                            checkedStatus={showIncorrectWord}
                            changeFunction={setToggleShowIncorrectWord}
                            children={
                                <div className="word-demo text-2xl flex justify-center items-center">
                                    <div
                                        className={`incorrect-word-demo ${showIncorrectWord ? 'error-color' : 'text-color'}`}
                                    >
                                        s
                                    </div>
                                    <span className="letter-demo incorrect-demo">
                                        A
                                    </span>
                                </div>
                            }
                        />
                    </Tooltip>
                    <Tooltip
                        message="show incorrect counter"
                        position={'bottom'}
                    >
                        <SliderButton
                            checkedStatus={showIncorrectCounter}
                            changeFunction={setToggleShowIncorrectCounter}
                            children={
                                <div className="flex text-2xl incorrect-color">
                                    <WrongKeyIcon
                                        className={`ml-2 ${showIncorrectCounter ? 'error-color' : 'text-color'}`}
                                    />
                                </div>
                            }
                        />
                    </Tooltip>
                </div>
                {/* <button
                    id="dropdownHoverButton"
                    data-dropdown-toggle="dropdownHover1"
                    data-dropdown-trigger="hover"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                >
                    Dropdown hover{' '}
                    <svg
                        className="w-2.5 h-2.5 ms-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </button>

                <div
                    id="dropdownHover"
                    className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                    <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownHoverButton"
                    >
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Settings
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Earnings
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Sign out
                            </a>
                        </li>
                    </ul>
                </div> */}
            </div>
            {/* </div> */}
            <button
                className="block lg:hidden"
                onClick={() => dispatch(setToggleModal())}
            >
                Modal
            </button>
        </div>
    );
};

export default ConfigToolbar;
