import React from "react";
import Slider from "react-slick";
import sliderImage1 from "../../Asssets/SliderImage1.jpg";
import sliderImage2 from "../../Asssets/SliderImage2.gif";
import sliderImage3 from "../../Asssets/SliderImage3.jpg";
import sliderImage4 from "../../Asssets/SliderImage4.gif";
import sliderImage5 from "../../Asssets/SliderImage5.jpg";

const HomeSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false,
        }
      }
    ]
  };

  const slides = [
    sliderImage2,
    sliderImage1,
    sliderImage3,
    sliderImage4,
    sliderImage5,
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mt-6 px-4">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="outline-none">
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 md:h-96 lg:h-[500px] object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeSlider;