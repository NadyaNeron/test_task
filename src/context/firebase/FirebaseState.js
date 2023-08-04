import React, { useReducer, useState } from "react";
import axios from "axios";
import { FirebaseContext } from "./firebaseContext";
import { firebaseReducer } from "./firebaseReducer";
import { ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER } from "../types";
const url = process.env.REACT_APP_DB_URL

export const FirebaseState = ({ children }) => {
    let orderCounter = 0

    if (!sessionStorage.getItem('number')) sessionStorage.setItem('number', orderCounter);
    else orderCounter = sessionStorage.getItem('number');

    const [n, setN] = useState([])
    console.log(setN)
    const initialState = {
        notes: n,
        setNotes:setN,
        loading: true
    }
    const [state, dispatch] = useReducer(firebaseReducer, initialState)

    const showLoader = () => dispatch({type: SHOW_LOADER})

    const fetchNotes = async () => {
        showLoader()
        // res = response
        const res = await axios.get(`${url}/notes.json`)
        console.log(res.data)

        if (res.data === null){
            addNote("DefaultNote")
        }


        const payload = Object.keys(res.data).map(key => {
            return {
                ...res.data[key],
                id:key
            }
        })


        dispatch({type: FETCH_NOTES, payload })
    }

    const addNote = async (title) => {
        const note = {
            title, date: new Date().toJSON(), order: orderCounter
        }

        try {
            const res = await axios.post(`${url}/notes.json`, note)
            const payload = {
                ...note,
                id: res.data.name
            }
            
            orderCounter++
            sessionStorage.setItem('number', orderCounter)

            dispatch({type: ADD_NOTE,payload})
        } catch (e) {
            throw new Error(e.message)
        }
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
            setNotes:state.setNotes,
            showLoader, addNote, fetchNotes, removeNote
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}