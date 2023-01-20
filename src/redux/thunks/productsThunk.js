import { Alert } from 'react-native'
import * as API from '../../api'
import { addProduct, addProducts, deleteProduct, imageLoading, loadingProducts, productsFilters, updateImageProduct, updateProduct } from '../slices'
import { storeImageProductThunk, updateImageProductThunk } from './imagesThunk'

export const getProducts = (page = 0) => {
    return async (dispatch, getState) => {
        dispatch(loadingProducts(true))
        const data = await API.getDB(`products-user`)
        const resp = await data.data.data
        dispatch(addProducts(resp))
        dispatch(productsFilters(resp))
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
            const message = await resp.message
            const datos = resp?.data

            if (datos) {
                const product_id = datos.id
                params.product_id = product_id
                dispatch(storeImageProductThunk(params)).then(() => {
                    dispatch(getProducts()).then(() => {
                        dispatch(loadingProducts(false))
                        navigator.navigate('Home')
                        Alert.alert('Mensaje Productos', message)
                    })
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

        try {
            dispatch(loadingProducts(true))
            const data = await API.putDB(`products-user/${params.id}`, params)
            const resp = await data?.data
            const message = await resp.message
            const datos = resp?.data

            if (datos) {
                const product_id = datos?.id
                params.product_id = product_id
                if (params.imagenCargada) {
                    dispatch(updateImageProductThunk(params)).then(() => {
                        dispatch(getProducts()).then(() => {
                            dispatch(loadingProducts(false))
                            navigator.navigate('Home')
                            Alert.alert('Mensaje Productos', message)
                        })
                    })
                }else{
                    dispatch(getProducts()).then(() => {
                        dispatch(loadingProducts(false))
                        navigator.navigate('Home')
                        Alert.alert('Mensaje Productos', message)
                    })
                }
            } else {
                dispatch(loadingProducts(false))
                dispatch(imageLoading({ product_id: 0, loading: false }))
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