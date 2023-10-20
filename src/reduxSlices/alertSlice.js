import { createSlice } from '@reduxjs/toolkit'
// import { addToDoAsync } from './todoSlice';

const INITIAL_STATE = {
    fetchToDosStatus: null,
    addHabitStatus: null,
    updateToDoStatus: null,
    deleteToDoStatus: null,
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
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchToDoAsync.pending, (state, action) => {
    //             state.fetchToDosStatus = 'loading'
    //         })
    //         .addCase(fetchToDoAsync.fulfilled, (state, action) => {
    //             state.fetchToDosStatus = 'completed'
    //         })
    // }
})

export const alertReducer = alertSlice.reducer

export const {reset, setStatus} = alertSlice.actions

export const alertSelector = state => state.alertReducer
