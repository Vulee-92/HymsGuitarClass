import React,{ useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar,Box,Grid,Typography } from '@mui/material'
import styles from "./styledmui";
import { convertPrice,calculateDiscountedPrice } from '../../utils';
import { LoadingButton } from '@mui/lab';
import { useDispatch,useSelector } from 'react-redux';
import { addOrderProduct,resetOrder,addToOrderAndSelect } from "../../redux/slides/orderSlide";
import LazyLoad from 'react-lazyload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag,faTags } from '@fortawesome/free-solid-svg-icons';

const CardComponent = ({ product,homePage }) => {
	const classes = styles();
	const [isProcessing,setIsProcessing] = useState(false);
	const [numProduct,setNumProduct] = useState(1);
	const order = useSelector((state) => state.order);
	const navigate = useNavigate();
	const handleDetailsProduct = () => {
		navigate(`/p/${product?.slug}`);
	};
	const dispatch = useDispatch();
	const handleAddOrderProduct = () => {
		setIsProcessing(true);
		const orderRedux = order?.orderItems?.find((item) => item.product === product?._id);
		if (orderRedux?.amount + numProduct <= orderRedux?.countInstock || (!orderRedux && product?.countInStock > 0)) {
			dispatch(
				addOrderProduct({
					orderItem: {
						name: product?.name,
						amount: numProduct,
						type: product?.type,
						fee: product?.fee,
						image: product?.image,
						price: product?.price,
						product: product?._id,
						discount: product?.discount,
						countInstock: product?.countInStock,
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
	const [addedToOrder,setAddedToOrder] = useState(false);

	const handleBuyNow = async () => {
		try {
			setIsProcessing(true);

			const orderRedux = order?.orderItems?.find((item) => item.product === product?._id);

			if (orderRedux?.amount + numProduct <= orderRedux?.countInstock || (!orderRedux && product?.countInStock > 0)) {
				// Thực hiện action mới để thêm sản phẩm vào orderItems và chọn cho orderItemsSelected
				dispatch(
					addToOrderAndSelect({
						orderItem: {
							name: product?.name,
							amount: numProduct,
							type: product?.type,
							fee: product?.fee,
							image: product?.image,
							price: product?.price,
							product: product?._id,
							discount: product?.discount,
							countInstock: product?.countInStock,
						},
					})
				);

				// Đặt trạng thái đã thêm mới thành true
				setAddedToOrder(true);
			}
		} catch (error) {
			console.error("Error processing order:",error);
		} finally {
			setIsProcessing(false);
		}
	};

	useEffect(() => {
		if (addedToOrder && order?.orderItemsSlected?.length > 0) {
			// Chuyển hướng đến trang thanh toán
			navigate("/payment");
		}
	},[addedToOrder,order?.orderItemsSlected]);




	return (
		<Box className={classes.boxCard}>
			<LazyLoad style={{
				display: 'block',
				cursor: 'pointer',

			}}>
				<img
					className={homePage ? classes.boxImgHome : classes.boxImg}
					onClick={() => handleDetailsProduct()}
					src={product?.image && product.image[0]}
					alt={product?.image && product.image[0]} />
			</LazyLoad>

			<Typography className={classes.nameProduct} sx={{ cursor: 'pointer' }} onClick={() => handleDetailsProduct()}> 			{product?.name.slice(0,80)}</Typography>
			<Box className={classes.boxPrice}>
				<Typography className={classes.txtPrice} sx={{ cursor: 'pointer' }} onClick={() => handleDetailsProduct()}> 			{product?.countInStock === 0 ? <Typography className={classes.txtStatusSell} style={{ color: "rgb(178, 34, 34)" }} >hết hàng</Typography> : <Typography className={classes.txtStatusSell} style={{ color: "#436E67" }} >còn hàng</Typography>}</Typography>

				<Typography className={classes.txtPrice} style={{ textAlign: 'right',cursor: 'pointers',marginBottom: 5 }}>{calculateDiscountedPrice(product)} </Typography>
				{product?.discount > 0 && (
					<Typography className={classes.txtPrice} style={{ textAlign: 'right',cursor: 'pointers',marginBottom: 5,textDecoration: "line-through",fontSize: ".6rem" }}><FontAwesomeIcon icon={faTags} />{convertPrice(product?.price)}</Typography>
				)}
			</Box>
			{homePage && (
				<Grid container spacing={2} item sm={12} md={12}>
					<Grid item xs={6} sm={6} md={6} xl={6} spacing={2}>
						<LoadingButton
							fullWidth
							size="large"
							type="submit"
							variant="contained"
							loading={isProcessing}
							className={classes.nameProductInfo}
							onClick={handleAddOrderProduct}
						>
							Giỏ hàng
						</LoadingButton>
					</Grid>
					<Grid item xs={6} sm={6} md={6} xl={6}>
						<LoadingButton
							fullWidth
							size="large"
							type="submit"
							variant="contained"
							loading={isProcessing}
							className={classes.nameProductInfo}
							style={{
								background: "#436E67",
								color: "#fff",
							}}
							onClick={() => handleBuyNow()}
						>
							Mua ngay
						</LoadingButton>
					</Grid>
				</Grid>
			)}


		</Box >
	);
}

export default CardComponent