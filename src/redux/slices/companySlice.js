import { createSlice } from "@reduxjs/toolkit"

export const companySlice = createSlice({
    name: 'company',
    initialState: {
        company: {},
        isLoading: false
    },
    reducers: {
        loadingCompany(state, action) {
            state.isLoading = action.payload
        },
        addCompany(state, action) {
            state.company = action.payload
        },
        updateLogo(state, action) {
            state.company.logo = action.payload
        },
    },
})

export const {
    loadingCompany,
    addCompany,
    updateLogo
} = companySlice.actions