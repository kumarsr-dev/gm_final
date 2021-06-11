import { ANSWER, MARKED, VISITED } from '../constant/types'

export const asnwerAction = (id, ans) => {
    return ({
        type: ANSWER,
        payload: {
            qid : id,
            answer : ans,
            marked : false,
            visited : true
        }
    })
}

export const markedAction = (id, mark) => {
    return ({
        type: MARKED,
        payload: {
            qid : id,
            answer : null,
            marked : mark,
            visited : true
        }
    })
}

export const visitedAction = (id) => {
    return ({
        type: VISITED,
        payload: {
            qid : id,
            answer : false,
            marked : false,
            visited : true
        }
    })
}



