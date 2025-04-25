import React from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

function Home() {
  return (
    <>
      <AdminNavbar />
      <div className="max-w-6xl mx-auto p-6">
        <span className="text-3xl font-semibold block mb-6">Admin Page</span>

        {/* Grid layout for cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Management */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">User Management</h2>
            <p className="text-gray-600">
              Manage user accounts, roles, and permissions.
            </p>
            <Link to="/admin/users">
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Manage Users
              </button>
            </Link>
          </div>

          {/* Content Management */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Content Management</h2>
            <p className="text-gray-600">
              Add, edit, or remove website content.
            </p>
            <Link to="/admin/content">
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Manage Content
              </button>
            </Link>
          </div>

          {/* Add Notes */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Add Notes</h2>
            <p className="text-gray-600">Add notes for class 9 and 10</p>
            <Link to="/admin/AddNote">
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add Notes
              </button>
            </Link>
          </div>

          {/* System Settings */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">System Settings</h2>
            <p className="text-gray-600">
            Question Papers
            </p>
            <Link to="/admin/settings">
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Open Settings
              </button>
            </Link>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">System Settings</h2>
            <p className="text-gray-600">
              Configure system preferences and security settings.
            </p>
            <Link to="/admin/question-paper/upload">
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Open Settings
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
