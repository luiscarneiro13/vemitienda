import { createSlice } from "@reduxjs/toolkit"

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        isLoading: false,
        imageLoading: {
            product_id: 0,
            loading: false
        }
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
        updateImageProduct(state, action) {
            const index = state.products.findIndex(item => item.id === action.payload.product_id)
            state.products[index].image = [action.payload]
        },
        imageLoading(state, action) {
            state.imageLoading = action.payload
        }
    }
})

export const {
    loadingProducts,
    addProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    updateImageProduct,
    imageLoading
} = productsSlice.actions