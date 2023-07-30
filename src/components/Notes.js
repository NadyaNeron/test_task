import React, { useContext, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { AlertContext } from "../context/alert/alertContext";

export const Notes = ({notes, onRemove}) => {
    const alert = useContext(AlertContext)

    const[Ntes, setNotes] = useState([])

    const [currentNote, setCurrentNote] = useState(null)

    function dragStartHandler(e, note) {
        setCurrentNote(note)
        console.log(note.order)
    }

    function dragEndHandler(e) {
        e.target.style.background = 'white'
    }

    function dragOverHandler(e) {
        e.preventDefault()
        e.target.style.background = 'lightgray'
    }

    function dropHandler(e, note) {
        e.preventDefault()
        setNotes(notes?.map(n =>{
            if (n.id === note.id){
                return {...n, order: currentNote.order}
            }
            if (n.id === currentNote.id) {
                return {...n, order: note.order}
            }
            return n
        }))
        e.target.style.background = 'white'
    }

    const sortNotes = (a,b) => {
        if(a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    return(
    <TransitionGroup component="ul" className="list-group">
        {notes?.sort(sortNotes).map(note => (
            <CSSTransition
                onDragStart={(e) => dragStartHandler(e, note)}
                onDragLeave={(e) => dragEndHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e,note)}
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