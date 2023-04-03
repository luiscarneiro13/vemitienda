import { createSlice } from "@reduxjs/toolkit"

export const themesSlice = createSlice({
    name: 'themes',
    initialState: {
        themes: [],
        isLoading: false
    },
    reducers: {
        loadingThemes(state, action) {
            state.isLoading = action.payload
        },
        addThemes(state, action) {
            state.isLoading = false
            state.themes = action.payload
        },
    },
})

export const {
    loadingThemes,
    addThemes,
} = themesSlice.actions