import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import {
    setPunctuationToggle,
    setNumberToggle,
    setMenuToggle,
    setTimerValueToggle,
    setTextLengthValueToggle,
    setQuoteLengthValueToggle,
    setShowLeftTabs,
} from '../redux/toolbar/toolbar.slice';
import {
    menuList,
    timeList,
    textLengthList,
    quoteList,
} from '../constants/menuListItems';

const menuStyle = 'cursor-pointer mx-2';
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
                dispatch(setPunctuationToggle(false));
                break;
        }
    };

    const setMenu = (value: string) => {
        dispatch(setMenuToggle(value));

        switch (value) {
            case 'time':
                dispatch(setShowLeftTabs(true));
                break;
            case 'word':
                dispatch(setShowLeftTabs(true));
                break;
            case 'quote':
                dispatch(setShowLeftTabs(false));
                break;
            case 'zen':
                dispatch(setShowLeftTabs(false));
                break;
            case 'custom':
                dispatch(setShowLeftTabs(true));
                break;
            default:
                dispatch(setShowLeftTabs(true));
                break;
        }
    };

    const setTime = (value: string) => {
        dispatch(setTimerValueToggle(value));
    };

    const setTextLength = (value: string) => {
        dispatch(setTextLengthValueToggle(value));
    };

    const setQuoteLength = (value: string) => {
        dispatch(setQuoteLengthValueToggle(value));
    };

    return (
        <ul className="bg-teal-800 flex flex-row justify-evenly items-center rounded-md text-teal-500 p-3 transition-all ease-in-out duration-300 mb-5">
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
                <li className="w-1 bg-teal-950 h-5 flex justify-center rounded-sm"></li>
            )}
            {/* toolbar main menu */}
            {menuList.map((menuItem, index) => {
                return (
                    <li
                        key={`menu-item-${menuItem.value}`}
                        className={`${menuStyle} ${hoverMenuStyle} ${toggleMenuValue === menuItem.value ? activeMenuStyle : ''}`}
                        onClick={() => setMenu(menuItem.value)}
                    >
                        {menuItem.name}
                    </li>
                );
            })}
            {/* toolbar separator */}
            {toggleMenuValue !== 'zen' && (
                <li className="w-1 bg-teal-950 h-5 flex justify-center rounded-sm"></li>
            )}
            {/* toolbar right tab */}
            {toggleMenuValue === 'time' && (
                <ul className="flex flex-row justify-evenly ">
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
                <ul className="flex flex-row justify-evenly ">
                    {textLengthList.map((textItem, index) => {
                        return (
                            <li
                                key={`time-value-${index}`}
                                className={`${menuStyle} ${hoverMenuStyle} ${toggleTexLengthValue === textItem.value ? activeMenuStyle : ''}`}
                                onClick={() => setTextLength(textItem.value)}
                            >
                                {textItem.name}
                            </li>
                        );
                    })}
                </ul>
            )}
            {toggleMenuValue === 'quote' && (
                <ul className="flex flex-row justify-evenly ">
                    {quoteList.map((quoteItem, index) => {
                        return (
                            <li
                                key={`time-value-${index}`}
                                className={`${menuStyle} ${hoverMenuStyle} ${toggleQuoteLengthValue === quoteItem.value ? activeMenuStyle : ''}`}
                                onClick={() => setQuoteLength(quoteItem.value)}
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
    );
};

export default ConfigToolbar;
