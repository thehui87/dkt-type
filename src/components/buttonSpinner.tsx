import React, { useState, useEffect } from 'react';
import Spinner from './loaders/spinner';
import { getContrast } from '../utils/config';

interface ButtonSpinnerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode; // Include children
    // variant?: 'primary' | 'secondary'; // Custom attribute
    showSpinner?: boolean; // Another custom attribute
}

const ButtonSpinner = React.forwardRef<HTMLButtonElement, ButtonSpinnerProps>(
    ({ children, showSpinner, ...rest }, ref) => {
        const [hover, setHover] = useState<boolean>(false);

        var style = getComputedStyle(document.documentElement);
        var contrastValue = getContrast(
            style.getPropertyValue('--tertiary-color')
        );
        // useEffect(() => {}, [contrastValue]);

        return (
            <button
                // type="submit"
                className={`flex justify-center items-center w-full tertiary-color py-2 rounded-md transition duration-300 ${hover ? 'buttonHover' : ''}`}
                {...rest}
                onMouseEnter={() => setHover(true)}
                onMouseOut={() => setHover(false)}
                disabled={showSpinner}
            >
                <div
                    className="relative w-fit"
                    style={{
                        color: contrastValue === 'black' ? '#000' : '#fff',
                    }}
                >
                    {children}
                    <Spinner show={showSpinner} />
                </div>
            </button>
        );
    }
);

export default ButtonSpinner;
