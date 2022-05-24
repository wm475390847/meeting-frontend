import { configureStore } from '@reduxjs/toolkit'
import materialReducer from './material'


const store = configureStore({
  reducer: {
    material: materialReducer
  }
})

export default store