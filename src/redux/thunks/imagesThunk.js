import { Alert } from 'react-native'
import * as API from '../../api'
import { addProduct, addProducts, deleteProduct, loadingCompany, loadingProducts, updateImageProduct, updateProduct } from '../slices'

export const storeImageProductThunk = (params) => {
    return async (dispatch, getState) => {
        try {
            dispatch(loadingProducts(true))
            const formData = new FormData()
            formData.append('folder', 'images')
            formData.append('image', params.image)
            formData.append('thumbnail', params.thumbnail)

            await API.postDB(`storeImageProduct/${params.product_id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then((resp) => {
                console.log("Se guardó la imagen")
            })

        } catch (error) {
            dispatch(loadingProducts(false))
        }
    }
}

export const updateImageProductThunk = (params) => {
    return async (dispatch, getState) => {
        try {
            const formData = new FormData()
            formData.append('folder', 'images')
            formData.append('image', params.image)
            formData.append('thumbnail', params.thumbnail)

            await API.postDB(`updateImageProduct/${params.product_id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })

        } catch (error) {
            dispatch(loadingProducts(false))
        }
    }
}

export const destroyImageProductThunk = (id) => {
    return async (dispatch, getState) => {
        let message = null
        try {
            await API.deleteDB(`products-user/${id}`)
            dispatch(deleteProduct(id))
        } catch (error) {
            message = 'Ocurrió un error inesperado!'
        }
        dispatch(loadingProducts(false))
        message ? Alert.alert('Mensaje Imágenes', message) : null
    }
}

export const storeLogoThunk = (params) => {
    return async (dispatch, getState) => {
        try {
            dispatch(loadingCompany(true))
            const formData = new FormData()
            formData.append('folder', 'logos')
            formData.append('image', params.image)
            formData.append('thumbnail', params.thumbnail)

            const data = await API.postDB(`storeLogo`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then((resp) => {
                console.log("Guardó el logo")
            })

        } catch (error) {
            dispatch(loadingCompany(false))
        }
    }
}