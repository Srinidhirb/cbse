import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react"; // Import Chakra toast
import Nav from "../components/Nav";
import LoginSlider from "../components/LoginSlider";

const sendOTPRequest = async (email) => {
  const response = await fetch("http://localhost:5000/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json(); // Parse the response JSON

  if (!response.ok) {
    throw new Error(data.error || "Failed to send OTP"); // Use the backend error message if available
  }

  return data; // Return the success response
};


const verifyOTPRequest = async ({ email, otp }) => {
  const response = await fetch("http://localhost:5000/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  if (!response.ok) {
    throw new Error("Invalid OTP");
  }

  return response.json();
};

const Login = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const toast = useToast(); // Initialize Chakra toast
  const navigate = useNavigate(); // Initialize navigation

  const sendOTPMutation = useMutation({
    mutationFn: sendOTPRequest,
    onSuccess: (data) => {
      setLoading(false);
      
      toast({
        title: "Success ✅",
        description: data.message, 
        status: "success",
        duration: 3000,
        isClosable: true,
position: "top-right",
      });
  
      if (data.message === "✅ OTP sent successfully") {
        setStep(2); // Move to OTP verification step only for registered users
      }
    },
    onError: (error) => {
      setLoading(false);
      
      toast({
        title: "Error ❌",
        description: error.message.includes("User not registered") 
          ? " User not registered. Please sign up." 
          : error.message, 
        status: "error",
        duration: 3000,
        isClosable: true,
position: "top-right",
      });
    },
  });

  const verifyOTPMutation = useMutation({
    mutationFn: verifyOTPRequest,
    onSuccess: () => {
      
      toast({
        title: "Login Successful ✅",
        description: "Redirecting to homepage...",
        status: "success",
        duration: 3000,
        isClosable: true,
position: "top-right",
      });
      setTimeout(() => navigate("/"), 2000);
    },
    onError: (error) => {
      toast({
        title: "Invalid OTP ❌",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
position: "top-right",
      });
    },
  });

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setLoading(true);
      sendOTPMutation.mutate(email);
    }
  };

  const handleOTPSubmit = () => {
    const otpCode = otp.join("");
    verifyOTPMutation.mutate({ email, otp: otpCode });
  };

  return (
    <>
      <Nav />
      <div className="flex justify-evenly items-center min-h-[80vh]">
        <LoginSlider />

        <div className="flex flex-col w-2/5 items-center justify-center">
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <p className="text-center text-gray-600 mb-6">Welcome to</p>

          {step === 1 && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-lightblue text-black rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                <div className="h-px flex-1 border-t border-dotted border-gray-500"></div>
                <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
              </div>

              <p className="text-sm text-gray-500">
                Enter your Mail ID to continue your journey
              </p>

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
                  className="px-6 py-2 bg-lightblue text-black rounded-md hover:bg-blue-500 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-green-400 text-white rounded-full flex items-center justify-center font-semibold">
                  ✓
                </div>
                <div className="h-px flex-1 border-t border-dotted border-gray-500"></div>
                <div className="w-8 h-8 bg-lightblue text-black rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
              </div>

              <p className="text-sm text-gray-500">Verify</p>
              <p className="text-lg font-medium">Enter the OTP sent to {email}</p>

              <div className="flex items-center justify-center gap-4">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[index] = e.target.value;
                      setOtp(newOtp);
                    }}
                    className="border border-gray-300 rounded-md p-2 w-12 text-center"
                  />
                ))}
              </div>

              <button
                onClick={handleOTPSubmit}
                className="px-6 py-2 bg-lightblue text-black rounded-md hover:bg-blue-500"
                disabled={verifyOTPMutation.isLoading}
              >
                {verifyOTPMutation.isLoading ? "Verifying..." : "Submit"}
              </button>
            </div>
          )}

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/register">
              <span className="text-blue-500 cursor-pointer">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
