import { createSlice } from '@reduxjs/toolkit'
import { IMaterialState } from './interface'

const initialState: IMaterialState = {
  gameDictList: []
}

const Material = createSlice({
  name: 'material',
  initialState,
  reducers: {
    setGameDictList(state, { payload }) {
      state = Object.assign(state, {
        gameDictList: payload
      })
    }
  }
})

export const { setGameDictList } = Material.actions
export default Material.reducer