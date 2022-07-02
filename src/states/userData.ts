import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '.'

const INITIAL_STATE = {
  past: [
    {
      id: '2022-3-7',
      start: '2022-3-1',
      end: '2022-3-7',
      totalDate: 7,
    },
    {
      id: '2022-4-17',
      start: '2022-4-12',
      end: '2022-4-17',
      totalDate: 6,
    },
  ],
  presnt: [
    {
      startDate: false,
      todayDate: '',
      memo: '',
      todayBg: '',
      id: '',
      year: 0,
      month: 0,
      date: 0,
      currentStatus: '',
      endDate: false,
    },
  ],
  timeStemp: {
    standardDate: '',
    yesterDate: 0,
    afteRaverageDate: 0,
  },
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
          state.presnt[b] = {
            ...a,
            memo: action.payload.memo,
            todayBg: action.payload.nowColor,
            startDate: action.payload.start,
            endDate: action.payload.end,
          }

          return { ...a, memo: action.payload.memo }
        }
        return { ...a }
      })
    },
    setStartTimeStemp: (state, action) => {
      state.timeStemp.standardDate = action.payload.item
      state.timeStemp.yesterDate = action.payload.beforeStartDate
      state.timeStemp.afteRaverageDate = action.payload.expectedEndDate
    },
  },
})

export const { setDate, editDate, setStartTimeStemp } = systemSlice.actions

export default systemSlice.reducer

export const getPastData = (state: RootState) => state.userData.past
export const getPresentData = (state: RootState) => state.userData.presnt
export const getStartTimeStemp = (state: RootState) => state.userData.timeStemp
