import { Link } from "react-router";

const Navbar = () => {
  return (
    <div>
      <nav className="max-w-7xl mx-auto h-16 flex justify-between items-center gap-3 px-5 bg-white shadow-md ">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-2xl font-bold text-green-600">MySite</span>
        </div>

        <Link to="/" className="text-gray-700 hover:text-green-600 font-medium">
          Home
        </Link>

        <Link
          to="/books"
          className="text-gray-700 hover:text-green-600 font-medium"
        >
          Book List
        </Link>

        <Link
          to="/create-book"
          className="text-gray-700 hover:text-green-600 font-medium"
        >
          Add Book
        </Link>

        <Link
          to="/borrow-summary"
          className="text-gray-700 hover:text-green-600 font-medium"
        >
          Borrow Summary
        </Link>

        <div className="ml-auto"></div>
      </nav>
    </div>
  );
};

export default Navbar;
