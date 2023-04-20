import { albumNeedsMigrationAsync } from 'expo-media-library'
import { Alert } from 'react-native'
import * as API from '../../api'
import { loadingRegister } from '../slices'

export const storeRegister = (params, navigator) => {
    return async (dispatch, getState) => {
        dispatch(loadingRegister(true))
        const data = await API.postDB(`register`, params)
        if (data?.data) {
            const message = data?.data?.message
            Alert.alert('Mensaje', message)
            navigator.navigate('Login')
            dispatch(loadingRegister(false))
        } else {
            dispatch(loadingRegister(false))
        }
    }
}