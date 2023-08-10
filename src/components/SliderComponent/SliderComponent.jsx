import { Image } from 'antd';
import React from 'react'
import { WrapperSliderStyle } from './style';
export const SliderComponent = ({arrImages}) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <WrapperSliderStyle {...settings}>
    {arrImages.map((image) => {
        return (
            <Image key={image} src={image} alt="slider" preview={false} width="100%" height="600px" />
        )
    })}
</WrapperSliderStyle>
  )
}
export default SliderComponent