import { useContext } from "react"
import { useNotes } from "../Hooks/useNotes"
import { CompNota } from "./CompNotes"
import { SetState } from "../contexto/usContex"

function ListOfNotes({ isNotes }) {

  return isNotes.map(el => {
    return <CompNota key={el.id} isComplete={el.complete} text={el.content} id={el.id} />
  })
}

function Loading() {
  return <p>Cargando...</p>
}

function Notes() {
  const { notes, } = useNotes()
  const { loading } = useContext(SetState)

  return (
    <div className="container-notes">
      {
       loading
        ? <Loading />
        : <ListOfNotes isNotes={notes} />
      }
    </div>  
  )
}

export default Notes