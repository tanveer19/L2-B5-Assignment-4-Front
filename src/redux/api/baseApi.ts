import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://l2-b5-assignment-4-back.vercel.app/api",
  }),
  tagTypes: ["Books", "BorrowSummary"],
  endpoints: (_) => ({}),
});
