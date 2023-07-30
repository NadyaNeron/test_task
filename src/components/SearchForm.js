import React, {useState, useContext} from "react";

export const SearchForm = () => {
    const [value, setValue] = useState('')


    const submitHandler = event => {
        event.preventDefault()

        if (value.trim()){
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