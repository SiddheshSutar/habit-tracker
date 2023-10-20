import { createSlice } from '@reduxjs/toolkit'
import { STATUS_COMPLETED, STATUS_PARTIAL } from '../constants'

const initialState = {
  text: '',
  habits: [
    {
      id: 'Fri Oct 20 2023 17:31:22 GMT+0530 (India Standard Time)',
      title: 'Workout',
      days: [
        {
          day: 3,
          status: STATUS_PARTIAL
        },
        {
          day: 4,
          status: STATUS_COMPLETED
        }
      ]
    }
  ],
  sectionOpen: false
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
    toggleSection: (state, action) => {
      state.sectionOpen = action.payload
    },
  }
})

export const habitReducer = habitSlice.reducer

export const { handleTextChange, addHabit, removeHabit, toggleSection } = habitSlice.actions

export const habitSelector = state => state.habitReducer
