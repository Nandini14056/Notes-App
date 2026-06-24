import { useState } from 'react'
import axios from 'axios'
import { BsThreeDotsVertical } from 'react-icons/bs'

export const NotesData = ({ notes, setNotes }) => {
  const [activeMenu, setActiveMenu] = useState(null)
  const [editId, setEditId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editContent, setEditContent] = useState("")


  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);

      setNotes(prevNote => prevNote.filter(note => note._id !== id));

    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/notes/${id}`,
        {
          title: editTitle,
          content: editContent
        }
      )

      setNotes(prev => prev.map(note => note._id === id ? res.data : note))

      setEditId(null)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className='notes-heading'>
        <h1>My Notes</h1>
      </div>
      {notes.map((note, index) => (
        <div key={note._id} className='notes-container'>
          <div className='card-top'>
            <div className='icon'>📝</div>
            <BsThreeDotsVertical className="dots" onClick={() => setActiveMenu(activeMenu === index ? null : index)} />
            {activeMenu === index && (
              <div className="menu">
                <p onClick={() => {
                  setEditId(note._id)
                  setEditTitle(note.title)
                  setEditContent(note.content)
                }}>Edit</p>
                <p onClick={() => deleteNote(note._id)}>Delete</p>
              </div>
            )}
          </div>
          <div className='card-bottom'>
            {
              editId === note._id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />

                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />

                  <button onClick={() => handleUpdate(note._id)}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <h2>{note.title}</h2>
                  <p>{note.content}</p>
                </>
              )
            }
          </div>
        </div>
      ))}
    </div>
  )
}