import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://ambolt-studio.up.railway.app',
})

export const generateAIv2 = createApi({
  reducerPath: 'generateAIv2',
  baseQuery,
  endpoints: (builder) => ({
    startProcess: builder.mutation({
      // 👇 Aquí usamos queryFn en vez de query
      async queryFn(data, _api, _extraOptions, baseQuery) {
        const maxRetries = 3
        let attempt = 0
        let lastResult

        while (attempt < maxRetries) {
          lastResult = await baseQuery({
            url: '/webhook/5045f7bd-c181-4d38-8144-84965321d04b',
            method: 'POST',
            body: data,
          })

          // Si NO hay error, devolvemos éxito
          if (!lastResult.error) {
            return { data: lastResult.data }
          }

          // Si hay error, incrementamos intento y seguimos
          attempt++
        }

        // Si llegamos aquí, fallaron todos los reintentos
        return { error: lastResult?.error }
      },
    }),

    checkStatus: builder.query({
      // Este se queda igual que antes
      queryFn: async (batchId, _api, _extraOptions, baseQuery) => {
        // Espera 30 segundos
        await new Promise((resolve) => setTimeout(resolve, 30000))

        const result = await baseQuery(
          `/webhook/cdd6b80a-4b2a-41ae-a215-2e698e382e09?batch_id=${batchId}`
        )
        if (result.error) {
          return { error: result.error }
        }
        return { data: result.data }
      },
    }),
  }),
})

export const { useStartProcessMutation, useCheckStatusQuery } = generateAIv2
