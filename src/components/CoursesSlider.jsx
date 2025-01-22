import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Import slick-carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Import slick-carousel theme
import Courses1 from "../Assets/courses1.png";
import Courses2 from "../Assets/courses2.png";
import Courses3 from "../Assets/courses3.png";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true, // Enable autoplay
  autoplaySpeed: 3000, // Speed for automatic sliding (3 seconds)
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

function CoursesSlider() {
  return (
    <div className="overflow-hidden h-[50vh]">
    <Slider {...settings} className="">
      <div className="flex justify-center  items-center">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 max-w-7xl m-auto">
          <div className="flex gap-6 items-center">
            <div>
              <div className="">
                <div className="w-96  rounded-lg flex items-center justify-center">
                  <img src={Courses1} alt="" />
                </div>
              </div>
              <div className="mt-4 text-center">
                <button className="bg-lightblue text-black py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  View Videos
                </button>
              </div>
            </div>

            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Video Lectures
              </h2>
              <ul className="mt-2 space-y-6 text-sm text-gray-700">
                <li className="text-base font-medium leading-6">
                   <span className="font-semibold text-lg "> • Engaging Content:</span> Our
                  video lectures break down complex topics into
                  easy-to-understand segments with animations and real-world
                  examples, making learning enjoyable.
                </li>
                <li className="text-base font-medium leading-6">
                 <span className="font-semibold text-lg"> •  Flexible Learning:</span>{" "}
                  Learn at your own pace with the ability to pause, rewind, and
                  revisit lectures, accommodating different learning styles.
                </li>
                <li className="text-base font-medium leading-6">
                 <span className="font-semibold text-lg"> •  Interactive Elements:</span>{" "}
                  Videos include quizzes and polls to test understanding and
                  keep students engaged.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 max-w-7xl m-auto">
          <div className="flex gap-6 items-center">
            <div>
              <div className="">
                <div className="w-96  rounded-lg flex items-center justify-center">
                  <img src={Courses2} alt="" />
                </div>
              </div>
              <div className="mt-4 text-center">
                <button className="bg-lightblue text-black py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  View Notes
                </button>
              </div>
            </div>

            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Comprehensive Notes
              </h2>
              <ul className="mt-2 space-y-2 text-sm text-gray-700">
                <li className="text-base font-medium leading-6">
                   <span className="font-semibold text-lg "> • Detailed Summaries:</span>{" "}
                  Our notes highlight key points and concepts, providing a
                  valuable reference for revision.
                </li>
                <li className="text-base font-medium leading-6">
                   <span className="font-semibold text-lg ">• Easy to Follow:</span>{" "}
                  Structured with bullet points, diagrams, and charts for
                  clarity and retention.
                </li>
                <li className="text-base font-medium leading-6">
                   <span className="font-semibold text-lg ">• Downloadable Formats</span>{" "}
                  Access notes in PDF or DOC for offline study and easy
                  printing.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 max-w-7xl m-auto">
          <div className="flex gap-6 items-center">
            <div>
              <div className="">
                <div className="w-96  rounded-lg flex items-center justify-center">
                  <img src={Courses3} alt="" />
                </div>
              </div>
              <div className="mt-4 text-center">
                <button className="bg-lightblue text-black py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  View Test
                </button>
              </div>
            </div>

            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Practice Exams
              </h2>
              <ul className="mt-2 space-y-2 text-sm text-gray-700">
                <li className="text-base font-medium leading-6">
                   <span className="font-semibold text-lg ">• Real Exam Simulation:</span>{" "}
                  Practice exams mimic CBSE exam formats, familiarizing students
                  with the types of questions and strategies.
                </li>
                <li className="text-base font-medium leading-6">
                   <span className="font-semibold text-lg ">• Immediate Feedback:</span> Get
                  detailed explanations for answers to identify areas for
                  improvement.
                </li>
                <li className="text-base font-medium leading-6">
                   <span className="font-semibold text-lg ">• Progress Tracking:</span>{" "}
                  Monitor performance, set goals, and track progress to build
                  confidence and prepare thoroughly for exams.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Slider>
    </div>
  );
}

export default CoursesSlider;
