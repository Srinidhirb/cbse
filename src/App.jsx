import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Pages
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import NoteDetail from "./pages/NoteDetail";
import FaqPage from "./pages/FaqPage";
import ContactUs from "./pages/ContactUs";

// Admin Pages
import Admin from "./admin/home";
import Content from "./admin/Content";
import AddNote from "./admin/AddNote";
import Users from "./admin/users";
import QuestionPaperUpload from "./admin/QuestionPaperUpload"; // ✅ new


// Route Guards
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/note/:category/:id" element={<NoteDetail />} />

        {/* Protected User Route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/content"
          element={
            <AdminRoute>
              <Content />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/AddNote"
          element={
            <AdminRoute>
              <AddNote />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />
        {/* ✅ New Routes for Question Papers */}
        <Route
          path="/admin/question-paper/upload"
          element={
            <AdminRoute>
              <QuestionPaperUpload />
            </AdminRoute>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;
