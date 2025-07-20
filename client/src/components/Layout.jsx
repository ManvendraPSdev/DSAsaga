import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children, showNavbar = true }) => {
    return (
        <div className="min-h-screen flex flex-col bg-black">
            {showNavbar && <Navbar />}
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 bg-black">{children}</main>
        </div>
    );
};

export default Layout;
