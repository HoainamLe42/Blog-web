import React from 'react';

type ConfirmationModalProps = {
    isOpen: boolean;
    onConfirm: () => void;
    onClose: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    children: React.ReactNode;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onConfirm,
    onClose,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    children,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[198] bg-black/50 flex items-center justify-center">
            <div className="min-w-[300px] mx-4 rounded-md bg-white shadow-lg py-3 px-4 text-center">
                {children}
                {/* Button action */}
                <div className="flex justify-between gap-3 mt-3">
                    <button
                        onClick={onClose}
                        className="border w-full py-2 rounded-md font-bold text-sm"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="border w-full py-2 rounded-md font-bold text-sm text-white bg-red-600"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
