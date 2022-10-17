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
            state.categories.push(action.payload)
        },
        updateCategory(state, action) {
            return state.categories.map(item => {
                if (item.id === action.payload.id) {
                    item = action.payload
                }
                return item
            })
        },
        deleteCategory(state, action) {
            const id = action.payload;
            return state.categories.filter(item => item.id !== id);
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