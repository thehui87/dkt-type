import React, { useState, useEffect } from 'react';

type SnackbarProps = {
    message: string;
    isOpen: boolean;
    duration?: number;
    onClose: () => void;
};

const Snackbar: React.FC<SnackbarProps> = ({
    message,
    isOpen,
    duration = 3000,
    onClose,
}) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isOpen, duration, onClose]);

    return (
        <div
            className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 transition-all ease-in-out duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <div className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md">
                {message}
            </div>
        </div>
    );
};

export default Snackbar;
