import { configureStore } from '@reduxjs/toolkit'
//import { authReducer } from './slices/authSlice'
// @ts-ignore
import { hubspotService } from './services/hubspotApi'
import { transactionsApi } from './services/transactionsApi'
import { tagService } from './services/tagService'
import { generateAi } from './services/generateAIApi'
import { createCSVApi } from './services/createCSV'

export const store = configureStore({
  reducer: {
    [hubspotService.reducerPath]: hubspotService.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [tagService.reducerPath]: tagService.reducer,
    [generateAi.reducerPath]: generateAi.reducer,
    [createCSVApi.reducerPath]: createCSVApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(hubspotService.middleware)
      .concat(transactionsApi.middleware)
      .concat(tagService.middleware)
      .concat(generateAi.middleware)
      .concat(createCSVApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
