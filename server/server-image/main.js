import express from 'express'
import { notesRoute } from './routes/notes.js'
import { corsMiddleware } from './utils/middleware.js'
import { PORT } from './utils/config.js'

export const app = express()

app.disable('x-powered-by')
app.use(express.json())


app.use((req, res, next) => corsMiddleware(req, res, next))

app.get('/', (req, res) => {
  res.send('<h1>Image: 3001</h1>')
})

app.use('/notes', notesRoute)

app.use((req, res) => {
  res.status(404).send('<h1>Error 404</h1>')
})

app.listen(PORT)
