import { createSlice } from '@reduxjs/toolkit'
import { addToDoAsync, deleteToDoAsync, fetchToDoAsync, updateToDoAsync } from './todoSlice';

const INITIAL_STATE = {
    fetchToDosStatus: null,
    addToDoStatus: null,
    updateToDoStatus: null,
    deleteToDoStatus: null,
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState: INITIAL_STATE,
    reducers: {
        reset: (state, action) => {
            state[action.payload] = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchToDoAsync.pending, (state, action) => {
                state.fetchToDosStatus = 'loading'
            })
            .addCase(fetchToDoAsync.fulfilled, (state, action) => {
                state.fetchToDosStatus = 'completed'
            })
            .addCase(addToDoAsync.pending, (state, action) => {
                state.addToDoStatus = 'loading'
            })
            .addCase(addToDoAsync.fulfilled, (state, action) => {
                state.addToDoStatus = 'completed'
            })
            .addCase(deleteToDoAsync.pending, (state, action) => {
                state.deleteToDoStatus = 'loading'
            })
            .addCase(deleteToDoAsync.fulfilled, (state, action) => {
                state.deleteToDoStatus = 'completed'
            })
            .addCase(updateToDoAsync.pending, (state, action) => {
                state.updateToDoStatus = 'loading'
            })
            .addCase(updateToDoAsync.fulfilled, (state, action) => {
                state.updateToDoStatus = 'completed'
            })
    }
})

export const alertReducer = alertSlice.reducer

export const {reset} = alertSlice.actions

export const alertSelector = state => state.alertReducer
