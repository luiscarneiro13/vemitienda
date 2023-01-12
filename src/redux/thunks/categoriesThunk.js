import { Alert } from 'react-native'
import * as API from '../../api'
import { addCategories, loadingCategories, updateCategory, addCategory, deleteCategory, showCategory } from '../slices'

export const getCategoriesThunk = (page = 0) => {
    return async (dispatch, getState) => {
        dispatch(loadingCategories(true))
        const data = await API.getDB(`categories`)
        const resp = await data?.data?.data
        dispatch(addCategories(resp))
        dispatch(loadingCategories(false))
    }
}

export const getCategoryThunk = (id) => {
    return async (dispatch, getState) => {
        dispatch(loadingCategories(true))
        const data = await API.getDB(`categories/+${id}`)
        const resp = await data?.data?.data
        dispatch(showCategory(resp))
        dispatch(loadingCategories(false))
    }
}

export const updateCategoryThunk = (params) => {
    return async (dispatch, getState) => {
        let message = null
        try {
            dispatch(loadingCategories(true))
            const data = await API.putDB(`categories/${params.id}`, params)
            const resp = await data?.data
            message = resp?.message
            dispatch(updateCategory(resp.data))
            dispatch(loadingCategories(false))
        } catch (error) {
            message = 'Ocurrió un error inesperado!'
        }
        message ? Alert.alert('Mensaje', message) : null
    }
}

export const storeCategoryThunk = (params) => {
    return async (dispatch, getState) => {
        dispatch(loadingCategories(true))
        const data = await API.postDB(`categories`, params)
        const resp = await data?.data?.data
        dispatch(addCategory(resp))
        dispatch(loadingCategories(false))
    }
}

export const destroyCategoryThunk = (id) => {
    return async (dispatch, getState) => {
        let message = null
        try {
            dispatch(loadingCategories(true))
            await API.deleteDB(`categories/${id}`)
            dispatch(deleteCategory(id))
            dispatch(loadingCategories(false))
        } catch (error) {
            message = 'Ocurrió un error inesperado!'
        }
        message ? Alert.alert('Mensaje', message) : null
    }
}