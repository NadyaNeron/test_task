import React, { useContext } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { AlertContext } from "../context/alert/alertContext";
import { NotesContext } from "../context/notes/notesContext";
import axios from 'axios'

const url = process.env.REACT_APP_DB_URL

export const Notes = ({notes, onRemove}) => {
    const alert = useContext(AlertContext)
    const state = useContext(NotesContext)
 
    return(
    <TransitionGroup component="ul" className="list-group">
        {notes?.sort(state.sortNotes)?.map(note => (
        
            <CSSTransition
                onDragStart={(e) => state.dragStartHandler(e, note)}
                onDragLeave={(e) => state.dragEndHandler(e)}
                onDragEnd={(e) => state.dragEndHandler(e)}
                onDragOver={(e) => state.dragOverHandler(e)}
                onDrop={(e) => state.dropHandler(e,note)}
                draggable={true}

                key={note.id}
                classNames={'note'}
                timeout={800}
            >
                <li className="list-group-item note" key={note.id}>
                    <div>
                        <strong>{note.title}</strong>
                        <span>{note.date}</span>
                    </div>                 
                        <button 
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => {
                                onRemove(note.id)
                                alert.show('Заметка была удалена', 'warning')
                            }}
                        >
                            &times;
                        </button>
                </li>
            </CSSTransition>
        ))}
    </TransitionGroup>
    )
}