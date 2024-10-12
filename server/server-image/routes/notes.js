import { randomUUID } from 'node:crypto' 
import { Router } from 'express'
import { fsReadJSON } from '../utils/utils.js'

import path from 'node:path'

export const notesRoute = Router()
const notePath = path.join('public', 'notes.json')

notesRoute.get('/', async (req, res) => {
  try {
    const notes = await fsReadJSON(notePath)
    
    res.json(notes)
  } catch (er) {
      return res.status(500).json({err: 'Error reading note file 📓'})
  }
})

notesRoute.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const jsonNotes = await fsReadJSON(notePath)
    const note = jsonNotes.notes.find(n => n.id === id)
    if (!note) {
        return res.status(404).json({err: 'Note not found 📓'})
    }

    res.json(note)
  } catch (er) {
    return res.status(500).json({err: 'Error reading note file 📂'})
  }
})

notesRoute.post('/', async (req, res) => {
  
  try {
    const { content, completed } = req.body
    
    if (content === undefined || completed === undefined ) {
      return res.status(400).json({err: 'content and completed fields are required 📓'})  
    }
    const jsonNotes = await fsReadJSON(notePath)
    const newNote = {
        "id": randomUUID(),
        content,
        completed
    }

    jsonNotes.notes.push(newNote)
    
    res.status(201).json(newNote)
  } catch (er) {
    return res.status(500).json({ err: 'Error saving the note 📓' })
  }
})

notesRoute.put('/:id', async (req, res) => {

  try {
    const { id } = req.params
    const { content, completed } = req.body
    
    if (content === undefined || completed === undefined ) {
      return res.status(400).json({err: 'content and completed fields are required 📓'})  
    }
    
    const jsonNotes = await fsReadJSON(notePath)
    
    const noteIndex = jsonNotes.notes.findIndex(n => n.id === id)
    
    if (noteIndex === -1) {
      return res.status(404).json({err: 'Note not found 📓'})
    }
    
    jsonNotes.notes[noteIndex] = { id, content, completed }

    res.status(201).json(jsonNotes.notes[noteIndex])
  } catch (er) {
     return res.status(500).json({ err: 'Error saving the note 📓' })
  }

})

notesRoute.delete('/:id', (req, res) => {

  try {
    const { id } = req.params
    const jsonNotes = fsReadJSON(notePath)
    const noteIndex = jsonNotes.notes.findIndex(n => n.id === id)
    
    if (noteIndex === -1) {
      return res.status(404).json({err: 'Not note 📓'})
    }

    jsonNotes.notes.splice(noteIndex, 1)

    res.status(204).end()
  } catch (er) {
     return res.status(500).json({ err: 'Error saving the note 📓' })
  }
})