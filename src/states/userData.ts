import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '.'

import store from 'store'
import DATA from 'data.json'
import dayjs from 'dayjs'

// interface UserState {
//   value: {
//     all: {
//       heartRate: IHeartRate[]
//       step: IStep[]
//     }
//     filter: {
//       heartRate: IHeartRate[]
//       step: IStep[]
//     }
//     userInfo: {
//       id: string
//       date: string
//       member_seq: number
//     }[]
//   }
// }

const INITIAL_STATE = { ...DATA }

const systemSlice = createSlice({
  name: 'userData',
  initialState: INITIAL_STATE,
  reducers: {
    // getFilteredStepData: (state, action) => {
    //   state.value.filter.step = state.value.all.step.filter((item) => {
    //     return (
    //       action.payload.startDate <= formatedDate(item.crt_ymdt) &&
    //       formatedDate(item.crt_ymdt) <= action.payload.endDate
    //     )
    //   })
    // },
  },
})

export const {} = systemSlice.actions

export default systemSlice.reducer

export const getPastData = (state: RootState) => state.userData.past
