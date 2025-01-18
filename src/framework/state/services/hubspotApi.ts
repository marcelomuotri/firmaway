import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HubSpotUser } from '../../../Features/Balance/Step1/Step1'

export const hubspotService = createApi({
  reducerPath: 'hubspotService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ambolt-studio.up.railway.app',
  }),
  endpoints: (builder) => ({
    getHubspotData: builder.query<HubSpotUser, { ein: string }>({
      query: ({ ein }) =>
        `/webhook/35068b9b-6485-42e7-8829-9fb5962f92c0?ein=${ein}`,
    }),
  }),
})

export const { useGetHubspotDataQuery } = hubspotService
