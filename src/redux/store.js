import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import categories from './slices/categoriesSlice'
import plants from './slices/plantsSlice'
import filtrados from './slices/filtradosSlice'

const reducer = combineReducers({
    categories,
    plants,
    filtrados
})

const store = configureStore({
    reducer,
})

export default store;