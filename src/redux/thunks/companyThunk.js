import { Alert } from 'react-native'
import * as API from '../../api'
import { loadingCompany, addCompany } from '../slices'
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
            dispatch(loadingCompany(false))
        } catch (error) {
            message = 'Ocurrió un error inesperado!'
            Alert.alert('Mensaje Tienda', message)
        }
    }
}

export const storeCompanyThunk = (params, navigator) => {
    return async (dispatch, getState) => {
        try {

            dispatch(loadingCompany(true))
            const data = await API.postDB(`company-user`, params)
            const resp = await data?.data
            const message = await resp.message
            const datos = resp?.data

            if (datos) {
                
                if(params.imagenCargada){
                    dispatch(storeLogoThunk(params)).then(()=>{
                        dispatch(getCompanyThunk()).then(() => {
                            dispatch(loadingCompany(false))
                            navigator.navigate('Home')
                            Alert.alert('Mensaje datos de la Tienda', message)
                        })
                    })
                }else{
                    dispatch(getCompanyThunk()).then(() => {
                        dispatch(loadingCompany(false))
                        navigator.navigate('Home')
                        Alert.alert('Mensaje datos de la Tienda', message)
                    })
                }

            } else {
                throw new Error();
            }
        } catch (error) {
            console.log("Entró el error al guardar datos de la tienda")
            dispatch(loadingCompany(false))
        }
    }
}