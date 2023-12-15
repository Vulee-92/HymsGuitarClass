import React,{ useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box,Grid,Typography } from '@mui/material'
import styles from "./styledmui";
import { convertPrice } from '../../utils';
import { LoadingButton } from '@mui/lab';
import { useDispatch,useSelector } from 'react-redux';
import { addOrderProduct,resetOrder,addToOrderAndSelect } from "../../redux/slides/orderSlide";
import LazyLoad from 'react-lazyload';
import { styled } from '@mui/styles';
import audios from '../../assets/audio/audiowellcome.mp3'


const CardComponent = (product) => {
	const classes = styles();
	const [isProcessing,setIsProcessing] = useState(false);
	const [numProduct,setNumProduct] = useState(1);
	const order = useSelector((state) => state.order);
	const navigate = useNavigate();
	const handleDetailsProduct = () => {
		navigate(`/product-details/${product?.product?.slug}`);

	};
	const [clickSound] = useState(new Audio(audios));

	const dispatch = useDispatch();

	const handleAddOrderProduct = () => {
		setIsProcessing(true);

		if (Notification.permission === 'granted') {
			// Kiểm tra xem chuông đã được bật chưa
			const notification = new Notification('Test');
			notification.onshow = () => {
				// Phát âm thanh khi chuông đã được bật
				clickSound.play();
			};
		}

		navigator.vibrate([200,400,200]);


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

		// Các đoạn mã khác nếu có
	};
	useEffect(() => {
		return () => {
			// Cleanup: Dừng âm thanh khi component unmount
			clickSound.pause();
			clickSound.currentTime = 0;
		};
	},[clickSound]);

	const [addedToOrder,setAddedToOrder] = useState(false);

	const handleBuyNow = async () => {
		try {
			if ('vibrate' in navigator) {
				navigator.vibrate([100,200,100]);
			}
			setIsProcessing(true);

			const orderRedux = order?.orderItems?.find((item) => item.product === product?.product?._id);

			if (orderRedux?.amount + numProduct <= orderRedux?.countInstock || (!orderRedux && product?.product?.countInStock > 0)) {
				// Thực hiện action mới để thêm sản phẩm vào orderItems và chọn cho orderItemsSelected
				dispatch(
					addToOrderAndSelect({
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
		<Box id="Explore" className={classes.boxCard}>
			<LazyLoad>
				<img
					style={{
						display: 'block',
						height: '100%',
						width: '80%',
						position: 'relative',
						top: 10,
						cursor: 'pointer',
						left: "10%"
					}}
					onClick={() => handleDetailsProduct()}
					// sx={{ left: { xl: "50px",lg: "15px",xs: "-20px" } }}
					src={product?.product?.image[0]} alt={product?.product?.image[0]} />
			</LazyLoad>

			<Typography className={classes.nameProduct} sx={{ cursor: 'pointer' }} onClick={() => handleDetailsProduct()}> 			{product?.product?.name}</Typography>
			<Typography className={classes.txtPrice} sx={{ cursor: 'pointer' }} onClick={() => handleDetailsProduct()}> 			{product?.product?.countInStock === 0 ? <Typography className={classes.txtStatusSell} style={{ color: "rgb(178, 34, 34)" }} >hết hàng</Typography> : <Typography className={classes.txtStatusSell} style={{ color: "#436E67" }} >còn hàng</Typography>}</Typography>

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
							background: "#436E67",
							color: "#fff"
						}} onClick={() => handleBuyNow()}
					>
						Mua ngay
					</LoadingButton>
				</Grid>
			</Grid>



		</Box >
	);
}

export default CardComponent