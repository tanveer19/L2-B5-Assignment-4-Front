import { toast } from "react-toastify";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "../redux/features/books/booksApi";
import { useNavigate } from "react-router";
import type { Book } from "../types";

const Books = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBooksQuery({});
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete book");
    }
  };

  if (isLoading) return <p>Loading books...</p>;
  if (isError) return <p>Failed to load books</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Book List Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Title</th>
              <th className="border px-2 py-1">Author</th>
              <th className="border px-2 py-1">Genre</th>
              <th className="border px-2 py-1">ISBN</th>
              <th className="border px-2 py-1">Copies</th>
              <th className="border px-2 py-1">Available</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((book: Book) => (
              <tr key={book._id}>
                <td className="border px-2 py-1">{book.title}</td>
                <td className="border px-2 py-1">{book.author}</td>
                <td className="border px-2 py-1">{book.genre}</td>
                <td className="border px-2 py-1">{book.isbn}</td>
                <td className="border px-2 py-1">{book.copies}</td>
                <td className="border px-2 py-1">
                  {book.available ? "Yes" : "No"}
                </td>
                <td className="border px-2 py-1 space-x-1">
                  <button
                    onClick={() => navigate(`/books/${book._id}`)}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/edit-book/${book._id}`)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book._id!)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/borrow/${book._id}`)}
                    className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Borrow
                  </button>
                </td>
              </tr>
            ))}
            {data?.data?.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center p-2">
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;
