import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
const Bg = "../assets/coursesbg.png";
import CoursesSlider from "../components/CoursesSlider";
import Footer from "../components/Footer";
import Lottie from "react-lottie-player";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

function Courses() {
  const [selectedSection, setSelectedSection] = useState(null);
  const [noDataAnimation, setNoDataAnimation] = useState(null);
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
  useEffect(() => {
    fetch("/json/no_data.json")
      .then((res) => res.json())
      .then((data) => setNoDataAnimation(data))
      .catch((err) => console.error("Error loading NoData animation:", err));
  }, []);
  // Initialize courses state for all categories
  const [courses, setCourses] = useState(
    allCategories.reduce((acc, cat) => ({ ...acc, [cat]: [] }), {})
  );
  const [sectionLoading, setSectionLoading] = useState({});

  const [loading, setLoading] = useState(true);

  const classes = [
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
  ];

  // Updated function to fetch course data only when a section is expanded
  const fetchCourses = async (noteClass, subject) => {
    try {
      // Skip if data already exists
      if (courses[noteClass]?.[subject]?.length > 0) return;

      // Set loader for this section
      setSectionLoading((prev) => ({
        ...prev,
        [`${noteClass}-${subject}`]: true,
      }));

      const queryParams = new URLSearchParams({ class: noteClass, subject });
      const response = await fetch(
        `${API_URL}/notes?${queryParams.toString()}`
      );
      const result = await response.json();

      if (response.ok && result.data) {
        setCourses((prevCourses) => ({
          ...prevCourses,
          [noteClass]: {
            ...prevCourses[noteClass],
            [subject]: result.data,
          },
        }));
      } else {
        console.error(`Failed to fetch courses: ${result.message}`);
      }
    } catch (error) {
      console.error(
        `Error fetching courses for ${noteClass} - ${subject}:`,
        error
      );
    } finally {
      // Remove loader for this section
      setSectionLoading((prev) => ({
        ...prev,
        [`${noteClass}-${subject}`]: false,
      }));
    }
  };

  // Function to toggle sections
  const toggleSection = (noteClass, subject) => {
    if (
      selectedSection?.class !== noteClass ||
      selectedSection?.subject !== subject
    ) {
      fetchCourses(noteClass, subject); // Fetch data for the selected section
    }
    setSelectedSection(
      selectedSection?.class === noteClass &&
        selectedSection?.subject === subject
        ? null
        : { class: noteClass, subject }
    );
  };

  // Removed fetchCoursesSequentially from useEffect to avoid fetching all categories on mount
  useEffect(() => {
    setLoading(false); // Set loading to false directly since data is fetched on demand
  }, []);

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
              Our CBSE courses for 8th to 10th grade offer a comprehensive
              learning experience, combining expertly crafted content with
              interactive resources to help students understand key concepts and
              excel in their studies.
            </span>
          </div>

          <CoursesSlider />
          <div className="p-4 max-w-7xl my-8 mx-auto">
            <div className="flex flex-row gap-6 justify-between">
              <div className="w-2/4 ">
                <h1 className="text-2xl font-bold mb-4">Science Courses</h1>
                {classes.map((noteClass) => (
                  <div
                    key={noteClass}
                    className="mb-8 border border-blueborder rounded-lg"
                  >
                    <div>
                      <button
                        onClick={() => toggleSection(noteClass, "Science")}
                        className="w-full text-left p-4 bg-white text-black font-semibold rounded-lg flex justify-between items-center"
                      >
                        <h2 className="text-lg font-semibold mb-2 ml-1">
                          {noteClass} Science
                        </h2>
                        <span>
                          {selectedSection?.class === noteClass &&
                          selectedSection?.subject === "Science"
                            ? "▲"
                            : "▼"}
                        </span>
                      </button>
                      {selectedSection?.class === noteClass &&
                        selectedSection?.subject === "Science" && (
                          <div className="bg-white rounded-lg p-4 space-y-4 transition-all duration-1000 ease-in-out">
                            {sectionLoading[`${noteClass}-Science`] ? (
                              <div className="flex justify-center py-8">
                                <Spinner size="xl" />
                              </div>
                            ) : courses[noteClass]?.["Science"]?.length > 0 ? (
                              courses[noteClass]["Science"].map(
                                (course, index) => (
                                  <div
                                    key={index}
                                    className="p-4 bg-lightblue rounded-lg shadow"
                                  >
                                    <h3 className="text-lg font-semibold">
                                      {course.title}
                                    </h3>
                                    <p className="text-sm text-gray-700">
                                      {course.description}
                                    </p>
                                    <div className="flex justify-end space-x-2 mt-2">
                                      <Link
                                        to={`/note/${noteClass}/${course._id}`}
                                      >
                                        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                                          Start Learning
                                        </button>
                                      </Link>
                                      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                        Read Later
                                      </button>
                                    </div>
                                  </div>
                                )
                              )
                            ) : (
                              <p className="text-gray-600 flex items-center justify-center flex-col">
                                <Lottie
                                  loop={true}
                                  play
                                  animationData={noDataAnimation}
                                  style={{ width: 150, height: 100 }}
                                />
                                No courses available.
                              </p>
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-2/4 ">
                <h1 className="text-2xl font-bold mb-4">Math Courses</h1>
                {classes.map((noteClass) => (
                  <div
                    key={noteClass}
                    className="mb-8 border border-blueborder rounded-lg"
                  >
                    <div>
                      <button
                        onClick={() => toggleSection(noteClass, "Math")}
                        className="w-full text-left p-4 bg-white text-black font-semibold rounded-lg flex justify-between items-center"
                      >
                        <h2 className="text-lg font-semibold mb-2 ml-1">
                          {noteClass} Math
                        </h2>
                        <span>
                          {selectedSection?.class === noteClass &&
                          selectedSection?.subject === "Math"
                            ? "▲"
                            : "▼"}
                        </span>
                      </button>
                      {selectedSection?.class === noteClass &&
                        selectedSection?.subject === "Math" && (
                          <div className="bg-white rounded-lg p-4 space-y-4 transition-all duration-1000 ease-in-out">
                            {sectionLoading[`${noteClass}-Math`] ? (
                              <div className="flex justify-center py-8">
                                <Spinner size={"xl"} />
                              </div>
                            ) : courses[noteClass]?.["Math"]?.length > 0 ? (
                              courses[noteClass]["Math"].map(
                                (course, index) => (
                                  <div
                                    key={index}
                                    className="p-4 bg-lightblue rounded-lg shadow"
                                  >
                                    <h3 className="text-lg font-semibold">
                                      {course.title}
                                    </h3>
                                    <p className="text-sm text-gray-700">
                                      {course.description}
                                    </p>
                                    <div className="flex justify-end space-x-2 mt-2">
                                      <Link
                                        to={`/note/${noteClass}/${course._id}`}
                                      >
                                        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                                          Start Learning
                                        </button>
                                      </Link>
                                      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                        Read Later
                                      </button>
                                    </div>
                                  </div>
                                )
                              )
                            ) : (
                              <p className="text-gray-600 flex items-center justify-center flex-col">
                                <Lottie
                                  loop={true}
                                  play
                                  animationData={noDataAnimation}
                                  style={{ width: 150, height: 100 }}
                                />
                                No courses available.
                              </p>
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Courses;
