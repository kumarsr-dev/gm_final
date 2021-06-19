import { PACAKGE_OWNED } from '../constant/types'

export const packageAction = (data) => {
    return ({
        type: PACAKGE_OWNED,
        payload: data
    })
}
