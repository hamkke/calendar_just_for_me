import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '.'
import { axios } from 'hooks/worker'
// import store from 'store'
import DATA from 'data.json'
import GetDay from 'components/calrendar/getDay'

interface IOOO {
  todayDate?: string | undefined
  memo?: string | undefined
  todayBg?: string | undefined
  id: string
  year: number
  month: number
  date: number
  currentStatus: string
}
const INITIAL_STATE = {
  past: [
    {
      id: '2022-04-17',
      start: '2022-04-12',
      end: '2022-04-17',
      totalDate: 6,
    },
    {
      id: '2022-04-17',
      start: '2022-04-12',
      end: '2022-04-17',
      totalDate: 6,
    },
  ],
  presnt: [
    {
      todayDate: '',
      memo: '',
      todayBg: '',
      id: '',
      year: 0,
      month: 0,
      date: 0,
      currentStatus: '',
    },
  ],
}
// console.log(INITIAL_STATE)
// const INITIAL_STATE = { ...DATA }
const systemSlice = createSlice({
  name: 'userData',
  initialState: INITIAL_STATE,
  reducers: {
    setDate: (state, action) => {
      // console.log(state.presnt)
      console.log(action)
      state.presnt = action.payload
    },
  },
})

export const { setDate } = systemSlice.actions

export default systemSlice.reducer

export const getPastData = (state: RootState) => state.userData.past
export const getPresentData = (state: RootState) => state.userData.presnt
