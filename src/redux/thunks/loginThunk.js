import * as API from '../../api'
import { addToken, loadingToken } from '../slices'

export const getToken = (params) => {
    return async (dispatch, getState) => {
        dispatch(loadingToken(true))
        const { data } = await API.postDB(`login`, params)
        const token = data.data.token
        if (token) {
            dispatch(addToken(token))
        }
        dispatch(loadingToken(false))
    }
}