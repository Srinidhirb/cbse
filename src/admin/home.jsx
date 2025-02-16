import React from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

function Home() {
  return (
    <>
    <AdminNavbar/>
    <div className="max-w-4xl mx-auto p-6">
      <span className="text-3xl font-semibold block mb-6">Admin Page</span>

      {/* Section: User Management */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-semibold mb-2">User Management</h2>
        <p className="text-gray-600">Manage user accounts, roles, and permissions.</p>
        <Link to="/admin/users">
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Manage Users
          </button>
        </Link>
      </div>

      {/* Section: Content Management */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-semibold mb-2">Content Management</h2>
        <p className="text-gray-600">Add, edit, or remove website content.</p>
        <Link to="/admin/content">
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Manage Content
          </button>
        </Link>
      </div>

      {/* Section: Reports & Analytics */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-semibold mb-2">Reports & Analytics</h2>
        <p className="text-gray-600">View system analytics and generate reports.</p>
        <Link to="/admin/reports">
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            View Reports
          </button>
        </Link>
      </div>

      {/* Section: Settings */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">System Settings</h2>
        <p className="text-gray-600">Configure system preferences and security settings.</p>
        <Link to="/admin/settings">
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Open Settings
          </button>
        </Link>
      </div>
    </div>
    </>
  );
}

export default Home;
