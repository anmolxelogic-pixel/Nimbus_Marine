import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Homepage/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Protected from "./components/Route/Protected";
import PublicRoute from "./components/Route/PublicRoute";
import RoleRedirect from "./components/Route/RoleRedirect";
import UserDashboard from "./components/Dashboard/UserDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Navbar/Footer";
import About from "./components/Homepage/About";
import Contact from "./components/Homepage/Contact";


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer position="top-right" autoClose={200} />

      <Navbar />

      <main className="flex-1">
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />

        </Routes>

      </main>
      <Footer />
    </div>
  );
}

export default App;
