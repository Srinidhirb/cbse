import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/admin" className="text-2xl font-bold">
          Admin Panel
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
       
          <Link to="/admin/users" className="hover:text-gray-400">Users</Link>
          <Link to="/admin/content" className="hover:text-gray-400">Content</Link>
          <Link to="/admin/AddNote" className="hover:text-gray-400">AddNote</Link>
          <Link to="/admin/blogs" className="hover:text-gray-400">Blogs</Link>
          
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-gray-800 p-4 flex flex-col space-y-2">
          
          <Link to="/admin/users" className="hover:text-gray-400">Users</Link>
          <Link to="/admin/content" className="hover:text-gray-400">Content</Link>
          <Link to="/admin/AddNote" className="hover:text-gray-400">AddNote</Link>
          <Link to="/admin/blogs" className="hover:text-gray-400">Blogs</Link>
         
        </div>
      )}
    </nav>
  );
}

export default AdminNavbar;
