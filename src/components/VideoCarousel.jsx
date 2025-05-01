import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Spinner } from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const VideoCarousel = ({ videos, isLoading, isError }) => {
  const sliderRef = useRef(null);

  const getVideoId = (url) => {
    const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false, // We’re using custom arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className=" p-6  bg-white border-2 rounded-lg shadow-lg  w-[100vh] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold">Videos That May Interest You</h3>
        <div className="flex gap-2">
          <button
            onClick={() => sliderRef.current.slickPrev()}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => sliderRef.current.slickNext()}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center ">
          <Spinner size="xl" color="blue.500" />
        </div>
      ) : isError ? (
        <p className="text-red-500">Failed to load videos</p>
      ) : (
        <Slider ref={sliderRef} {...settings}>
          {videos.map((video, index) => {
            const videoId = getVideoId(video.url);
            return (
              <div key={index} className="px-2">
                <div className="bg-white shadow-lg h-56 rounded-lg overflow-hidden">
                  <iframe
                    className="w-full h-56"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={video.title || `Video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="p-4">
                    <p className="text-blue-600 font-bold">{video.subject}</p>
                    <p>{video.title}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
};

export default VideoCarousel;
