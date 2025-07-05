import { baseApi } from "../../api/baseApi";
import type { ApiResponse, Book, BorrowSummaryItem } from "../../../types";

export const booksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET all books
    getBooks: builder.query<
      ApiResponse<Book[]>,
      { page?: number; limit?: number } | void
    >({
      query: ({ page = 1, limit = 10 } = {}) =>
        `/books?page=${page}&limit=${limit}`,
      providesTags: ["Books"],
    }),

    // GET single book by ID
    getBookById: builder.query<ApiResponse<Book>, string>({
      query: (id) => `/books/${id}`,
      providesTags: (_, __, id) => [{ type: "Books", id }],
    }),

    // CREATE book
    createBook: builder.mutation<ApiResponse<Book>, Partial<Book>>({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),

    // UPDATE book
    updateBook: builder.mutation<
      ApiResponse<Book>,
      { id: string; data: Partial<Book> }
    >({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Books", id }, "Books"],
    }),

    // DELETE book
    deleteBook: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "Books", id }, "Books"],
    }),

    // BORROW book
    borrowBook: builder.mutation<
      ApiResponse<any>,
      { bookId: string; quantity: number; dueDate: string }
    >({
      query: ({ bookId, quantity, dueDate }) => ({
        url: `/borrow/${bookId}`,
        method: "POST",
        body: { quantity, dueDate },
      }),
      invalidatesTags: ["Books", "BorrowSummary"],
    }),

    // BORROW summary
    getBorrowSummary: builder.query<ApiResponse<BorrowSummaryItem[]>, void>({
      query: () => "/borrow-summary",
      providesTags: ["BorrowSummary"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = booksApi;
