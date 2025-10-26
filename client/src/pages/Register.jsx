import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import {
  Box,
  Button,
  Input,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Heading,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import Nav from "../components/Nav";
import LoginSlider from "../components/LoginSlider";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: "",

    referralId: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes & remove errors when user types
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  // Validate password strength
  const isPasswordStrong = (password) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    // Validate required fields
    if (!formData.fullName) {
      validationErrors.fullName = true;
      toast({
        title: "Full Name Required",
        description: "Please enter your full name.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }

    if (!formData.emailAddress) {
      validationErrors.emailAddress = true;
      toast({
        title: "Email Required",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }

    if (!formData.password || !isPasswordStrong(formData.password)) {
      validationErrors.password = true;
      toast({
        title: "Weak Password",
        description:
          "Password must have at least 8 characters, a number, an uppercase letter, and a special character.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = true;
      toast({
        title: "Passwords Do Not Match",
        description: "Ensure both password fields are identical.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }

    if (!formData.phoneNumber) {
      validationErrors.phoneNumber = true;
      toast({
        title: "Phone Number Required",
        description: "Please provide a valid phone number.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }

    if (!formData.gender) {
      validationErrors.gender = true;
      toast({
        title: "Gender Required",
        description: "Please select your gender.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }

    if (formData.role === "student" && !formData.referralId) {
      validationErrors.referralId = true;
      toast({
        title: "Referral ID Required",
        description: "Students must provide a valid referral ID.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Notify user of successful registration
      toast({
        title: "Registration Successful",
        description: `Welcome! Your unique referral ID is: ${data.data.userReferralId}`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      // Redirect user after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast({
        title: "Registration Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <>
      <Nav />
      <Box
        display="flex"
        flexWrap={"wrap-reverse"}
        justifyContent="space-evenly"
        alignItems="center"
        minH="80vh"
        overflow={"hidden"}
      >
        <LoginSlider />
        <VStack
          spacing={4}
          w={{ base: "100%", md: "45%" }}
          p={{ base: 4, md: 6 }}
          borderRadius="md"
        >
          <Heading size="lg">Sign Up</Heading>
          <Text color="gray.600">Let's get started</Text>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} width="100%">
              <FormControl isInvalid={errors.fullName}>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  borderColor={errors.fullName ? "red.500" : "gray.300"}
                  onChange={handleInputChange}
                  required
                />
                <FormErrorMessage>Full Name is required.</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.emailAddress}>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  name="emailAddress"
                  placeholder="Email Address"
                  borderColor={errors.emailAddress ? "red.500" : "gray.300"}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  borderColor={errors.password ? "red.500" : "gray.300"}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>

              <FormControl isInvalid={errors.confirmPassword}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  borderColor={errors.confirmPassword ? "red.500" : "gray.300"}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  borderColor="gray.300"
                  onChange={handleInputChange}
                  required
                />
              </FormControl>

              <FormControl isInvalid={errors.gender}>
                <FormLabel>Gender</FormLabel>
                <Select
                  name="gender"
                  borderColor="gray.300"
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>

              <FormControl isInvalid={errors.referralId}>
                <FormLabel>Referral ID</FormLabel>
                <Input
                  type="text"
                  name="referralId"
                  placeholder="Referral ID"
                  borderColor={errors.referralId ? "red.500" : "gray.300"}
                  onChange={handleInputChange}
                />
              </FormControl>
            </SimpleGrid>

            <Button type="submit" colorScheme="blue" width="100%" mt={4}>
              Submit
            </Button>
          </form>

          <Text>
            Have an account?{" "}
            <Link to="/login" style={{ color: "blue" }}>
              Sign In
            </Link>
          </Text>
        </VStack>
      </Box>
    </>
  );
};

export default Register;
