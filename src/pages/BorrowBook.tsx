import { useNavigate, useParams } from "react-router";
import {
  useBorrowBookMutation,
  useGetBookByIdQuery,
} from "../redux/features/books/booksApi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const BorrowBook = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const { data: book } = useGetBookByIdQuery(bookId!);
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ quantity: number; dueDate: string }>();

  const onSubmit = async (formData: { quantity: number; dueDate: string }) => {
    try {
      await borrowBook({
        bookId: bookId!,
        quantity: formData.quantity,
        dueDate: formData.dueDate,
      }).unwrap();
      toast.success("Book borrowed");
      navigate("/borrow-summary");
    } catch (err: any) {
      toast.error(err?.data?.message || "Borrow failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Borrow Book</h1>

      {book?.data?.title && (
        <p className="text-lg font-semibold ">Book Name: {book.data.title}</p>
      )}
      <span className="text-lg font-semibold ">Available Quantity: </span>
      {book?.data?.copies && (
        <span className="text-lg font-semibold my-3">{book.data.copies}</span>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block">Required Quantity</label>

          <input
            type="number"
            {...register("quantity", {
              required: "quantity is required",
              min: { value: 1, message: "Must be at least 1" },
              validate: (value) =>
                value <= (book?.data?.copies || 0) ||
                "exceeds  available copies",
            })}
            className="w-full border p-2 rounded"
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity.message}</p>
          )}
        </div>

        <div>
          <label className="block">Due Date</label>
          <input
            type="date"
            {...register("dueDate", { required: "Due date required" })}
            className="w-full border p-2 rounded"
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {isLoading ? "Borrowing..." : "Borrow Book"}
        </button>
      </form>
    </div>
  );
};

export default BorrowBook;
