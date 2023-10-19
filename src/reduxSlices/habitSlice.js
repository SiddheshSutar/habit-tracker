import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  text: '',
  habits: [],
  modalOpen: false
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
    toggleModal: (state, action) => {
      state.modalOpen = action.payload
    },
  }
})

export const habitReducer = habitSlice.reducer

export const { handleTextChange, addHabit, removeHabit, toggleModal } = habitSlice.actions

export const habitSelector = state => state.habitReducer
