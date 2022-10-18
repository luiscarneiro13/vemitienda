import { createSlice } from "@reduxjs/toolkit"

export const companySlice = createSlice({
    name: 'company',
    initialState: {
        company: {},
        isLoading: true
    },
    reducers: {
        loadingCompany(state, action) {
            state.isLoading = action.payload
        },
        addCompany(state, action) {
            state.company = action.payload
        }
    },
})

export const {
    loadingCompany,
    addCompany,
} = companySlice.actions