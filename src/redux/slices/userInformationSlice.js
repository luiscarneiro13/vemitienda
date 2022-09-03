import { createSlice } from "@reduxjs/toolkit"

const userInformationSlice = createSlice({
    name: 'userInformation',
    initialState: {},
    reducers: {
        addUserInformation(state, action) {
            return action.payload
        },
    },
})

// Se extraen los actions creator y el reducer
const { actions, reducer } = userInformationSlice

// Extrae y se exporta cada action creator por nombre
export const { addUserInformation } = actions

// Export the reducer, either as a default or named export
export default reducer