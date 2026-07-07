import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/app/shared/redux/store";

import type { GetNoticesResponse } from "../types/notices";
import type { CityResponse } from "../types/notices";

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
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.user?.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Notices"],
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
      query: ({
        keyword = "",
        category = "",
        species = "",
        sex = "",
        page = 1,
        limit = 6,
      }) =>
        `notices?keyword=${keyword}&category=${category}&species=${species}&sex=${sex}&page=${page}&limit=${limit}`,
      keepUnusedDataFor: 300,
      providesTags: ["Notices"],
    }),

    addFavourite: builder.mutation<string[], string>({
      query: (noticeId) => ({
        url: `notices/favorites/add/${noticeId}`,
        method: "POST",
      }),

      invalidatesTags: ["Notices"],
    }),
    removeFavourite: builder.mutation<string[], string>({
      query: (noticeId) => ({
        url: `notices/favorites/remove/${noticeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notices"],
    }),

    getCities: builder.query<CityResponse[], void>({
      query: () => "cities/locations",
      keepUnusedDataFor: 600,
    }),
  }),
});

export const {
  useGetSpeciesQuery,
  useGetCategoriesQuery,
  useGetSexQuery,
  useGetNoticesQuery,
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
  useLazyGetCitiesQuery,
} = noticesApi;
