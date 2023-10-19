import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  text: '',
  habits: []
}


export const habitSlice = createSlice({
  name: 'habit',
  initialState,
  reducers: {
    handleTextChange: (state, action) => {
      state.text = action.payload
    },
    addHabit: (state, action) => {
      state.habits.push({
        id: (new Date()).toString(),
        title: state.text,
        days: []
      })
      state.text = ''
    },
    removeHabit: (state, action) => {
      state.habits = state.habits.filter((item, index) => item.id !== action.payload.id)
    },
  }
})

export const habitReducer = habitSlice.reducer

export const { handleTextChange, addHabit, removeHabit } = habitSlice.actions

export const habitSelector = state => state.habitReducer
