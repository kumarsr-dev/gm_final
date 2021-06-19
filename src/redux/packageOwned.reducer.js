import { PACAKGE_OWNED } from '../constant/types'


const totalPackages = []

export const packagesOwnedReducer = (state = totalPackages, action) => {
    switch (action.type) {
        case PACAKGE_OWNED:
            return [...state, action.payload]
            break;
        default:
            return state
    }
}