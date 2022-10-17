import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'

import { categoriesSlice, productsSlice, tokenSlice } from './slices/'

const combinedReducer = combineReducers({
    categories: categoriesSlice.reducer,
    token: tokenSlice.reducer,
    products: productsSlice.reducer,
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