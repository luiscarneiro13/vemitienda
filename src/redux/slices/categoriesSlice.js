import { createSlice } from "@reduxjs/toolkit"

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        isLoading: false
    },
    reducers: {
        loadingCategories(state, action) {
            state.isLoading = action.payload
        },
        addCategories(state, action) {
            state.isLoading = false
            state.categories = action.payload
        },
        addCategory(state, action) {
            state.categories.unshift(action.payload)
        },
        updateCategory(state, action) {
            const index = state.categories.findIndex(item => item.id === action.payload.id)
            state.categories[index] = action.payload
        },
        deleteCategory(state, action) {
            const id = action.payload
            state.categories = state.categories.filter(item => item.id !== id)
        },
    },
})

export const {
    loadingCategories,
    addCategories,
    addCategory,
    updateCategory,
    deleteCategory
} = categoriesSlice.actions