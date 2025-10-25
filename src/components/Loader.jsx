import React from "react";
import Lottie from "react-lottie-player";
import { motion } from "framer-motion";
import Loading from "../assets/loader.json";

function Loader() {
  return (
    <motion.div
      className="flex items-center justify-center h-screen"
      initial={{ scale: 1 }} // Start normal size
        
      
      transition={{ duration: 1 }} // 1s animation duration
    >
      <Lottie
        loop
        play
        animationData={Loading}
        style={{ width: 600, height: 350 }}
      />
    </motion.div>
  );
}

export default Loader;
