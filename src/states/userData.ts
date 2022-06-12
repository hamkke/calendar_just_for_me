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
      id: '2022-05-29',
      start: '2022-03-01',
      end: '2022-03-07',
      totalDate: 7,
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

const systemSlice = createSlice({
  name: 'userData',
  initialState: INITIAL_STATE,
  reducers: {
    setDate: (state, action) => {
      state.presnt = action.payload
    },
    editDate: (state, action) => {
      state.presnt.map((a, b) => {
        if (a.id === action.payload.id) {
          // console.log(current(state.presnt[12]))
          state.presnt[b] = { ...a, memo: action.payload.memo, todayBg: action.payload.nowColor }

          return { ...a, memo: action.payload.memo }
        }
        return { ...a }
      })
    },
  },
})

export const { setDate, editDate } = systemSlice.actions

export default systemSlice.reducer

export const getPastData = (state: RootState) => state.userData.past
export const getPresentData = (state: RootState) => state.userData.presnt
