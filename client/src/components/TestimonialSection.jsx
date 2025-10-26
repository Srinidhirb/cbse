import React from 'react';
const test = '/assets/testinomial.png';
const Thumb = '/assets/thumbsUp.png';

const testimonials = [
  {
    name: "Cameron Williamson",
    year: "2018 - Pass-Out",
    testimonial: "The courses offered here helped me excel in my exams! The teaching methods are simply amazing.",
    image: "https://picsum.photos/200",
    rating: 5,
    indent: true,
  },
  {
    name: "Jane Cooper",
    year: "2018 - Pass-Out",
    testimonial: "Thanks to this platform, I was able to clear all my doubts and achieve my academic goals!",
    image: "https://picsum.photos/200",
    rating: 4,
  },
  {
    name: "Darrell Steward",
    year: "2018 - Pass-Out",
    testimonial: "This site provided all the notes and practice questions I needed. My grades have improved drastically!",
    image: "https://picsum.photos/200",
    rating: 5,
    indent: true,
  },
];

const TestimonialCard = ({ testimonial, name, year, image, rating, indent, order }) => {
  return (
    <div
    className={`bg-white shadow-lg rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 ${indent ? 'md:ml-12' : 'md:mr-4'}`}

      style={{ order }}
    >
      <div className="flex flex-col gap-2 text-sm md:text-base">
        <div className="flex items-center justify-between">
          <div className="flex text-customBlue">
            {Array(rating).fill().map((_, i) => (
              <svg key={i} className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .587l3.668 7.431 8.167 1.151-6 5.771 1.428 8.06L12 18.897l-7.263 3.978L6.165 15.94l-6-5.77 8.166-1.152z" />
              </svg>
            ))}
          </div>
          <div className='flex gap-1 items-center text-xs md:text-sm'>
            <img src={Thumb} alt="" className="w-4 h-4 md:w-5 md:h-5" />
            <div className="text-blue-500 font-semibold">Testimonial</div>
          </div>
        </div>

        <p className="text-gray-600">{testimonial}</p>
        <div className="flex items-center gap-4">
          <h3 className="font-semibold text-base md:text-lg">{name}</h3>
          <div className="w-[2px] h-6 bg-black opacity-60"></div>
          <p className="text-gray-500 text-xs md:text-sm">{year}</p>
        </div>
      </div>
      {/* Hide image on small screens */}
      <div className="hidden md:block w-32 md:w-40 h-24 md:h-28 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

const TestimonialSection = () => {
  return (
    <div className="py-10 px-4 md:px-6">
      <span className="text-center text-2xl md:text-3xl font-semibold block mb-8 md:mb-10">What Our Students Say !!!</span>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-12">
          {/* Testimonials */}
          <div className="flex flex-col space-y-6 md:space-y-8 w-full lg:w-1/2">
            {testimonials.map((t, index) => (
              <TestimonialCard
                key={index}
                {...t}
                order={index === 0 ? -1 : 0}
              />
            ))}
          </div>

          {/* Hide library image on small screens */}
          <div className="hidden lg:flex justify-center items-center w-full lg:w-2/5">
            <img
              src={test}
              alt="Library"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
