import React from "react";
import Nav from "../components/Nav";
import Bg from "../Assets/coursesbg.png";
import CoursesSlider from "../components/CoursesSlider";
import { useState } from "react";
import Footer from "../components/Footer";

function Courses() {
  const [selectedSection, setSelectedSection] = useState(null);

  const toggleSection = (section) => {
    setSelectedSection(selectedSection === section ? null : section);
  };
  return (
    <>
      <Nav />

      <div
        className="bg-cover bg-center h-[60vh] w-full flex items-center justify-start pl-32"
        style={{ backgroundImage: `url(${Bg})` }}
      >
        <h1 className="text-white text-3xl font-bold">Courses Offered</h1>
      </div>
      <div className="flex flex-col w-full my-8   m-auto max-w-7xl gap-4">
        <span className="font-medium text-2xl tracking-wider leading-9 ">
          Explore Our CBSE Courses for 8th to 10th Grade <br />
          Our CBSE courses for 8th to 10th grade offer a comprehensive learning
          experience, combining expertly crafted content with interactive
          resources to help students understand key concepts and excel in their
          studies.
        </span>
      </div>
      <CoursesSlider />
      <div className="p-4 max-w-7xl my-8 mx-auto">
      <p className="text-lg font-semibold mb-2 ml-1"> Science Courses Section:</p>
        {/* Section 1 */}
        <div className="mb-8 border border-blueborder  rounded-lg">
          <button
            onClick={() => toggleSection("scienceGrade10")}
            className="w-full text-left p-4 bg-white    text-black font-semibold rounded-lg flex justify-between items-center"
          >
            Science Courses for Grades 10
            <span>{selectedSection === "scienceGrade10" ? "▲" : "▼"}</span>
          </button>
          {selectedSection === "scienceGrade10" && (
            <div className="bg-white p-4 space-y-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 6, 7, 8, 9].map((unit) => (
                <div key={unit} className="p-4 bg-lightblue rounded-lg shadow">
                  <h3 className="text-lg font-semibold">
                    Unit {unit}: Numbers from 1 to 9
                  </h3>
                  <p className="text-sm text-gray-700">
                    This is an example of the description of this unit.
                  </p>
                  <div className="flex justify-end space-x-2 mt-2">
                    <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                      Start Learning
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Read Later
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mb-8 border border-blueborder  rounded-lg">
          <button
            onClick={() => toggleSection("MathGrade10")}
            className="w-full text-left p-4 bg-white    text-black font-semibold rounded-lg flex justify-between items-center"
          >
            Science Courses for Grades 9
            <span>{selectedSection === "MathGrade10" ? "▲" : "▼"}</span>
          </button>
          {selectedSection === "MathGrade10" && (
            <div className="bg-white p-4 space-y-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((unit) => (
                <div key={unit} className="p-4 bg-lightblue rounded-lg shadow">
                  <h3 className="text-lg font-semibold">
                    Unit {unit}: Numbers from 1 to 9
                  </h3>
                  <p className="text-sm text-gray-700">
                    This is an example of the description of this unit.
                  </p>
                  <div className="flex justify-end space-x-2 mt-2">
                    <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                      Start Learning
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Read Later
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <p className="text-lg font-semibold mb-2 ml-1"> Maths Courses Section:</p>
        {/* Section 2 */}
        <div className="mb-8 border border-blueborder  rounded-lg">
          <button
            onClick={() => toggleSection("mathGrade9")}
            className="w-full text-left p-4 bg-white    text-black font-semibold rounded-lg flex justify-between items-center"
          >
            Math Courses for Grades 10
            <span>{selectedSection === "mathGrade9" ? "▲" : "▼"}</span>
          </button>
          {selectedSection === "mathGrade9" && (
            <div className="bg-white p-4 space-y-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((unit) => (
                <div key={unit} className="p-4 bg-lightblue rounded-lg shadow">
                  <h3 className="text-lg font-semibold">
                    Unit {unit}: Numbers from 1 to 9
                  </h3>
                  <p className="text-sm text-gray-700">
                    This is an example of the description of this unit.
                  </p>
                  <div className="flex justify-end space-x-2 mt-2">
                    <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                      Start Learning
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Read Later
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mb-4 border border-blueborder  rounded-lg">
          <button
            onClick={() => toggleSection("mathGrade10")}
            className="w-full text-left p-4 bg-white    text-black font-semibold rounded-lg flex justify-between items-center"
          >
            Math Courses for Grades 9
            <span>{selectedSection === "mathGrade10" ? "▲" : "▼"}</span>
          </button>
          {selectedSection === "mathGrade10" && (
            <div className="bg-white p-4 space-y-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((unit) => (
                <div key={unit} className="p-4 bg-lightblue rounded-lg shadow">
                  <h3 className="text-lg font-semibold">
                    Unit {unit}: Numbers from 1 to 9
                  </h3>
                  <p className="text-sm text-gray-700">
                    This is an example of the description of this unit.
                  </p>
                  <div className="flex justify-end space-x-2 mt-2">
                    <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                      Start Learning
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Read Later
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add more sections as needed */}
        
      </div>
      <Footer/>
    </>
  );
}

export default Courses;
