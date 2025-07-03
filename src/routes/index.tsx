import { createBrowserRouter } from "react-router";
import App from "../App";
import books from "../pages/Books";
import createBook from "../pages/CreateBook";
import borrowSummary from "../pages/BorrowSummary";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <App />,
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
        path: "borrow-summary",
        Component: borrowSummary,
      },
    ],
  },
]);

export default router;
