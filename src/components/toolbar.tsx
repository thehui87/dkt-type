import { useState } from 'react';

const menuStyle = 'cursor-pointer mx-2';
const activeMenuStyle = 'text-teal-200 underline underline-offset-8';
const hoverMenuStyle =
    'hover:text-teal-500 hover:underline hover:underline-offset-8';

interface MenuListItem {
    name: string;
    value: string;
}

const timeList: MenuListItem[] = [
    { name: '15', value: '15' },
    { name: '30', value: '30' },
    { name: '60', value: '60' },
    { name: '120', value: '120' },
    { name: 'custom', value: 'custom' },
];

const textLengthList: MenuListItem[] = [
    { name: '50', value: '50' },
    { name: '100', value: '100' },
    { name: '250', value: '250' },
    { name: '500', value: '500' },
    { name: 'custom', value: 'custom' },
];

const quoteList: MenuListItem[] = [
    { name: 'all', value: 'all' },
    { name: 'short', value: 'short' },
    { name: 'medium', value: 'medium' },
    { name: 'long', value: 'long' },
    { name: 'thicc', value: 'thicc' },
];

const ConfigToolbar = () => {
    const [isPuntuation, setIsPuntuation] = useState<boolean>(false);
    const [isNumber, setIsNumber] = useState<boolean>(false);
    const [toggleMenuSelections, setToggleMenuSelections] =
        useState<string>('time');
    const [showLeftTabs, setShowLeftTabs] = useState<boolean>(true);
    const [timerValue, setTimerValue] = useState<string>('30');
    const [textLengthValue, setTextLengthValue] = useState<string>('50');
    const [quoteLengthValue, setQuoteLengthValue] = useState<string>('all');

    const setMenu = (value: string) => {
        switch (value) {
            case 'punctuation':
                setIsPuntuation(!isPuntuation);
                break;
            case 'number':
                setIsNumber(!isNumber);
                break;
            case 'time':
                setToggleMenuSelections('time');
                setShowLeftTabs(true);
                break;
            case 'word':
                setToggleMenuSelections('word');
                setShowLeftTabs(true);
                break;
            case 'quote':
                setToggleMenuSelections('quote');
                setShowLeftTabs(false);
                break;
            case 'zen':
                setToggleMenuSelections('zen');
                setShowLeftTabs(false);
                break;
            case 'custom':
                setToggleMenuSelections('custom');
                setShowLeftTabs(true);
                break;
            default:
                setToggleMenuSelections('time');
                setShowLeftTabs(true);
                break;
        }
    };

    const setTime = (value: string) => {
        switch (value) {
            case '15':
                setTimerValue('15');
                break;
            case '30':
                setTimerValue('30');
                break;
            case '60':
                setTimerValue('60');
                break;
            case '120':
                setTimerValue('120');
                break;
            case 'custom':
                setTimerValue('custom');
                break;
            default:
                setTimerValue('30');
                break;
        }
    };

    const setTextLength = (value: string) => {
        switch (value) {
            case '50':
                setTextLengthValue('50');
                break;
            case '100':
                setTextLengthValue('100');
                break;
            case '250':
                setTextLengthValue('250');
                break;
            case '500':
                setTextLengthValue('500');
                break;
            case 'custom':
                setTextLengthValue('custom');
                break;
            default:
                setTextLengthValue('50');
                break;
        }
    };
    const setQuoteLength = (value: string) => {
        switch (value) {
            case 'all':
                setQuoteLengthValue('all');
                break;
            case 'short':
                setQuoteLengthValue('short');
                break;
            case 'medium':
                setQuoteLengthValue('medium');
                break;
            case 'long':
                setQuoteLengthValue('long');
                break;
            case 'thicc':
                setQuoteLengthValue('thicc');
                break;
            default:
                setQuoteLengthValue('all');
                break;
        }
    };
    return (
        <ul className="bg-teal-800 flex flex-row justify-evenly items-center rounded-md text-teal-500 p-3 duration-300 mb-5">
            {showLeftTabs && (
                <li
                    className={`${menuStyle} ${hoverMenuStyle} ${isPuntuation ? activeMenuStyle : ''}`}
                    onClick={() => setMenu('punctuation')}
                >
                    punctutation
                </li>
            )}
            {showLeftTabs && (
                <li
                    className={`${menuStyle} ${hoverMenuStyle} ${isNumber ? activeMenuStyle : ''}`}
                    onClick={() => setMenu('number')}
                >
                    number
                </li>
            )}
            {showLeftTabs && (
                <li className="w-1 bg-teal-950 h-5 flex justify-center rounded-sm"></li>
            )}
            <li
                className={`${menuStyle} ${hoverMenuStyle} ${toggleMenuSelections === 'time' ? activeMenuStyle : ''}`}
                onClick={() => setMenu('time')}
            >
                time
            </li>
            <li
                className={`${menuStyle} ${hoverMenuStyle} ${toggleMenuSelections === 'word' ? activeMenuStyle : ''}`}
                onClick={() => setMenu('word')}
            >
                word
            </li>
            <li
                className={`${menuStyle} ${hoverMenuStyle} ${toggleMenuSelections === 'quote' ? activeMenuStyle : ''}`}
                onClick={() => setMenu('quote')}
            >
                quote
            </li>
            <li
                className={`${menuStyle} ${hoverMenuStyle} ${toggleMenuSelections === 'zen' ? activeMenuStyle : ''}`}
                onClick={() => setMenu('zen')}
            >
                zen
            </li>
            <li
                className={`${menuStyle} ${hoverMenuStyle} ${toggleMenuSelections === 'custom' ? activeMenuStyle : ''}`}
                onClick={() => setMenu('custom')}
            >
                custom
            </li>
            {toggleMenuSelections !== 'zen' && (
                <li className="w-1 bg-teal-950 h-5 flex justify-center rounded-sm"></li>
            )}
            {toggleMenuSelections === 'time' && (
                <ul className="flex flex-row justify-evenly ">
                    {timeList.map((item, index) => {
                        return (
                            <li
                                key={`time-value-${index}`}
                                className={`${menuStyle} ${hoverMenuStyle} ${timerValue === item.value ? activeMenuStyle : ''}`}
                                onClick={() => setTime(item.value)}
                            >
                                {item.name}
                            </li>
                        );
                    })}
                </ul>
            )}
            {toggleMenuSelections === 'word' && (
                <ul className="flex flex-row justify-evenly ">
                    {textLengthList.map((textItem, index) => {
                        return (
                            <li
                                key={`time-value-${index}`}
                                className={`${menuStyle} ${hoverMenuStyle} ${textLengthValue === textItem.value ? activeMenuStyle : ''}`}
                                onClick={() => setTextLength(textItem.value)}
                            >
                                {textItem.name}
                            </li>
                        );
                    })}
                </ul>
            )}
            {toggleMenuSelections === 'quote' && (
                <ul className="flex flex-row justify-evenly ">
                    {quoteList.map((quoteItem, index) => {
                        return (
                            <li
                                key={`time-value-${index}`}
                                className={`${menuStyle} ${hoverMenuStyle} ${quoteLengthValue === quoteItem.value ? activeMenuStyle : ''}`}
                                onClick={() => setQuoteLength(quoteItem.value)}
                            >
                                {quoteItem.name}
                            </li>
                        );
                    })}
                </ul>
            )}
            {toggleMenuSelections === 'custom' && (
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
