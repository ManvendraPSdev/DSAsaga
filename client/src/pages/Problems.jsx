import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components";
import { useApiCall } from "../hooks";
import problemService from "../services/problemService";
import { useTheme } from "../context/ThemeContext";

const Problems = () => {
    const { loading, error, execute } = useApiCall();
    const [problems, setProblems] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalProblems: 0,
        limit: 10,
        hasNextPage: false,
        hasPrevPage: false,
    });
    const [filters, setFilters] = useState({
        difficulty: "all",
        status: "all",
        search: "",
        tags: "",
    });
    const [allTags, setAllTags] = useState([]);
    const { isDark } = useTheme();

    useEffect(() => {
        const fetchProblems = async () => {
            const params = {
                page: pagination.currentPage,
                limit: pagination.limit,
                ...(filters.difficulty !== "all" && {
                    difficulty: filters.difficulty,
                }),
                ...(filters.search && { search: filters.search }),
                ...(filters.tags && { tags: filters.tags }),
            };

            await execute(
                () => problemService.getAllProblems(params),
                (response) => {
                    if (response.success) {
                        setProblems(response.data.problems);
                        setPagination(response.data.pagination);

                        // Extract unique tags from all problems for filter dropdown
                        const tags = new Set();
                        response.data.problems.forEach((problem) => {
                            problem.tags?.forEach((tag) => tags.add(tag));
                        });
                        setAllTags(Array.from(tags).sort());
                    }
                }
            );
        };

        fetchProblems();
    }, [execute, pagination.currentPage, filters]);

    const handlePageChange = (newPage) => {
        setPagination((prev) => ({ ...prev, currentPage: newPage }));
    };

    const handleFilterChange = (filterName, value) => {
        setFilters((prev) => ({ ...prev, [filterName]: value }));
        setPagination((prev) => ({ ...prev, currentPage: 1 })); // Reset to first page on filter change
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "Easy":
                return "text-green-500";
            case "Medium":
                return "text-yellow-500";
            case "Hard":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Solved":
                return (
                    <svg
                        className="w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
            case "Attempted":
                return (
                    <svg
                        className="w-5 h-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
            default:
                return (
                    <svg
                        className={`w-5 h-5 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className={`border rounded-lg p-4 transition-colors duration-300 ${isDark ? 'bg-red-900 border-red-700 text-red-300' : 'bg-red-50 border-red-200 text-red-600'}`}>
                        {error}
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className={`text-3xl font-bold mb-2 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Coding Problems
                    </h1>
                    <p className={`transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Practice algorithms and data structures with our curated collection of problems
                    </p>
                </div>

                {/* Filters */}
                <div className={`mb-6 p-6 rounded-xl border transition-colors duration-300 ${isDark ? 'glass-card border-white/10' : 'bg-white border-gray-200'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                                Difficulty
                            </label>
                            <select
                                value={filters.difficulty}
                                onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isDark ? 'glass-input' : 'border-gray-300'}`}
                            >
                                <option value="">All Difficulties</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                        <div>
                            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                                Category
                            </label>
                            <select
                                value={filters.category}
                                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isDark ? 'glass-input' : 'border-gray-300'}`}
                            >
                                <option value="">All Categories</option>
                                <option value="arrays">Arrays</option>
                                <option value="strings">Strings</option>
                                <option value="linked-lists">Linked Lists</option>
                                <option value="trees">Trees</option>
                                <option value="graphs">Graphs</option>
                                <option value="dynamic-programming">Dynamic Programming</option>
                                <option value="greedy">Greedy</option>
                                <option value="backtracking">Backtracking</option>
                            </select>
                        </div>
                        <div>
                            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                                Status
                            </label>
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isDark ? 'glass-input' : 'border-gray-300'}`}
                            >
                                <option value="">All Problems</option>
                                <option value="solved">Solved</option>
                                <option value="attempted">Attempted</option>
                                <option value="unsolved">Unsolved</option>
                            </select>
                        </div>
                        <div>
                            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                                Search
                            </label>
                            <input
                                type="text"
                                placeholder="Search problems..."
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isDark ? 'glass-input' : 'border-gray-300'}`}
                            />
                        </div>
                    </div>
                </div>

                {/* Problems Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {problems.map((problem) => (
                                <div
                                    key={problem._id}
                                    className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg ${isDark ? 'glass-card glass-card-hover border-white/10' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className={`text-lg font-semibold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {problem.title}
                                        </h3>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${
                                                problem.difficulty === "Easy"
                                                    ? "bg-green-100 text-green-800"
                                                    : problem.difficulty === "Medium"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {problem.difficulty}
                                        </span>
                                    </div>
                                    <p className={`text-sm mb-4 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {problem.description.substring(0, 100)}...
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex space-x-2">
                                            {problem.tags
                                                ?.slice(0, 3)
                                                .map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className={`px-2 py-1 text-xs rounded-full transition-colors duration-300 ${isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-600'}`}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            {problem.tags?.length > 3 && (
                                                <span className={`px-2 py-1 text-xs rounded-full transition-colors duration-300 ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
                                                    +{problem.tags.length - 3}{" "}
                                                    more
                                                </span>
                                            )}
                                        </div>
                                        <Link
                                            to={`/problems/${problem._id}`}
                                            className="text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            View Problem →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className={`flex justify-center items-center space-x-2 p-4 rounded-xl border transition-colors duration-300 ${isDark ? 'glass-card border-white/10' : 'bg-white border-gray-200'}`}>
                                <button
                                    onClick={() =>
                                        handlePageChange(
                                            pagination.currentPage - 1
                                        )
                                    }
                                    disabled={!pagination.hasPrevPage}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                                >
                                    Previous
                                </button>
                                {Array.from(
                                    {
                                        length: Math.min(
                                            5,
                                            pagination.totalPages
                                        ),
                                    },
                                    (_, i) => {
                                        const pageNum = Math.max(
                                            1,
                                            Math.min(
                                                pagination.currentPage -
                                                    2 +
                                                    i,
                                                pagination.totalPages -
                                                    4 +
                                                    i
                                            )
                                        );
                                        return pageNum <=
                                            pagination.totalPages ? (
                                            <button
                                                key={pageNum}
                                                onClick={() =>
                                                    handlePageChange(
                                                        pageNum
                                                    )
                                                }
                                                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                                    pageNum ===
                                                    pagination.currentPage
                                                        ? "bg-blue-600 text-white"
                                                        : isDark 
                                                            ? "text-gray-300 hover:text-white hover:bg-white/10"
                                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                                }`}
                                            >
                                                {pageNum}
                                            </button>
                                        ) : null;
                                    }
                                )}
                                <button
                                    onClick={() =>
                                        handlePageChange(
                                            pagination.currentPage + 1
                                        )
                                    }
                                    disabled={!pagination.hasNextPage}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </Layout>
    );
};

export default Problems;
