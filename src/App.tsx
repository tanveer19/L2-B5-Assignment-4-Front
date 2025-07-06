import { Outlet } from "react-router";
import Navbar from "./components/layout/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
