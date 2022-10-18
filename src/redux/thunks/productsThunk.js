import * as API from '../../api'
import { addProducts, loadingProducts } from '../slices'

export const getProducts = (page = 0) => {
    return async (dispatch, getState) => {
        dispatch(loadingProducts(true))
        const data = await API.getAll(`products`)
        const resp = await data.data.data
        dispatch(addProducts(resp))
        dispatch(loadingProducts(false))
    }
}