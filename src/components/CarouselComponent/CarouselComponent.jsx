import React from 'react';
import { Swiper,SwiperSlide } from 'swiper/react';
import { Box } from '@mui/material';
import { Assets } from '../../configs';
import styles from "./styledmui";
import { useMediaQuery } from 'react-responsive';
const images = {
	desktop: Assets.bgHymnsCenterChristmas,
	mobile: Assets.bgHomeMobile,
};



const CarouselComponent = () => {
	const classes = styles();

	// Define breakpoints for mobile and medium views
	const isMobile = useMediaQuery({ maxWidth: 767 });
	const isMedium = useMediaQuery({ minWidth: 768,maxWidth: 1509 });
	console.log("isMedium",isMedium)
	return (
		<Box className={classes.carouselContainer}>
			<Swiper
				spaceBetween={30}
				slidesPerView={1}
			// navigation
			// pagination={{ clickable: true }}
			>
				<SwiperSlide>
					<img

						className={classes.carouselImage}
						style={{
							height: isMedium ? '80% !important' : '500px !important',
							marginTop: isMobile ? "20vh !important" : "0px",
							backgroundImage: `url(${isMobile ? images.mobile : images.desktop})`,

						}}
					/>
				</SwiperSlide>
			</Swiper>
		</Box>
	);
};

export default CarouselComponent;
