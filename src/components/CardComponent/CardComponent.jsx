import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import styles from "./styledmui";
import { convertPrice } from '../../utils';
const CardComponent = (props,post,index) => {
	const classes = styles();
	const {
		// countInStock,
		// description,
		image,
		name,
		price,
		id,
		slug
	} = props;
	const navigate = useNavigate();
	const handleDetailsProduct = (slug) => {
		console.log("slug",slug)
		navigate(`/product-details/${slug}`);

	};



	return (
		<section className="content" id="Explore">
			<img onClick={() => handleDetailsProduct(slug)} style={{
				maxHeight: '18em',
				display: 'block',
				position: 'relative',
				top: 0,
				left: '50%',
				cursor: 'pointer',
				transform: 'translate3d(-50%, 0, 0)'
			}} src={image} alt="img 01" />
			<Typography className={classes.nameProduct} sx={{ cursor: 'pointers' }} onClick={() => handleDetailsProduct(slug)}> 			{name}</Typography>
			<Typography className={classes.txtPrice} style={{ textAlign: 'center',cursor: 'pointers',fontSize: "18px" }}>{convertPrice(price)}</Typography>
		</section>
	);
}

export default CardComponent