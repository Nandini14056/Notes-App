import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

function NoteCard({ note, deleteNote }) {

    return (

        <div className="note-card">

            <h2>{note.title}</h2>

            <p>
                {note.content.length > 100
                    ? note.content.slice(0, 100) + "..."
                    : note.content}
            </p>

            <div className="card-buttons">

                <Link to={`/note/${note._id}`}>
                    <button>View</button>
                </Link>

                <Link to={`/edit/${note._id}`}>
                    <button>
                        <FaEdit />
                    </button>
                </Link>

                <button
                    className="delete"
                    onClick={() => deleteNote(note._id)}
                >
                    <FaTrash />
                </button>

            </div>

        </div>
    );
}

export default NoteCard;