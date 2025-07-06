import { useGetBorrowSummaryQuery } from "../redux/features/books/booksApi";

const BorrowSummary = () => {
  const { data, isLoading, error } = useGetBorrowSummaryQuery();

  if (isLoading) return <p>Loading borrow summary...</p>;
  if (error) return <p className="text-red-500">Failed to load summary</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Borrow Summary</h1>
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1 text-left">Title</th>
            <th className="border px-2 py-1 text-left">ISBN</th>
            <th className="border px-2 py-1 text-left">Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item, index) => (
            <tr key={index}>
              <td className="border px-2 py-1">{item.book.title}</td>
              <td className="border px-2 py-1">{item.book.isbn}</td>
              <td className="border px-2 py-1">{item.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowSummary;
