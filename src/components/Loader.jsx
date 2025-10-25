import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { motion } from "framer-motion";

function Loader() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/json/loader.json") 
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load animation:", err));
  }, []);

  return (
    <motion.div
      className="flex items-center justify-center h-screen"
      initial={{ scale: 1 }}
      transition={{ duration: 1 }}
    >
      {animationData && (
        <Lottie
          loop
          play
          animationData={animationData}
          style={{ width: 600, height: 350 }}
        />
      )}
    </motion.div>
  );
}

export default Loader;
