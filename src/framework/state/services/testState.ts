import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Datos de autenticación

export const n8nApi = createApi({
  reducerPath: 'n8nApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ambolt-studio.up.railway.app', // URL base de n8n
    prepareHeaders: (headers) => {
      const credentials = btoa(
        `${import.meta.env.VITE_N8N_USERNAME}:${import.meta.env.VITE_N8N_PASSWORD}`
      ) // Codificar en Base64

      headers.set('Authorization', `Basic ${credentials}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    getWebhookData: builder.query({
      query: () => '/webhook/0dcccc75-5c9d-4a16-b3cf-7e35b9d51be7',
    }),
  }),
})

export const { useGetWebhookDataQuery } = n8nApi
