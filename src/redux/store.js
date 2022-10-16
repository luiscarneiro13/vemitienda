import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'

import { categoriesSlice } from './slices/'
import { tokenSlice } from './slices/tokenSlice'

const combinedReducer = combineReducers({
    categories: categoriesSlice.reducer,
    token: tokenSlice.reducer,
})

const rootReducer = (state, action) => {
    if (action.type === 'logout') {
        state = undefined
    }
    return combinedReducer(state, action);
};

export default configureStore({
    reducer: rootReducer,
    devTools: composeWithDevTools,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware() //Para cerrar sesión sin problemas
})