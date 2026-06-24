import './App.css'
import { InputForm } from '../Components/InputForm'
import { NotesData } from '../Components/NotesData'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/notes")

        setNotes(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchNotes()
  }, [])

  return (
    <>
      <NotesData notes={notes} setNotes={setNotes} />
      <InputForm setNotes={setNotes} />
    </>
  )
}

export default App
