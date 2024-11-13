import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    // Check local storage for saved mode
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'true') {
            setMode('dark');
            document.body.classList.add('dark');
        }
    }, []);

    // Handle toggle change
    const handleModeChange = (
        event: React.MouseEvent<HTMLElement>,
        newMode: 'light' | 'dark',
    ) => {
        if (newMode !== null) {
            setMode(newMode);
            if (newMode === 'dark') {
                document.body.classList.add('dark');
                localStorage.setItem('darkMode', 'true');
            } else {
                document.body.classList.remove('dark');
                localStorage.setItem('darkMode', 'false');
            }
        }
    };

    return (
        <div>
            <h2>Toggle Dark Mode</h2>
            <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={handleModeChange}
                aria-label="theme mode"
            >
                <ToggleButton value="light" aria-label="light mode">
                    <Brightness7 />
                </ToggleButton>
                <ToggleButton value="dark" aria-label="dark mode">
                    <Brightness4 />
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
};

export default DarkModeToggle;
