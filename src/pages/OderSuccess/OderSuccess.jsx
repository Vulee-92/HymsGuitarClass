import React,{ useEffect,useMemo,useState } from 'react'
import { Lable,WrapperInfo,WrapperTotal,WrapperValue,WrapperCountOrder,WrapperItemOrder,WrapperItemOrderInfo,WrapperRadio } from './style';
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';
import { Navigate,useLocation,useNavigate,useParams } from 'react-router-dom';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';
import { Container,Box,Typography,Grid,Card,Badge,CardMedia,CardContent,Link } from '@mui/material';
import styles from "./stylemui";
import { Assets } from 'configs';
import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { LoadingButton } from '@mui/lab';
import confetti from 'canvas-confetti';
const OrderSucess = () => {
	const params = useParams()
	const { id } = params
	const location = useLocation()
	const [data,setOrderData] = useState(null);
	// State variable to track loading status
	const [isLoading,setIsLoading] = useState(true);
	const { state } = location
	const [isProcessing,setIsProcessing] = useState(false);
	const user = useSelector((state) => state.user)
	const classes = styles();
	const delay = (ms) => new Promise((resolve) => setTimeout(resolve,ms));
	// const fetchDataWithDelay = async () => {
	// 	await delay(200); // Chờ 200 milliseconds trước khi gọi
	// 	const res = await OrderService.getDetailsOrder(id,state?.token);
	// 	confetti({
	// 		particleCount: 300,
	// 		spread: 100,
	// 		decay: 0.9,
	// 		gravity: 3,
	// 		ticks: 1000,
	// 		scalar: 1,
	// 		origin: { x: 0.5,y: 0.5 },
	// 	});
	// 	return res.data;
	// };
	const navigate = useNavigate();
	const handleToProduct = () => {
		setIsProcessing(true);
		setTimeout(() => {
			navigate("/product");
			setIsProcessing(false);
		},1000);
	};

	// Sau đó, bạn sử dụng fetchDataWithDelay khi khởi tạo useQuery
	// const queryOrder = useQuery(
	// 	{ queryKey: ['orders-details'],queryFn: fetchDataWithDelay },
	// 	{ enabled: id }
	// );
	// const { isLoading,data } = queryOrder;

	const priceMemo = useMemo(() => {
		const result = data?.orderItems?.reduce((total,cur) => {
			return total + ((cur.price * cur.amount))
		},0)
		return result
	},[data])
	const priceDiscountMemo = useMemo(() => {
		const result = data?.orderItems?.reduce((total,cur) => {
			const totalDiscount = cur.discount ? cur.discount : 0
			return total + (priceMemo * (totalDiscount * cur.amount) / 100)
		},0)
		if (Number(result)) {
			return result
		}
		return 0
	},[data])


	const status =
		data?.isPaid === false && data?.isDelivered === false
			? "Chờ xử lý"
			: data?.isPaid === true && data?.isDelivered === false
				? "Hymns đang chuẩn bị hàng & vận chuyển đến cho bạn"
				: data?.isPaid === true && data?.isDelivered === true
					? "Vận chuyển hoàn thành"
					: "Đang vận chuyển";


	const checkOrderStatus = (data) => {
		if (!data) return '';

		const { paymentMethod,isPaid,isDelivered,orderStatus } = data;

		if (orderStatus === false) {
			if (!isPaid && !isDelivered) {
				return 'Đơn hàng của bạn đã được huỷ';
			}
		} else if (paymentMethod === 'later_money') {
			if (!isPaid && !isDelivered) {
				return 'Đơn hàng đã được xác nhận - Thanh toán khi nhận hàng';
			} else if (!isPaid && isDelivered) {
				return 'Đơn hàng của bạn đang trên đường vận chuyển, thanh toán khi nhận hàng';
			} else if (isPaid && !isDelivered) {
				return "Hymns đang chuẩn bị hàng & vận chuyển đến cho bạn";
			} else if (isPaid && isDelivered) {
				return 'Đơn hàng của bạn đã được giao thành công';
			}
		} else if (paymentMethod === 'bank') {
			if (!isPaid && !isDelivered) {
				return 'Đơn hàng đã được xác nhận - Vui lòng thanh toán';
			} else if (isPaid && !isDelivered) {
				return "Hymns đang chuẩn bị hàng & vận chuyển đến cho bạn";
			} else if (isPaid && isDelivered) {
				return "Đơn hàng của bạn đã được giao thành công";
			}
		}

		return ''; // Trường hợp còn lại
	};


	const orderStatus = checkOrderStatus(data);
	const checkOrderStatusTxt = (data) => {
		if (!data) return '';

		const { paymentMethod,isPaid,isDelivered,orderStatus } = data;

		if (orderStatus === false) {
			if (!isPaid && !isDelivered) {
				return `Đơn hàng ${data?.codeOrder} của bạn đã được huỷ`;
			}
		} else if (paymentMethod === 'later_money') {
			if (!isPaid && !isDelivered) {
				return `Đặt hàng thành công, đơn hàng ${data?.codeOrder}`;
			} else if (!isPaid && isDelivered) {
				return `Đơn hàng ${data?.codeOrder} của bạn đang trên đường vận chuyển, thanh toán khi nhận hàng`;
			} else if (isPaid && !isDelivered) {
				return `Thanh toán hoàn tất, đơn hàng ${data?.codeOrder}`;
			} else if (isPaid && isDelivered) {
				return `Đơn hàng ${data?.codeOrder} của bạn đã được giao thành công`;
			}
		} else if (paymentMethod === 'bank') {
			if (!isPaid && !isDelivered) {
				return `Đặt hàng thành công, đơn hàng ${data?.codeOrder}`;
			} else if (isPaid && !isDelivered) {
				return `Thanh toán hoàn tất, đơn hàng ${data?.codeOrder}`;
			} else if (isPaid && isDelivered) {
				return `Đơn hàng ${data?.codeOrder} của bạn đã được giao thành công`;
			}
		}

		return ''; // Trường hợp còn lại
	};


	const orderStatusTxt = checkOrderStatusTxt(data);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);

				const res = await OrderService.getDetailsOrder(id,state?.token);

				// Your other logic...

				confetti({
					particleCount: 300,
					spread: 100,
					decay: 0.9,
					gravity: 3,
					ticks: 1000,
					scalar: 1,
					origin: { x: 0.5,y: 0.5 },
				});

				// Set order data or perform other logic based on the response
				setOrderData(res.data);
			} catch (error) {
				// Handle error...
			} finally {
				setIsLoading(false); // Set loading to false whether there's an error or not
			}
		};

		fetchData();
	},[id,state?.token]);

	return (

		<>
			<Loading isLoading={isLoading}>
				<Helmet>
					<title>	 Hymns Center - Đặt hàng thành công</title>
				</Helmet>
				<Grid container sx={{ height: "100% !important" }}>
					<Grid
					>
					</Grid>
					<Grid item xs={12} sm={12} md={12} lg={6} xl={6} style={{
						display: 'flex',
						justifyContent: 'flex-end',
						height: '100%',
						backgroundColor: "#fff",
						marginTop: "30px"
					}}>
						<Box className={classes.WrapperLeft}>
							<Box>
								<Typography
									href="/"

									style={{

										flexGrow: 1,
										fontFamily: "monospace",
										fontWeight: 700,
										fontSize: "2.5rem",
										color: "#333333",
										letterSpacing: '1rem',
										color: "inherit",
										textDecoration: "none"
									}} className={classes.hymnsName} >HYMNS CENTER</Typography>
								<Typography style={{ paddingRight: "10px",lineHeight: 1.5 }} className={classes.txtShipping}>

									{orderStatusTxt}
								</Typography>

								<Grid sx={{ display: "flex",alignItems: "center" }}>

									<Typography style={{ paddingRight: "10px" }} className={classes.txtShipping}>Cảm ơn, {data?.shippingAddress?.fullName}</Typography>
									<svg xmlns="http://www.w3.org/2000/svg"
										id="Layer_1"
										data-name="Layer 1"
										viewBox="0 0 24 24"
										width="35"
										height="35"
										fill="#A18C4F"><path d="m18.756,8.048c.193.197.191.514-.006.708l-5.325,5.244c-.686.671-1.568,1.007-2.45,1.007-.873,0-1.747-.329-2.43-.988l-2.296-2.264c-.196-.194-.198-.51-.005-.707.196-.197.512-.199.708-.005l2.292,2.26c.974.941,2.505.937,3.48-.018l5.324-5.243c.195-.193.513-.191.707.005Zm5.244,3.952c0,6.617-5.383,12-12,12S0,18.617,0,12,5.383,0,12,0s12,5.383,12,12Zm-1,0c0-6.065-4.935-11-11-11S1,5.935,1,12s4.935,11,11,11,11-4.935,11-11Z" />
									</svg>
								</Grid>
								{data?.orderStatus === false && (

									<Box className={classes.BoxInfoOrder}>
										<Box style={{ paddingTop: "10px" }}>
											<Typography className={classes.txtShipping} style={{ color: "#333333" }}>
												Đơn hàng đã bị huỷ
											</Typography>
											<Typography className={classes.txtInfoOrder} style={{ color: "#333333" }}>
												Mọi thắc mắc xin vui lòng liên hệ: hymnscenter@gmail.com hoặc 0986 32 09 32 (Vũ - Zalo)
											</Typography>
										</Box>

									</Box>
								)}

								<Box className={classes.BoxInfoOrder}>
									<Typography className={classes.txtShipping}>Thông tin khách hàng của Hymns</Typography>
									<Grid container sx={{ padding: "3px" }}>
										<Grid item xs={12} xl={6}>
											<Grid item xs={12}>
												<Typography className={classes.txtInfoUser}>Liên hệ</Typography>
											</Grid>
											<Grid item xs={12}>
												<Typography className={classes.txtInfoUser} style={{ color: "#333333" }}>
													{data?.shippingAddress?.fullName}
													{" "}
													({data?.shippingAddress?.email})

												</Typography>
											</Grid>
										</Grid>

										<Grid item xs={12} xl={6}>
											<Grid item xs={12}>
												<Typography className={classes.txtInfoUser}>Giao đến</Typography>
											</Grid>
											<Grid item xs={12}>
												<Typography className={classes.txtInfoUser} style={{ lineHeight: 1.5,width: "100%",overflow: "hidden",color: "#333333" }}>	{data?.shippingAddress?.address}{", "}</Typography>
												<Typography className={classes.txtInfoUser} style={{ lineHeight: 1.5,width: "100%",overflow: "hidden",color: "#333333" }}>{data?.shippingAddress?.ward}{", "}{data?.shippingAddress?.city}{", "}</Typography>
												<Typography className={classes.txtInfoUser} style={{ lineHeight: 1.5,width: "100%",overflow: "hidden",color: "#333333" }}>	{data?.shippingAddress?.province}</Typography>
											</Grid>
										</Grid>
									</Grid>


									<Grid container sx={{ padding: "3px",borderTop: '1px solid #e6e6e6' }}>
										<Grid item xs={12} xl={6}>
											<Grid item xs={12}>
												<Typography className={classes.txtInfoUser}>Phương thức thanh toán</Typography>
											</Grid>
											<Grid item xs={12}>
												<Typography className={classes.txtInfoUser} style={{ lineHeight: 1.5,width: "100%",overflow: "hidden",color: "#333333" }}>{data?.paymentMethod === "bank" ? "Chuyển khoản qua ngân hàng" : "Thanh toán tiền mặt khi nhận hàng (COD)"}</Typography>
											</Grid>
										</Grid>

										<Grid item xs={12} xl={6}>
											<Grid item xs={12}>
												<Typography className={classes.txtInfoUser}>Phương thức vận chuyển</Typography>
											</Grid>
											<Grid item xs={12}>
												<Typography className={classes.txtInfoUser} style={{ lineHeight: 1.5,width: "100%",overflow: "hidden",color: "#333333" }}>
													{data?.shippingMethod === "fast"
														? orderContant.delivery.fast
														: data?.shippingMethod === "gojek"
															? orderContant.delivery.gojek
															: orderContant.delivery.fastTK}
												</Typography>

											</Grid>
										</Grid>
									</Grid>

									<Grid container sx={{ padding: "3px",borderTop: '1px solid #e6e6e6' }}>
										<Grid item xs={12} xl={6}>
											<Grid item xs={12}>
												<Typography className={classes.txtInfoUser}>Trạng thái thanh toán</Typography>
											</Grid>
											<Grid item xs={12}>
												<Typography className={classes.txtInfoUser} style={{ lineHeight: 1.5,width: "100%",overflow: "hidden",color: "#333333" }}>	{data?.isPaid === false ? "Chưa thanh toán" : "Đã thanh toán"}</Typography>
											</Grid>
										</Grid>

										<Grid item xs={12} xl={6}>
											<Grid item xs={12}>
												<Typography className={classes.txtInfoUser}>Trạng thái vận chuyển</Typography>
											</Grid>
											<Grid item xs={12}>
												<Typography className={classes.txtInfoUser} style={{ lineHeight: 1.5,width: "100%",overflow: "hidden",color: "#333333" }}>	{status}</Typography>
											</Grid>

										</Grid>
									</Grid>
								</Box>
								<Box className={classes.BoxInfoOrder}>
									<Typography className={classes.txtShipping}>
										{
											orderStatus
										}
									</Typography>

									<Grid container sx={{ padding: "3px" }}>
										<Grid item xs={12} xl={12}>
											{(data?.isPaid && data?.isDelivered && data?.paymentMethod === 'bank' && data?.orderStatus) ? (
												<Box style={{ paddingTop: "10px" }}>
													{data?.orderStatus === true && (
														<Typography className={classes.txtInfoOrder} style={{ color: "#333333" }}>
															<Link className={classes.txtInfoOrder} href="mailto:hymnscenter@gmail.com">Liên hệ với Hymns</Link> hoặc 0986 32 09 32 (Vũ - Zalo)
														</Typography>
													)}
													{!user?.access_token && (
														<Typography className={classes.txtInfoOrder} style={{ color: "#333333" }}>
															Gợi ý: Để quản lý đơn hàng dễ dàng, {data?.shippingAddress?.fullName} vui lòng tạo tài khoản bằng gmail đã đặt hàng! Mọi đơn hàng được lưu trong tài khoản của bạn.
														</Typography>
													)}
												</Box>
											) : (data?.paymentMethod === 'bank' && !data?.isPaid && !data?.isDelivered && data?.orderStatus) ? (
												<div>
													<Typography className={classes.txtInfoOrder} style={{ color: "#333333" }}>
														Ngân hàng: Vietcombank chi nhánh Quảng Nam
													</Typography>
													<Typography className={classes.txtInfoOrder} style={{ color: "#333333" }}>
														Chủ tài khoản: Lê Bùi Thanh Vũ
													</Typography>
													<Typography className={classes.txtInfoOrder} style={{ color: "#333333" }}>
														Số tài khoản: 9986320932
													</Typography>
													<Box style={{ color: "#333333" }}>
														<Typography className={classes.txtInfoOrder} style={{ color: "#333333" }}>
															Nội dung chuyển khoản:{"   "}<b>Tên + mã đơn hàng</b>
														</Typography>
													</Box>

													<Typography className={classes.txtInfoOrder} style={{ color: "#333333",paddingBottom: "10px" }}>
														Ghi chú: Đơn hàng của bạn sẽ được chuyển đi sau khi quá trình thanh toán hoàn tất!
													</Typography>
													<Box style={{ paddingTop: "10px" }}>
														{data?.orderStatus === true && (
															<Typography className={classes.txtInfoOrder} style={{ color: "#333333" }}>
																<Link className={classes.txtInfoOrder} href="mailto:hymnscenter@gmail.com">Liên hệ với Hymns</Link> hoặc 0986 32 09 32 (Vũ - Zalo)
															</Typography>
														)}
														{!user?.access_token && (
															<Typography className={classes.txtInfoOrder} style={{ color: "#333333" }}>
																Gợi ý: Để quản lý đơn hàng dễ dàng, {data?.shippingAddress?.fullName} vui lòng tạo tài khoản bằng gmail đã đặt hàng! Mọi đơn hàng được lưu trong tài khoản của bạn.
															</Typography>
														)}
													</Box>
												</div>
											) : (data?.paymentMethod === 'bank' && data?.isPaid && !data?.isDelivered && data?.orderStatus) ? (
												<Box style={{ paddingTop: "10px" }}>
													{data?.orderStatus === true && (
														<Typography className={classes.txtInfoOrder} style={{ color: "#333333" }}>
															<Link className={classes.txtInfoOrder} href="mailto:hymnscenter@gmail.com">Liên hệ với Hymns</Link> hoặc 0986 32 09 32 (Vũ - Zalo)
														</Typography>
													)}
													{!user?.access_token && (
														<Typography className={classes.txtInfoOrder} style={{ color: "#333333" }}>
															Gợi ý: Để quản lý đơn hàng dễ dàng, {data?.shippingAddress?.fullName} vui lòng tạo tài khoản bằng gmail đã đặt hàng! Mọi đơn hàng được lưu trong tài khoản của bạn.
														</Typography>
													)}
												</Box>
											) : (
												<Box style={{ paddingTop: "10px" }}>
													{data?.orderStatus === true && (
														<Typography className={classes.txtInfoOrder} style={{ color: "#333333" }}>
															<Link className={classes.txtInfoOrder} href="mailto:hymnscenter@gmail.com">Liên hệ với Hymns</Link> hoặc 0986 32 09 32 (Vũ - Zalo)
														</Typography>
													)}

													{!user?.access_token && (
														<Typography className={classes.txtInfoOrder} style={{ color: "#333333" }}>
															Gợi ý: Để quản lý đơn hàng dễ dàng, {data?.shippingAddress?.fullName} vui lòng tạo tài khoản bằng gmail đã đặt hàng! Mọi đơn hàng được lưu trong tài khoản của bạn.
														</Typography>
													)}

												</Box>

											)}
										</Grid>

									</Grid>
								</Box>
							</Box>

							<Box>

							</Box>

							<LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isProcessing}
								onClick={() => handleToProduct()}
								className={classes.customLoadingButton}
								sx={{ display: { xl: "flex !important",lg: "flex !important",md: "flex !important",xs: "none !important" } }}
							>Tiếp tục mua hàng</LoadingButton>
						</Box>

					</Grid>

					<Grid item xs={12} sm={12} md={12} lg={6} xl={6} style={{ backgroundColor: "rgb(247, 248, 250)",borderLeft: "1px solid #e6e6e6",height: "100vh" }}>
						<Box className={classes.WrapperRight}>
							<Box sx={{ width: { xs: "300px",xl: "500px" } }}>

								<Box>
									{data?.orderItems?.map((order,index) => (
										< Card style={{ padding: "none !important",boxShadow: "none",backgroundColor: "rgb(247, 248, 250)" }} sx={{ display: "flex" }}>
											<Badge
												badgeContent={order?.amount} // Đặt nội dung badge là số lượng từ 'order'
												color="success" // Màu của badge
												overlap="circular" // Chồng lên tấm hình
												anchorOrigin={{
													vertical: 'top',
													horizontal: 'right',
												}} // Vị trí của badge
											>
												<CardMedia component='img' sx={{ width: "50px",height: "50px" }} image={order?.image[0]} alt={order?.image[0]} />
											</Badge>
											<Box sx={{ display: "flex",flexDirection: "column",marginLeft: "10px" }}>
												<CardContent style={{ flex: "1 0 auto",padding: "10px 0px 0px 0px" }}>
													<Box style={{ marginBottom: "10px" }}>
														<Typography className={classes.nameProduct} style={{ fontSize: "1rem",fontWeight: 600,marginBottom: "10px" }} component='Box' >
															{order?.name}
														</Typography>
														<Typography className={classes.priceTitle} style={{ fontSize: "1rem",textAlign: "left",fontWeight: 500,marginTop: "5px" }} >
															{(order?.price * order?.amount)?.toLocaleString()}₫
														</Typography>
													</Box>


												</CardContent>
											</Box>
										</Card>
									))}
								</Box>
								<WrapperInfo>

									<Box style={{ display: 'flex',alignItems: 'center',justifyContent: 'space-between' }}>
										<Typography className={classes.txtValueTotal}>Tạm tính</Typography>
										<Typography style={{ color: '#000',fontSize: '14px',fontWeight: 'bold' }}>{convertPrice(priceMemo)}</Typography>
									</Box>
									<Box style={{ display: 'flex',alignItems: 'center',justifyContent: 'space-between' }}>
										<Typography className={classes.txtValueTotal}>Giảm giá</Typography>
										<Typography style={{ color: '#000',fontSize: '14px',fontWeight: 'bold' }}>{convertPrice(priceDiscountMemo)}</Typography>
									</Box>
									<Box style={{ display: 'flex',alignItems: 'center',justifyContent: 'space-between' }}>
										<Typography className={classes.txtValueTotal}>Phí giao hàng</Typography>
										<Typography style={{ color: '#000',fontSize: '14px',fontWeight: 'bold' }}>{convertPrice(data?.shippingPrice)}</Typography>
									</Box>
								</WrapperInfo>
								<WrapperTotal>
									<Typography className={classes.txtValueTotal}>Tổng tiền</Typography>
									<Typography style={{ display: 'flex',flexDirection: 'column' }}>
										<Typography className={classes.txtValueTotal} style={{ color: '#212B36',fontSize: '24px',fontWeight: 'bold',textAlign: "end" }}>{convertPrice(data?.totalPrice)}</Typography>
										<Typography className={classes.txtValueTotal} style={{ color: '#000',fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</Typography>
									</Typography>
								</WrapperTotal>
								{


									(data?.isPaid === false && data?.isDelivered === false && data?.paymentMethod === 'bank' && data?.orderStatus) && (
										<Box className={classes.boxTotal}>
											<Box sx={{ width: { xs: "200px",xl: '350px' },height: 'auto',margin: "0 auto" }} component={'img'} src={Assets.bankOrder} alt="logo" />
										</Box>
									)
								}
							</Box>
							<LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isProcessing}
								onClick={() => handleToProduct()}
								className={classes.customLoadingButton}
								sx={{ display: { xl: "none !important",lg: "none !important",md: "none !important",xs: "flex !important" },width: "85vw !important" }}
							>Tiếp tục mua hàng</LoadingButton>
						</Box>
					</Grid>
				</Grid >
			</Loading >
		</>

	)
}

export default OrderSucess