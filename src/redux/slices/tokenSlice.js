import { createSlice } from "@reduxjs/toolkit"

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: null,
        isLoading: false
    },
    reducers: {
        addToken(state, action) {
            state.token = action.payload
        },
        deleteToken(state, action) {
            state.token = null
        },
        loadingToken(state, action) {
            state.isLoading = action.payload
        },
    },
})

export const {
    addToken,
    deleteToken,
    loadingToken,
} = tokenSlice.actions