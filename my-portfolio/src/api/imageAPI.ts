import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const imageApi = createApi({
  reducerPath: 'imageAPI',
  baseQuery: fetchBaseQuery(
    //{ baseUrl: 'http://127.0.0.1:8000' }
     { baseUrl: 'https://faceapp-1-p1do.onrender.com' } 
  ),
  endpoints: (builder) => ({
    //builder.query takes return type and parameters only for GET Requests\
    //builder.mutation used for POST and PUT requests
    //Creating an api hook that can be consumed on the front end.
    uploadImage: builder.mutation<object, File>({
      query: (file) => {
        console.log(file,"data");
        const formData = new FormData(); //creates POST Obj or the request params
        formData.append('file', file);
        return {
          url: '/analyze', // this should be your backend endpoint
          method: 'POST',
         body: formData,
        };
      },
    }),
  })

});

export const {useUploadImageMutation } = imageApi;