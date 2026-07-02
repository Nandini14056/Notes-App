import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import api from "../services/api";

import toast from "react-hot-toast";

import "../styles/form.css";

function EditNote() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${id}`);
                setNote(res.data.note);
            } catch {
                toast.error("Failed to load note");
            }
        };

        fetchNote();
    }, [id]);

    const handleChange = (e) => {

        setNote({
            ...note,
            [e.target.name]: e.target.value
        });

    };

    const updateNote = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await api.put(`/notes/${id}`, note);

            toast.success("Note Updated");

            navigate("/");

        } catch {

            toast.error("Update Failed");

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
                    onSubmit={updateNote}
                >

                    <h1>Edit Note</h1>

                    <input
                        name="title"
                        value={note.title}
                        onChange={handleChange}
                    />

                    <textarea
                        rows="10"
                        name="content"
                        value={note.content}
                        onChange={handleChange}
                    />

                    <button disabled={loading}>
                        {loading ? "Updating..." : "Update Note"}
                    </button>

                </form>

            </div>

        </>

    );
}

export default EditNote;