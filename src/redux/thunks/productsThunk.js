import { Alert } from 'react-native'
import * as API from '../../api'
import { addProduct, addProducts, deleteProduct, loadingProducts, updateProduct } from '../slices'

export const getProducts = (page = 0) => {
    return async (dispatch, getState) => {
        dispatch(loadingProducts(true))
        const data = await API.getDB(`products-user`)
        const resp = await data.data.data
        dispatch(addProducts(resp))
        dispatch(loadingProducts(false))
    }
}

export const storeProductThunk = (params) => {
    return async (dispatch, getState) => {
        let message = null
        try {
            dispatch(loadingProducts(true))
            const data = await API.postDB(`products-user`, params)
            const resp = await data?.data
            message = resp?.message
            dispatch(addProduct(resp?.data))
            dispatch(loadingProducts(false))
        } catch (error) {
            message = 'Ocurrió un error inesperado!'
        }
        message ? Alert.alert('Mensaje', message) : null
    }
}

export const updateProductThunk = (params) => {
    return async (dispatch, getState) => {
        let message = null
        try {
            dispatch(loadingProducts(true))
            const data = await API.putDB(`products-user/${params.id}`, params)
            const resp = await data?.data
            message = resp?.message
            dispatch(updateProduct(resp?.data))
            dispatch(loadingProducts(false))
        } catch (error) {
            message = 'Ocurrió un error inesperado!'
        }
        message ? Alert.alert('Mensaje', message) : null
    }
}

export const destroyProductThunk = (id) => {
    return async (dispatch, getState) => {
        let message = null
        try {
            dispatch(loadingProducts(true))
            await API.deleteDB(`products-user/${id}`)
            dispatch(deleteProduct(id))
            dispatch(loadingProducts(false))
        } catch (error) {
            message = 'Ocurrió un error inesperado!'
        }
        message ? Alert.alert('Mensaje', message) : null
    }
}