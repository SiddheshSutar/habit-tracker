import { createSlice } from '@reduxjs/toolkit'
import { STATUS_DONE, STATUS_NOT_DONE } from '../helpers'

const initialState = {
  text: '',
  habits: [
    {
      id: 'Tue Oct 17 2023 00:00:00 GMT+0530 (India Standard Time)',
      title: 'Workout',
      days: [
        {
          day: 'Tue Oct 17 2023 00:00:00 GMT+0530 (India Standard Time)',
          status: STATUS_NOT_DONE
        },
        {
          day: 'Mon Oct 16 2023 00:00:00 GMT+0530 (India Standard Time)',
          status: STATUS_DONE
        }
      ]
    }
  ],
  sectionOpen: false,
  selectedDay: null
}


export const habitSlice = createSlice({
  name: 'habit',
  initialState,
  reducers: {
    setHabitState: (state, action) => {
      state[Object.keys(action.payload)[0]] = Object.values(action.payload)[0]
    },
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

export const { handleTextChange, addHabit, removeHabit, toggleSection, setHabitState } = habitSlice.actions

export const habitSelector = state => state.habitReducer
