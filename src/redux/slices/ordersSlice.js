import { createSlice } from "@reduxjs/toolkit"

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: {},
        isLoading: true
    },
    reducers: {
        loadingOrders(state, action) {
            state.isLoading = action.payload
        },
        addOrders(state, action) {
            state.orders = action.payload
        }
    }
})

export const {
    loadingOrders,
    addOrders,
} = ordersSlice.actions