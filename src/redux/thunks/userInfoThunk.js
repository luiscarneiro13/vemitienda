import * as API from '../../api'
import { addOnboarding, addUserInfo, loadingUserInfo } from '../slices/userInfoSlice'

export const userInfoThunk = (params, navigator) => {
    return async (dispatch, getState) => {
        dispatch(loadingUserInfo(true))
        const data = await API.getDB(`user-information`, params)
        const datos = await data?.data?.data
        if (datos) {
            dispatch(addUserInfo(datos))
            dispatch(addOnboarding(datos.company.onboarding))
            dispatch(loadingUserInfo(false))
        } else {
            dispatch(loadingUserInfo(false))
        }
    }
}