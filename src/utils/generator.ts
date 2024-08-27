import { QUOTES } from '../constants/quotes';
import { WORDS } from '../constants/words';
import { PUNCTUATIONS } from '../constants/punctuations';

const getRandomNumber = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min) + min);
};

export const quoteGenerator = () => {
    return QUOTES[getRandomNumber(0, QUOTES.length - 1)];
};

const wordGenerator = () => {
    return WORDS[getRandomNumber(0, WORDS.length - 1)];
};

export const wordListGenerator = (value: number) => {
    let wordList: Array<string> = [];

    for (let i = 0; i < value; i++) {
        wordList.push(wordGenerator());
    }
    return wordList;
};

export const punctuationGenerator = () => {
    return WORDS[getRandomNumber(0, PUNCTUATIONS.length - 1)];
};
