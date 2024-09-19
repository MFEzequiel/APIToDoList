import express from 'express'
import { readJSON } from './utils.js'
import path from 'node:path'
import { notesRoute } from './routes/notes.js'

const app = express()
const PORT = process.env.PORT ?? 3000
const cl = s => console.log(s)
const ACCESS_ORIGIN = ['http://localhost:5173']
const notesPath = path.join('public', 'notes.json')

app.disable('x-powered-by')
app.use(express.json())

app.use((req, res, next) => {
  const origin = req.header('origin')

  if (ACCESS_ORIGIN.includes(origin) || !origin) {

    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Headers', 'Origin, Content-type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  
  }

  next()
})

app.get('/', async (req, res) => {
  try {
    const notes = await readJSON(notesPath)
    res.json(notes)
  } catch (er) {
    res.status(500).json({err: 'Internal server error reading note 📓'})
  }
})

app.use('/notes', notesRoute)

app.use((req, res) => {
  res.status(404).send('<h1>Error 404</h1>')
})

app.listen(PORT)
