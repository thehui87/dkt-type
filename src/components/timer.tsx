import React, {
    useState,
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// Define the type for the ref methods
export interface TimerHandle {
    start: () => void;
    stop: () => void;
    reset: () => void;
    mindecimal: () => number;
    rawTime: () => number;
    timerRunning: boolean;
}

// interface
// Timer component with start, stop, and reset functionality
const Timer = forwardRef<TimerHandle>((props, ref) => {
    const [startTime, setStartTime] = useState<number>(0);
    const [endTime, setEndTime] = useState<number>(0);
    const { clock, toggleTimerValue } = useSelector(
        (state: RootState) => state.toolbar
    );
    const [timerOn, setTimerOn] = useState<boolean>(false);

    // const [seconds, setSeconds] = useState<number>(0);
    const intervalId = useRef<NodeJS.Timeout | null>(null);

    // Start the timer
    const startTimer = () => {
        if (intervalId.current !== null) return;

        // timerRef.current = window.setInterval(() => {
        //     setSeconds(prev => prev + 1);
        //   }, 1000);
        // setStartTime(new Date().getTime());
        // setStartTime(startTime);
        intervalId.current = setInterval(() => {
            // setSeconds((prevSeconds) => prevSeconds + 1);
            setStartTime((oldtime) => oldtime + 100);
        }, 100);
    };

    //   intervalId.current = window.setInterval(() => {
    //     setEndTime(new Date().getTime());
    // }, 100); // increments count every 1 second
    // }

    // Stop the timer
    const stopTimer = () => {
        if (intervalId.current !== null) {
            clearInterval(intervalId.current);
            intervalId.current = null;
        }
    };

    // Reset the timer
    const resetTimer = () => {
        stopTimer();
        // setSeconds(0);
        // setEndTime(0);
        setStartTime(0);
    };

    // Cleanup the interval on unmount
    useEffect(() => {
        if (clock) {
            setTimerOn(false);
        } else {
            setTimerOn(true);
        }
        return () => {
            stopTimer();
        };
    }, []);

    const formatTime = (time: number) => {
        return String(time.toFixed(0)).padStart(2, '0');
    };
    const getTime = (endTime: number, startTime: number) => {
        // let seconds = (endTime - startTime) / 1000;

        let timeValue = clock ? startTime : toggleTimerValue - startTime;
        if (!clock && timeValue <= 0) {
            setTimerOn(false); // set notification of timer status
            stopTimer(); // stop the clock
        }

        let seconds = Math.floor((timeValue / 1000) % 60);
        let minutes = Math.floor((timeValue / (1000 * 60)) % 60);
        let hours = Math.floor((timeValue / (1000 * 60 * 60)) % 24);

        let displayType: string = '00';
        // if (clock) {
        displayType = hours > 0 ? `${formatTime(hours)}:` : '';
        displayType += minutes > 0 ? `${formatTime(minutes)}:` : '';
        displayType += `${formatTime(seconds)}`;
        // } else {
        //     // timer
        //     let secondsRemaining = toggleTimerValue - startTime;

        //     if (secondsRemaining >= 60) {
        //         minutes = Math.floor(secondsRemaining / 60);
        //         secondsRemaining = secondsRemaining % 60;
        //     }
        //     displayType = `${String(minutes).padStart(2, '0')}:${String(secondsRemaining.toFixed(0)).padStart(2, '0')} seconds`;
        //     if (secondsRemaining <= 0) {
        //         setTimerOn(false); // set notification of timer status
        //         stopTimer(); // stop the clock
        //         displayType = `00:00 seconds`;
        //     }
        // }
        return displayType;
    };

    const minuteDecimal = () => {
        return Math.round(startTime) / (1000 * 60);
    };
    const getRawTime = () => {
        return startTime;
    };
    // Expose start, stop, and reset functions to the parent component
    useImperativeHandle(ref, () => ({
        start: startTimer,
        stop: stopTimer,
        reset: resetTimer,
        mindecimal: minuteDecimal,
        rawTime: getRawTime,
        timerRunning: timerOn,
    }));

    return <div>{getTime(endTime, startTime)}</div>;
});

export default Timer;
