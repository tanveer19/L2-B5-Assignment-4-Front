import { useNavigate } from "react-router";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "../redux/features/books/booksApi";
import { toast } from "react-toastify";

const Home = () => {
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
      <h1 className="text-2xl font-bold mb-4">Library Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.data?.map((book) => (
          <div key={book._id} className="border rounded shadow p-4">
            <h2 className="font-semibold">{book.author}</h2>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Copies: {book.copies}</p>
            <p>
              {book.available ? (
                <span className="text-green-600">Available</span>
              ) : (
                <span className="text-red-600">Unavailable</span>
              )}
            </p>

            <div className="mt-2 space-x-2">
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
                onClick={() => navigate(`/borrow/${book._id}`)}
                className="bg-green-500 text-white px-2 py-1 rounded text-sm"
              >
                Borrow
              </button>
              <button
                onClick={() => {
                  handleDelete(book._id);
                }}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
