import React from 'react';
import Slider from 'react-slick';

const CardCarousel = () => {
  const videoUrls = [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
    'https://www.youtube.com/watch?v=9bZkp7q19f0',
    'https://www.youtube.com/watch?v=QH2-TGUlwu4',
    'https://www.youtube.com/watch?v=4fndeDfaWCg',
    'https://www.youtube.com/watch?v=60ItHLz5WEA',
    'https://www.youtube.com/watch?v=YQHsXMglC9A',
    'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    'https://www.youtube.com/watch?v=lzQkXwVt5qs',
  ];

  // Function to extract video ID from YouTube URL
  const getVideoId = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v');
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
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
   
  };

  return (

    <div className="w-full max-w-6xl mx-auto relative py-4">
       <span className='text-center text-3xl font-semibold block mb-10'>Latest Content</span>
       <div className="flex justify-between px-4 gap-4 mr-5 mb-4">
          <button
            className="prev-arrow bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            onClick={() => document.querySelector('.slick-prev').click()}
          >
            Previous
          </button>
          <button
            className="next-arrow bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            onClick={() => document.querySelector('.slick-next').click()}
          >
            Next
          </button>
        </div>
      <Slider {...settings}>
        {videoUrls.map((url, index) => {
          const videoId = getVideoId(url);
          return (
            <div key={index} className="px-4">
              <div className="bg-white shadow-lg rounded-lg  mb-6 flex flex-col items-center">
                <iframe
                  width="300"
                  height="180"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`YouTube video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="my-4"
                />
               
              </div>
            </div>
          );
        })}
      </Slider>
      
    </div>
  );
};

export default CardCarousel;
