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
		type,
		// rating,
		// type,
		// discount,
		selled,
		// createdAt,
		id,
		// cover,
		// title,
		view,
		comment,
		share,
		// author,
	} = props;
	const navigate = useNavigate();
	const handleDetailsProduct = (id) => {
		navigate(`/product-details/${id}`);

	};



	return (
		<section className="content" id="Explore">
			<img onClick={() => handleDetailsProduct(id)} style={{
				maxHeight: '25em',
				display: 'block',
				position: 'relative',
				top: 0,
				left: '50%',
				cursor: 'pointer',
				transform: 'translate3d(-50%, 0, 0)'
			}} src={image} alt="img 01" />
			<Typography className={classes.nameProduct} style={{ cursor: 'pointers' }} onClick={() => handleDetailsProduct(id)}> 			{name ? `${name.slice(0,70)} ...` : name}</Typography>
			<Typography className={classes.txtPrice} style={{ textAlign: 'center',cursor: 'pointers',fontSize: "18px" }}>{convertPrice(price)}</Typography>
		</section>
	);
}

export default CardComponent