import { createSlice } from "@reduxjs/toolkit"

const todas = [{ id: 0, name: 'Todas' }]

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: [],
    reducers: {
        addCategories(state, action) {
            return action.payload
        },
        addCategory(state, action) {
            state.push(action.payload)
        },
        updateCategory(state, action) {
            return state.map(item => {
                if (item.id === action.payload.id) {
                    item = action.payload
                }
                return item
            })
        },
        deleteCategory(state, action) {
            const id = action.payload;
            return state.filter(item => item.id !== id);
        },
    },
})

// Se extraen los actions creator y el reducer
const { actions, reducer } = categoriesSlice

// Extrae y se exporta cada action creator por nombre
export const { addCategories, addCategory, updateCategory, deleteCategory } = actions

// Export the reducer, either as a default or named export
export default reducer