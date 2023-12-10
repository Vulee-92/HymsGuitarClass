// Carousel.js
import React,{ useEffect,useState } from 'react';
import Slider from 'react-slick';
import CardComponent from '../../CardComponent/CardComponent';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight,faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Box } from '@mui/material';
import styles from "./stylemui";

const StyledCarousel = styled.div`
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;

  .carousel-content {
    display: flex;
    transition: transform 0.5s ease-in-out;
    transform: translateX(-${(props) => props.currentIndex * 200}px);
  }

  .carousel-slide {
    flex: 0 0 auto;
    margin-right: 10px;
    transition: transform 0.5s ease-in-out;
  }

  .carousel-slide.active {
    transform: scale(1.2); /* Tăng kích thước của slide hiện tại */
  }

  .carousel-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background-color: transparent;
    font-size: 16px;
    cursor: pointer;
  }

  .carousel-button.prev {
    left: 10px;
  }

  .carousel-button.next {
    right: 10px;
  }
`;

const Carousel = ({ products }) => {
	const classes = styles();
	// const [slidesToShow,setSlidesToShow] = useState(0);
	// const [productsnew,setProducts] = useState([]); // Đặt giá trị mẫu cho products

	// useEffect(() => {
	// 	// Tính toán slidesToShow ở đây, có thể làm bất kỳ xử lý logic nào bạn cần.
	// 	const calculatedSlidesToShow = Math.min(products?.length,4);

	// 	// Kiểm tra tránh gọi setState nếu giá trị không thay đổi
	// 	if (slidesToShow !== calculatedSlidesToShow) {
	// 		setSlidesToShow(calculatedSlidesToShow);
	// 	}
	// },[products]);
	function SampleNextArrow(props) {
		const { onClick } = props;
		return (
			<Box className={classes.buttontoi} onClick={onClick}>
				<FontAwesomeIcon icon={faChevronRight} />

			</Box>
		);
	}

	function SamplePrevArrow(props) {
		const { onClick } = props;
		return (
			<Box className={classes.samplePrevArrow} onClick={onClick}>
				<FontAwesomeIcon icon={faChevronRight} rotation={180} />

			</Box>
		);
	}
	const settings = {
		dots: false,
		infinite: true,
		centerMode: true,
		speed: 500,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
		variableWidth: products?.length === 4 ? true : false,
		slidesToShow: products?.length === 1 ? 1 : products?.length === 2 ? 2 : products?.length === 3 ? 3 : products?.length === 4 ? 4 : 4,
		// Số sản phẩm hiển thị trên mỗi slide
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					centerMode: true,
					dots: true,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					variableWidth: false,
					centerMode: true,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					centerMode: true,
					variableWidth: false,
					slidesToScroll: 1,
				},
			},
		],
	};



	return (

		<Slider
			{...settings}
		// afterChange={(index) => setCurrentIndex(index)}
		// className="carousel-content"
		>
			{products?.map((product,index) => (
				<div
				// style={{ width: '200px' }}
				// key={product._id}
				// className={`carousel-slide ${index === currentIndex ? 'active' : ''
				// 	}`}
				>
					{/* Hiển thị nội dung của sản phẩm ở đây */}
					<CardComponent
						post={product}
						index={index}
						key={product._id}
						image={product.image[0]} // Sử dụng hình ảnh đầu tiên
						name={product.name}
						countInStock={product.countInStock}
						price={product.price}
						id={product.product}
						slug={product.slug}
						createdAt={product.timestamp}
						style={{ cursor: 'pointer' }}
					/>
				</div>
			))}
		</Slider>

	);
};

export default Carousel;
