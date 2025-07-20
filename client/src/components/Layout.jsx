import React from "react";
import Navbar from "./Navbar";
import { useTheme } from "../context/ThemeContext";

const Layout = ({ children, showNavbar = true }) => {
    const { isDark } = useTheme();
    
    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e]' : 'bg-white'}`}>
            {showNavbar && <Navbar />}
            <main className={`flex-1 flex flex-col items-center justify-center px-4 py-8 transition-colors duration-300 ${isDark ? 'bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e]' : 'bg-white'}`}>{children}</main>
        </div>
    );
};

export default Layout;
