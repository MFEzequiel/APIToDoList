import { useContext } from "react"
import { useCreateNewNote } from "../Hooks/useCreateNote"
import { SetState } from "../contexto/usContex"

export function Header() {
    const { addNote, handleTheme} = useCreateNewNote()
    const { theme } = useContext(SetState)

    return (
        <header className="header">
            <button onClick={handleTheme} >{ theme }</button>
            <form onSubmit={addNote} className="header-form">
                <input type="text" name="note" className="form-input" />
                <button className="form-button">Guardar</button>
            </form>
        </header>    
    )
}