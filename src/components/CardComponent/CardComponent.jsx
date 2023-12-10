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
		<section className="content" id="Explore">
			<Box style={{ height: "200px" }}>
				<img onClick={() => handleDetailsProduct(slug)} style={{
					display: 'block',
					maxHeight: '10em',
					position: 'relative',
					top: 0,
					cursor: 'pointer',
				}} src={image} alt="img 01" />
			</Box>


			<Typography className={classes.nameProduct} sx={{ cursor: 'pointers' }} onClick={() => handleDetailsProduct(slug)}> 			{name}</Typography>
			<Typography className={classes.txtPrice} sx={{ cursor: 'pointers' }} onClick={() => handleDetailsProduct(slug)}> 			{countInStock === 0 ? <Typography color="red">hết hàng</Typography> : <Typography color="#45cc8f">còn hàng</Typography>}</Typography>

			<Typography className={classes.txtPrice} style={{ textAlign: 'left',cursor: 'pointers',fontSize: "18px" }}>{convertPrice(price)}</Typography>
		</section>
	);
}

export default CardComponent