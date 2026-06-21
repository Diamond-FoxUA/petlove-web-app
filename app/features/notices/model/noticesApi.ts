import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GetNoticesResponse } from "../types/notices"; 

interface GetNoticesArgs {
  keyword?: string;
  category?: string;
  species?: string;
  sex?: string;
  page?: number;
  limit?: number;
}

export const noticesApi = createApi({
  reducerPath: "noticesApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }), 
  endpoints: (builder) => ({
    
    getSpecies: builder.query<string[], void>({
      query: () => "notices/species",
      keepUnusedDataFor: 600, 
    }),
    getCategories: builder.query<string[], void>({
      query: () => "notices/categories",
      keepUnusedDataFor: 600,
    }),
    getSex: builder.query<string[], void>({
      query: () => "notices/sex",
      keepUnusedDataFor: 600,
    }),

    getNotices: builder.query<GetNoticesResponse, GetNoticesArgs>({
      query: ({ keyword = "", category = "", species = "", sex = "", page = 1, limit = 6 }) => 
        `notices?keyword=${keyword}&category=${category}&species=${species}&sex=${sex}&page=${page}&limit=${limit}`,
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { 
  useGetSpeciesQuery, 
  useGetCategoriesQuery, 
  useGetSexQuery, 
  useGetNoticesQuery 
} = noticesApi;
