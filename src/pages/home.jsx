import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Suc from "../Assets/success.png";
import Hero from "../Assets/hero.png";
import step1 from "../Assets/step1.png";
import step2 from "../Assets/step2.png";
import step3 from "../Assets/step3.png";
import step4 from "../Assets/step4.png";
import TestimonialSection from "../components/TestimonialSection";
import CardCarousel from "../components/CardCarousel";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Lottie from "react-lottie-player";
import Experience from "../Assets/experience.json";
import Courses from "../Assets/courses.json";
import Success from "../Assets/success.json";
import Students from "../Assets/students.json";
import Sign from "../Assets/sign_in.json";
import Access from "../Assets/access.json";
import Practice from "../Assets/exam.json";
import Result from "../Assets/result.json";
import Loader from "../components/Loader";
import { AnimatePresence, motion } from "framer-motion";
function home() {
  const [selectedStep, setSelectedStep] = useState("signup");
  const [loading, setLoading] = useState(true);
  // Function to render the image based on the selected step
  const renderStepImage = () => {
    switch (selectedStep) {
      case "signup":
        return (
          <Lottie
            loop={true}
            play
            animationData={Sign}
            style={{ width: 600, height: 350 }}
            onComplete={() => setShowText(true)}
          />
        );
      case "getaccess":
        return (
          <Lottie
            loop={true}
            play
            animationData={Access}
            style={{ width: 600, height: 350 }}
            onComplete={() => setShowText(true)}
          />
        );
      case "practice":
        return (
          <Lottie
            loop={true}
            play
            animationData={Practice}
            style={{ width: 600, height: 350 }}
            onComplete={() => setShowText(true)}
          />
        );
      case "result":
        return (
          <Lottie
            loop={true}
            play
            animationData={Result}
            style={{ width: 600, height: 350 }}
            onComplete={() => setShowText(true)}
          />
        );
      default:
        return null;
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <AnimatePresence mode="wait">
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
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="App bg-bgblue">
            <Nav />
            {/* Hero Section */}
            <div className="w-full h-[90vh] flex justify-evenly items-center flex-col md:flex-row flex-wrap">
              {/* Content */}
              <div className="flex w-[32rem] leading-5 gap-7 flex-col">
                <span className="text-4xl font-medium">
                  Take{" "}
                  <span className="text-blue-900 font-bold capitalize">
                    student experience{" "}
                  </span>
                  to the next level
                </span>
                <span>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy.
                </span>
                <div className="flex gap-14 items-center">
                  <span className="py-3 h-12 px-5 rounded-2xl bg-cyan-200 cursor-pointer border border-black text-base font-semibold">
                    Join Now
                  </span>
                  <img src={Suc} alt="Success illustration" />
                </div>
              </div>
              <img
                src={Hero}
                alt="Hero illustration"
                className="w-auto h-[75%] max-w-full"
              />
            </div>

            {/* Success Section */}
            <div className="w-full  m-auto max-w-7xl mb-14">
              <span className="text-center text-3xl font-semibold block">
                Our Success
              </span>
              <div className="flex w-full justify-center gap-14 my-11 flex-wrap">
                <div className="border-2 border-blue-900 w-60 h-64 rounded-xl flex flex-col gap-2 items-center justify-center">
                  <Lottie
                    loop={true}
                    play
                    animationData={Students}
                    style={{ width: 150, height: 150 }}
                    onComplete={() => setShowText(true)}
                  />
                  <span className="text-3xl text-blue-900 font-bold">
                    1000+
                  </span>
                  <p className="text-base font-semibold">Number of students</p>
                </div>
                <div className="border-2 border-blue-900 w-60 h-64 justify-center rounded-xl flex flex-col gap-2 items-center">
                  <Lottie
                    loop={true}
                    play
                    animationData={Success}
                    style={{ width: 150, height: 150 }}
                    onComplete={() => setShowText(true)}
                  />
                  <span className="text-3xl text-blue-900 font-bold">98%</span>
                  <p className="text-base font-semibold">
                    Percentage of success
                  </p>
                </div>
                <div className="border-2 border-blue-900 w-60 h-64 justify-center rounded-xl flex flex-col gap-2 items-center">
                  <Lottie
                    loop={true}
                    play
                    animationData={Courses}
                    style={{ width: 150, height: 150 }}
                    onComplete={() => setShowText(true)}
                  />
                  <span className="text-3xl text-blue-900 font-bold">4</span>
                  <p className="text-base font-semibold">Number of Courses</p>
                </div>
                <div className="border-2 border-blue-900 w-60 h-64 justify-center rounded-xl flex flex-col gap-2 items-center">
                  <Lottie
                    loop={true}
                    play
                    animationData={Experience}
                    style={{ width: 150, height: 150 }}
                    onComplete={() => setShowText(true)}
                  />

                  <p className="text-base font-semibold">Years of experience</p>
                </div>
              </div>
            </div>

            {/* How it works Section */}
            <div className="w-full max-w-7xl m-auto mb-20">
              <span className="text-center text-3xl font-semibold block mb-10">
                How it works
              </span>
              <div className="flex justify-evenly    items-center">
                {/* Steps Sidebar */}
                <div className=" flex flex-col gap-4">
                  <div
                    className={`p-4 rounded-lg cursor-pointer ${
                      selectedStep === "signup"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-black"
                    } shadow`}
                    onClick={() => setSelectedStep("signup")}
                  >
                    <h3 className="text-lg font-semibold">Sign Up</h3>
                    <p>
                      Montes Vivamus Curve Quisque Et Primis Pretium Nullam.
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-lg cursor-pointer ${
                      selectedStep === "getaccess"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-black"
                    } shadow`}
                    onClick={() => setSelectedStep("getaccess")}
                  >
                    <h3 className="text-lg font-semibold">Get Access</h3>
                    <p>
                      Montes Vivamus Curve Quisque Et Primis Pretium Nullam.
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-lg cursor-pointer ${
                      selectedStep === "practice"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-black"
                    } shadow`}
                    onClick={() => setSelectedStep("practice")}
                  >
                    <h3 className="text-lg font-semibold">
                      Practice Questions
                    </h3>
                    <p>
                      Prepare for the exam with revision and tracking features.
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-lg cursor-pointer ${
                      selectedStep === "result"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-black"
                    } shadow`}
                    onClick={() => setSelectedStep("result")}
                  >
                    <h3 className="text-lg font-semibold">Get Result</h3>
                    <p>
                      Compare your results with peers with advanced analytics.
                    </p>
                  </div>
                </div>

                {/* Step Image Display */}
                <div className=" flex justify-center items-center">
                  {renderStepImage()}
                </div>
              </div>
            </div>

            <CardCarousel />
            <TestimonialSection />
            <Banner />
            <Footer />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default home;
