import { configureStore } from '@reduxjs/toolkit'
import {alertReducer} from './reduxSlices/alertSlice'

export const store = configureStore({
  reducer: {
    alertReducer
  },
})