import type { Book } from "../../../types";
import { baseApi } from "../../api/baseApi";
interface CreateBookResponse {
  success: boolean;
  message: string;
  data: Book;
}

export const booksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<
      { success: boolean; message: string; data: Book[] },
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 } = {}) =>
        `/books?page=${page}&limit=${limit}`,
      providesTags: ["Books"],
    }),

    createBook: builder.mutation<CreateBookResponse, Partial<Book>>({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),

    // GET single book by ID
    getBookById: builder.query<Book, string>({
      query: (id) => `/books/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Books", id }],
    }),

    // UPDATE a book
    updateBook: builder.mutation<Book, { id: string; data: Partial<Book> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Books", id },
        "Books",
      ],
    }),

    // DELETE a book
    deleteBook: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Books", id },
        "Books",
      ],
    }),

    // BORROW a book
    borrowBook: builder.mutation<
      { success: boolean },
      { bookId: string; quantity: number; dueDate: string }
    >({
      query: ({ bookId, quantity, dueDate }) => ({
        url: `/borrow/${bookId}`,
        method: "POST",
        body: { quantity, dueDate },
      }),
      invalidatesTags: ["Books", "BorrowSummary"],
    }),

    // GET borrow summary
    getBorrowSummary: builder.query<
      { title: string; isbn: string; totalQuantity: number }[],
      void
    >({
      query: () => `/borrow-summary`,
      providesTags: ["BorrowSummary"],
    }),
  }),
  overrideExisting: false,
});

// Export hooks
export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = booksApi;
