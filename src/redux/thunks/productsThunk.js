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
                datos.image = [{ thumbnail: params.thumbnail.uri }]
                dispatch(addProduct(datos))

                if (params?.thumbnail?.uri) {
                    dispatch(storeImageProductThunk(params))
                }

                dispatch(loadingProducts(false))
                navigator.navigate('Home')
                Alert.alert('Mensaje Productos', message)

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
console.log(1)
            dispatch(loadingProducts(true))
console.log(2)
            const data = await API.putDB(`products-user/${params.id}`, params)
console.log(3)
            const resp = await data?.data
console.log(4)
            const message = await resp.message
console.log(5)
            const datos = resp?.data
console.log(6)

            if (datos) {
console.log(7)
                const product_id = datos?.id
console.log(8)
                params.product_id = product_id
console.log(9)
                params.image = [{ thumbnail: params.thumbnail.uri }]
console.log(10)
                dispatch(updateProduct(params))
console.log(11)
                dispatch(loadingProducts(false))
console.log(12)
                navigator.navigate('Home')
console.log(13)
                Alert.alert('Mensaje Productos', message)

            } else {
console.log(14)
                dispatch(loadingProducts(false))
console.log(15)
                dispatch(imageLoading({ product_id: 0, loading: false }))
console.log(16)
            }
        } catch (error) {
console.log(17)
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