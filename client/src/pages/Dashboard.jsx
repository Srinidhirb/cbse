import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import Nav from "../components/Nav";
const dashboard = "/assets/dashboard.png";
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
    const fetchUserData = async () => {
      try {
        if (userEmail) {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/user/${userEmail}`
          );
          if (!res.ok) {
            throw new Error("Failed to fetch user data");
          }
          const data = await res.json();
          setUserData(data);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [userEmail]);

  const {
    data: videos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/videos`);
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
            <motion.div
              key="loader"
              className="fixed inset-0 flex items-center justify-center bg-white overflow-hidden"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <Loader />
            </motion.div>
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
