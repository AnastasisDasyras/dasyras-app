import Button, { ButtonProps } from '@mui/material/Button';
import React from 'react';

interface PrimaryButtonProps extends ButtonProps {
    className?: string; // Optional className for Tailwind or additional styling
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <Button
            {...props}
            sx={{
                borderRadius: '16px', // Custom border radius value
            }}
            className={`inline-flex items-center rounded-xl border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300 ${className}`}
            variant="contained"
        >
            {children}
        </Button>
    );
};

export default PrimaryButton;
