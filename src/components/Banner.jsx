import React from "react";
import Lines from "../Assets/threeLines.png";
function Banner() {
  return (
    <div className="flex justify-between items-center bg-white px-16  h-60 max-w-6xl w-full m-auto rounded-3xl">
      <span>
        <h1 className="text-3xl font-bold max-w-lg">
          "Unlock Your Potential: Register Now for Expert Tutorials!"
        </h1>
      </span>
      <div className="flex flex-col justify-center items-center gap-4 group relative overflow-hidden">
        <img src={Lines} alt="" />
        <button className="btn-4 relative overflow-hidden border border-solid bg-lightblue border-gray-300 px-6 py-3 rounded-lg group">
          <span className="relative z-20  font-medium text-gray-800">
            REGISTER NOW.!!
          </span>
          <div className="absolute inset-0 bg-yellow-700 opacity-20 transform rotate-45 -translate-x-60 group-hover:translate-x-full transition-all duration-1000 ease-in-out"></div>
        </button>

        <img src={Lines} alt="" className="rotate-180" />
      </div>
    </div>
  );
}

export default Banner;
