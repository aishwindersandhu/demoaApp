import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FaceDetails } from '../interfaces/imageDataInterface';
import { RecommendationResponse } from '../interfaces/productInterface';

/**
 * RTK Query API slice for the backend face-analysis service.
 * Registered in the Redux store (see redux/store.ts) so its cache, loading,
 * and error state are managed automatically and exposed via generated hooks.
 */
export const imageApi = createApi({
  reducerPath: 'imageAPI',
  baseQuery: fetchBaseQuery(
    // { baseUrl: 'http://127.0.0.1:8000' }
    // Production backend — swap when deploying:
     { baseUrl: 'https://faceapp-1-p1do.onrender.com' }
  ),
  endpoints: (builder) => ({
    // builder.query -> GET requests (read-only, cached by default)
    // builder.mutation -> POST/PUT/etc requests (state-changing)
    // Each endpoint below is exposed as a `use<Name>Mutation` hook.

    /** Uploads a face photo for analysis (skin tone, undertone, colour palette). */
    uploadImage: builder.mutation<object, File>({
      query: (file) => {
        console.log(file,"data");
        const formData = new FormData(); // multipart body required for file upload
        formData.append('file', file);
        return {
          url: '/analyze', // backend face-analysis endpoint
          method: 'POST',
         body: formData,
        };
      },
    }),

    /** Fetches product recommendations for a session based on its analyzed face details. */
    getRecommendations: builder.mutation<RecommendationResponse, { userId: string; body: FaceDetails }>({
      query: ({ userId, body }) => ({
        url: `/recommendations/${userId}`,
        method: 'POST',
        body,
      }),
    }),
  })

});

// Auto-generated React hooks for the endpoints defined above.
export const { useUploadImageMutation, useGetRecommendationsMutation } = imageApi;