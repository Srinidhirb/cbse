import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import dashboard from "../assets/dashboard.png";

const Dashboard = () => {
  const { userEmail, logout } = useAuth();
  const [userData, setUserData] = useState(null);

  // Fetch user data from backend
  useEffect(() => {
    if (userEmail) {
      fetch(`http://localhost:5000/user/${userEmail}`)
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((err) => console.error("Error fetching user data:", err));
    }
  }, [userEmail]);

  return (
    <>
      <Nav />
      <div className="min-h-screen px-8 py-6">
        {/* Header Section */}
        <div
          className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between bg-cover bg-center"
          style={{
            backgroundImage: `url(${dashboard})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Welcome</h2>
            {userData ? (
              <h1 className="text-2xl font-bold text-blue-700">
                {userData.fullName}
              </h1>
            ) : (
              <p className="mt-4 text-gray-600">{userEmail}</p>
            )}
          </div>
        </div>

        {/* Display User Info */}
        {userData ? (
          <div className="mt-6 p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">User Details</h3>
            <p>
              <strong>Name:</strong> {userData.fullName}
            </p>
            <p>
              <strong>Email:</strong> {userData.emailAddress}
            </p>
            <p>
              <strong>phoneNumber:</strong> {userData.phoneNumber}
            </p>
            <p>
              <strong>gender:</strong> {userData.gender}
            </p>
            {/* Add more user details here */}
          </div>
        ) : (
          <p className="mt-4 text-gray-600">Loading user data...</p>
        )}

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mt-6">
          <button className="px-4 py-2 bg-blue-300 text-black rounded-full font-semibold">
            My Profile
          </button>
          <button className="px-4 py-2 border border-black rounded-full">
            Bookmarks
          </button>
          <button className="px-4 py-2 border border-black rounded-full">
            Edit Profile
          </button>
          <button className="px-4 py-2 border border-black rounded-full">
            Results
          </button>
        </div>

        <div className="flex">
          {/* Video Section */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold">
              Videos that may interest you
            </h3>
            <div className="flex space-x-4 mt-4">
              {/* Video Card 1 */}
              <div className="w-1/2 border rounded-lg shadow">
                <iframe
                  className="w-full rounded-t-lg"
                  height="200"
                  src="https://www.youtube.com/embed/sample1"
                  title="Mathematics Video"
                ></iframe>
                <div className="p-4">
                  <p className="text-red-600 font-bold">Mathematics</p>
                  <p>Introduction to Trigonometry</p>
                </div>
              </div>

              {/* Video Card 2 */}
              <div className="w-1/2 border rounded-lg shadow">
                <iframe
                  className="w-full rounded-t-lg"
                  height="200"
                  src="https://www.youtube.com/embed/sample2"
                  title="Physics Video"
                ></iframe>
                <div className="p-4">
                  <p className="text-purple-600 font-bold">Physics</p>
                  <p>Introduction to Angles and Views</p>
                </div>
              </div>
            </div>
          </div>

          {/* Concept Videos Section */}
          <div className="mt-6 p-6 bg-blue-100 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Concept Videos</h3>
            <p>Browse video lessons</p>
            <Link
              to="/concept-videos"
              className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              View Concept Videos
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
 