import { useContext, useState } from "react";
import { useLogicButtonOfNotes } from "../Hooks/useLogicBtOfNotes";
import { SetState } from "../contexto/usContex";

export function CompNota({ isComplete, text ,id}) {
    const className = `paragraph ${isComplete ? 'complete' : ''}`
    const { handleClick, toggleComplete, deleteNote } = useLogicButtonOfNotes(id)
    const { click } = useContext(SetState)

    return (
        <article className='cardNotes'>
        <button className='cardNotes-button-completed' onClick={toggleComplete}>
            {isComplete ? '☑️' : '🥡'}
        </button>
        <p className={className}>{text}</p>
        <button className='cardNotes-button-delete' onClick={deleteNote}>x</button>
        <button onClick={handleClick} disabled={click}>👈</button>
        </article>
    )    
}