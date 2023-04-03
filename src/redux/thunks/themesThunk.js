import * as API from '../../api'
import { loadingThemes, addThemes } from '../slices'

export const getThemesThunk = (page = 0) => {
    return async (dispatch, getState) => {
        dispatch(loadingThemes(true))
        const data = await API.getDB(`themes`)
        const resp = await data?.data?.data
        if (resp) {
            dispatch(addThemes(resp))
            dispatch(loadingThemes(false))
        }
    }
}