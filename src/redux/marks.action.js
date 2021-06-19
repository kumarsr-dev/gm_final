import { ANSWER, MARKED, VISITED, CLEAR_RESPONSE } from '../constant/types'

export const asnwerAction = (id, ans, mark = false) => {
    return ({
        type: ANSWER,
        payload: {
            question_id : id,
            answer_send : ans,
            marked : mark,
            visited : false
        }
    })
}

export const markedAction = (id) => {
    return ({
        type: MARKED,
        payload: {
            question_id : id,
            answer_send : null,
            marked : true,
            visited : true
        }
    })
}

export const visitedAction = (id) => {
    return ({
        type: VISITED,
        payload: {
            question_id : id,
            answer_send : null,
            marked : false,
            visited : true
        }
    })
}

export const clearAnswer = (id) => {
    return ({
        type: CLEAR_RESPONSE,
        payload: {
            question_id : id,
            answer_send : null,
            marked : false,
            visited : true
        }
    })
}



