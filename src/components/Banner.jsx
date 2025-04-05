import React from "react";
import Lines from "../Assets/threeLines.png";

function Banner() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-white px-4 sm:px-8 md:px-16 py-10 md:h-60 max-w-6xl w-full m-auto rounded-3xl gap-6">
      
      {/* Heading */}
      <div className="text-center md:text-left">
        <h1 className="text-lg sm:text-xl md:text-3xl font-bold max-w-lg leading-snug">
          "Unlock Your Potential: Register Now for Expert Tutorials!"
        </h1>
      </div>

      {/* Button Block with Images */}
      <div className="flex flex-col justify-center items-center gap-3 md:gap-4 group relative overflow-hidden">
        
        {/* Top Line Image - hide on small screens */}
        <img src={Lines} alt="" className="hidden sm:block" />

        {/* CTA Button */}
        <button className="relative overflow-hidden border border-solid bg-lightblue border-gray-300 px-4 sm:px-6 py-2 sm:py-3 rounded-lg group">
          <span className="relative z-20 font-medium text-gray-800 text-sm sm:text-base md:text-lg">
            REGISTER NOW.!!
          </span>
          <div className="absolute inset-0 bg-yellow-700 opacity-20 transform rotate-45 -translate-x-60 group-hover:translate-x-full transition-all duration-1000 ease-in-out"></div>
        </button>

        {/* Bottom Line Image - hide on small screens */}
        <img src={Lines} alt="" className="rotate-180 hidden sm:block" />
      </div>
    </div>
  );
}

export default Banner;
