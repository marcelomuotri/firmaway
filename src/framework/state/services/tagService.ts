import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/** (Opcional) Define la interfaz para el body del POST */

export const tagService = createApi({
  reducerPath: 'tagService',
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
    // GET: obtiene datos según EIN
    getTags: builder.query({
      query: () => '/webhook/81628e99-9be4-46bf-9312-65ca5cc69edc',
    }),
  }),
})

export const { useGetTagsQuery } = tagService
