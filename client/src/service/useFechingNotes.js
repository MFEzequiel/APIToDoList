import { useContext, useEffect, useState } from "react"
import { SetState } from "../contexto/usContex"
import { err } from "../utils/logger"

export const API_NOTES = 'http://localhost:3000/notes'

export async function useFechingNotes () {
  const { setLoading } = useContext(SetState)

  try {
    setLoading(true)
    const res = await fetch(API_NOTES)

  } catch (error) {
    err(error)
  }

  // useEffect(() => {
  //   setLoading(true)
  //   fetch(API_NOTES)
  //     .then(res => {
  //       if (!res.ok){
  //         throw new Error('Error al realizar !responce.ok')
  //       }
  //       return res.json()
  //     })
  //     .then(d => {
  //       setLoading(false)
  //       const { notes } = d
  //       cl(d)
  //       return notes
  //     })
  // }, [])

}
