import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import Lottie from "react-lottie-player";

function Results() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/json/soon.json") // fetch from public/json
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load animation:", err));
  }, []);

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
      {animationData && (
        <Lottie
          loop
          play
          animationData={animationData}
          style={{ width: 200, height: 200 }}
        />
      )}
      
      <Text fontSize="xl" color="gray.500">
        We're working hard to bring you your results. Stay tuned!
      </Text>
    </Box>
  );
}

export default Results;
