import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

import "../styles/auth.css";

function Register() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            return toast.error("Please fill all fields");
        }

        try {

            setLoading(true);

            await api.post("/user/register", formData);

            toast.success("Registration Successful");

            navigate("/login");

        } catch (err) {

            toast.error(err.response?.data?.message || "Registration Failed");

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

                <h1>Create Account</h1>

                <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button disabled={loading}>
                    {loading ? "Creating..." : "Register"}
                </button>

                <p>
                    Already have an account?
                    <Link to="/login"> Login</Link>
                </p>

            </form>

        </div>
    );
}

export default Register;