import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";

import "../styles/form.css";

function ViewNote() {

    const { id } = useParams();

    const [note, setNote] = useState({});

    useEffect(() => {

        const fetchNote = async () => {

            const res = await api.get(`/notes/${id}`);

            setNote(res.data.note);

        };

        fetchNote();

    }, [id]);

    return (

        <>
            <Navbar />

            <div className="view-note">

                <h1>{note.title}</h1>

                <hr />

                <p>{note.content}</p>

            </div>

        </>

    );

}

export default ViewNote;