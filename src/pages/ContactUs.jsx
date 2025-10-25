import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import Nav from "../components/Nav";
import Lottie from "react-lottie-player";
import Footer from "../components/Footer";

export default function ContactUs() {
  const bg = useColorModeValue("white");
  const [contactAnimation, setContactAnimation] = useState(null);

  // Fetch Lottie animation dynamically from public/json
  useEffect(() => {
    fetch("/json/contact.json")
      .then((res) => res.json())
      .then((data) => setContactAnimation(data))
      .catch((err) =>
        console.error("Error loading Contact animation JSON:", err)
      );
  }, []);

  return (
    <>
      <Nav />
      <div className="px-4 pt-12 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Contact Us</h1>
        <Text className="text-lg text-gray-600 text-center max-w-2xl">
          We'd love to hear from you! Feel free to reach out to us through any
          of the following ways.
        </Text>

        <div className="w-full max-w-5xl flex items-center flex-col md:flex-row bg-white rounded-2xl overflow-hidden">
          {/* Left side - Image */}
          <div className="md:w-1/2 w-full md:h-auto">
            {contactAnimation && (
              <Lottie
                loop
                animationData={contactAnimation}
                play
                style={{ width: "100%", height: "50%" }}
              />
            )}
          </div>

          {/* Right side - Contact Info */}
          <Box className="p-8 flex-1">
            <VStack align="start" spacing={6}>
              <HStack spacing={4}>
                <Icon as={MdEmail} boxSize={6} color="blue.500" />
                <Text fontSize="lg" fontWeight="medium">
                  support@example.com
                </Text>
              </HStack>

              <HStack spacing={4}>
                <Icon as={MdPhone} boxSize={6} color="green.500" />
                <Text fontSize="lg" fontWeight="medium">
                  +91 98765 43210
                </Text>
              </HStack>

              <HStack spacing={4}>
                <Icon as={MdLocationOn} boxSize={6} color="red.500" />
                <Text fontSize="lg" fontWeight="medium">
                  123, 4th Block, Koramangala, Bengaluru, India
                </Text>
              </HStack>
            </VStack>
          </Box>
        </div>
      </div>
      <Footer />
    </>
  );
}
