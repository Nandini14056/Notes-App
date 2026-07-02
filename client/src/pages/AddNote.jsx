import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import toast from "react-hot-toast";

import "../styles/form.css";

function AddNote() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    const handleChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!note.title || !note.content) {
            return toast.error("Please fill all fields");
        }

        try {

            setLoading(true);

            await api.post("/notes", note);

            toast.success("Note Added");

            navigate("/");

        } catch (err) {

            toast.error(err.response?.data?.message || "Failed");

        } finally {

            setLoading(false);

        }

    };

    return (

        <>
            <Navbar />

            <div className="form-container">

                <form
                    className="note-form"
                    onSubmit={handleSubmit}
                >

                    <h1>Add Note</h1>

                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={note.title}
                        onChange={handleChange}
                    />

                    <textarea
                        rows="10"
                        name="content"
                        placeholder="Write your note..."
                        value={note.content}
                        onChange={handleChange}
                    />

                    <button disabled={loading}>
                        {loading ? "Saving..." : "Save Note"}
                    </button>

                </form>

            </div>

        </>

    );
}

export default AddNote;