import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box,Typography } from '@mui/material'
import styles from "./styledmui";
import { convertPrice } from '../../utils';
const CardComponent = (props,post,index) => {
	const classes = styles();
	const {
		countInStock,
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
		<section id="Explore" >
			<Box className={classes.boxCard}>
				<img onClick={() => handleDetailsProduct(slug)} style={{
					display: 'block',
					height: '150px',
					width: '150px',
					position: 'relative',
					top: 10,
					cursor: 'pointer',
				}}
					sx={{ left: { xl: "15px",lg: "15px",xs: "-20px" } }}
					src={image} alt={image} />
			</Box>


			<Typography className={classes.nameProduct} sx={{ cursor: 'pointers' }} onClick={() => handleDetailsProduct(slug)}> 			{name}</Typography>
			<Typography className={classes.txtPrice} sx={{ cursor: 'pointers' }} onClick={() => handleDetailsProduct(slug)}> 			{countInStock === 0 ? <Typography className={classes.txtStatusSell} style={{ color: "red" }} >hết hàng</Typography> : <Typography className={classes.txtStatusSell} style={{ color: "#45cc8f" }} >còn hàng</Typography>}</Typography>

			<Typography className={classes.txtPrice} style={{ textAlign: 'left',cursor: 'pointers' }}>{convertPrice(price)}</Typography>
		</section>
	);
}

export default CardComponent