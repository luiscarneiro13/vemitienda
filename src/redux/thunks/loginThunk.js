import { Alert } from 'react-native'
import * as API from '../../api'
import { addPlanId, addToken, loadingToken } from '../slices'
import { addEntrar, addUserInfo } from '../slices/userInfoSlice'

const PROVIDER_SOCIAL = {
    google: 'social/login/google/callback',
    facebook: ''
}

export const getToken = (params) => {
    return async (dispatch, getState) => {
        dispatch(loadingToken(true))
        const data = await API.postDB(`login`, params)
        const datos = await data?.data

        if (datos?.data?.token) {
            const planId = datos?.data?.plan_user?.plan_id
            if (planId) {
                dispatch(addPlanId(planId))
            }
            dispatch(addToken(datos?.data?.token))
            const data2 = await API.postDB(`user-information`, params)
            const datos2 = await data2?.data?.data
            dispatch(addUserInfo(datos2))
        }

        dispatch(loadingToken(false))
    }
}

export const loginExternal = (params) => {
    
    return async (dispatch, getState) => {

        const url = `${PROVIDER_SOCIAL[params.provider]}`
        try {
            const data = await API.postDB(url, params)
            const datos = await data?.data
            // dispatch(logs({ respSocialLoginGoogleCallback: datos }))
            if (datos?.data?.token) {

                dispatch(addToken({
                    token: datos?.data?.token,
                    onboarding: datos?.data?.company.onboarding
                }))

                const data2 = await API.postDB(`user-information`, params)
                const datos2 = await data2?.data?.data
                // dispatch(logs({ respUserInformation: datos2 }))
                dispatch(addUserInfo(datos2))

                dispatch(addEntrar(true))
            } else if (datos?.data?.status == 400) {
                alert(datos.data.message)
            }

            dispatch(loadingToken(false))

        } catch (error) {
            dispatch(loadingToken(false))
            // console.log('error', error)
        }
    }
}

export const version = (params) => {
    return async (dispatch, getState) => {
        const url = `version`
        try {
            const data = await API.postDB(url, params)
            const datos = await data?.data
            console.log(datos.actualizar)
            return datos.actualizar
        } catch (error) {
        }
    }
}

export const logs = (params) => {
    return async (dispatch, getState) => {
        const url = `logs`
        try {
            await API.postDB(url, params)
        } catch (error) {
        }
    }
}       