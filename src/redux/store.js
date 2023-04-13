import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'

import { categoriesSlice, productsSlice, tokenSlice, companySlice, registerSlice, resetPasswordSlice, themesSlice, ordersSlice, userInfoSlice } from './slices/'

const combinedReducer = combineReducers({
    categories: categoriesSlice.reducer,
    token: tokenSlice.reducer,
    products: productsSlice.reducer,
    company: companySlice.reducer,
    register: registerSlice.reducer,
    resetPassword: resetPasswordSlice.reducer,
    themes: themesSlice.reducer,
    orders: ordersSlice.reducer,
    userInfo: userInfoSlice.reducer,
})

const rootReducer = (state, action) => {
    if (action.type === 'deleteToken') {
        state = {
            categories: {
                categories: [],
                isLoading: false
            },
            company: {
                company: {},
                isLoading: true,
                templates: []
            },
            products: {
                products: [],
                isLoading: false,
                imageLoading: {
                    product_id: 0,
                    loading: false
                },
                productsFilters: []
            },
            userInfo: {
                userInfo: {},
                isLoading: false
            },
            token: {
                token: null,
                isLoading: false
            }
        }
    }
    return combinedReducer(state, action);
};

export default configureStore({
    reducer: rootReducer,
    devTools: composeWithDevTools,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware() //Para cerrar sesión sin problemas
})