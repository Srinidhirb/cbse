import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  useToast,
  Select,
} from "@chakra-ui/react";

const API_URL = import.meta.env.VITE_API_URL;

const EditProfile = ({ userData }) => {
  const [formData, setFormData] = useState({
    fullName: userData?.fullName || "",
    phoneNumber: userData?.phoneNumber || "",
    gender: userData?.gender || "",
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${API_URL}/users/${userData.emailAddress}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your profile has been updated successfully.",
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onError: (err) => {
      toast({
        title: "Error!",
        description: err.message,
        status: "error",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.phoneNumber.length !== 10) {
        toast({
          title: "Invalid Phone Number",
          description: "Phone number must be exactly 10 digits.",
          status: "error",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    if (
      formData.fullName === userData?.fullName &&
      formData.phoneNumber === userData?.phoneNumber &&
      formData.gender === userData?.gender
    ) {
      toast({
        title: "No changes detected",
        description: "You have not made any changes to your profile.",
        status: "warning",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    mutate();
  };

  return (
    <Box p={4} className=" bg-white border-2 rounded-lg shadow-lg ">
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel htmlFor="fullName">Full Name</FormLabel>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            maxLength={10}
            value={formData.phoneNumber}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setFormData((prevData) => ({
                  ...prevData,
                  phoneNumber: value,
                }));
              }
            }}
            placeholder="Enter phone number"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="gender">Gender</FormLabel>
          <Select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Select gender"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </Select>
        </FormControl>

        <Button
          colorScheme="blue"
          disabled={
            // formData.phoneNumber.length !== 10 ||
            (formData.fullName === userData?.fullName &&
              formData.phoneNumber === userData?.phoneNumber &&
              formData.gender === userData?.gender)
          }
          onClick={handleSubmit}
          isLoading={isLoading}
          loadingText="Updating"
        >
          Update Profile
        </Button>
      </VStack>
    </Box>
  );
};

export default EditProfile;
