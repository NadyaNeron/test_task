import React, { useReducer } from "react";
import axios from "axios";
import { FirebaseContext } from "./firebaseContext";
import { firebaseReducer } from "./firebaseReducer";
import { ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER } from "../types";
const url = process.env.REACT_ARR_DB_URL

export const FirebaseState = ({ children }) => {
    const initialState = {
        notes: [],
        loading: false
    }
    const [state, dispatch] = useReducer(firebaseReducer, initialState)

    const showLoader = () => dispatch({ type: SHOW_LOADER})

    const fetchNotes = async () => {
        showLoader()
        // res = response
        const res = await axios.get(`${url}/notes.json`)

        console.log('fetchNotes', res.data)
    }

    const addNote = async (title) => {
        const note = {
            title, date: new Date().toJSON()
        }

        const res = await axios.post(`${url}/notes.json`, note)

        console.log('addNote', res.data)
    }

    const removeNote = async id => {
        await axios.delete(`${url}/notes/${id}.json`)

        dispatch({
            type: REMOVE_NOTE,
            payload: id
        })
    }

    return (
        <FirebaseContext.Provider value={{
            loading: state.loading,
            notes: state.notes,
            showLoader, addNote, fetchNotes, removeNote
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}