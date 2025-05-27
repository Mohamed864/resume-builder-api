import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
    const { user, token, setUser, setToken } = useAuth();

    if (!token) {
        return <Navigate to="/" />;
    }

    useEffect(() => {
        try {
            axios.get("/user").then(({ data }) => {
                setUser(data);
                console.log(data);
            });
        } catch (error) {
            if (error.response?.status === 422) {
                // Validation errors from Laravel
                setErrors(error.response.data.errors || {});
            } else if (error.response?.status === 401) {
                setErrors({
                    password: ["Invalid credentials. Please try again."],
                });
            } else {
                console.error("Login error:", error);
                setErrors({
                    general: [
                        "An unexpected error occurred. Please try again.",
                    ],
                });
            }
        }
    }, []);

    const logout = (e) => {
        e.preventDefault();
        try {
            axios.post("/logout").then(() => {
                setUser(null);
                setToken(null);
            });
        } catch (error) {
            if (error.response?.status === 422) {
                // Validation errors from Laravel
                setErrors(error.response.data.errors || {});
            } else if (error.response?.status === 401) {
                setErrors({
                    password: ["Invalid credentials. Please try again."],
                });
            } else {
                console.error("Login error:", error);
                setErrors({
                    general: [
                        "An unexpected error occurred. Please try again.",
                    ],
                });
            }
        }
    };

    return (
        <div>
            <h1>Welcome, {user?.name}</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;

//
