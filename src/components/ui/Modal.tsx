import React, { ReactNode, MouseEvent } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        onClose();
    };

    const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={handleOverlayClick}
        >
            <div
                className="relative bg-white p-24 rounded-lg shadow-lg w-full max-w-xl text-center "
                onClick={handleContentClick}
            >
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <CloseIcon/>
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;