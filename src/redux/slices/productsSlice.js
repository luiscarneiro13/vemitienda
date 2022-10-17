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
            state.products.push(action.payload)
        },
        updateProduct(state, action) {
            return state.products.map(item => {
                if (item.id === action.payload.id) {
                    item = action.payload
                }
                return item
            })
        },
        deleteProduct(state, action) {
            const id = action.payload;
            return state.products.filter(item => item.id !== id);
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