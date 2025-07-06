const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Left side */}
        <div className="text-center md:text-left">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Library App. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="flex space-x-4">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/books" className="hover:underline">
            Books
          </a>
          <a href="/borrow-summary" className="hover:underline">
            Borrow Summary
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
