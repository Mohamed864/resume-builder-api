import { useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const { setUser, setToken } = useAuth();

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/login", form);
            setUser(data.data.user);
            setToken(data.data.token);
            navigate("/dashboard");
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-ocean-turquoise">
            <div className="bg-white bg-opacity-90 shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center">
                <div className="mb-6">
                    <span className="text-3xl font-bold text-ocean-blue">
                        ResumeBuilder
                    </span>
                </div>
                <form className="w-full" onSubmit={handleSubmit}>
                    {errors && typeof errors === "string" && (
                        <p style={{ color: "red" }}>{errors}</p>
                    )}
                    {errors && typeof errors === "object" && (
                        <ul style={{ color: "red" }}>
                            {Object.values(errors).map((errorMsg, index) => (
                                <li key={index}>{errorMsg}</li>
                            ))}
                        </ul>
                    )}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-ocean-blue font-semibold mb-1"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-4 py-2 rounded-lg border border-ocean-blue focus:outline-none focus:border-ocean-turquoise"
                            value={form.email}
                            placeholder="Email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label
                            htmlFor="password"
                            className="block text-ocean-blue font-semibold mb-1"
                        >
                            Password
                        </label>

                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full px-4 py-2 rounded-lg border border-ocean-blue focus:outline-none focus:border-ocean-turquoise pr-10"
                            name="password"
                            value={form.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-9 text-ocean-blue focus:outline-none"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                            aria-label={
                                showPassword ? "Hide password" : "Show password"
                            }
                        >
                            {showPassword ? (
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7c1.326 0 2.588.258 3.738.725M19.07 19.07A9.953 9.953 0 0021 12c0-3-4-7-9-7-.795 0-1.568.07-2.313.2M3 3l18 18"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.274.857-.67 1.664-1.176 2.404"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className="mb-4 flex justify-between items-center">
                        <a
                            href="#"
                            className="text-sm text-ocean-turquoise hover:underline"
                        >
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 rounded-lg bg-ocean-blue text-black font-bold shadow hover:bg-ocean-turquoise transition-colors text-lg mb-2"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-sm text-ocean-blue">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="text-ocean-turquoise font-semibold hover:underline"
                    >
                        Register
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
