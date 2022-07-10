import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '.'

import { db } from '../firebase'
import { getDoc, doc } from 'firebase/firestore'

const INITIAL_STATE = {
  recapList: [
    {
      id: '',
      start: '',
      end: '',
      totalDate: 0,
    },
  ],
  statusList: [
    {
      id: '',
      currentStatus: '',
      todayDate: '',
      year: 0,
      month: 0,
      date: 0,
      memo: '',
      todayBg: '',
      startDate: false,
      endDate: false,
    },
  ],
  currentTotalList: [
    {
      id: '',
      currentStatus: '',
      todayDate: '',
      year: 0,
      month: 0,
      date: 0,
      memo: '',
      todayBg: '',
      startDate: false,
      endDate: false,
    },
  ],
  timeStemp: {
    standardDate: '',
    yesterDay: 0,
    afteRaverageDay: 0,
  },
}

export const getStatusListFB = createAsyncThunk('GET_STATUS_LIST', async () => {
  const docRef = doc(db, 'my-list', 'STATUS')
  const docSnap = await getDoc(docRef)
  return docSnap.data()
})

export const getRecapListFB = createAsyncThunk('GET_RECAP_LIST', async () => {
  const docRef = doc(db, 'my-list', 'RECAP')
  const docSnap = await getDoc(docRef)
  return docSnap.data()
})

const systemSlice = createSlice({
  name: 'userData',
  initialState: INITIAL_STATE,
  reducers: {
    setDate: (state, action) => {
      state.currentTotalList = action.payload
    },

    setStartTimeStemp: (state, action) => {
      state.timeStemp.standardDate = action.payload.item
      state.timeStemp.yesterDay = action.payload.beforeStartDate
      state.timeStemp.afteRaverageDay = action.payload.expectedEndDate
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStatusListFB.fulfilled, (state, action) => {
      state.statusList = action.payload?.statusList
    })
    builder.addCase(getRecapListFB.fulfilled, (state, action) => {
      state.recapList = action.payload?.recapList
    })
  },
})

export const { setDate, setStartTimeStemp } = systemSlice.actions

export default systemSlice.reducer

export const getRecapData = (state: RootState) => state.userData.recapList
export const getStatusData = (state: RootState) => state.userData.statusList
export const getCurrentTotalData = (state: RootState) => state.userData.currentTotalList
export const getStartTimeStemp = (state: RootState) => state.userData.timeStemp
