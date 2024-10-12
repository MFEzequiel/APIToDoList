import { useCallback, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SetState } from "../contexto/usContex"

export function useLogicButtonOfNotes (id) {
  const navigation = useNavigate()
  const { setClick, notes, setNotes } = useContext(SetState)
  const handleClick = useCallback(() => {
    setClick(true)
    navigation(`/notes/${id}`)
  }, [])
  
  const toggleComplete = async () => {
    const note = notes.find(n => n.id === id)
    const changeNote = { content: note.content, completed: !note.completed }
    
    try {
      const res = await fetch(`http://localhost:3000/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changeNote)
      })
    
      if (!res.ok) {
        throw new Error('Error update note')
      }
      
      const updateData = await res.json()
      setNotes(notes.map(n => (n.id !== id ? n : updateData)))
    } catch (er) {
      console.error(`Erro to update note: ${er}`)
    }
  }

  const deleteNote = async () => {

    try {
        const res = await fetch(`http://localhost:3000/notes/${id}`, {
        method: 'DELETE'
      })

      if (!res.ok) {
        throw new Error('Error delete note')
      }
      
      setNotes(notes.filter(n => (n.id !== id)))
    } catch (er) {
      console.error('Error delete note')
    }
  }

  return { handleClick, toggleComplete, deleteNote }
}
