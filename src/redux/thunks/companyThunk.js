import { Alert } from 'react-native'
import * as API from '../../api'
import { loadingCompany, addCompany } from '../slices'

export const getCompanyThunk = (page = 0) => {
    return async (dispatch, getState) => {
        dispatch(loadingCompany(true))
        const data = await API.getDB(`company-user`)
        const resp = await data.data.data
        dispatch(addCompany(resp))
        dispatch(loadingCompany(false))
    }
}

export const storeCompanyThunk = (params) => {
    return async (dispatch, getState) => {
        dispatch(loadingCompany(true))
        const data = await API.postDB(`company-user`, params)
        const resp = await data?.data
        dispatch(addCompany(resp?.data))
        dispatch(loadingCompany(false))
    }
}