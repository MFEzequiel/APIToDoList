import { randomUUID } from 'node:crypto' 
import { Router } from 'express'
import { readJSON } from '../utils.js'
import { promises as fs } from 'node:fs'
import path from 'node:path'

export const notesRoute = Router()

const notePath = path.join('public', 'notes.json')

notesRoute.get('/', async (req, res) => {
    console.log(notePath);
    try {
        const notes = await readJSON(notePath)
        res.json(notes)
    } catch (er) {
        return res.status(500).json({err: 'Error reading note file 📓'})
    }
})

notesRoute.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const jsonNotes = await readJSON(notePath)
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

      const jsonNotes = await readJSON(notePath)

      const newNote = {
          "id": randomUUID(),
          content,
          completed
      }

      jsonNotes.notes.push(newNote)

      await fs.writeFile(notePath, JSON.stringify(jsonNotes, null, 2))

      res.status(201).json(newNote)
  } catch (er) {
     return res.status(500).json({ err: 'Error saving the note 📓' })
  }
})

notesRoute.put('/:id', async (req, res) => {
    
    try {
      const { id } = req.params
      const { content, completed } = req.body

      if (content === undefined || null || completed === undefined || nul ) {
        return res.status(400).json({err: 'content and completed fields are required 📓'})  
      }

      const jsonNotes = await readJSON(notePath)
      const noteIndex = jsonData.notes.findIndex(n => n.id === id)

      if (noteIndex === -1) {
        return res.status(500).json({err: 'Note not found 📓'})
      }

      jsonNotes.notes[noteIndex] = { id, content, completed }

      await fs.writeFile(notePath, JSON.stringify(jsonNotes, null, 2))

      res.status(200).json(jsonNotes.notes[noteIndex])
  } catch (er) {
     return res.status(500).json({ err: 'Error saving the note 📓' })
  }

})

notesRoute.delete('/:id', async (req, res) => {
  try {
      const { id } = req.params
      const jsonNotes = await readJSON(notePath)

      const filterNotes = jsonNotes.notes.filter(n => n.id !== id)

      if (filterNotes.length === jsonNotes.notes.length) {
        return res.status(404).json({err: 'Note not found 📓'})
      }

      await fs.writeFile(notePath, JSON.stringify({ notes: filterNotes }, null, 2))
      res.status(204).send()
  } catch (er) {
     return res.status(500).json({ err: 'Error saving the note 📓' })
  }
})