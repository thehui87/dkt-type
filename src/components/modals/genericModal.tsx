import React, { useEffect, useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const GenericModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setShowModal(true);
        } else {
            setTimeout(() => setShowModal(false), 300); // Wait for animation to complete
        }
    }, [isOpen]);

    return (
        <>
            {showModal && (
                <div
                    className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-10 ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                >
                    <div
                        className={`bg-teal-800 text-teal-500 p-6 rounded-lg shadow-lg transform ${isOpen ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-300`}
                    >
                        <button
                            onClick={onClose}
                            className="text-red-500 font-bold float-right"
                        >
                            X
                        </button>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default GenericModal;
