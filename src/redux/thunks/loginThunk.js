import { Alert } from 'react-native'
import * as API from '../../api'
import { addPlanId, addToken, loadingToken } from '../slices'

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

        }

        dispatch(loadingToken(false))
    }
}