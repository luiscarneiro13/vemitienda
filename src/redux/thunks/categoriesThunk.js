import * as API from '../../api'
import { addCategories, loadingCategories } from '../slices'

export const getCategories = (page = 0) => {
    return async (dispatch, getState) => {
        dispatch(loadingCategories(true))
        const data = await API.getAll(`categorias`)
        const resp = await data.data.data
        dispatch(addCategories(resp))
        dispatch(loadingCategories(false))
    }
}

export const updateCategory = (page = 0) => {
    // return async (dispatch, getState) => {
    //     dispatch(startLoadingCategories())
    //     const data = await API.putDB(`categorias`)
    //     const resp = await data.data
    // }
}

export const storeCategory = (page = 0) => {
    // return async (dispatch, getState) => {
    //     dispatch(startLoadingCategories())
    //     const data = await API.putDB(`categorias`)
    //     const resp = await data.data
    // }
}