import { RefObject } from 'react';
import { CaretPos } from '../constants/interfaceItems';
import {
    setStats,
    // resetStats,
    TypingStatsState,
} from '../redux/typingstats/typingstats.slice';
// import { useSelector } from 'react-redux';
import { TimerHandle } from '../components/timer';
import { RootState } from '../redux/store';

interface CaretPositionPropState {
    outerTextContainerRef: RefObject<HTMLDivElement | null>;
    innerTextContainertRef: RefObject<HTMLDivElement | null>;
    activeWordHTML: Element | null;
    inputValue: string;
}

export const newCaretPosition = ({
    outerTextContainerRef,
    innerTextContainertRef,
    activeWordHTML,
    inputValue,
}: CaretPositionPropState): CaretPos => {
    if (
        outerTextContainerRef?.current &&
        innerTextContainertRef?.current &&
        activeWordHTML?.classList.contains('active') &&
        !activeWordHTML?.classList.contains('typed')
    ) {
        // get outer container bounding rect
        let outerTextContainerBoundingRect =
            outerTextContainerRef.current.getBoundingClientRect() as DOMRect;
        // get inner container bounding rect
        let innerTextContainerBoundingRect =
            innerTextContainertRef?.current.getBoundingClientRect() as DOMRect;
        // get active word container bounding rect
        let activeWordBoundingRect: DOMRect =
            activeWordHTML?.getBoundingClientRect() as DOMRect;

        let relativePosActiveWord: number = 0;
        let parentContainerDif = 0;

        relativePosActiveWord = Math.round(
            activeWordBoundingRect?.top - outerTextContainerBoundingRect?.top
        );
        parentContainerDif = Math.round(
            innerTextContainerBoundingRect?.top -
                outerTextContainerBoundingRect?.top
        );

        if (relativePosActiveWord < 0) {
            let offsetPos = relativePosActiveWord - parentContainerDif - 12;
            innerTextContainertRef.current.style.top = `${-offsetPos}px`;
        }
        if (relativePosActiveWord > 76) {
            let offsetPos = relativePosActiveWord - parentContainerDif - 68;
            innerTextContainertRef.current.style.top = `${-offsetPos}px`;
        }

        return {
            x:
                activeWordBoundingRect?.left -
                outerTextContainerBoundingRect.left +
                inputValue.trim().length * 20 +
                7,
            y: Math.abs(relativePosActiveWord) < 30 ? 20 : 76,
        };
        //  Math.round(boundingRect?.top - boundingRectTop?.top),
    }
    return {
        x: 0,
        y: 0,
    };
};

interface TypingState {
    wordArray: Array<string>;
    typedArray: Array<string>;
    timerRef: RefObject<TimerHandle | null>;
    incorrectCounter: number;
    clock: boolean;
    toggleTimerValue: number;
}

export const getTypingStats = ({
    wordArray,
    typedArray,
    timerRef,
    incorrectCounter,
    clock,
    toggleTimerValue,
}: TypingState) => {
    let correctCharacters: number =
        document.querySelectorAll('.letter.correct').length;
    let incorrectCharacters: number =
        document.querySelectorAll('.letter.incorrect').length;
    let totalWords: number = wordArray.length;
    let correctWords: number = document.querySelectorAll(
        'div.word.typed:not(.error)'
    ).length;
    let missedCharacters: number = document.querySelectorAll(
        'span.letter:not(.correct):not(.incorrect)'
    ).length;
    let extraCharacters: number = 0;
    for (let i = 0; i < wordArray.length; i++) {
        if (wordArray[i]?.length < typedArray[i]?.length) {
            extraCharacters += typedArray[i].length - wordArray[i].length;
        }
    }
    let timeValue = clock ? timerRef?.current?.mindecimal() : toggleTimerValue;
    console.log('time', timerRef.current?.mindecimal());
    // dispatch(
    return {
        correctCharacters: correctCharacters,
        incorrectCharacters: incorrectCharacters,
        extraCharacters: extraCharacters,
        missedCharacters: missedCharacters,
        correctWords: correctWords,
        totalWords: totalWords,
        wrongKeystrokes: incorrectCounter,
        time: timeValue,
    } as TypingStatsState;
    // );
};

// const letterValuation = ({inputValue, oldInputValue, activeWord, letterArray, activeWordHTML, incorrectLetterArray}) => {
//     // console.log({ activeWord });
//     let lastLetterWordIndex = inputValue.trim().length - 1;
//     if (
//         oldInputValue.trim().length < inputValue.trim().length &&
//         activeWord
//     ) {
//         if (lastLetterWordIndex >= 0) {
//             if (
//                 activeWord[lastLetterWordIndex] ===
//                 inputValue.trim()[lastLetterWordIndex]
//             ) {
//                 letterArray[lastLetterWordIndex].classList.add(
//                     'correct'
//                 );
//             } else {
//                 // if inputValue.length > activeWord.length then add dynamic span with class "incorrect extra"
//                 if (inputValue.trim().length > activeWord.length) {
//                     let extraSpanTag = document.createElement('span');
//                     extraSpanTag.className = 'incorrect extra';
//                     extraSpanTag.innerHTML =
//                         inputValue.trim()[lastLetterWordIndex];
//                     activeWordHTML?.appendChild(extraSpanTag);
//                 } else {
//                     // incorrect letter typed
//                     letterArray[lastLetterWordIndex].classList.add(
//                         'incorrect'
//                     );
//                     incorrectLetterArray[
//                         lastLetterWordIndex
//                     ].innerHTML =
//                         inputValue.trim()[lastLetterWordIndex];
//                 }
//                 setIncorrectCounter(incorrectCounter + 1);
//             }
//         }
//     } else {
//         if (inputValue?.trim()?.length >= activeWord?.length) {
//             //  delete incorrect extra
//             if (activeWordHTML && activeWordHTML?.lastElementChild) {
//                 activeWordHTML.removeChild(
//                     activeWordHTML.lastElementChild
//                 );
//             }
//         } else {
//             // delete incorrect letter
//             if (letterArray[lastLetterWordIndex + 1] && !space) {
//                 letterArray[lastLetterWordIndex + 1].classList.remove(
//                     ...letterArray[lastLetterWordIndex + 1].classList
//                 );
//                 letterArray[lastLetterWordIndex + 1].classList.add(
//                     'letter'
//                 );
//                 incorrectLetterArray[
//                     lastLetterWordIndex + 1
//                 ].innerHTML = '';
//             }
//         }
//     }
// };
