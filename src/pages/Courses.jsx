import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Bg from "../Assets/coursesbg.png";
import CoursesSlider from "../components/CoursesSlider";
import Footer from "../components/Footer";
import Lottie from "react-lottie-player";
import { Link } from "react-router-dom";
import NoData from "../Assets/no_data.json";
function Courses() {
  const [selectedSection, setSelectedSection] = useState(null);
  const [courses, setCourses] = useState({
    "Class 9 Science": [],
    "Class 10 Science": [],
    "Class 9 Math": [],
    "Class 10 Math": [],
  });

  // Function to toggle sections
  const toggleSection = (section) => {
    setSelectedSection(selectedSection === section ? null : section);
  };

  // Function to fetch course data
  const fetchCourses = async (category) => {
    try {
      const response = await fetch(`http://localhost:5000/notes/${category}`);
      const data = await response.json();
      setCourses((prevCourses) => ({ ...prevCourses, [category]: data }));
    } catch (error) {
      console.error(`Error fetching ${category} courses:`, error);
    }
  };

  // Fetch all course categories on mount
  useEffect(() => {
    [
      "Class 9 Science",
      "Class 10 Science",
      "Class 9 Math",
      "Class 10 Math",
    ].forEach(fetchCourses);
  }, []);

  return (
    <>
      <Nav />
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
        {["Class 10 Science", "Class 9 Science"].map((category) => (
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
        {["Class 10 Math", "Class 9 Math"].map((category) => (
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
  );
}

export default Courses;
