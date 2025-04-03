import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Use Routes instead of Switch
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import Admin from "./admin/home";
import Content from "./admin/Content";
import AddNote from "./admin/AddNote";
import NoteDetail  from "./pages/NoteDetail";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/content" element={<Content />} />
          <Route path="/admin/AddNote" element={<AddNote />} />
          <Route path="/note/:category/:id" element={<NoteDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

