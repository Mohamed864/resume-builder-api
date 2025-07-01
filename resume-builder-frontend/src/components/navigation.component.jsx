import { Outlet, Link } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Fragment } from "react";

const Nav = () => {
    const { user, token, setUser, setToken } = useAuth();
    const handleLogout = () => {
        axios.post("/logout").then(() => {
            setUser(null);
            setToken(null);
        });
    };
    return (
        <Fragment>
            <div>
                <nav className="w-full bg-ocean-blue text-ocean-sand px-6 py-4 shadow flex items-center justify-between">
                    <div className="text-2xl font-bold">ResumeBuilder</div>
                    <div className="flex space-x-6">
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
                </nav>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Nav;
