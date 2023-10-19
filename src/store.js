import { configureStore } from '@reduxjs/toolkit'
import {alertReducer} from './reduxSlices/alertSlice'
import {habitReducer} from './reduxSlices/habitSlice'

export const store = configureStore({
  reducer: {
    alertReducer,
    habitReducer
  },
})