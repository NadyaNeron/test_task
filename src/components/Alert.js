import React, {useContext} from "react";
import {CSSTransition} from'react-transition-group';
import { AlertContext } from "../context/alert/alertContext";

export const Alert = () => {
    const {alert,hide} = useContext(AlertContext)

    if(!alert.visible ){
        return null 
    }
    return (
        <CSSTransition
            in={alert.visible}
            timeout={750}
            classNames={'alert'}
            mountOnEnter
            unmountOnExit

        >
            <div className={`alert alert-${alert.type || 'warning'} alert-dismissible fade show`} >
                <strong>Внимание!</strong> 
                &nbsp;{alert.text}&nbsp;
                <button onClick={hide} type="button" className={`btn btn-outline-${alert.type || 'warning'} btn-sm`} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </CSSTransition>
    )
}