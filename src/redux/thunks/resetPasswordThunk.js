import { albumNeedsMigrationAsync } from 'expo-media-library'
import { Alert, Linking } from 'react-native'
import * as API from '../../api'
import { URL_PRODUCTION } from '../../constants/Data'
import { addUserPassword, loadingResetPassword } from '../slices'

export const searchEmail = (params, navigator) => {
    return async (dispatch, getState) => {
        dispatch(loadingResetPassword(true))
        const data = await API.postDB(`searchEmail`, params)

        if (data?.data) {
            const datos = data?.data?.data
            const dataEmail = await API.postDB(`reset1`, {
                user_id: datos.id
            })
            if (dataEmail?.data) {
                dispatch(loadingResetPassword(false))
                navigator.navigate('Login')
                const message = dataEmail?.data?.message
                Alert.alert('Mensaje', message)
            }
        } else {
            dispatch(loadingResetPassword(false))
            Alert.alert('Mensaje', 'Datos inválidos')
        }
    }
}