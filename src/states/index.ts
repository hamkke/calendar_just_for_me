import { configureStore } from '@reduxjs/toolkit'
import userData from './userData'

export const store = configureStore({
  reducer: { userData },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
