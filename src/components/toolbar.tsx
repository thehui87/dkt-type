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
} from '../redux/toolbar/toolbar.slice';
import {
    menuList,
    timeList,
    textLengthList,
    quoteList,
} from '../constants/menuListItems';
import { IoClose } from 'react-icons/io5';

const menuStyle = 'cursor-pointer mx-2 leading-10';
const activeMenuStyle = 'text-teal-200 underline underline-offset-8';
const hoverMenuStyle =
    'hover:text-teal-500 hover:underline hover:underline-offset-8';

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
                className={`${openModal ? 'block absolute top-30  m-auto left-0 right-0 max-height-auto' : 'hidden'} lg:relative lg:flex flex-col sm:flex-row bg-teal-800 justify-evenly items-center rounded-md text-teal-500 p-3 pt-10 lg:pt-3 transition-all ease-in-out duration-300 mb-5 z-20 w-96 lg:w-auto`}
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
                        <span className="bg-teal-950 w-5 lg:w-1 h-1 lg:h-5 flex justify-center rounded-sm"></span>
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
                        <span className="bg-teal-950 w-5 lg:w-1 h-1 lg:h-5 flex justify-center rounded-sm"></span>
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
