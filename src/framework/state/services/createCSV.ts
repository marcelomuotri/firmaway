import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const createCSVApi = createApi({
  reducerPath: 'createCSVApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ambolt-studio.up.railway.app',
    responseHandler: async (response) => response.text(),
  }),
  endpoints: (builder) => ({
    postCSV: builder.mutation<any, any>({
      query: (payload) => ({
        url: '/webhook/8646ab4f-53ef-4cea-99e4-eb68dba49c18',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response) => response,
    }),
  }),
})

export const { usePostCSVMutation } = createCSVApi
