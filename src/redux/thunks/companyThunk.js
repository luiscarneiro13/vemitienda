import { Alert } from 'react-native'
import * as API from '../../api'
import { loadingCompany, addCompany, addOnboarding } from '../slices'
import { storeLogoThunk } from './imagesThunk'
import { userInfoThunk } from './userInfoThunk'

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

                if (params.imagenCargada) {
                    dispatch(storeLogoThunk(params)).then(() => {
                        dispatch(getCompanyThunk()).then(() => {
                            dispatch(loadingCompany(false))
                            navigator.navigate('Home')
                            Alert.alert('Mensaje', message)
                        })
                    })
                } else {
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
            // console.log("Entró el error al guardar datos de la tienda")
            dispatch(loadingCompany(false))
        }
    }
}

export const storeCompanyOnboardingThunk = (params, navigator) => {
    return async (dispatch, getState) => {
        try {
            dispatch(loadingCompany(true))
            params.onboarding = true
            const data = await API.postDB(`company-user`, params)
            const resp = await data?.data
            const message = await resp.message
            const datos = resp?.data

            if (datos) {
                if (params.imagenCargada) {
                    dispatch(storeLogoThunk(params)).then(() => {
                        dispatch(getCompanyThunk()).then(() => {
                            userInfoThunk()
                            dispatch(addOnboarding(1))
                            dispatch(loadingCompany(false))
                            Alert.alert('Bienvenido')
                        })
                    })
                } else {
                    dispatch(getCompanyThunk()).then(() => {
                        dispatch(loadingCompany(false))
                        Alert.alert('Mensaje datos de la Tienda', message)
                    })
                }

            } else {
                throw new Error();
            }
        } catch (error) {
            // console.log("Entró el error al guardar datos de la tienda")
            dispatch(loadingCompany(false))
        }
    }
}