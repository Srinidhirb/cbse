import React from 'react'
import { Box, Text } from '@chakra-ui/react';
import Lottie from "react-lottie-player";
import comingSoonAnimation from "../assets/soon.json"; // Adjust path as needed

function Bookmarks() {
  return (
    <Box
      className="flex flex-col items-center justify-center text-center"
      w="full"
      h="96"
      bg="white"
 
      rounded="2xl"
      shadow="lg"
      p={6}
    >
      <Lottie
        loop
        animationData={comingSoonAnimation}
        play
        style={{ width: 200, height: 200 }}
      />
      
      <Text fontSize="xl" color="gray.500">
        We're working hard to bring this section. Stay tuned!
      </Text>
    </Box>
  )
}

export default Bookmarks