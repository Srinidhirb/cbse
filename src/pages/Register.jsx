import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import LoginSlider from "../components/LoginSlider";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    referralId: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Validation - Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("❌ Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      alert("✅ Registration Successful!");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="flex justify-evenly items-center min-h-[80vh]">
        <LoginSlider />
        <div className="flex flex-col items-center justify-center">
          <form className="w-full p-8 rounded-lg" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
            <p className="text-center text-gray-600 mb-6">Let's get started</p>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="flex flex-col space-y-4">
              <div className="grid grid-cols-2 gap-8">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="border border-gray-300 p-2 rounded-md"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="email"
                  name="emailAddress"
                  placeholder="Email Address"
                  className="border border-gray-300 p-2 rounded-md"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="border border-gray-300 p-2 rounded-md"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="border border-gray-300 p-2 rounded-md"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className="border border-gray-300 p-2 rounded-md"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="date"
                  name="dateOfBirth"
                  className="border border-gray-300 p-2 rounded-md"
                  onChange={handleInputChange}
                  required
                />
                <select
                  name="gender"
                  className="border border-gray-300 p-2 rounded-md"
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="text"
                  name="referralId"
                  placeholder="Referral ID (Optional)"
                  className="border border-gray-300 p-2 rounded-md"
                  onChange={handleInputChange}
                />
              </div>

              <button
                type="submit"
                className="bg-lightblue px-9 m-auto text-black py-2 rounded-md"
                disabled={loading}
              >
                {loading ? "Processing..." : "Submit"}
              </button>
            </div>

            <p className="text-center text-gray-600 mt-6">
              Have an account?{" "}
              <Link to="/login">
                <span className="text-blue-500 cursor-pointer">Sign In</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
