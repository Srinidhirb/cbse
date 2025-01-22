import { useState } from "react";
import Nav from "../components/Nav";
import LoginSlider from "../components/LoginSlider";
import { Link} from "react-router-dom";
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

            <div className="flex items-center gap-8 justify-between mb-6">
              {/* Step 1 */}
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-2 items-center">
                  <span
                    className={`flex justify-center text-center w-8 h-8 items-center rounded-full font-semibold ${
                      step > 1
                        ? "bg-green-400 text-white"
                        : step === 1
                        ? "bg-lightblue text-black"
                        : "bg-gray-300 text-gray-500"
                    }`}
                  >
                    {step > 1 ? "✓" : "1"}
                  </span>
                  <p className="text-sm">Enter Mail ID</p>
                </div>
              </div>

              {/* Line after Step 1 */}
              <div
                className={`h-1 w-32 ${
                  step >= 2
                    ? "bg-black"
                    : "border-t-2 border-dotted border-gray-400"
                }`}
              ></div>

              {/* Step 2 */}
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-2 items-center">
                  <span
                    className={`flex justify-center text-center w-8 h-8 items-center rounded-full font-semibold ${
                      step > 2
                        ? "bg-green-400 text-white"
                        : step === 2
                        ? "bg-lightblue text-black"
                        : "bg-gray-300 text-gray-500"
                    }`}
                  >
                    {step > 2 ? "✓" : "2"}
                  </span>
                  <p className="text-sm">Verify</p>
                </div>
              </div>

              {/* Line after Step 2 */}
              <div
                className={`h-1 w-32 ${
                  step === 3
                    ? "bg-black"
                    : "border-t-2 border-dotted border-gray-400"
                }`}
              ></div>

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-2">
                <span
                  className={`flex justify-center text-center w-8 h-8 items-center rounded-full font-semibold ${
                    step === 3
                      ? "bg-lightblue text-black"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  3
                </span>
                <p className="text-sm">Basic Details</p>
              </div>
            </div>

            {step === 1 && (
              <div className="flex flex-col w-3/5 m-auto space-y-4">
                <label className="font-medium">Mail ID *</label>
                <input
                  type="email"
                  className="border border-gray-300 p-2 rounded-md w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={handleNextStep}
                  className="bg-white border-2 px-9 m-auto border-borderBLue text-black py-2 rounded-md"
                >
                  Get OTP
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col   space-y-4">
                <p className="text-center">Enter the OTP sent to {email}</p>
                <div className="flex justify-between w-3/5 m-auto space-x-2">
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
                   className="bg-white border-2 px-9 m-auto border-borderBLue text-black py-2 rounded-md"
                >
                  Verify
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-2 gap-8">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
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
                   <input
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  className="border border-gray-300 p-2 rounded-md"
                  onChange={handleInputChange}
                />
                </div>
               
                <button  className="bg-lightblue  px-9 m-auto text-black py-2 rounded-md">
                  Submit
                </button>
              </div>
            )}

            <p className="text-center text-gray-600 mt-6">
              Have an account?{" "}
              <Link to='/login'> <span className="text-blue-500 cursor-pointer">Sign In</span></Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
