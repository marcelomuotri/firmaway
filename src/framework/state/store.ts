import { configureStore } from '@reduxjs/toolkit'
//import { authReducer } from './slices/authSlice'
// @ts-ignore
import { hubspotService } from './services/hubspotApi'
import { transactionsApi } from './services/transactionsApi'
import { tagService } from './services/tagService'
import { generateAi } from './services/generateAIApi'
import { createCSVApi } from './services/createCSV'
import { n8nApi } from './services/testState'
import { generateAIv2 } from './services/generateAIv2'

export const store = configureStore({
  reducer: {
    [hubspotService.reducerPath]: hubspotService.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [tagService.reducerPath]: tagService.reducer,
    [generateAi.reducerPath]: generateAi.reducer,
    [createCSVApi.reducerPath]: createCSVApi.reducer,
    [n8nApi.reducerPath]: n8nApi.reducer,
    [generateAIv2.reducerPath]: generateAIv2.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(hubspotService.middleware)
      .concat(transactionsApi.middleware)
      .concat(tagService.middleware)
      .concat(generateAi.middleware)
      .concat(createCSVApi.middleware)
      .concat(n8nApi.middleware)
      .concat(generateAIv2.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
