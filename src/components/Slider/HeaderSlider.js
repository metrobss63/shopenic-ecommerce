import React from 'react';
import "./HeaderSlider.css";
import { sliderImgs } from "../../utils/images";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeaderSlider = () => {
  let settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className='slider'>
      <div className='containers'>
        <div className='slider-content overflow-x-hidden'>
          <Slider {...settings}>
            <div className='slider-item'>
              <img src = {sliderImgs[1]} alt = "" style={{width:'100%'}}/>
            </div>
            <div className='slider-item'>
              <img src = {sliderImgs[1]} alt = ""  style={{width:'100%'}} />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default HeaderSlider