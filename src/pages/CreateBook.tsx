import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { Book } from "../types";
import { useNavigate } from "react-router";
import { useCreateBookMutation } from "../redux/features/books/booksApi";

type CreateBookFormValues = Omit<Book, "_id" | "available">;

const CreateBook = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBookFormValues>();

  const [createBook, { isLoading }] = useCreateBookMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: CreateBookFormValues) => {
    try {
      const payload = { ...data, available: data.copies > 0 };
      await createBook(payload).unwrap();
      toast.success("Book created successfully!");
      reset();
      navigate("/books");
    } catch (err) {
      console.error("Failed to create book:", err);
      toast.error("Failed to create book. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Author</label>
          <input
            type="text"
            {...register("author", { required: "Author is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.author && (
            <p className="text-red-500 text-sm">{errors.author.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Genre</label>
          <input
            type="text"
            {...register("genre", { required: "Genre is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.genre && (
            <p className="text-red-500 text-sm">{errors.genre.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">ISBN</label>
          <input
            type="text"
            {...register("isbn", { required: "ISBN is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.isbn && (
            <p className="text-red-500 text-sm">{errors.isbn.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full border p-2 rounded"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Copies</label>
          <input
            type="number"
            {...register("copies", {
              required: "Copies is required",
              valueAsNumber: true,
              min: { value: 0, message: "Copies cannot be negative" },
            })}
            className="w-full border p-2 rounded"
          />
          {errors.copies && (
            <p className="text-red-500 text-sm">{errors.copies.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {isLoading ? "Creating..." : "Create Book"}
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
