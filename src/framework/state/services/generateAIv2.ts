// api.js (o donde tengas definido tu createApi)
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const generateAIv2 = createApi({
  reducerPath: 'generateAIv2',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://ambolt-studio.up.railway.app' }),
  endpoints: (builder) => ({
    // 1️⃣ Enviar la data inicial
    startProcess: builder.mutation({
      query: (data) => ({
        url: '/webhook/5045f7bd-c181-4d38-8144-84965321d04b',
        method: 'POST',
        body: data,
      }),
    }),

    checkStatus: builder.query({
        // 1) Usamos `queryFn` en lugar de `query`.
        // 2) Metemos un pequeño `sleep` de 5s antes de hacer la request real
        queryFn: async (batchId, _api, _extraOptions, baseQuery) => {
          // Espera 5 segundos
          await new Promise((resolve) => setTimeout(resolve, 30000));
  
          // Luego hacemos la request "real"
          const result = await baseQuery(
            `/webhook/cdd6b80a-4b2a-41ae-a215-2e698e382e09?batch_id=${batchId}`
          );
  
          // Si hay error, retornamos el error; si no, retornamos la data
          if (result.error) {
            return { error: result.error };
          }
          return { data: result.data };
        },
      }),
  }),
});

export const { useStartProcessMutation, useCheckStatusQuery } = generateAIv2;
