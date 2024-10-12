import { useContext } from "react";
import { useFechingNotes } from "../service/useFechingNotes";
import { cl } from '../utils/logger'
import { SetState } from "../contexto/usContex";

export function useNotes() {
    const notes = useFechingNotes()
    // const { notes } = useContext(SetState)

    const mapNotes = notes?.map(el => (
        {
            id: el.id,
            content: el.content,
            complete: el.completed
        }
    ))

    return { notes: mapNotes }
}