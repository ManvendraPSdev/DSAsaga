import React from 'react';
import { useTheme } from '../context/ThemeContext';

const LoadingScreen = () => {
    const { isDark } = useTheme();

    return (
        <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDark ? 'bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e]' : 'bg-white'}`}>
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
                <p className={`mt-4 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Loading...</p>
            </div>
        </div>
    );
};

export default LoadingScreen; 