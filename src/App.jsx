import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Use Routes instead of Switch
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Admin from "./admin/home";
import Content from "./admin/Content";
import AddNote from "./admin/AddNote";
import PrivateRoute from "./components/PrivateRoute";
import NoteDetail from "./pages/NoteDetail";
import Users from "./admin/users";
import FaqPage from "./pages/FaqPage";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/admin/content" element={<Content />} />
          <Route path="/admin/AddNote" element={<AddNote />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/note/:category/:id" element={<NoteDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
