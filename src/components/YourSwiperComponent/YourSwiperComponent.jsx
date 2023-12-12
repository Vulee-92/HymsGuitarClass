import React,{ Suspense } from 'react';
import { Swiper,SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

// Thêm các styles tùy chọn nếu cần
import { Pagination } from 'swiper/modules';
import 'swiper/css/effect-cards';

import CardComponent from '../../components/CardComponent/CardComponent';
import { Typography } from '@mui/material';

const YourSwiperComponent = ({ latestProducts,classes }) => {
	return (
		<Suspense fallback={<Typography className={classes.txtTilte} style={{ textAlign: "center" }}>Loading...</Typography>}>
			<Swiper
				spaceBetween={100}
				grabCursor={true}
				modules={[Pagination]}
				className="mySwiper"
				breakpoints={{
					320: { slidesPerView: 2 },
					480: { slidesPerView: 2 },
					768: { slidesPerView: 3 },
					1024: { slidesPerView: 4 },
					1200: { slidesPerView: 5 },
				}}
			>
				{latestProducts?.map((product,index,post) => {
					const firstImage = product.image[0];

					return (
						<SwiperSlide className={classes.SwiperSlide} key={product._id}>
							<CardComponent
								post={post}
								index={index}
								key={product._id}
								countInStock={product.countInStock}
								type={product.type}
								description={product.description}
								image={firstImage}
								name={product.name.slice(0,200)}
								price={product.price}
								rating={product.rating}
								discount={product.discount}
								selled={product.selled}
								id={product._id}
								slug={product.slug}
								createdAt={product.createdAt}
								style={{ cursor: 'pointer' }}
							/>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</Suspense>
	);
};

export default YourSwiperComponent;
