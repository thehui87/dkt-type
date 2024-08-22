import React, {
    useState,
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
} from 'react';

// Define the type for the ref methods
export interface TimerHandle {
    start: () => void;
    stop: () => void;
    reset: () => void;
}

// interface
// Timer component with start, stop, and reset functionality
const Timer = forwardRef<TimerHandle>((props, ref) => {
    const [startTime, setStartTime] = useState<number>(0);
    const [endTime, setEndTime] = useState<number>(0);

    // const [seconds, setSeconds] = useState<number>(0);
    const intervalId = useRef<NodeJS.Timeout | null>(null);

    // Start the timer
    const startTimer = () => {
        if (intervalId.current === null) {
            setStartTime(new Date().getTime());
            intervalId.current = setInterval(() => {
                // setSeconds((prevSeconds) => prevSeconds + 1);
                setEndTime(new Date().getTime());
            }, 100);
        }
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
        setEndTime(0);
        setStartTime(0);
    };

    // Cleanup the interval on unmount
    useEffect(() => {
        return () => {
            stopTimer();
        };
    }, []);

    const getTime = (endTime: number, startTime: number) => {
        var seconds = (endTime - startTime) / 1000;
        var minutes = 0;
        if (seconds >= 60) {
            minutes = Math.floor(seconds / 60);
            seconds = seconds % 60;
        }

        return `${String(minutes).padStart(2, '0')}:${String(seconds.toFixed(0)).padStart(2, '0')} seconds`;
    };

    // Expose start, stop, and reset functions to the parent component
    useImperativeHandle(ref, () => ({
        start: startTimer,
        stop: stopTimer,
        reset: resetTimer,
    }));

    return <div>{getTime(endTime, startTime)}</div>;
});

export default Timer;
