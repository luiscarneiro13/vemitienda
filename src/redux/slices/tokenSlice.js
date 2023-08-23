import { createSlice } from "@reduxjs/toolkit"

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: null,
        isLoading: false,
        plan_id: 1, //plan free por defecto,
        email: '',
        onboarding: 0,
    },
    reducers: {
        addToken(state, action) {
            state.token = action.payload.token
            state.onboarding = action.payload.onboarding
        },
        addEmail(state, action) {
            state.email = action.payload
        },
        addPlanId(state, action) {
            state.plan_id = action.payload
        },
        deleteToken(state, action) {
            state.token = null
            state.onboarding = 0
        },
        loadingToken(state, action) {
            state.isLoading = action.payload
        },
        addOnboarding(state, action) {
            state.onboarding = action.payload
        },
    },
})

export const {
    addToken,
    deleteToken,
    loadingToken,
    addPlanId,
    addEmail,
    addOnboarding,
} = tokenSlice.actions