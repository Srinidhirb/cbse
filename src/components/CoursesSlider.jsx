import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Courses1 from "../Assets/courses1.png";
import Courses2 from "../Assets/courses2.png";
import Courses3 from "../Assets/courses3.png";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 1 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 1 },
    },
  ],
};

function CoursesSlider() {
  const courseData = [
    {
      image: Courses1,
      buttonText: "View Videos",
      heading: "Video Lectures",
      features: [
        {
          title: "Engaging Content",
          desc: "Our video lectures break down complex topics into easy-to-understand segments with animations and real-world examples, making learning enjoyable.",
        },
        {
          title: "Flexible Learning",
          desc: "Learn at your own pace with the ability to pause, rewind, and revisit lectures, accommodating different learning styles.",
        },
        {
          title: "Interactive Elements",
          desc: "Videos include quizzes and polls to test understanding and keep students engaged.",
        },
      ],
    },
    {
      image: Courses2,
      buttonText: "View Notes",
      heading: "Comprehensive Notes",
      features: [
        {
          title: "Detailed Summaries",
          desc: "Our notes highlight key points and concepts, providing a valuable reference for revision.",
        },
        {
          title: "Easy to Follow",
          desc: "Structured with bullet points, diagrams, and charts for clarity and retention.",
        },
        {
          title: "Downloadable Formats",
          desc: "Access notes in PDF or DOC for offline study and easy printing.",
        },
      ],
    },
    {
      image: Courses3,
      buttonText: "View Test",
      heading: "Practice Exams",
      features: [
        {
          title: "Real Exam Simulation",
          desc: "Practice exams mimic CBSE exam formats, familiarizing students with the types of questions and strategies.",
        },
        {
          title: "Immediate Feedback",
          desc: "Get detailed explanations for answers to identify areas for improvement.",
        },
        {
          title: "Progress Tracking",
          desc: "Monitor performance, set goals, and track progress to build confidence and prepare thoroughly for exams.",
        },
      ],
    },
  ];

  return (
    <div className="overflow-hidden py-8 px-4 md:px-10">
      <Slider {...settings}>
        {courseData.map((course, index) => (
          <div key={index} className="flex justify-center items-center px-2">
            <div className="bg-white border border-gray-200 rounded-3xl p-4 md:p-6 max-w-7xl w-full mx-auto">
              <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
                {/* Image Section */}
                <div className="w-full md:w-auto flex flex-col items-center">
                  <div className="w-60 md:w-80 rounded-lg overflow-hidden">
                    <img src={course.image} alt="" className="w-full h-auto" />
                  </div>
                  <div className="mt-4 text-center">
                    <button className="bg-lightblue text-black py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                      {course.buttonText}
                    </button>
                  </div>
                </div>

                {/* Text Content */}
                <div className=" lg:text-left w-full">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                    {course.heading}
                  </h2>
                  <ul className="space-y-4 text-sm md:text-base text-gray-700">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="font-medium leading-relaxed">
                        <span className="font-semibold text-base md:text-lg block">
                          • {feature.title}:
                        </span>{" "}
                        {feature.desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CoursesSlider;
