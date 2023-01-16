import { Alert } from 'react-native'
import * as API from '../../api'
import { addProduct, addProducts, deleteProduct, loadingProducts, updateProduct } from '../slices'
import { storeImageProductThunk } from './imagesThunk'

export const getProducts = (page = 0) => {
    return async (dispatch, getState) => {
        dispatch(loadingProducts(true))
        const data = await API.getDB(`products-user`)
        const resp = await data.data.data
        dispatch(addProducts(resp))
        dispatch(loadingProducts(false))
    }
}

export const storeProductThunk = (params, navigator) => {
    return async (dispatch, getState) => {
        let message = null
        try {
            dispatch(loadingProducts(true))
            const data = await API.postDB(`products-user`, params)
            const resp = await data?.data

            if (resp?.data) {
                message = resp?.message
                params.product_id = resp?.data?.id
                dispatch(addProduct(resp?.data))
                dispatch(storeImageProductThunk(params)).then(() => {
                    dispatch(loadingProducts(false))
                    navigator.navigate('Home')
                    Alert.alert('Mensaje Productos', message)
                })
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log("Entró el error")
            dispatch(loadingProducts(false))
        }
    }
}

export const updateProductThunk = (params, navigator) => {
    return async (dispatch, getState) => {
        let message = null
        try {
            dispatch(loadingProducts(true))
            const data = await API.putDB(`products-user/${params.id}`, params)
            const resp = await data?.data
            if (resp?.data) {
                message = resp?.message
                params.product_id = resp?.data?.id
                dispatch(updateProduct(resp?.data))
                dispatch(storeImageProductThunk(params)).then(() => {
                    dispatch(loadingProducts(false))
                    navigator.navigate('Home')
                    Alert.alert('Mensaje Productos', message)
                })
            }
        } catch (error) {
            dispatch(loadingProducts(false))
        }
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
        message ? Alert.alert('Mensaje Productos', message) : null
    }
}