import { createSlice } from "@reduxjs/toolkit"

const todas = [{ id: 0, name: 'Todas' }]

const filtradosSlice = createSlice({
    name: 'filtrados',
    initialState: [],
    reducers: {
        addFiltrados(state, action) {
            return action.payload
        }
    },
})

// Se extraen los actions creator y el reducer
const { actions, reducer } = filtradosSlice

// Extrae y se exporta cada action creator por nombre
export const { addFiltrados } = actions

// Export the reducer, either as a default or named export
export default reducer