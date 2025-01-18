import { configureStore } from '@reduxjs/toolkit'
//import { authReducer } from './slices/authSlice'
// @ts-ignore
import { hubspotService } from './services/hubspotApi'

export const store = configureStore({
  reducer: {
    [hubspotService.reducerPath]: hubspotService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hubspotService.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
