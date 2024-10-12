import { createContext, useContext, useEffect, useState } from "react";
import { cl } from "../utils/logger";
import { useFechingNotes } from "../service/useFechingNotes";

export const SetState = createContext()

export function BrowState({children}) {
    const [click, setClick] = useState(false)
    const [notes, setNotes] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ theme, setTheme] = useState('light')

    const html = document.querySelector('html')
    html.setAttribute('data-theme', theme)

    const newTheme = async () => {
        if (
            window.matchMedia &&
            window.matchMedia(`(prefers-color-scheme: dark)`).matches
        ) {
            return setTheme('dark')
        } else {
            return setTheme('light')
        }
    }

    
    useEffect(() => {
        newTheme()
    },[])
    
    window.matchMedia(`(prefers-color-scheme: ${theme})`).addEventListener('change', () => {
        newTheme()
    })

    return (
        <SetState.Provider value={{
            click:click, setClick:setClick,
            notes:notes, setNotes: setNotes,
            theme: theme, setTheme: setTheme,
            loading: loading, setLoading: setLoading
        }}>
            {children}
        </SetState.Provider>
    )
}