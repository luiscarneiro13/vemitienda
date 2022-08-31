import { createSlice } from "@reduxjs/toolkit"

const plantsSlice = createSlice({
    name: 'plants',
    initialState: [],
    reducers: {
        addPlants(state, action) {
            return action.payload
        },
        addPlant(state, action) {
            state.push(action.payload)
        },
        updatePlant(state, action) {
            return state.map(item => {
                if (item.id === action.payload.id) {
                    item = action.payload
                }
                return item
            })
        },
        deletePlant(state, action) {
            const id = action.payload;
            return state.filter(item => item.id !== id);
        },
    },
})

// Se extraen los actions creator y el reducer
const { actions, reducer } = plantsSlice

// Extrae y se exporta cada action creator por nombre
export const { addPlants, addPlant, updatePlant, deletePlant } = actions

// Export the reducer, either as a default or named export
export default reducer