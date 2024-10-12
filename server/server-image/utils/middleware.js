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
