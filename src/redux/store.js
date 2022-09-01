import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import categories from './slices/categoriesSlice'
import plants from './slices/plantsSlice'
import filtrados from './slices/filtradosSlice'
import token from './slices/tokenSlice'

const reducer = combineReducers({
    categories,
    plants,
    filtrados,
    token
})

const store = configureStore({
    reducer,
})

export default store;