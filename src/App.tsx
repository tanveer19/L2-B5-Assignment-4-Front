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
      <ToastContainer position="top-right" autoClose={3000} />
      <Footer></Footer>
    </div>
  );
}

export default App;
