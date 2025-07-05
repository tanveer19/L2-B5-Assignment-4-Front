import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import type { Book } from "../types";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "../redux/features/books/booksApi";
import { toast } from "react-toastify";
import { useEffect } from "react";

const GENRES = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [editBook, { isLoading }] = useUpdateBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<Partial<Book>>();

  const { data, isLoading: isBookLoading } = useGetBookByIdQuery(id!, {
    skip: !id,
  });

  useEffect(() => {
    if (data?.data) {
      reset(data.data);
    }
  }, [data, reset]);

  if (isBookLoading) {
    return <p>Loading book data...</p>;
  }

  const onSubmit = async (formData: Partial<Book>) => {
    try {
      if (!id) return;
      const result = await editBook({ id, data: formData }).unwrap();
      toast.success(result.message || "Book edited successfully!");
      reset();
      navigate("/books");
    } catch (error: any) {
      const backendMsg =
        error?.data?.error || error?.data?.message || "Failed to update book";

      toast.error(backendMsg);

      if (backendMsg.includes("isbn")) {
        setError("isbn", { type: "server", message: backendMsg });
      }
      if (backendMsg.includes("genre")) {
        setError("genre", { type: "server", message: backendMsg });
      }
      if (backendMsg.includes("title")) {
        setError("title", { type: "server", message: backendMsg });
      }
      if (backendMsg.includes("author")) {
        setError("author", { type: "server", message: backendMsg });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block">Author</label>
          <input
            {...register("author", { required: "Author is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.author && (
            <p className="text-red-500 text-sm">{errors.author.message}</p>
          )}
        </div>

        <div>
          <label className="block">Genre</label>
          <select
            {...register("genre", { required: "Genre is required" })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select a genre</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.genre && (
            <p className="text-red-500 text-sm">{errors.genre.message}</p>
          )}
        </div>

        <div>
          <label className="block">ISBN</label>
          <input
            {...register("isbn", {
              required: "ISBN is required",
              pattern: {
                value: /^\d{13}$/,
                message: "ISBN must be exactly 13 digits (no dashes or spaces)",
              },
            })}
            placeholder="e.g. 9783161484100"
            className="w-full border p-2 rounded"
          />
          {errors.isbn && (
            <p className="text-red-500 text-sm">{errors.isbn.message}</p>
          )}
        </div>

        <div>
          <label className="block">Description</label>
          <textarea
            {...register("description")}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block">Copies</label>
          <input
            type="number"
            {...register("copies", {
              required: "Copies is required",
              min: { value: 0, message: "Copies must be >= 0" },
            })}
            className="w-full border p-2 rounded"
          />
          {errors.copies && (
            <p className="text-red-500 text-sm">{errors.copies.message}</p>
          )}
        </div>

        {/* <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("available")}
              className="mr-2"
            />
            Available
          </label>
        </div> */}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default EditBook;
