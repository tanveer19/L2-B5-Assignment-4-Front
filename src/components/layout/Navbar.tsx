import { Link } from "react-router";
import logo from "../../assets/library.png";
const Navbar = () => {
  return (
    <div>
      <nav className="max-w-7xl mx-auto h-16 flex justify-center items-center gap-3 px-5 bg-white shadow-md ">
        <Link to="/" className="text-gray-700 hover:text-green-600 font-medium">
          <img src={logo} alt="" />
        </Link>
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
      </nav>
    </div>
  );
};

export default Navbar;
