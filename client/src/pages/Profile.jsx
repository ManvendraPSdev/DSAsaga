import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Layout } from "../components";
import { useApiCall } from "../hooks";
import authService from "../services/authService";
import { setUser } from "../store/slices/userSlice";
import { useTheme } from "../context/ThemeContext";

const Profile = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { loading, error, execute } = useApiCall();
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateError, setUpdateError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { isDark } = useTheme();

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        avatar: "",
    });

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            await execute(
                () => authService.getUser(),
                (response) => {
                    if (response.success) {
                        const userData = response.data;
                        setFormData({
                            name: userData.name || "",
                            username: userData.username || "",
                            email: userData.email || "",
                            avatar: userData.avatar || "",
                        });
                        dispatch(setUser(userData));
                    }
                }
            );
        };

        fetchUserData();
    }, [dispatch, execute]); // Now safe to include execute since it's memoized

    // Update form data when user data changes from Redux
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                username: user.username || "",
                email: user.email || "",
                avatar: user.avatar || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear messages when user types
        setUpdateError("");
        setSuccessMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);
        setUpdateError("");
        setSuccessMessage("");

        try {
            const response = await authService.updateUser(
                formData.name,
                formData.username,
                formData.email,
                formData.avatar
            );

            if (response.success) {
                dispatch(setUser(response.data));
                setSuccessMessage("Profile updated successfully!");
            } else {
                setUpdateError(response.message || "Failed to update profile");
            }
        } catch (err) {
            setUpdateError(
                err.response?.data?.message || "Failed to update profile"
            );
        } finally {
            setUpdateLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout showNavbar={false}>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className={`text-3xl font-bold mb-2 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Profile
                    </h1>
                    <p className={`transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Manage your account settings and preferences
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Information */}
                    <div className="lg:col-span-2">
                        <div className={`p-6 rounded-xl border transition-colors duration-300 ${isDark ? 'glass-card border-white/10' : 'bg-white border-gray-200'}`}>
                            <h2 className={`text-xl font-semibold mb-6 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Profile Information
                            </h2>
                            
                            {error && (
                                <div className={`mb-6 p-3 border rounded-lg text-sm transition-colors duration-300 ${isDark ? 'bg-red-500/20 border-red-500/30 text-red-300' : 'bg-red-50 border-red-200 text-red-600'}`}>
                                    {error}
                                </div>
                            )}
                            
                            {successMessage && (
                                <div className={`mb-6 p-3 border rounded-lg text-sm transition-colors duration-300 ${isDark ? 'bg-green-500/20 border-green-500/30 text-green-300' : 'bg-green-50 border-green-200 text-green-600'}`}>
                                    {successMessage}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isDark ? 'glass-input' : 'border-gray-300'}`}
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isDark ? 'glass-input' : 'border-gray-300'}`}
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isDark ? 'glass-input' : 'border-gray-300'}`}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="avatar"
                                        className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-slate-700'}`}
                                    >
                                        Avatar URL
                                    </label>
                                    <input
                                        type="url"
                                        id="avatar"
                                        name="avatar"
                                        value={formData.avatar}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-3 border rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'border-slate-300'}`}
                                        placeholder="https://example.com/avatar.jpg"
                                    />
                                    <p className={`mt-1 text-sm transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                                        Enter a URL to your profile picture
                                    </p>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={updateLoading}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {updateLoading ? "Updating..." : "Update Profile"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Profile Stats */}
                    <div className="space-y-6">
                        {/* Profile Card */}
                        <div className={`p-6 rounded-xl border transition-colors duration-300 ${isDark ? 'glass-card border-white/10' : 'bg-white border-gray-200'}`}>
                            <div className="text-center">
                                <img
                                    src={user?.avatar || "https://images.unsplash.com/photo-1740252117012-bb53ad05e370?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                    alt={user?.name || "User"}
                                    className={`w-20 h-20 rounded-full mx-auto mb-4 border ${isDark ? 'border-white/20' : 'border-gray-300'}`}
                                />
                                <h3 className={`text-lg font-semibold mb-1 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {user?.name || user?.username}
                                </h3>
                                <p className={`text-sm transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {user?.email}
                                </p>
                                <div className={`mt-3 px-3 py-1 rounded-full text-xs font-medium inline-block transition-colors duration-300 ${isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                                    {user?.role}
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className={`p-6 rounded-xl border transition-colors duration-300 ${isDark ? 'glass-card border-white/10' : 'bg-white border-gray-200'}`}>
                            <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Statistics
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className={`transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        Problems Solved
                                    </span>
                                    <span className={`font-semibold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {user?.stats?.problemsSolved || 0}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className={`transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        Problems Attempted
                                    </span>
                                    <span className={`font-semibold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {user?.stats?.totalSubmissions || 0}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className={`transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        Success Rate
                                    </span>
                                    <span className={`font-semibold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {user?.stats?.acceptedSubmissions
                                            ? Math.round(
                                                  (user.stats.acceptedSubmissions /
                                                      user.stats.totalSubmissions) *
                                                      100
                                              )
                                            : 0}
                                        %
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
