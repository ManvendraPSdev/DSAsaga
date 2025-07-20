import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/slices/userSlice";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isDark } = useTheme();

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate("/");
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`shadow-sm border-b transition-colors duration-300 ${isDark ? 'glass-card border-white/10' : 'bg-white border-gray-200'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                            onClick={closeMobileMenu}
                        >
                            <img
                                src="/logo.png"
                                alt="LEXA"
                                className="h-8 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/problems"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            Problems
                        </Link>
                        {isAuthenticated &&
                            (user?.role === "setter" ||
                                user?.role === "admin") && (
                                <>
                                    <Link
                                        to="/my-problems"
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                                    >
                                        My Problems
                                    </Link>
                                    <Link
                                        to="/create-problem"
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                                    >
                                        Create Problem
                                    </Link>
                                </>
                            )}
                        {isAuthenticated && user?.role === "admin" && (
                            <Link
                                to="/admin/users"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                            >
                                Manage Users
                            </Link>
                        )}
                    </div>

                    {/* Desktop Action Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Theme Toggle Button */}
                        <ThemeToggle />
                        
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                {/* Practice Button */}
                                <Link
                                    to="/problems"
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                                >
                                    Practice
                                </Link>
                                
                                {/* Profile Button */}
                                <Link
                                    to="/profile"
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                                >
                                    <img
                                        src={
                                            user?.avatar ||
                                            "https://images.unsplash.com/photo-1740252117012-bb53ad05e370?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        }
                                        alt={user?.name || "User"}
                                        className={`w-6 h-6 rounded-full border ${isDark ? 'border-white/20' : 'border-gray-300'}`}
                                    />
                                    <span className="text-sm font-medium">
                                        {user?.name || user?.username}
                                    </span>
                                </Link>
                                
                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDark ? 'bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300' : 'bg-red-50 hover:bg-red-100 text-red-600'}`}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                {/* Learn More Button */}
                                <Link
                                    to="/problems"
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                                >
                                    Learn More
                                </Link>
                                
                                {/* Login Button */}
                                <Link
                                    to="/login"
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                                >
                                    Login
                                </Link>
                                
                                {/* Sign Up Button */}
                                <Link
                                    to="/signup"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <ThemeToggle />
                        <button
                            onClick={toggleMobileMenu}
                            className={`p-2 rounded-md transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            {isMobileMenuOpen ? (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t transition-colors duration-300 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                            {/* Mobile Navigation Links */}
                            <Link
                                to="/"
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                                onClick={closeMobileMenu}
                            >
                                Home
                            </Link>
                            <Link
                                to="/problems"
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                                onClick={closeMobileMenu}
                            >
                                Problems
                            </Link>
                            {isAuthenticated &&
                                (user?.role === "setter" ||
                                    user?.role === "admin") && (
                                    <>
                                        <Link
                                            to="/my-problems"
                                            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                                            onClick={closeMobileMenu}
                                        >
                                            My Problems
                                        </Link>
                                        <Link
                                            to="/create-problem"
                                            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                                            onClick={closeMobileMenu}
                                        >
                                            Create Problem
                                        </Link>
                                    </>
                                )}
                            {isAuthenticated && user?.role === "admin" && (
                                <Link
                                    to="/admin/users"
                                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                                    onClick={closeMobileMenu}
                                >
                                    Manage Users
                                </Link>
                            )}

                            {/* Mobile Action Buttons */}
                            <div className={`pt-4 pb-3 border-t transition-colors duration-300 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                                {isAuthenticated ? (
                                    <div className="space-y-3">
                                        {/* Practice Button */}
                                        <Link
                                            to="/problems"
                                            className={`block w-full text-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                                            onClick={closeMobileMenu}
                                        >
                                            Practice
                                        </Link>
                                        
                                        {/* Profile Button */}
                                        <Link
                                            to="/profile"
                                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                                            onClick={closeMobileMenu}
                                        >
                                            <img
                                                src={
                                                    user?.avatar ||
                                                    "https://images.unsplash.com/photo-1740252117012-bb53ad05e370?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                }
                                                alt={user?.name || "User"}
                                                className={`w-8 h-8 rounded-full border ${isDark ? 'border-white/20' : 'border-gray-300'}`}
                                            />
                                            <span className="text-base font-medium">
                                                {user?.name || user?.username}
                                            </span>
                                        </Link>
                                        
                                        {/* Logout Button */}
                                        <button
                                            onClick={handleLogout}
                                            className={`w-full text-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${isDark ? 'bg-red-600/20 hover:bg-red-600/30 text-red-400' : 'bg-red-50 hover:bg-red-100 text-red-600'}`}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {/* Learn More Button */}
                                        <Link
                                            to="/problems"
                                            className={`block w-full text-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                                            onClick={closeMobileMenu}
                                        >
                                            Learn More
                                        </Link>
                                        
                                        {/* Login Button */}
                                        <Link
                                            to="/login"
                                            className={`block w-full text-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                                            onClick={closeMobileMenu}
                                        >
                                            Login
                                        </Link>
                                        
                                        {/* Sign Up Button */}
                                        <Link
                                            to="/signup"
                                            className="bg-blue-600 hover:bg-blue-700 text-white block w-full text-center px-4 py-3 rounded-lg text-base font-medium transition-colors"
                                            onClick={closeMobileMenu}
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
