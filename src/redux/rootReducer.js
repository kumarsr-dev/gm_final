import { combineReducers } from "redux";
import { marksReducer } from './marks.reducer';


export const allReducers = combineReducers({
    marksReducer: marksReducer
})