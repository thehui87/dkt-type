import React, { useState } from 'react';
import Spinner from './loaders/spinner';

interface ButtonSpinnerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode; // Include children
    // variant?: 'primary' | 'secondary'; // Custom attribute
    showSpinner?: boolean; // Another custom attribute
}

const ButtonSpinner = React.forwardRef<HTMLButtonElement, ButtonSpinnerProps>(
    ({ children, showSpinner, ...rest }, ref) => {
        const [hover, setHover] = useState<boolean>(false);
        return (
            <button
                // type="submit"
                className={`flex justify-center items-center w-full tertiary-color text-white py-2 rounded-md transition duration-300 ${hover ? 'buttonHover' : ''}`}
                {...rest}
                onMouseEnter={() => setHover(true)}
                onMouseOut={() => setHover(false)}
                disabled={showSpinner}
            >
                <div className="relative w-fit">
                    {children}
                    <Spinner show={showSpinner} />
                </div>
            </button>
        );
    }
);

export default ButtonSpinner;
