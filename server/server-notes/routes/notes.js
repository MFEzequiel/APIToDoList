import { randomUUID } from 'node:crypto' 
import { Router } from 'express'
import { readNotes, writeNotes } from '../utils/utils.js'
import path from 'node:path'
import { cl, err } from '../utils/logger.js'
import { authenticate } from '../utils/middleware.js'

export const notesRoute = Router()
const notePath = path.join('public', 'notes.json')

notesRoute.get('/', async (req, res) => {

  try {
    const notes = await readNotes(notePath)
    
    res.json(notes)
  } catch (er) {
    err(er)
      return res.status(500).json({err: 'Error reading note file 📓'})
  }

})

notesRoute.get('/:id', async (req, res) => {

  try {
    const { id } = req.params
    const jsonNotes = await readNotes(notePath)

    const note = jsonNotes.notes.find(n => n.id === id)

    if (!note) {
        return res.status(404).json({err: 'Note not found 📓'})
    }

    res.json(note)
  } catch (er) {
    err(er)
    return res.status(500).json({err: 'Error reading note file 📂'})
  }

})

notesRoute.post('/', authenticate, async (req, res) => {
  
  try {
    const { content, completed } = req.body
    
    if (content === undefined || completed === undefined ) {
      return res.status(400).json({err: 'content and completed fields are required 📓'})  
    }

    const jsonNotes = await readNotes(notePath)

    const newNote = {
        "id": randomUUID(),
        content,
        completed,
        "userId": req.user.id 
    }

    jsonNotes.notes.push(newNote)
    
    await writeNotes(notePath, jsonNotes)

    res.status(201).json(newNote)
  } catch (er) {
    err(er)
    return res.status(500).json({ err: 'Error saving the note 📓' })
  }
})

notesRoute.put('/:id', authenticate, async (req, res) => {

  try {
    const { id } = req.params
    const userId = { userId: req.user.id }

    const { content, completed } = req.body
    
    if (content === undefined || completed === undefined ) {
      return res.status(400).json({err: 'content and completed fields are required 📓'})  
    }
    
    const jsonNotes = await readNotes(notePath)
    
    const noteIndex = jsonNotes.notes.findIndex(n => n.id === id)
    
    if (noteIndex === -1) {
      return res.status(404).json({err: 'Note not found 📓'})
    }

    jsonNotes.notes[noteIndex] = { id, content, completed, userId }

    await writeNotes(notePath, jsonNotes)

    res.status(201).json(jsonNotes.notes[noteIndex])
  } catch (er) {
    err(er)
     return res.status(500).json({ err: 'Error saving the note 📓' })
  }

})

notesRoute.delete('/:id', authenticate, async (req, res) => {

  try {

    const { id } = req.params

    const jsonNotes = await readNotes(notePath)

    const noteFiltter = jsonNotes.notes.filter(n => n.id !== id)
    
    if (noteFiltter === -1) {
      return res.status(404).json({err: 'Not note 📓'})
    }
    
    await writeNotes(notePath, { notes: noteFiltter })

    res.status(204).end()
  } catch (er) {
    err(er)
     return res.status(500).json({ err: 'Error saving the note 📓' })
  }
})