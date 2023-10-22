/** Notification states */
import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    addHabitStatus: null,
    editHabitStatus: null,
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState: INITIAL_STATE,
    reducers: {
        reset: (state, action) => {
            state[action.payload] = null
        },
        setStatus: (state, action) => {
            state[Object.keys(action.payload)[0]] = Object.values(action.payload)[0]
        }
    }
})

export const alertReducer = alertSlice.reducer

export const {reset, setStatus} = alertSlice.actions

export const alertSelector = state => state.alertReducer
