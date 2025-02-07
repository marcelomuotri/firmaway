import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

export interface Transaction {
  id: string
  amount: number
  date: string
  description: string
  category: string
}

// 1) Creamos nuestra baseQuery normal:
const rawBaseQuery = fetchBaseQuery({
  baseUrl: 'https://ambolt-studio.up.railway.app',
  prepareHeaders: (headers) => {
    const credentials = btoa(
      `${import.meta.env.VITE_N8N_USERNAME}:${import.meta.env.VITE_N8N_PASSWORD}`
    )
    headers.set('Authorization', `Basic ${credentials}`)
    return headers
  },
})

// 2) Envolvemos el baseQuery dentro de retry para habilitar reintentos:
const baseQueryWithRetry = retry(rawBaseQuery, { maxRetries: 3 })

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  // 3) Usamos baseQueryWithRetry en lugar del baseQuery normal
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Transactions'],
  endpoints: (builder) => ({
    postTransactions: builder.mutation<
      Transaction[],
      { api_token: string; year: string }
    >({
      query: ({ api_token, year }) => ({
        url: '/webhook/46c08951-f33c-402e-811f-e7bad609f26d',
        method: 'POST',
        body: { api_token, year },
      }),
      transformResponse: (response: Transaction[]) => response,
      providesTags: ['Transactions'],
    }),
  }),
})

export const { usePostTransactionsMutation } = transactionsApi
