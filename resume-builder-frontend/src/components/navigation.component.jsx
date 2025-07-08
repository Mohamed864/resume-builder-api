import { Outlet, Link } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Fragment, useState } from "react";
import { Menu, X } from "lucide-react"; // Optional icon library

const Nav = () => {
    const { user, setUser, setToken } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        axios.post("/logout").then(() => {
            setUser(null);
            setToken(null);
        });
    };
    return (
        <Fragment>
            <div>
                <nav className="w-full bg-ocean-blue text-ocean-sand px-6 py-4 shadow">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">ResumeBuilder</div>

                        {/* Hamburger for Mobile */}
                        <button
                            className="md:hidden"
                            onClick={() => setMenuOpen((prev) => !prev)}
                        >
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        {/*Desktop Menu*/}
                        <div className="hidden md:flex space-x-6">
                            <Link
                                to="/"
                                className="font-semibold hover:text-ocean-turquoise"
                            >
                                Home
                            </Link>
                            <Link
                                to="/dashboard"
                                className="font-semibold hover:text-ocean-turquoise"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/resume"
                                className="hover:text-ocean-turquoise"
                            >
                                Create Resume
                            </Link>
                            {user ? (
                                <span
                                    className="cursor-pointer hover:text-ocean-turquoise"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </span>
                            ) : (
                                <Link
                                    to="/login"
                                    className="hover:text-ocean-turquoise"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                    {/*Mobile Menu*/}
                    {menuOpen && (
                        <div className="mt-4 flex flex-col space-y-3 md:hidden">
                            <Link
                                to="/"
                                onClick={() => setMenuOpen(false)}
                                className="hover:text-ocean-turquoise"
                            >
                                Home
                            </Link>
                            <Link
                                to="/dashboard"
                                onClick={() => setMenuOpen(false)}
                                className="hover:text-ocean-turquoise"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/resume"
                                onClick={() => setMenuOpen(false)}
                                className="hover:text-ocean-turquoise"
                            >
                                Create Resume
                            </Link>
                            {user ? (
                                <span
                                    className="cursor-pointer hover:text-ocean-turquoise"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        handleLogout();
                                    }}
                                >
                                    Logout
                                </span>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="hover:text-ocean-turquoise"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    )}
                </nav>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Nav;
