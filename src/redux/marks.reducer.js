import { ANSWER, MARKED, VISITED } from '../constant/types'


const initalMarks = []

export const marksReducer = (state = initalMarks, action) => {
    switch(action.type) {
        case ANSWER:
            return [...state, action.payload]
            break;
        case MARKED:
            return [...state, action.payload]
            break;
        case VISITED:
            console.log(action.payload)
            return [...state, action.payload]
            break;
        default:
            return state
    }
}