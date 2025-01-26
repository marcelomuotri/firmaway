import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Transaction {
  id: string
  amount: number
  date: string
  description: string
  category: string
}

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ambolt-studio.up.railway.app',
    // prepareHeaders: (headers) => {
    //   headers.set('Content-Type', 'application/json')
    //   return headers
    // },
  }),
  tagTypes: ['Transactions'], // ✅ Guarda la respuesta en la caché
  endpoints: (builder) => ({
    postTransactions: builder.mutation<
      Transaction[],
      { api_token: string; year: string }
    >({
      query: ({ api_token, year }) => ({
        url: '/webhook/46c08951-f33c-402e-811f-e7bad609f26d',
        method: 'POST',
        body: { api_token, year }, // ✅ Remueve el guion del EIN antes de enviarlo
      }),
      transformResponse: (response: Transaction[]) => response, // ✅ Guarda la respuesta en caché
      providesTags: ['Transactions'], // ✅ Permite recuperar los datos sin hacer otra petición
    }),
  }),
})

export const { usePostTransactionsMutation } = transactionsApi
