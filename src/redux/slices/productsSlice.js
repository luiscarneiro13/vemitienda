import { createSlice } from "@reduxjs/toolkit"

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        isLoading: false
    },
    reducers: {
        loadingProducts(state, action) {
            state.isLoading = action.payload
        },
        addProducts(state, action) {
            state.isLoading = false
            state.products = action.payload
        },
        addProduct(state, action) {
            state.products.unshift(action.payload)
        },
        updateProduct(state, action) {
            const index = state.products.findIndex(item => item.id === action.payload.id)
            state.products[index] = action.payload
        },
        deleteProduct(state, action) {
            const id = action.payload
            state.products = state.products.filter(item => item.id !== id)
        },
    },
})

export const {
    loadingProducts,
    addProducts,
    addProduct,
    updateProduct,
    deleteProduct
} = productsSlice.actions