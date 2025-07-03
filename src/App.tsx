import { Outlet } from "react-router";
import Navbar from "./components/layout/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
