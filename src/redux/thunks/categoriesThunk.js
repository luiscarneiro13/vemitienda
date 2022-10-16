import * as API from '../../api'
import { addCategories, endLoadingCategories, startLoadingCategories } from '../slices'

export const getCategories = (page = 0) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingCategories())
        const data = await API.getAll(`categorias`)
        const resp = await data.data.data
        dispatch(addCategories(resp))
        dispatch(endLoadingCategories())
    }
}