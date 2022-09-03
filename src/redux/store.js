import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import categories from './slices/categoriesSlice'
import plants from './slices/plantsSlice'
import filtrados from './slices/filtradosSlice'
import token from './slices/tokenSlice'
import userInformation from './slices/userInformationSlice'

const combinedReducer = combineReducers({
    categories,
    plants,
    filtrados,
    token,
    userInformation
})

const rootReducer = (state, action) => {
    if (action.type === 'logout') {
        state = undefined
    }
    return combinedReducer(state, action);
};

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware() //Para cerrar sesión sin problemas
})