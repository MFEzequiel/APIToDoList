import { randomUUID } from 'node:crypto' 
import { Router } from 'express'
import { readUsers, writeUsers } from '../utils/utils.js'
import { cl, err } from '../utils/logger.js'
import path from 'node:path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../utils/config.js'

export const authRouter = Router()
const notePath = path.join('public', 'users.json')

authRouter.get('/', async (req, res) => {
  try {
    const users = await readUsers(notePath)
    
    res.status(200).json(users)
  } catch (er) {
    err(er)
      return res.status(500).json({err: 'Error reading note file 📓'})
  }
})

authRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const jsonUsers = await readUsers(notePath)
    const user = jsonUsers.users.find(n => n.id === id)

    if (!user) {
        return res.status(404).json({err: 'Note not found 📓'})
    }

    res.status(200).json(user)
  } catch (er) {
    err(er)
    return res.status(500).json({err: 'Error reading note file 📂'})
  }
})

authRouter.post('/register', async (req, res) => {
  
  try {
    const { username, password } = req.body
    
    if (!username || !password ) {
      return res.status(400).json({err: 'username and password fields are required 📓'})  
    }
    const usersData = await readUsers(notePath)

    const existingUser = usersData.users.find(user => user.username === username)

    if (existingUser) {
      return res.status(404).json({err: 'Este usuario ya existe 👤'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
        "id": randomUUID(),
        username,
        password: hashedPassword
    }

    usersData.users.push(newUser)
    await writeUsers(notePath, usersData)

    res.status(201).json({ message: 'Usuario registrado exitosamente' })
  } catch (er) {
    err(er)
    return res.status(500).json({ err: 'Error saving the note 📓' })
  }
})

authRouter.post('/login', async (req, res) => {

  try {
    const { username, password } = req.body

    const usersData = await readUsers(notePath)

    const user = usersData.users.find(user => user.username === username)
    if (!user) {
      return res.status(404).json({ err: 'Usuario no encontrado 👤' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
    return res.status(404).json({err: 'Contraceña incorrecta 🚫'})
    } 

    const token = jwt.sign(
      { id: user.id, username: user.username },
       SECRET_KEY,
      { expiresIn: '1h' }
    )

    res.status(201).json({ token })
  } catch (er) {
    err(er)
    return res.status(500).json({ err: 'Error saving the note 📓' })
  }
})

authRouter.post('/verify', async (req, res) => {
  try {
    const { token } = req.body

    if (!token) {
      return res.status(400).json({ valid: false, err: 'Token es requerido 🚫' })
    }

    jwt.verify({ token, SECRET_KEY}, (err, decoded) => {

      if (err) {
        return res.json({ valid: false, err: 'Token inválido' })
      }

      res.json({ valid: true, user: decoded })
    })


  } catch (er) {
    err(er)
    return res.status(500).json({ err: 'Error saving the note 📓' })
  }
})