import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { useApiCall } from "../hooks";
import { Layout } from "../components";
import { useTheme } from "../context/ThemeContext";

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { loading, error, execute, setError } = useApiCall();
    const navigate = useNavigate();
    const { isDark } = useTheme();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Handle signup logic here
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        await execute(
            () =>
                authService.register(
                    formData.email,
                    formData.password,
                    formData.fullName,
                    formData.username
                ),
            (response) => {
                if (response.success) {
                    navigate("/login");
                } else {
                    setError(response.message);
                }
            }
        );
    };

    return (
        <Layout showNavbar={false}>
            <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e]' : 'bg-gradient-to-br from-slate-50 to-slate-100'}`}>
                <div className="max-w-md w-full space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <Link to="/" className="inline-block">
                            <h1 className={`text-4xl font-bold mb-2 transition-colors duration-300 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                                LEXA
                            </h1>
                        </Link>
                        <h2 className={`text-2xl font-semibold mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-slate-700'}`}>
                            Create your account
                        </h2>
                        <p className={`transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                            Join thousands of developers improving their coding skills
                        </p>
                    </div>

                    {/* Signup Form */}
                    <div className={`py-8 px-6 shadow-lg rounded-xl border transition-colors duration-300 ${isDark ? 'glass-card border-white/10' : 'bg-white border-slate-200'}`}>
                        {error && (
                            <div className={`mb-6 p-3 border rounded-lg text-sm transition-colors duration-300 ${isDark ? 'bg-red-500/20 border-red-500/30 text-red-300' : 'bg-red-50 border-red-200 text-red-600'}`}>
                                {error}
                            </div>
                        )}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="fullName"
                                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-slate-700'}`}
                                >
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-3 border rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${isDark ? 'glass-input' : 'border-slate-300'}`}
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="username"
                                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-slate-700'}`}
                                >
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-3 border rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${isDark ? 'glass-input' : 'border-slate-300'}`}
                                    placeholder="Choose a username"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-slate-700'}`}
                                >
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-3 border rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${isDark ? 'glass-input' : 'border-slate-300'}`}
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-slate-700'}`}
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-3 border rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${isDark ? 'glass-input' : 'border-slate-300'}`}
                                    placeholder="Create a password"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-slate-700'}`}
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-3 border rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${isDark ? 'glass-input' : 'border-slate-300'}`}
                                    placeholder="Confirm your password"
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="agree"
                                    name="agree"
                                    type="checkbox"
                                    required
                                    checked={formData.agree}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="agree"
                                    className={`ml-2 block text-sm transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}
                                >
                                    I agree to the{" "}
                                    <a href="#" className="text-blue-600 hover:text-blue-500">
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className="text-blue-600 hover:text-blue-500">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Creating account..." : "Create account"}
                            </button>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className={`absolute inset-0 flex items-center ${isDark ? 'border-white/10' : 'border-slate-300'}`}>
                                    <div className={`w-full border-t transition-colors duration-300 ${isDark ? 'border-white/10' : 'border-slate-300'}`} />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className={`px-2 transition-colors duration-300 ${isDark ? 'glass-card text-gray-400' : 'bg-white text-slate-500'}`}>
                                        Already have an account?
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <Link
                                    to="/login"
                                    className="text-blue-600 hover:text-blue-500 font-medium"
                                >
                                    Sign in instead
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Signup;
