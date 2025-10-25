import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Suc from "../assets/success.png";
import Hero from "../assets/hero.png";
import step1 from "../assets/step1.png";
import step2 from "../assets/step2.png";
import step3 from "../assets/step3.png";
import step4 from "../assets/step4.png";
import TestimonialSection from "../components/TestimonialSection";
import CardCarousel from "../components/CardCarousel";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Lottie from "react-lottie-player";

import Loader from "../components/Loader";
import { AnimatePresence, motion } from "framer-motion";
import SuccessSection from "../components/SuccessSection";
function home() {
  const [selectedStep, setSelectedStep] = useState("signup");
  const [loading, setLoading] = useState(true);
  const [signData, setSignData] = useState(null);
  const [accessData, setAccessData] = useState(null);
  const [practiceData, setPracticeData] = useState(null);
  const [resultData, setResultData] = useState(null);
  useEffect(() => {
    const fetchJsonData = async () => {
      const sign = await fetch("/json/sign_in.json").then((res) => res.json());
      const access = await fetch("/json/access.json").then((res) => res.json());
      const practice = await fetch("/json/exam.json").then((res) => res.json());
      const result = await fetch("/json/result.json").then((res) => res.json());

      setSignData(sign);
      setAccessData(access);
      setPracticeData(practice);
      setResultData(result);
    };

    fetchJsonData();
  }, []);

  // Function to render the image based on the selected step
  const renderStepImage = () => {
    const commonProps = {
      loop: true,
      play: true,
      className: "w-[70%] max-w-[500px] h-auto md:h-[350px]",
    };

    switch (selectedStep) {
      case "signup":
        return signData && <Lottie {...commonProps} animationData={signData} />;
      case "getaccess":
        return (
          accessData && <Lottie {...commonProps} animationData={accessData} />
        );
      case "practice":
        return (
          practiceData && (
            <Lottie {...commonProps} animationData={practiceData} />
          )
        );
      case "result":
        return (
          resultData && <Lottie {...commonProps} animationData={resultData} />
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
          <div className="App ">
            <Nav />
            {/* Hero Section */}
            <div className="w-full min-h-[90vh] px-4 py-10 flex flex-col-reverse md:flex-row justify-center items-center ">
              {/* Content Block */}
              <div className="flex flex-col gap-6 max-w-xl text-center md:text-left">
                <span className="text-3xl md:text-4xl font-medium leading-snug">
                  Take{" "}
                  <span className="text-blue-900 font-bold">
                    student experience
                  </span>{" "}
                  to the next level
                </span>
                <p className="text-sm md:text-base text-gray-700">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
                  <span className="py-3 px-6 rounded-2xl bg-cyan-200 cursor-pointer border border-black font-semibold">
                    Join Now
                  </span>
                  <img src={Suc} alt="Success" className="w-28 sm:w-32" />
                </div>
              </div>

              {/* Image Block */}
              <img
                src={Hero}
                alt="Hero"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
              />
            </div>

            {/* Success Section */}
            <SuccessSection />

            {/* How it works Section */}
            <div className="w-full max-w-5xl m-auto mb-20 px-4">
              <span className="text-center text-2xl md:text-3xl font-semibold block mb-10">
                How it works
              </span>

              {/* Mobile Layout */}
              <div className="flex flex-col items-center gap-6 lg:hidden">
                {/* Step Buttons on Top */}
                <div className="flex gap-3 flex-wrap justify-center">
                  {[
                    { key: "signup", label: "Sign Up" },
                    { key: "getaccess", label: "Get Access" },
                    { key: "practice", label: "Practice" },
                    { key: "result", label: "Result" },
                  ].map((step) => (
                    <button
                      key={step.key}
                      onClick={() => setSelectedStep(step.key)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                        selectedStep === step.key
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-600 border-blue-600"
                      }`}
                    >
                      {step.label}
                    </button>
                  ))}
                </div>

                {/* Lottie Animation Below Buttons */}
                <div className="w-full flex justify-center items-center">
                  {renderStepImage()}
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:flex justify-between items-start gap-12">
                {/* Steps Sidebar */}
                <div className="flex flex-col gap-4 w-full max-w-md">
                  {[
                    {
                      key: "signup",
                      title: "Sign Up",
                      desc: "Montes Vivamus Curve Quisque Et Primis Pretium Nullam.",
                    },
                    {
                      key: "getaccess",
                      title: "Get Access",
                      desc: "Montes Vivamus Curve Quisque Et Primis Pretium Nullam.",
                    },
                    {
                      key: "practice",
                      title: "Practice Questions",
                      desc: "Prepare for the exam with revision and tracking features.",
                    },
                    {
                      key: "result",
                      title: "Get Result",
                      desc: "Compare your results with peers with advanced analytics.",
                    },
                  ].map((step) => (
                    <div
                      key={step.key}
                      className={`p-4 rounded-lg cursor-pointer ${
                        selectedStep === step.key
                          ? "bg-blue-600 text-white"
                          : "bg-white text-black"
                      } shadow`}
                      onClick={() => setSelectedStep(step.key)}
                    >
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <p className="text-sm">{step.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Step Image */}
                <div className="w-full flex justify-center items-center">
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
