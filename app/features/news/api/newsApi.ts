import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { NewsResponse, GetNewsArgs } from "../types/newsTypes";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getNews: builder.query<NewsResponse, GetNewsArgs>({
      query: ({ keyword, page, limit }) => `news?keyword=${keyword}&page=${page}&limit=${limit}`,
      keepUnusedDataFor: 300,
    }),
  })
})

export const { useGetNewsQuery } = newsApi;