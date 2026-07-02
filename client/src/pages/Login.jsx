import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

import "../styles/auth.css";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            return toast.error("Please fill all fields");
        }

        try {

            setLoading(true);

            const res = await api.post("/user/login", formData);

            localStorage.setItem("token", res.data.token);

            toast.success("Login Successful");

            navigate("/");

        } catch (err) {

            toast.error(err.response?.data?.message || "Login Failed");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">

            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >

                <h1>Welcome Back 👋</h1>

                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                />

                <button disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p>
                    Don't have an account?
                    <Link to="/register"> Register</Link>
                </p>

            </form>

        </div>
    );
}

export default Login;