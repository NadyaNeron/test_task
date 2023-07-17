import React from "react";

export const Alert = ({alert}) => {
    if(!alert){
        return null 
    }
    return (
        <div class="alert alert-warning alert-dismissible fade show">
            <strong>Внимание!</strong>
            {alert.text} 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}