import { useParams } from "react-router-dom"
import { useNotes } from "../Hooks/useNotes"
import { CompNota } from "./CompNotes"

export function ShowNotes() {
    const { id } = useParams()
    const { notes } = useNotes()

    return (
        <>
            {
                notes.map(el => {
                    if (el.id === id) {
                        return <CompNota key={el.id} isComplete={el.complete} text={el.content}/>
                    }
                })
            }
        </>
    )
} 