import { Alert } from 'react-native'
import * as API from '../../api'
import { loadingOrders, addOrders } from '../slices'

export const getOrdersThunk = (page = 0) => {
    return async (dispatch, getState) => {
        let message = null
        try {
            dispatch(loadingOrders(true))
            const data = await API.getDB(`orders`)
            const resp = await data?.data
            if (resp) {
                dispatch(addOrders(resp?.data))
                dispatch(loadingOrders(false))
            }
        } catch (error) {
            message = 'Ocurrió un error inesperado!'
            Alert.alert('Mensaje Tienda', message)
        }
    }
}

export const updateStatusThunk = (params) => {

    return async (dispatch, getState) => {
        let message = null
        try {
            dispatch(loadingOrders(true))
            const dataStatus = await API.postDB(`updateStatus`, params)
            const respDataStatus = await dataStatus?.data
            if (respDataStatus) {
                const data = await API.getDB(`orders`)
                const resp = await data?.data
                message = resp?.message
                dispatch(addOrders(resp?.data))
                dispatch(loadingOrders(false))
                // Alert.alert('Pedido actualizado')
            }
        } catch (error) {
            message = 'Ocurrió un error inesperado!'
            Alert.alert('Mensaje Tienda', message)
        }
    }
}