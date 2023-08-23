import { createSlice } from "@reduxjs/toolkit"

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        userInfo: {},
        isLoading: false,
        entrar: false,
    },
    reducers: {
        addUserInfo(state, action) {
            state.userInfo = action.payload
        },
        addEntrar(state, action) {
            state.entrar = action.payload
        },
        loadingUserInfo(state, action) {
            state.isLoading = action.payload
        }
    },
})

export const {
    addUserInfo,
    loadingUserInfo,
    addEntrar,
} = userInfoSlice.actions