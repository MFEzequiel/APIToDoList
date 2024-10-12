import request from 'supertest'
import express from 'express'
import { readJSON } from './utils.js'
import path from 'node:path'
import { notesRoute } from './routes/notes.js'
import { app } from './main.js' // Asegúrate de que este archivo exporte tu instancia de `app`

jest.mock('./utils.js') // Mock de `readJSON`

describe('API Endpoints', () => {
  beforeAll(() => {
    // Mockear el archivo JSON de notas
    readJSON.mockResolvedValue({
      notes: [{ id: '1', content: 'Test note', completed: false }]
    })
  })

  it('GET / - should return notes', async () => {
    const res = await request(app).get('/')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('notes')
    expect(res.body.notes).toHaveLength(1)
    expect(res.body.notes[0].content).toBe('Test note')
  })

  it('POST /notes - should create a new note', async () => {
    const res = await request(app)
      .post('/notes')
      .send({ content: 'New Note', completed: false })

    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.content).toBe('New Note')
  })

  // Puedes seguir escribiendo pruebas para otros endpoints como PUT y DELETE
})

const palindrome = require('./main_test.js')

test('palindrome', () => {
  const result = palindrome('Ezequiel')


  expect(result).toBe('')
})