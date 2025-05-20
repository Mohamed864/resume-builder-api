import { useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
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
            const { data } = await axios.post("/login", form);
            setUser(data.data.user);
            setToken(data.data.token);
            navigate("/dashboard");
        } catch (err) {
            const response = err.response;
            console.log(response);
            if (response && response.status === 422) {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    setErrors({
                        email: [response.data.message],
                    });
                }
            }
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
