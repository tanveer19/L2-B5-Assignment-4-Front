import { useParams } from "react-router";
import { useGetBookByIdQuery } from "../redux/features/books/booksApi";

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetBookByIdQuery(id!);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Failed to load book details</div>;
  }

  if (!data?.data) {
    return <div className="p-4">Book not found</div>;
  }

  const book = data.data;

  return (
    <div className="p-4 max-w-lg mx-auto border rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre}
      </p>
      <p>
        <strong>ISBN:</strong> {book.isbn}
      </p>
      <p>
        <strong>Description:</strong> {book.description || "N/A"}
      </p>
      <p>
        <strong>Copies:</strong> {book.copies}
      </p>
      <p>
        <strong>Available:</strong> {book.available ? "Yes" : "No"}
      </p>
      <p>
        <strong>Created At:</strong> {new Date(book.createdAt).toLocaleString()}
      </p>
      <p>
        <strong>Updated At:</strong> {new Date(book.updatedAt).toLocaleString()}
      </p>
    </div>
  );
};

export default BookDetailPage;
