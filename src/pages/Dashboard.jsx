import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "@chakra-ui/react";
import Nav from "../components/Nav";
import dashboard from "../assets/dashboard.png";
import MyProfile from "../components/MyProfile";
import Bookmarks from "../components/Bookmarks"; // Add if it exists
import EditProfile from "../components/EditProfile"; // Add if it exists
import Results from "../components/Results"; // Add if it exists
import VideoCarousel from "../components/VideoCarousel";
import Footer from "../components/Footer"; // Add if it exists
const Dashboard = () => {
  const { userEmail } = useAuth();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (userEmail) {
      fetch(`http://localhost:5000/user/${userEmail}`)
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((err) => console.error("Error fetching user data:", err));
    }
  }, [userEmail]);

  const {
    data: videos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/videos");
      if (!res.ok) throw new Error("Failed to fetch videos");
      return res.json();
    },
  });

  const getVideoId = (url) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:.*v=|embed\/|v\/|shorts\/))([^?&\n]+)/
    );
    return match ? match[1] : "";
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "profile":
        return (
          <MyProfile
            userData={userData}
            isLoading={isLoading}
            isError={isError}
          />
        );
      case "bookmarks":
        return <Bookmarks userData={userData} />;
      case "edit":
        return <EditProfile userData={userData} />;
      case "results":
        return <Results userData={userData} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Nav />
      <div className=" px-8 py-6">
        <div
          className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between bg-cover bg-center"
          style={{
            backgroundImage: `url(${dashboard})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="p-4 rounded-lg bg-opacity-70">
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

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {[
            { key: "profile", label: "My Profile" },
            { key: "bookmarks", label: "Bookmarks" },
            { key: "edit", label: "Edit Profile" },
            { key: "results", label: "Results" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full font-semibold ${
                activeTab === tab.key
                  ? "bg-blue-300 text-black"
                  : "border border-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Component Rendering */}
        <div className="flex flex-col md:flex-row justify-center gap-6 mt-7 items-start">
          {isLoading ? (
            <div className="flex items-center justify-center w-full">
              <Spinner size="xl" color="blue.500" />
            </div>
          ) : (
            <>
              <div className="w-full md:w-1/2">{renderActiveTab()}</div>
              <div className="w-full md:w-1/2">
                <VideoCarousel
                  videos={videos}
                  isLoading={isLoading}
                  isError={isError}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
