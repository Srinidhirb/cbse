import React from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@chakra-ui/react";

const CardCarousel = () => {
  const API_URL = import.meta.env.VITE_API_URL; // Get API URL from environment variable

  // Fetch videos from the backend
  const {
    data: videos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/videos`); // Replace with your backend API
      if (!res.ok) throw new Error("Failed to fetch videos");
      return res.json();
    },
  });

  // Function to extract video ID from YouTube URL
  const getVideoId = (url) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:.*v=|embed\/|v\/|shorts\/))([^?&\n]+)/
    );
    return match ? match[1] : "";
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-6xl mx-auto relative py-4">
      <span className="text-center text-3xl font-semibold block mb-10">
        Latest Content
      </span>

      {isLoading && (
        <div className="flex items-center justify-center h-screen">
          <Spinner size="xl" color="blue.500" />
        </div>
      )}
      {isError && (
        <p className="text-red-500 text-center">Failed to load videos</p>
      )}

      {!isLoading && !isError && videos?.length > 0 && (
        <>
          <div className="flex justify-between px-4 gap-4 mr-5 mb-4">
            <button
              className="prev-arrow bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              onClick={() => document.querySelector(".slick-prev").click()}
            >
              Previous
            </button>
            <button
              className="next-arrow bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              onClick={() => document.querySelector(".slick-next").click()}
            >
              Next
            </button>
          </div>

          <Slider {...settings}>
            {videos.map((video, index) => {
              const videoId = getVideoId(video.url);
              return (
                <div key={index} className="px-4">
                  <div className="bg-white shadow-lg rounded-lg mb-6 flex flex-col items-center">
                    <div className="w-full aspect-video rounded-md overflow-hidden">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={`YouTube video ${index + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </>
      )}
    </div>
  );
};

export default CardCarousel;
