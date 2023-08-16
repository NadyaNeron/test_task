import { SET_NOTES, REPLACE_STATE} from "../types"

const handlers = {
    [SET_NOTES]: (state, {payload}) => ({
        ...state,
        notes: state.notes.map(n =>{
            if (n.id === payload.note.id){
                return {...n, order: payload.currentNote.order}
            }
            if (n.id === payload.currentNote.id) {
                return {...n, order: payload.note.order}
            }
            return n
        })
    }),
    [REPLACE_STATE]: (state, {payload}) => ({
            notes: payload.notes
    }),
    DEFAULT: state => state
}

export const notesReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}