import React, { useContext } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { AlertContext } from "../context/alert/alertContext";

export const Notes = ({notes, onRemove}) => {
    const alert = useContext(AlertContext)

    return(
    <TransitionGroup component="ul" className="list-group">
        {notes?.map(note=>(
            <CSSTransition
                key={Node.id}
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