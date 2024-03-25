import React,{ useEffect,useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { makeStyles } from '@mui/styles';
import * as BrandProductService from "../../services/BrandProductService";

const useStyles = makeStyles((theme) => ({
	brandImage: {
		width: '100%',
		height: 'auto',
		cursor: 'pointer',
	},
}));

const FilterBrandComponent = () => {
	const classes = useStyles();
	const [isLoading,setIsLoading] = useState(false);
	const [brands,setBrands] = useState([]);

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: true,
					dots: false
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					initialSlide: 3
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			}
		]
	};

	const handleBrandClick = (brandId) => {
		// onChange(brandId);
	};
	const fetchBrandProducts = async () => {
		setIsLoading(true);
		try {
			const res = await BrandProductService.getAllBrand();
			setBrands(res?.data || []);
		} catch (error) {
			console.error('Error fetching brand products:',error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchBrandProducts();
	},[]);
	return (
		<Slider {...settings}>
			{brands.map((brand) => (
				<div key={brand.id} onClick={() => handleBrandClick(brand.slug)}>
					{brand.brand}
					{/* <img src={brand.image} alt={brand.name} className={classes.brandImage} /> */}
				</div>
			))}
		</Slider>
	);
};

export default FilterBrandComponent;
