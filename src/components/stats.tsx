import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Tooltip from './Tooltip';

const statsStyle = 'mr-4 underline underline-offset-4';

const TypingStats = () => {
    const {
        accuracy,
        correctCharacters,
        incorrectCharacters,
        extraCharacters,
        missedCharacters,
        correctWords,
        totalWords,
        wrongKeystrokes,
        wpm,
    } = useSelector((state: RootState) => state.typingstats);

    return (
        <div className="flex flex-row bg-teal-800 justify-evenly items-center rounded-md text-teal-500 p-3 my-5 ">
            {/* wordper minutes */}

            <Tooltip message="Words per minute" position="top">
                <div className={`${statsStyle}`}>WPM: {wpm} </div>
            </Tooltip>
            <div className={`${statsStyle}`}>
                Accuracy: {accuracy > 0 ? `${accuracy}%` : 'Too many errors!'}
            </div>
            <Tooltip message="Correct words/Total words" position="top">
                <div className={`${statsStyle}`}>
                    Words: {correctWords}/{totalWords}
                </div>
            </Tooltip>
            <Tooltip message="Correct/incorrect/extra/missed" position="top">
                <div className={`${statsStyle}`}>
                    Characters: {correctCharacters}/{incorrectCharacters}/
                    {extraCharacters}/{missedCharacters}
                </div>
            </Tooltip>
            <div className={`${statsStyle}`}>Wrong Key: {wrongKeystrokes}</div>
        </div>
    );
};

export default TypingStats;
