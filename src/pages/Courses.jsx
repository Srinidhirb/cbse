import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Bg from "../Assets/coursesbg.png";
import CoursesSlider from "../components/CoursesSlider";
import Footer from "../components/Footer";
import Lottie from "react-lottie-player";
import { Link } from "react-router-dom";
import NoData from "../Assets/no_data.json";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

function Courses() {
  const [selectedSection, setSelectedSection] = useState(null);

  // All categories for Math and Science, Classes 1-10
  const allCategories = [
    "Class 1 Science",
    "Class 2 Science",
    "Class 3 Science",
    "Class 4 Science",
    "Class 5 Science",
    "Class 6 Science",
    "Class 7 Science",
    "Class 8 Science",
    "Class 9 Science",
    "Class 10 Science",
    "Class 1 Math",
    "Class 2 Math",
    "Class 3 Math",
    "Class 4 Math",
    "Class 5 Math",
    "Class 6 Math",
    "Class 7 Math",
    "Class 8 Math",
    "Class 9 Math",
    "Class 10 Math",
  ];

  // Initialize courses state for all categories
  const [courses, setCourses] = useState(
    allCategories.reduce((acc, cat) => ({ ...acc, [cat]: [] }), {})
  );

  const [loading, setLoading] = useState(true);

  // Updated function to fetch course data only when a section is expanded
  const fetchCourses = async (category) => {
    try {
      if (courses[category].length > 0) return; // Skip fetching if data already exists

      const response = await fetch(`${API_URL}/notes/${category}`);
      const data = await response.json();
      setCourses((prevCourses) => ({ ...prevCourses, [category]: data }));
    } catch (error) {
      console.error(`Error fetching ${category} courses:`, error);
    }
  };

  // Function to toggle sections
  const toggleSection = (section) => {
    if (selectedSection !== section) {
      fetchCourses(section); // Fetch data for the selected section
    }
    setSelectedSection(selectedSection === section ? null : section);
  };

  // Removed fetchCoursesSequentially from useEffect to avoid fetching all categories on mount
  useEffect(() => {
    setLoading(false); // Set loading to false directly since data is fetched on demand
  }, []);

  // Split categories for rendering
  const scienceCategories = allCategories.filter((cat) => cat.includes("Science"));
  const mathCategories = allCategories.filter((cat) => cat.includes("Math"));

  return (
    <>
      <Nav />
      {loading ? (
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
          <div
            className="bg-cover bg-center h-[40vh] md:h-[60vh] w-full flex overflow-hidden items-center justify-start px-4 md:px-32"
            style={{ backgroundImage: `url(${Bg})` }}
          >
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              Courses Offered
            </h1>
          </div>

          <div className="flex flex-col w-full my-8 mx-auto max-w-7xl px-4 gap-4 text-gray-800">
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-wide leading-relaxed">
              Explore Our CBSE Courses for 8th to 10th Grade <br />
              Our CBSE courses for 8th to 10th grade offer a comprehensive learning
              experience, combining expertly crafted content with interactive
              resources to help students understand key concepts and excel in their
              studies.
            </span>
          </div>

          <CoursesSlider />
          <div className="p-4 max-w-7xl my-8 mx-auto">
            {/* Science Courses */}
            <p className="text-lg font-semibold mb-2 ml-1">
              {" "}
              Science Courses Section:
            </p>
            {scienceCategories.map((category) => (
              <div
                key={category}
                className="mb-8 border border-blueborder rounded-lg"
              >
                <button
                  onClick={() => toggleSection(category)}
                  className="w-full text-left p-4 bg-white text-black font-semibold rounded-lg flex justify-between items-center"
                >
                  {category}
                  <span>{selectedSection === category ? "▲" : "▼"}</span>
                </button>
                {selectedSection === category && (
                  <div className="bg-white rounded-lg p-4 space-y-4 transition-all duration-1000 ease-in-out">
                    {courses[category].length > 0 ? (
                      courses[category].map((course, index) => (
                        <div
                          key={index}
                          className="p-4 bg-lightblue rounded-lg shadow"
                        >
                          <h3 className="text-lg font-semibold">{course.title}</h3>
                          <p className="text-sm text-gray-700">
                            {course.description}
                          </p>
                          <div className="flex justify-end space-x-2 mt-2">
                            <Link to={`/note/${category}/${course._id}`}>
                              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                                Start Learning
                              </button>
                            </Link>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                              Read Later
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600 flex items-center justify-center flex-col">
                        <Lottie
                          loop={true}
                          play
                          animationData={NoData}
                          style={{ width: 150, height: 100 }}
                        />
                        No courses available.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Math Courses */}
            <p className="text-lg font-semibold mb-2 ml-1">
              {" "}
              Maths Courses Section:
            </p>
            {mathCategories.map((category) => (
              <div
                key={category}
                className="mb-8 border border-blueborder rounded-lg"
              >
                <button
                  onClick={() => toggleSection(category)}
                  className="w-full text-left p-4 bg-white text-black font-semibold rounded-lg flex justify-between items-center"
                >
                  {category}
                  <span>{selectedSection === category ? "▲" : "▼"}</span>
                </button>
                {selectedSection === category && (
                  <div className="bg-white p-4 rounded-lg space-y-4">
                    {courses[category].length > 0 ? (
                      courses[category].map((course, index) => (
                        <div
                          key={index}
                          className="p-4 bg-lightblue rounded-lg shadow"
                        >
                          <h3 className="text-lg font-semibold">{course.title}</h3>
                          <p className="text-sm text-gray-700">
                            {course.description}
                          </p>
                          <div className="flex justify-end space-x-2 mt-2">
                            <Link to={`/note/${category}/${course._id}`}>
                              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                                Start Learning
                              </button>
                            </Link>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                              Read Later
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600 flex items-center justify-center flex-col">
                        <Lottie
                          loop={true}
                          play
                          animationData={NoData}
                          style={{ width: 150, height: 100 }}
                        />
                        No courses available.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Courses;
