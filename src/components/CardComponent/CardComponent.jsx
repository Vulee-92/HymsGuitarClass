import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box,Grid,Typography } from '@mui/material'
import styles from "./styledmui";
import { convertPrice } from '../../utils';
import { LoadingButton } from '@mui/lab';
import { useDispatch,useSelector } from 'react-redux';
import * as ProductService from "../../services/ProductService";
import { addOrderProduct,resetOrder } from "../../redux/slides/orderSlide";
const CardComponent = (product) => {
	console.log("product",product)
	const classes = styles();
	const [isProcessing,setIsProcessing] = useState(false);
	const [numProduct,setNumProduct] = useState(1);
	const order = useSelector((state) => state.order);
	const navigate = useNavigate();
	const handleDetailsProduct = () => {
		navigate(`/product-details/${product?.product?.slug}`);

	};
	const dispatch = useDispatch();

	const handleAddOrderProduct = () => {
		setIsProcessing(true);
		const orderRedux = order?.orderItems?.find((item) => item.product === product?.product?._id);
		if (orderRedux?.amount + numProduct <= orderRedux?.countInstock || (!orderRedux && product?.product?.countInStock > 0)) {
			dispatch(
				addOrderProduct({
					orderItem: {
						name: product?.product?.name,
						amount: numProduct,
						type: product?.product?.type,
						fee: product?.product?.fee,
						image: product?.product?.image,
						price: product?.product?.price,
						product: product?.product?._id,
						discount: product?.product?.discount,
						countInstock: product?.product?.countInStock,
					},

				})

			);

		} else {

			// setErrorLimitOrder(true);
		}
		setIsProcessing(false);

		// }
		// handleCartClick();
		// setOpenDialog(true);
	};
	const handleBuyNow = async () => {
		setIsProcessing(true);

		// // Kiểm tra xem có sản phẩm nào được chọn không
		// if (order?.orderItemsSlected?.length === 0) {
		// 	// Nếu không có sản phẩm nào được chọn
		// 	// toast.error('Vui lòng chọn sản phẩm');
		// 	setIsProcessing(false);
		// 	return;
		// }

		try {
			// Thêm sản phẩm đã chọn vào đơn hàng
			const orderRedux = order?.orderItems?.find((item) => item.product === product?.product?._id);
			if (orderRedux?.amount + numProduct <= orderRedux?.countInstock || (!orderRedux && product?.product?.countInStock > 0)) {
				dispatch(
					addOrderProduct({
						orderItem: {
							name: product?.product?.name,
							amount: numProduct,
							type: product?.product?.type,
							fee: product?.product?.fee,
							image: product?.product?.image,
							price: product?.product?.price,
							product: product?.product?._id,
							discount: product?.product?.discount,
							countInstock: product?.product?.countInStock,
						},

					})

				);

			}

			if (order?.orderItemsSlected?.length === 0) {
				// toast.error('Vui lòng chọn sản phẩm');
				setIsProcessing(false);
			} else if (order?.orderItems?.length === 0) {
				// toast.error('Hiện bạn chưa có sản phẩm nào trong giỏ hàng.');
				setIsProcessing(false);
			} else {
				setTimeout(() => {
					navigate("/payment");
					setIsProcessing(false);
				},1000);
			}
		} catch (error) {
			console.error("Error processing order:",error);
			setIsProcessing(false);
		}
	};



	return (
		<section id="Explore" className={classes.boxCard}>
			<Box >
				<img onClick={() => handleDetailsProduct()} style={{
					display: 'block',
					height: '300px',
					width: 'auto',
					position: 'relative',
					top: 10,
					cursor: 'pointer',
					left: "10%"
				}}
					sx={{ left: { xl: "50px",lg: "15px",xs: "-20px" } }}
					src={product?.product?.image[0]} alt={product?.product?.image} />

				<Typography className={classes.nameProduct} sx={{ cursor: 'pointer' }} onClick={() => handleDetailsProduct()}> 			{product?.product?.name}</Typography>
				<Typography className={classes.txtPrice} sx={{ cursor: 'pointer' }} onClick={() => handleDetailsProduct()}> 			{product?.product?.countInStock === 0 ? <Typography className={classes.txtStatusSell} style={{ color: "rgb(178, 34, 34)" }} >hết hàng</Typography> : <Typography className={classes.txtStatusSell} style={{ color: "#45cc8f" }} >còn hàng</Typography>}</Typography>

				<Typography className={classes.txtPrice} style={{ textAlign: 'right',cursor: 'pointers',marginBottom: 5 }}>{convertPrice(product?.product?.price)}</Typography>
				<Grid container spacing={2} item sm={12} md={12} >
					<Grid item xs={6} sm={6} md={6} xl={6} spacing={2} >
						<LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isProcessing}
							className={classes.nameProductInfo}
							onClick={handleAddOrderProduct}

						>
							Giỏ hàng
						</LoadingButton>
					</Grid>
					<Grid item xs={6} sm={6} md={6} xl={6}>
						<LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isProcessing}
							className={classes.nameProductInfo}
							style={{
								background: "rgba(46,46,46,1)",
								color: "#fff"
							}} onClick={() => handleBuyNow()}
						>
							Mua ngay
						</LoadingButton>
					</Grid>
				</Grid>


			</Box>

		</section>
	);
}

export default CardComponent