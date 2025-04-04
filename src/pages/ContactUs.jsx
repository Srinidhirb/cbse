import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import Nav from "../components/Nav";

export default function ContactUs() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message sent!",
      description: "We'll get back to you shortly.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
    <Nav />
    <div className="min-h-screen  px-4 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Contact Us</h1>
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormControl isRequired>
            <FormLabel className="text-gray-700">Name</FormLabel>
            <Input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-50"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel className="text-gray-700">Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel className="text-gray-700">Message</FormLabel>
            <Textarea
              name="message"
              placeholder="Your message..."
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="bg-gray-50"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            width="full"
            className="rounded-xl"
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
    </>
  );
}
