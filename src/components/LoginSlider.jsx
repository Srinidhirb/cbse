import React from "react";
import Login1 from "../assets/login1.png";
import Login2 from "../assets/login2.png";
import Login3 from "../assets/login3.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Import slick-carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Import slick-carousel theme
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true, // Enable autoplay
  autoplaySpeed: 3000, // Speed for automatic sliding (3 seconds)
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
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
function LoginSlider() {
  return (
    <div className="w-full max-w-md ">
      <Slider {...settings}>
        <div>
          <img
            src={Login1}
            className="w-full h-80 object-contain"
            alt="Login Slide 1"
          />
          <p className="text-center font-medium my-4">
            Unlock knowledge, one click at a time.
          </p>
        </div>
        <div>
          <img
            src={Login2}
            className="w-full h-80 object-contain"
            alt="Login Slide 2"
          />
          <p className="text-center font-medium my-4">
            Unlock your potential, one login at a time.
          </p>
        </div>
        <div>
          <img
            src={Login3}
            className="w-full h-80 object-contain"
            alt="Login Slide 3"
          />
          <p className="text-center font-medium my-4">
            Your gateway to knowledge starts here.
          </p>
        </div>
      </Slider>
    </div>
  );
}

export default LoginSlider;
