import React, { useState } from "react";
import Nav from "../components/Nav";
import Slider from "../components/LoginSlider";
import LoginSlider from "../components/LoginSlider";


const Login = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setStep(2);
    }
  };

  

  return (
    <>
      <Nav />
      <div className="flex justify-evenly items-center min-h-[80vh]">
        {/* Slider Section */}
       <LoginSlider/>

        {/* Login Section */}
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold mb-6">Login</h1>

          {step === 1 && (
            <div className="flex flex-col gap-6">
              {/* Step Indicator */}
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-400 text-white rounded-full font-semibold">
                  1
                </div>
                <div className="h-px flex-1 border-t border-dotted border-gray-500"></div>
                <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-500 rounded-full font-semibold">
                  2
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Enter your Mail Id to continue your journey
              </p>

              {/* Form */}
              <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
                <label className="text-lg font-medium">
                  Mail ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="border border-gray-300 rounded-md p-2 w-72"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500"
                >
                  Submit
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4">
              {/* Step Indicator */}
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 bg-green-400 text-white rounded-full font-semibold">
                  ✓
                </div>
                <div className="h-px flex-1 border-t border-dotted border-gray-500"></div>
                <div className="flex items-center justify-center w-8 h-8 bg-blue-400 text-white rounded-full font-semibold">
                  2
                </div>
              </div>
              <p className="text-sm text-gray-500">Verify</p>

              {/* OTP Form */}
              <p className="text-lg font-medium">Enter the OTP sent to {email}</p>
              <div className="flex items-center justify-center gap-4">
                {Array(4)
                  .fill("")
                  .map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="border border-gray-300 rounded-md p-2 w-12 text-center"
                    />
                  ))}
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500"
              >
                Submit
              </button>
            </div>
          )}

          <p className="mt-6 text-sm">
            Don't have an account?{" "}
            <a href="#" className="text-blue-500">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
