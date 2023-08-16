import React, {useState, useReducer, useContext, useEffect} from "react";
import { NotesContext } from "./notesContext";
import { notesReducer } from "./notesReducer";
import { SET_NOTES, REPLACE_STATE } from "../types";
import { AlertContext } from "../alert/alertContext";
import { FirebaseContext } from "../firebase/firebaseContext";
import axios from "axios";


const url = process.env.REACT_APP_DB_URL

export const NotesState = ({children}) => {
    const firebase = useContext(FirebaseContext)

    const initialState = {notes: []}

    const [state,dispatch] = useReducer(notesReducer, {initialState})

    useEffect(() => {
        if (firebase.notes) {
            const payload = {notes: firebase.notes}
          dispatch({ type: "REPLACE_STATE", payload});
        }
      }, [firebase.notes]);


    const [currentNote, setCurrentNote] = useState(null)

    function dragStartHandler(e, note) {
        setCurrentNote(note)
        console.log('Note Order:',note.order)
    }

    function dragEndHandler(e) {
        e.target.style.background = 'white'
    }

    function dragOverHandler(e) {
        e.preventDefault()
        e.target.style.background = 'lightgray'
    }

    async function dropHandler(e, note) {
        try{
            await axios.put(`${url}/notes/${note.id}/order.json`,currentNote.order)
            await axios.put(`${url}/notes/${currentNote.id}/order.json`, note.order)

            const payload = {
                note: note,
                currentNote: currentNote
            }
            console.log(payload)
            dispatch({type: SET_NOTES,payload})
            console.log('state after dropping', state)  
    
            e.target.style.background = 'white'
        } catch(e) {
            throw new Error(e.message)
        }
    }


    const sortNotes = (a,b) => {
        if(a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    return(
        <NotesContext.Provider value = {{
            dragEndHandler, dragOverHandler, dragStartHandler,dropHandler, sortNotes,
            notes: state.notes
        }}>
            {children}
        </NotesContext.Provider>
    )
}