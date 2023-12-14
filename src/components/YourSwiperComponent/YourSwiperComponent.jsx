import React,{ Suspense } from 'react';
import { Swiper,SwiperSlide } from 'swiper/react';


// Thêm các styles tùy chọn nếu cần
import { Pagination } from 'swiper/modules';

import CardComponent from '../../components/CardComponent/CardComponent';
import { Typography } from '@mui/material';

const YourSwiperComponent = ({ latestProducts,classes,isLoading }) => {
	return (
		<Suspense fallback={<Typography className={classes.txtTilte} style={{ textAlign: "center" }}>Loading...</Typography>}>
			<Swiper
				grabCursor={true}
				breakpoints={{
					320: { slidesPerView: 1 },
					480: { slidesPerView: 1 },
					768: { slidesPerView: 1 },
					1024: { slidesPerView: 3 },
					1200: { slidesPerView: 3 },
					1489: { slidesPerView: 3 }
				}}
				spaceBetween={30}
				pagination={{
					clickable: true,
				}}
				modules={[Pagination]}
				className="mySwiper"
			>
				{latestProducts?.map((product) => {
					const firstImage = product.image[0];
					console.log("productproductproductproduct",product)

					return (
						<SwiperSlide className={classes.SwiperSlide} key={product._id}>
							<CardComponent
								product={product}
								// post={post}
								// index={index}
								style={{ cursor: 'pointer' }}
							/>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</Suspense >
	);
};

export default YourSwiperComponent;
