import { Alert } from 'react-native'
import * as API from '../../api'
import { addProduct, addProducts, deleteProduct, loadingProducts, updateImageProduct, updateProduct } from '../slices'

export const storeImageProductThunk = (params) => {
    return async (dispatch, getState) => {
        try {
            dispatch(loadingProducts(true))
            const formData = new FormData()
            formData.append('folder', 'images')
            formData.append('image', params.image)

            const data = await API.postDB(`storeImageProduct/${params.product_id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })

            const resp = await data?.data

            if (resp?.data) {
                const datos = resp?.data
                datos.product_id = params.product_id
                dispatch(updateImageProduct(datos))
            }

        } catch (error) {
            dispatch(loadingProducts(false))
        }
    }
}

export const updateImageProductThunk = (params) => {
    return async (dispatch, getState) => {
        try {
            dispatch(loadingProducts(true))
            const formData = new FormData()
            formData.append('folder', 'images')
            formData.append('image', params.image)

            const data = await API.postDB(`updateImageProduct/${params.product_id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })

            const resp = await data?.data

            if (resp?.data) {
                const datos = resp?.data
                dispatch(updateImageProduct(datos))
            }

        } catch (error) {
            dispatch(loadingProducts(false))
        }
    }
}

export const destroyImageProductThunk = (id) => {
    return async (dispatch, getState) => {
        let message = null
        try {
            dispatch(loadingProducts(true))
            await API.deleteDB(`products-user/${id}`)
            dispatch(deleteProduct(id))
        } catch (error) {
            message = 'Ocurrió un error inesperado!'
        }
        dispatch(loadingProducts(false))
        message ? Alert.alert('Mensaje Imágenes', message) : null
    }
}