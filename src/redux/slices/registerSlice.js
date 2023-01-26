import { createSlice } from "@reduxjs/toolkit"

export const registerSlice = createSlice({
    name: 'register',
    initialState: {
        isLoading: false
    },
    reducers: {
        loadingRegister(state, action) {
            state.isLoading = action.payload
        },
    },
})

export const {
    loadingRegister,
} = registerSlice.actions