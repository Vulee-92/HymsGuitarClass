import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LazyLoad from 'react-lazyload';
import MediaQuery from 'react-responsive';

const ImageCarousel = ({ images }) => {
	const settings = {
		dots: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		lazyLoad: 'ondemand',
	};

	return (
		<Slider {...settings}>
			{images.map((image,index) => (
				<div key={index}>
					{/* Mobile View */}
					<MediaQuery maxWidth={767}>
						<LazyLoad height={200} offset={100}>
							<img
								style={{
									marginTop: "60px",
									height: "40vh",
									width: "100vw",
									backgroundSize: "cover",
									backgroundRepeat: "no-repeat",
									borderBottom: "1px solid #d6d6d4",
								}}
								src={image.mobile}
								alt={`Mobile Slide ${index + 1}`}
							/>
						</LazyLoad>
					</MediaQuery>

					{/* Tablet and Desktop View */}
					<MediaQuery minWidth={768} maxWidth={1509}>
						<LazyLoad height={200} offset={100}>
							<img
								style={{
									height: "60vh",
									overflowY: "auto",
									backgroundSize: "cover",
									backgroundRepeat: "no-repeat",
									borderBottom: "1px solid #d6d6d4",
								}}
								src={image.default}
								alt={`Desktop Slide ${index + 1}`}
							/>
						</LazyLoad>
					</MediaQuery>

					{/* Large Desktop View */}
					<MediaQuery minWidth={1510}>
						<LazyLoad height={200} offset={100}>
							<img
								style={{
									marginTop: "60px",
									height: "50vh",
									width: "100%",
									// backgroundSize: "cover",
									backgroundRepeat: "no-repeat",
									borderBottom: "1px solid #d6d6d4",
									maxHeight: "100%",
								}}
								src={image.default}
								alt={`Large Desktop Slide ${index + 1}`}
							/>
						</LazyLoad>
					</MediaQuery>
				</div>
			))}
		</Slider>
	);
};

export default ImageCarousel;
