import { useState } from 'react'
import axios from 'axios'

export const InputForm = ({ setNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [button, setButton] = useState(false);

  const handlebutton = () => {
    setButton((prev) => !prev)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/notes", {
        title,
        content
      });

      setNotes(prev => [res.data, ...prev])

      setTitle("")
      setContent("")

      setButton(false)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div>
      {button ? <form onSubmit={handleSubmit} className='input-form'>
        <h1>Add New Note</h1>
        <label>Title: </label>
        <input
          type="text"
          placeholder='Enter note title....'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Content: </label>
        <textarea
          placeholder='Write your note here....'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="btns">
          <button onClick={() => setButton(false)} className='cancel-btn'>Cancel</button>
          <button type='submit' className='add-note-btn'>Add Note</button>
        </div>
      </form>
        :
        <button onClick={handlebutton} className='add-btn'>+</button>
      }


    </div>
  )
}