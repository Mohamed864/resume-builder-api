import { useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const { setUser, setToken } = useAuth();

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/register", form);
            setUser(data.data.user);
            setToken(data.data.token);
            navigate("/dashboard");
        } catch (error) {
            setErrors(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
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
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    placeholder="Name"
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
