import { createSlice } from "@reduxjs/toolkit"

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: null,
        isLoading: false,
        plan_id: 1 //plan free por defecto
    },
    reducers: {
        addToken(state, action) {
            state.token = action.payload
        },
        addPlanId(state, action) {
            state.plan_id = action.payload
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
    addPlanId,
} = tokenSlice.actions