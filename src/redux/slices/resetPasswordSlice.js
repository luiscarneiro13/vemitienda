import { createSlice } from "@reduxjs/toolkit"

export const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState: {
        isLoading: false,
        user: {}
    },
    reducers: {
        loadingResetPassword(state, action) {
            state.isLoading = action.payload
        },
        addUserPassword(state, action) {
            state.user = action.payload
        },
    },
})

export const {
    loadingResetPassword,
    addUserPassword,
} = resetPasswordSlice.actions