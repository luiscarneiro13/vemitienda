import { createSlice } from "@reduxjs/toolkit"

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        userInfo: {},
        isLoading: false,
        onboarding: 0
    },
    reducers: {
        addUserInfo(state, action) {
            state.userInfo = action.payload
        },
        addOnboarding(state, action) {
            state.onboarding = action.payload
        },
        loadingUserInfo(state, action) {
            state.isLoading = action.payload
        }
    },
})

export const {
    addUserInfo,
    loadingUserInfo,
    addOnboarding,
} = userInfoSlice.actions