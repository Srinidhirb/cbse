import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Experience from "../assets/experience.json";
import Courses from "../assets/courses.json";
import Success from "../assets/success.json";
import Students from "../assets/students.json";
import Lottie from "react-lottie-player";
const SuccessSection = () => {
  const settings = {
  dots: true,
  arrows: false,
  infinite: false, // default
  speed: 500,
  slidesToShow: 1.5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        centerPadding: "20px", // shows part of next/prev card
        infinite: true,         // replaces loop
        autoplay: true,
        autoplaySpeed: 3000,    // 3 seconds per slide
      },
    },
  ],
};

  

  const cards = [
    {
      title: "1000+",
      desc: "Number of students",
      anim: Students,
    },
    {
      title: "98%",
      desc: "Percentage of success",
      anim: Success,
    },
    {
      title: "4",
      desc: "Number of Courses",
      anim: Courses,
    },
    {
      title: "",
      desc: "Years of experience",
      anim: Experience,
    },
  ];

  return (
    <div className="w-full m-auto max-w-7xl mb-14 px-4">
      <span className="text-center text-3xl font-semibold block">Our Success</span>

      {/* Desktop & Tablet Grid */}
      <div className="hidden md:flex justify-center gap-8 flex-wrap my-11">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-60 h-64 border-2 border-blue-900 rounded-xl flex flex-col gap-2 items-center justify-center"
          >
            <Lottie
              loop
              play
              animationData={card.anim}
              style={{ width: 150, height: 150 }}
            />
            {card.title && (
              <span className="text-3xl text-blue-900 font-bold">{card.title}</span>
            )}
            <p className="text-base font-semibold text-center">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden mt-10">
        <Slider {...settings}>
          {cards.map((card, index) => (
            <div key={index} className="px-2">
              <div className="w-full h-64 border-2 border-blue-900 rounded-xl flex flex-col gap-2 items-center justify-center">
                <Lottie
                  loop
                  play
                  animationData={card.anim}
                  style={{ width: 150, height: 150 }}
                />
                {card.title && (
                  <span className="text-3xl text-blue-900 font-bold">{card.title}</span>
                )}
                <p className="text-base font-semibold text-center">{card.desc}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SuccessSection;
