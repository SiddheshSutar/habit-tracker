/** Primary state management file */
import { createSlice } from '@reduxjs/toolkit'
import { LS_STATE, STATUS_DONE, STATUS_NOT_DONE } from '../helpers'

const initialState = {
  text: '',
  /** @param habits: Each habit is assumed to be having id given as current date, title and list of days.
   * id field is operated by converting to date format in operations.
   */
  habits: [
    {
      id: 'Tue Oct 17 2023 00:00:00 GMT+0530 (India Standard Time)',
      title: 'Workout',
      days: [
        {
          day: 'Fri Oct 20 2023 00:00:00 GMT+0530 (India Standard Time)',
          status: STATUS_NOT_DONE
        },
        {
          day: 'Sat Oct 21 2023 00:00:00 GMT+0530 (India Standard Time)',
          status: STATUS_DONE
        }
      ]
    }
  ],
  sectionOpen: false,
  selectedDay: null
}

if (localStorage.getItem(LS_STATE)) {
  initialState.habits = JSON.parse(localStorage.getItem(LS_STATE))
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
