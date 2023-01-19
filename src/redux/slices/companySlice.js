import { createSlice } from "@reduxjs/toolkit"

export const companySlice = createSlice({
    name: 'company',
    initialState: {
        company: {},
        isLoading: true,
        templates:[]
    },
    reducers: {
        loadingCompany(state, action) {
            state.isLoading = action.payload
        },
        addCompany(state, action) {
            state.company = action.payload
        },
        addTemplates(state, action) {
            state.templates = action.payload
        },
        updateLogo(state, action) {
            state.company.logo = action.payload
        },
    },
})

export const {
    loadingCompany,
    addCompany,
    addTemplates,
    updateLogo
} = companySlice.actions