import { Alert } from 'react-native'
import * as API from '../../api'
import { loadingCompany, addCompany } from '../slices'

export const getCompanyThunk = (page = 0) => {
    return async (dispatch, getState) => {
        let message = null
        try {
            dispatch(loadingCompany(true))
            const data = await API.getDB(`company-user`)
            const resp = await data?.data
            message = resp?.message
            dispatch(addCompany(resp?.data))
            dispatch(loadingCompany(false))
        } catch (error) {
            message = 'Ocurrió un error inesperado!'
        }
        message ? Alert.alert('Mensaje', message) : null
    }
}

export const storeCompanyThunk = (params) => {
    return async (dispatch, getState) => {
        let message = null
        try {
            dispatch(loadingCompany(true))
            const data = await API.postDB(`company-user`, params)
            const resp = await data?.data
            message = resp?.message
            dispatch(addCompany(resp?.data))
            dispatch(loadingCompany(false))
        } catch (error) {
            message = 'Ocurrió un error inesperado!'
        }
        message ? Alert.alert('Mensaje', message) : null
    }
}