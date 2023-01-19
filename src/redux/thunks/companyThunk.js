import { Alert } from 'react-native'
import * as API from '../../api'
import { loadingCompany, addCompany, addTemplates } from '../slices'
import { storeLogoThunk } from './imagesThunk'

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
            Alert.alert('Mensaje Tienda', message)
        }
    }
}

export const getTemplatesThunk = (page = 0) => {
    return async (dispatch, getState) => {
        let message = null
        try {
            dispatch(loadingCompany(true))
            const data = await API.getDB(`templates`)
            const resp = await data?.data
            message = resp?.message
            dispatch(addTemplates(resp?.data))
            dispatch(loadingCompany(false))
        } catch (error) {
            message = 'Ocurrió un error inesperado!'
            Alert.alert('Mensaje Tienda', message)
        }
    }
}

export const storeCompanyThunk = (params) => {
    return async (dispatch, getState) => {
        try {
            dispatch(loadingCompany(true))
            const data = await API.postDB(`company-user`, params)
            const resp = await data?.data
            if (resp?.data) {
                dispatch(addCompany(resp?.data))
                dispatch(loadingCompany(false))
                dispatch(storeLogoThunk(params)).then(() => {
                    setTimeout(() => {
                        dispatch(loadingCompany(false))
                        navigator.navigate('Store')
                        Alert.alert('Mensaje Tienda', resp?.message)
                    }, 3000);
                })
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log("Entró el error al guardar datos de la tienda")
            dispatch(loadingCompany(false))
        }
    }
}