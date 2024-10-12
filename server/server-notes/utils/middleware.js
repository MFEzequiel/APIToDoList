// import cors from 'cors'

const ACCESS_ORIGIN = ['http://localhost:5173']
/*
export const corsMiddleware({acceptedOptions = ACCESS_ORIGIN} = {}) = cors({
  origin: (origin, callback) => {
    if (acceptedOptions.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }
  
    return callback(new Error('Not allowed by CORS'))
  }


  next()
})
*/

export function corsMiddleware(req, res, next,{ acceptOptions = ACCESS_ORIGIN} = {}) {

  const origin = req.header('origin')

  if (acceptOptions.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Headers', 'Origin, Content-type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  }

  next()
}

export async function authenticate (req, res, next) {
  const authHeader = req.header['Authorization']

  if (!authHeader) {
    return res.status(401).json({ err: 'Authorization header es requerido' })
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ err: 'token es requerido' })
  }

  try {
    const ress = await fetch(AUTH_SERVICE_URL, { token })

    if (ress.data.valid) {
      req.user = await ress.data.user
      next()
    } else {
      res.status(401).json({ err: 'token inválido 🚫' })
    }
  } catch (er) {
    err(`Error de verificación de token: ${er}`)
    res.status(500).json({ err: 'Error al verificar autenticación 👎' })
  }
}
