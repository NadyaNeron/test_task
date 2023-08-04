import React,{Fragment, useContext, useEffect} from 'react';
import {Form} from '../components/Form';
import  {Notes}  from '../components/Notes';
import { FirebaseContext } from '../context/firebase/firebaseContext';
import { Loader } from '../components/loader';

export const Home = () => {
    const firebase = useContext(FirebaseContext)

    useEffect (() => {
        firebase.fetchNotes()
        // eslint-disable-next-line
    }, [])    

    return (
        <Fragment>
            <h1>Home page</h1>
            <Form />

            <hr/>

            {firebase.loading
                ? <Loader />
                : <Notes notes={firebase.notes} onRemove={firebase.removeNote} setNotes={firebase.setNotes} />
            }

        </Fragment>
    )
}