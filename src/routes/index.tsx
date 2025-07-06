import { createBrowserRouter } from "react-router";
import App from "../App";
import books from "../pages/Books";
import createBook from "../pages/CreateBook";
import BorrowSummary from "../pages/BorrowSummary";
import BookDetailPage from "../pages/BookDetailPage";
import EditBook from "../pages/EditBook";
import BorrowBook from "../pages/BorrowBook";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
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
        Component: EditBook,
      },
      {
        path: "/borrow/:bookId",
        Component: BorrowBook,
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary,
      },
    ],
  },
]);

export default router;
