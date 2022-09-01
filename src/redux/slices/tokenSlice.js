import { createSlice } from "@reduxjs/toolkit"

const todas = [{ id: 0, name: 'Todas' }]

const tokenSlice = createSlice({
    name: 'token',
    initialState: '',
    reducers: {
        addToken(state, action) {
            return action.payload
        },
        deleteToken(state, action) {
            const id = action.payload;
            return state.filter(item => item.id !== id);
        },
    },
})

// Se extraen los actions creator y el reducer
const { actions, reducer } = tokenSlice

// Extrae y se exporta cada action creator por nombre
export const { addToken, deleteToken } = actions

// Export the reducer, either as a default or named export
export default reducer