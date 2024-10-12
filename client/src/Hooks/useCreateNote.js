import { useCallback, useContext } from "react"
import { SetState } from "../contexto/usContex"
import { API_NOTES } from "../service/useFechingNotes"

export function useCreateNewNote () {
  const { setNotes, theme, setTheme } = useContext(SetState)

  const addNote = async ev => {
    ev.preventDefault()
    const f = ev.target
    const { note } = f

    const newNote = {
      "content": note.value,
      "completed": false
    }

    try {
      const res = await fetch(API_NOTES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote)
      })

      if (!res.ok) {
        throw new Error('Error add note')
      }

      const newData = await res.json()
      setNotes(preventNote => [...preventNote, newData])

    } catch (error) {
      console.error(`Failed to add the note: ${error}`)
    }
  }

  const handleTheme = () => {
    if (theme === 'light') {
        setTheme('dark')
    } else {
        setTheme('light')
    }
  }

  return { addNote, handleTheme }
}
