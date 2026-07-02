import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import SearchBar from "../components/SearchBar";

import "../styles/dashboard.css";

function Home() {

    const [notes, setNotes] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const fetchNotes = async () => {

        try {

            const res = await api.get("/notes");

            setNotes(res.data.notes);

        } catch {

            toast.error("Unable to fetch notes");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        const loadNotes = async () => {
            await fetchNotes();
        };

        loadNotes();

    }, []);

    const deleteNote = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this note?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/notes/${id}`);

            toast.success("Note Deleted");

            fetchNotes();

        } catch {

            toast.error("Delete Failed");

        }

    };

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <>
            <Navbar />

            <div className="container">

                <SearchBar
                    search={search}
                    setSearch={setSearch}
                />

                {loading ? (

                    <h2 className="center">
                        Loading...
                    </h2>

                ) : filteredNotes.length === 0 ? (

                    <h2 className="center">
                        No Notes Found 📭
                    </h2>

                ) : (

                    <div className="notes-grid">

                        {filteredNotes.map((note) => (

                            <NoteCard
                                key={note._id}
                                note={note}
                                deleteNote={deleteNote}
                            />

                        ))}

                    </div>

                )}

            </div>

        </>

    );
}

export default Home;