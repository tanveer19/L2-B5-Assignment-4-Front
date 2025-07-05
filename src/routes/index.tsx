import { createBrowserRouter } from "react-router";
import App from "../App";
import books from "../pages/Books";
import createBook from "../pages/CreateBook";
import borrowSummary from "../pages/BorrowSummary";
import BookDetailPage from "../pages/BookDetailPage";
import editBook from "../pages/EditBook";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        // index: true,
        path: "books",
        Component: books,
      },
      {
        path: "create-book",
        Component: createBook,
      },
      {
        path: "/books/:id",
        Component: BookDetailPage,
      },
      {
        path: "/edit-book/:id",
        Component: editBook,
      },
      {
        path: "borrow-summary",
        Component: borrowSummary,
      },
    ],
  },
]);

export default router;
