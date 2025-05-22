import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const imageApi = createApi({
  reducerPath: 'imageAPI',
  baseQuery: fetchBaseQuery(
    { baseUrl: 'http://127.0.0.1:8000/resize' }
  ),
  endpoints: (builder) => ({
    //builder.query takes return type and parameters only for GET Requests\
    //builder.mutation used for POST and PUT requests
    uploadImage: builder.mutation<object, File>({
      query: (image) => {
        const formData = new FormData(); //creates POST Obj or the request params
        formData.append('file', image);
        return {
          url: '/process-image', // this should be your backend endpoint
          method: 'POST',
          body: formData,
        };
      },
    }),
  })

});

export const {useUploadImageMutation } = imageApi;