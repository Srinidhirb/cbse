import { useState } from "react";
import Nav from "../components/Nav";
import LoginSlider from "../components/LoginSlider";

const Register = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
  });

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Nav />
      <div className="flex justify-evenly items-center min-h-[80vh]">
        {/* Slider Section */}
        <LoginSlider />
        <div className="flex flex-col items-center justify-center">
          <div className="w-full  p-8 rounded-lg ">
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
            <p className="text-center text-gray-600 mb-6">Let's get started</p>

            <div className="flex justify-between mb-6">
              <div
                className={`flex-1 text-center ${
                  step >= 1 ? "text-blue-500" : "text-gray-400"
                }`}
              >
                {step > 1 ? "✔" : "1"} <p>Enter Mail ID</p>
              </div>
              <div
                className={`flex-1 text-center ${
                  step >= 2 ? "text-blue-500" : "text-gray-400"
                }`}
              >
                {step > 2 ? "✔" : "2"} <p>Verify</p>
              </div>
              <div
                className={`flex-1 text-center ${
                  step === 3 ? "text-blue-500" : "text-gray-400"
                }`}
              >
                3 <p>Basic details</p>
              </div>
            </div>

            {step === 1 && (
              <div className="flex flex-col space-y-4">
                <label className="font-medium">Mail ID *</label>
                <input
                  type="email"
                  className="border border-gray-300 p-2 rounded-md w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={handleNextStep}
                  className="bg-blue-500 text-white py-2 rounded-md"
                >
                  Get OTP
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col space-y-4">
                <p>Enter the OTP sent to {email}</p>
                <div className="flex space-x-2">
                  {Array(4)
                    .fill("")
                    .map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        className="w-12 border border-gray-300 p-2 rounded-md text-center"
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    ))}
                </div>
                <button
                  onClick={handleNextStep}
                  className="bg-blue-500 text-white py-2 rounded-md"
                >
                  Verify
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="border border-gray-300 p-2 rounded-md"
                    onChange={handleInputChange}
                  />
                  <input
                    type="email"
                    name="emailAddress"
                    placeholder="Email Address"
                    className="border border-gray-300 p-2 rounded-md"
                    onChange={handleInputChange}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border border-gray-300 p-2 rounded-md"
                    onChange={handleInputChange}
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="border border-gray-300 p-2 rounded-md"
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="border border-gray-300 p-2 rounded-md"
                    onChange={handleInputChange}
                  />
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="border border-gray-300 p-2 rounded-md"
                    onChange={handleInputChange}
                  />
                </div>
                <input
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  className="border border-gray-300 p-2 rounded-md"
                  onChange={handleInputChange}
                />
                <button className="bg-blue-500 text-white py-2 rounded-md">
                  Submit
                </button>
              </div>
            )}

            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{" "}
              <span className="text-blue-500 cursor-pointer">Sign Up</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
