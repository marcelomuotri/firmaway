import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const generateAi = createApi({
  reducerPath: 'generateAi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ambolt-studio.up.railway.app',
  }),
  endpoints: (builder) => ({
    // POST: registra compañía
    postGenerateAi: builder.mutation<any, any>({
      query: (payload) => ({
        url: '/webhook/a2e30dd6-e515-440e-a384-bd71ff6bdaff',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response, meta) => {
        return response[0]?.transacciones ?? []
      },
      providesTags: ['GenerateAi'], // ✅ Permite recuperar los datos sin hacer otra petición
    }),
  }),
})

export const {
  usePostGenerateAiMutation, // << Exporta el hook para el POST
} = generateAi
