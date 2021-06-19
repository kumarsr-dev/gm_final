import { combineReducers, createStore } from "redux";
import { marksReducer } from './marks.reducer';
import { packagesOwnedReducer } from './packageOwned.reducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


export const allReducers = combineReducers({
    marksReducer: marksReducer,
    packagesOwnedReducer: packagesOwnedReducer
})

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, allReducers)
 
export const store = createStore(persistedReducer)
export const persistor = persistStore(store)