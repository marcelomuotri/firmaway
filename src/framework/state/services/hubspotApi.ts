import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HubSpotUser } from '../../../Features/Balance/Balance'

/** (Opcional) Define la interfaz para el body del POST */
export interface RegisterCompanyPayload {
  first_name: string
  last_name: string
  email: string
  phone: string
  ein: string
  company_name: string
}

export const hubspotService = createApi({
  reducerPath: 'hubspotService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ambolt-studio.up.railway.app',
    prepareHeaders: (headers) => {
      const credentials = btoa(
        `${import.meta.env.VITE_N8N_USERNAME}:${import.meta.env.VITE_N8N_PASSWORD}`
      ) // Codificar en Base64

      headers.set('Authorization', `Basic ${credentials}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    // GET: obtiene datos según EIN
    getHubspotData: builder.query<HubSpotUser, { ein: string }>({
      query: ({ ein }) =>
        `/webhook/35068b9b-6485-42e7-8829-9fb5962f92c0?ein=${ein}`,
    }),

    // POST: registra compañía
    registerCompany: builder.mutation<any, RegisterCompanyPayload>({
      query: (payload) => ({
        url: '/webhook/8c6b2a18-3c46-4af3-a08c-ece7e7533847',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
})

export const {
  useGetHubspotDataQuery,
  useRegisterCompanyMutation, // << Exporta el hook para el POST
} = hubspotService
