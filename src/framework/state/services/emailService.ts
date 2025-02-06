import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const emailApi = createApi({
  reducerPath: 'emailApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ambolt-studio.up.railway.app',
    prepareHeaders: (headers) => {
      const credentials = btoa(
        `${import.meta.env.VITE_N8N_USERNAME}:${import.meta.env.VITE_N8N_PASSWORD}`
      )
      headers.set('Authorization', `Basic ${credentials}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    postEmail: builder.mutation<any, any>({
      query: (email) => ({
        url: '/webhook/85af2c89-f700-48c3-bcbe-f617c52955cf',
        method: 'POST',
        body: email,
      }),
    }),
  }),
})

export const { usePostEmailMutation } = emailApi
