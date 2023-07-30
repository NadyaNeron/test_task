import React, {useState, useContext} from "react";
import { AlertContext } from "../context/alert/alertContext";

export const SearchForm = () => {
    const [value, setValue] = useState('')
    const alert = useContext(AlertContext)


    const submitHandler = event => {
        event.preventDefault()

        if (value.trim()){
            setValue('')
        } else {
            alert.show('Введите название запроса')
        }
}
    
    return (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <input
                    type='text'
                    className="form-control"
                    placeholder="Введите название запроса"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            </div>
        </form>
    )
}