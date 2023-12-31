import { Form,Radio } from 'antd'
import React,{ useEffect,useState } from 'react'
import { Lable,WrapperInfo,WrapperLeft,WrapperRadio,WrapperRight,WrapperTotal } from './style';

import { useDispatch,useSelector } from 'react-redux';
import { calculateDiscountedPriceNoConvert,convertPrice } from '../../utils';
import { useMemo } from 'react';

import { useMutationHooks } from '../../hooks/useMutationHook';
import * as  UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide';
import { useNavigate,useParams } from 'react-router-dom';
import { removeAllOrderProduct,setShippingAddress,setUserInfo } from '../../redux/slides/orderSlide';
import { PayPalButton } from "react-paypal-button-v2";
import * as PaymentService from '../../services/PaymentService'
import { Assets } from "../../configs";
import { Badge,Box,Breadcrumbs,Button,Card,CardContent,CardMedia,Container,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Grid,Link,MenuItem,Modal,Paper,Select,Slide,TextField,Typography } from "@mui/material";
import styles from "./stylemui";
import MobileCartTotalPriceComponent from '../../components/MobileCartTotalPriceComponent/MobileCartTotalPriceComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong,faLocationDot,faTags } from '@fortawesome/free-solid-svg-icons';
import { LoadingButton } from '@mui/lab';
import useUpdateUserMutation from 'hooks/useUpdateUserMutation';
import { useMutation,useQuery } from '@tanstack/react-query';

const ConfirmPaymentPage = () => {
	const order = useSelector((state) => state.order)
	const shippingAddress = useSelector(state => state.order.shippingAddress);
	const params = useParams();
	const { id } = params;
	const user = useSelector((state) => state.user)
	const [emailUser,setEmail] = useState("");
	const [name,setName] = useState("");
	const [phoneUser,setPhone] = useState("");
	const [password,setPassword] = useState("");
	const [addressUser,setAddress] = useState("");
	const [cityUser,setCity] = useState("");
	const [localUserInfo,setLocalUserInfo] = useState(user);
	useEffect(() => {
		// Theo dõi thay đổi của thông tin người dùng từ Redux Store
		setLocalUserInfo(user); // Cập nhật state local khi thông tin người dùng thay đổi
	},[user]);
	const [delivery,setDelivery] = useState('fast','gojek','fastTK')
	const [payment,setPayment] = useState('bank','later_money')
	const navigate = useNavigate()
	const [sdkReady,setSdkReady] = useState(false)
	const classes = styles();
	const [isOpenModalUpdateInfo,setIsOpenModalUpdateInfo] = useState(false)
	const [activePage,setActivePage] = useState('payment-ship');
	const [isProcessing,setIsProcessing] = useState(false);
	const [orderId,setOrderId] = useState(null);

	const [form] = Form.useForm();

	const dispatch = useDispatch()





	const backToOrder = () => {
		navigate("/payment");
	}

	const priceMemo = useMemo(() => {
		if (order?.orderItemsSelected?.length === 0) {
			return 0;
		}

		const result = order?.orderItemsSlected.reduce((total,cur) => {


			const discountedPrice = calculateDiscountedPriceNoConvert(cur);

			return total + discountedPrice * cur.amount;
		},0);

		return result;
	},[order]);


	const diliveryPriceMemo = useMemo(() => {
		if (shippingAddress?.city === "Tam Kỳ") {
			return 0
		} else {
			return order.shippingAddress.shippingFee
		}
	},[priceMemo])
	const totalPriceMemo = useMemo(() => {
		return Number(priceMemo) + Number(diliveryPriceMemo)
	},[priceMemo,diliveryPriceMemo])
	const mutationAddOrder = useMutationHooks(
		(data) => {
			const { token,...rests } = data;
			const res = OrderService.createOrder({ ...rests },token);
			return res;
		},

	);

	// Sử dụng useEffect để thực hiện các tác vụ khi state thay đổi

	const handleAddOrder = () => {
		setIsProcessing(true);
		// if (user?.access_token && order?.orderItemsSlected && user?.name
		// 	&& user?.address && user?.phone && user?.city && priceMemo && user?.id) {
		//	eslint-disable-next-line no-unused-expressions
		mutationAddOrder.mutate(
			{
				token: user?.access_token,
				orderItems: order?.orderItemsSlected,
				fullName: shippingAddress.name || user?.name,
				address: shippingAddress.address,
				phone: shippingAddress.phone,
				city: shippingAddress.city,
				province: shippingAddress.province,
				ward: shippingAddress.ward,
				paymentMethod: payment,
				shippingMethod: delivery,
				itemsPrice: priceMemo,
				fee: diliveryPriceMemo,
				shippingPrice: diliveryPriceMemo,
				totalPrice: totalPriceMemo,
				user: user?.id,
				email: shippingAddress.email || user?.email
			}
		)
		setIsProcessing(false);
		// }
	}

	const mutationUpdate = useMutationHooks(
		async (data) => {
			const { id,token,...rests } = data;
			try {
				const res = await UserService.updateUser(id,{ ...rests },token);
				return res; // Đảm bảo rằng bạn trả về dữ liệu từ hàm này
			} catch (error) {
				throw error; // Ném lỗi nếu có lỗi xảy ra
			}
		},
	);
	const { handleUpdateUser,isLoadingUpdateUser } = useUpdateUserMutation();
	const mutationUpdateUser = useMutation(selectedUserId => handleUpdateUser(selectedUserId));

	const fetchDetailsOrder = async () => {
		const res = await OrderService.getDetailsOrder(id)
		return res.data
	}


	const { isLoading,data,isSuccessUpdateUser } = mutationUpdate
	const { data: userDetails } = useQuery('userDetails',mutationUpdate);

	const { data: dataAdd,isLoading: isLoadingAddOrder,isSuccess,isError } = mutationAddOrder

	useEffect(() => {
		if (isSuccess && dataAdd?.status === 'OK') {
			const arrayOrdered = []
			order?.orderItemsSlected?.forEach(element => {
				arrayOrdered.push(element.product)
			});
			dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }))
			message.success('Đặt hàng thành công')
			navigate(`/order-success/${dataAdd?.id}`,{
				state: {
					delivery,
					payment,
					orders: order?.orderItemsSlected,
					totalPriceMemo: totalPriceMemo
				}
			})
		} else if (isError) {
			if (isError && dataAdd?.status === 'ERR') {
				message.error('Sản phẩm không đủ hàng')
			}
		}
	},[isSuccess,isError])



	const onSuccessPaypal = (details,data) => {
		mutationAddOrder.mutate(
			{
				token: user?.access_token,
				orderItems: order?.orderItemsSlected,
				fullName: user?.name,
				address: user?.address,
				phone: user?.phone,
				province: user?.province,
				ward: user?.ward,
				city: user?.city,
				paymentMethod: payment,
				itemsPrice: priceMemo,
				shippingPrice: diliveryPriceMemo,
				totalPrice: totalPriceMemo,
				user: user?.id,
				isPaid: false,
				paidAt: details.update_time,
				email: user?.email
			}
		)
	}



	const handleUpdateUsers = async (selectedUserId) => {
		try {
			await mutationUpdateUser.mutateAsync(selectedUserId);
			// Khi bạn muốn làm mới trang
			// window.location.reload();


			// queryUser.refetch();
			// toast.success(`Cập nhật thành công`);

		} catch (error) {
			// console.error(error);
			// Xử lý lỗi nếu cần
		}
	};

	const handleUpdateInforUser = async () => {
		if (
			user.name &&
			user.address &&
			user.city &&
			user.phone
		) {
			try {
				const updatedUser = await mutationUpdate.mutate({
					id: user?.id,
					token: user?.access_token,
					name: user?.name,
					phone: user?.phone,
					city: user?.city,
					address: user?.address,
				});
				dispatch(updateUser(updatedUser));
			} catch (error) {
				// Xử lý lỗi tại đây nếu cần
				// console.error(error);
			}
		}
	};






	const handleGetDetailsUser = async (id,token) => {
		const res = await UserService.getDetailsUser(id,token);
		dispatch(updateUser({ ...res?.data,access_token: token }));
	};

	useEffect(() => {
		if (isSuccessUpdateUser) {
			message.success();
			setTimeout(() => {
				handleGetDetailsUser(user?.id,user?.access_token);
			},500); // Chờ 200 mili giây trước khi gọi
		} else if (isError) {
			message.error();
		}
	},[isSuccess,isError]);







	const handleDilivery = (e) => {
		setDelivery(e.target.value)
	}

	const handlePayment = (e) => {
		setPayment(e.target.value)
	}

	const addPaypalScript = async () => {
		const { data } = await PaymentService.getConfig()
		const script = document.createElement('script')
		script.type = 'text/javascript'
		script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
		script.async = true;
		script.onload = () => {
			setSdkReady(true)
		}
		document.body.appendChild(script)
	}
	const handleNavigatePayment = () => {
		navigate('/payment')
	}
	useEffect(() => {
		if (!window.paypal) {
			addPaypalScript()
		} else {
			setSdkReady(true)
		}
	},[])
	const [errors,setErrors] = useState({
		_id: false,
		name: false,
		city: false,
		province: false,
		ward: false,
		email: false,
		isAdmin: false,
		address: false,
		phone: false,
		password: false,
	});
	const deliveryMessage = shippingAddress?.city === "Tam Kỳ"
		? "Giao hàng miễn phí - vận chuyển tức thì"
		: "Gửi đồ đạc xa xôi, đừng lo lắng một chút nào. Hymns sẽ cố gắng giảm phí vận chuyển cho bạn, hoặc thậm chí Hymns sẽ trả lại tiền cho bạn nếu phí thấp hơn. Hymns không chỉ bán hàng mà còn là người bạn đồng hành trên con đường vận chuyển!";
	return (

		<>
			<Loading isLoading={isLoadingAddOrder}>

				<Grid container sx={{ width: "100vw !important",height: "100vh !important" }}>
					<Grid

					>

					</Grid>

					<Grid item xs={12} sm={12} md={12} lg={6} xl={6} style={{
						display: 'flex',
						justifyContent: 'flex-end',
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
										// cursor: 'pointer',
									}} className={classes.hymnsName} >HYMNS CENTER</Typography>
								<Grid item sm={12} md={12} lg={12} xl={12} sx={{ display: { xs: "flex",xl: "flex",lg: "flex",md: "none",sm: "none" },paddingTop: "10px !important",paddingBottom: "10px" }}>
									<Grid item xs={12}>
										<Breadcrumbs aria-label='breadcrumb' separator='›' sx={{ fontSize: "11px" }}>
											<Link to="/order">
												<Typography
													className={classes.txtValueTotal}
													style={{ fontSize: "1rem",marginBottom: "0px",fontWeight: 'normal' }}
													underline='hover'
													color='inherit'
													onClick={() => setActivePage('order')}
												>
													Giỏ hàng
												</Typography>
											</Link>
											<Link to="/payment">
												<Typography
													className={classes.txtValueTotal}
													style={{ fontSize: "1rem",marginBottom: "0px",fontWeight: 'normal' }}
													underline='hover'
													onClick={() => setActivePage('payment')}
												>
													Thông tin tài khoản
												</Typography>
											</Link>
											<Typography
												className={classes.txtValueTotal}
												style={{ fontSize: "1rem",marginBottom: "0px",fontWeight: activePage === 'payment-ship' ? 'bold' : 'normal' }}
											>
												Tiến hành đặt hàng
											</Typography>
										</Breadcrumbs>
									</Grid>
								</Grid>
								<WrapperRadio onChange={handleDilivery} value={delivery}>
									<Grid container spacing={2} sx={{ padding: "3px" }}>
										<Grid item xs={4} xl={2}>
											<Typography className={classes.txtInfoUser}>Liên hệ</Typography>
										</Grid>
										<Grid item xs={8} xl={8}>
											<Typography className={classes.txtInfoUser} style={{ color: "#333333" }}>
												{user.name || shippingAddress?.name}
												{" "}
												({user.email || shippingAddress?.email})

											</Typography>
										</Grid>
										<Grid item xs={0} sx={{ display: { xl: "block",xs: "none" } }} xl={2} >

											<Typography onClick={handleNavigatePayment} style={{ cursor: "pointer" }} className={classes.txtTitleInfoUser}>Thay đổi</Typography>
										</Grid>
									</Grid>
									<Grid container spacing={2} sx={{ padding: "3px",borderTop: '1px solid #e6e6e6' }}>
										<Grid item xs={4} xl={2}>
											<Typography className={classes.txtInfoUser}>Giao đến</Typography>
										</Grid>
										<Grid item xs={8} xl={8}>
											<Typography className={classes.txtInfoUser} style={{ lineHeight: 1.5,width: "100%",overflow: "hidden",color: "#333333" }}>	{shippingAddress?.address}{", "}{shippingAddress?.ward}{", "}{shippingAddress?.city}{", "}{shippingAddress?.province}</Typography>
										</Grid>
										<Grid item xs={0} sx={{ display: { xl: "block",xs: "none" } }} xl={2} >
											<Typography onClick={handleNavigatePayment} style={{ cursor: "pointer" }} className={classes.txtTitleInfoUser}>Thay đổi</Typography>
										</Grid>
									</Grid>
								</WrapperRadio>

							</Box>
							<Box>
								<Typography className={classes.txtShipping}>Chọn phương thức giao hàng</Typography>

								<WrapperRadio onChange={handleDilivery} value={delivery}>
									{shippingAddress?.city === "Tam Kỳ" ? (
										<Radio value="fastTK">
											<Typography className={classes.txtInfoUser}>FAST		</Typography>{" "}
											<Typography className={classes.txtInfoUser}>{deliveryMessage}</Typography>
										</Radio>
									) : (
										<>
											<Radio value="fast">
												<Typography className={classes.nameProduct} style={{ fontSize: "1rem",fontWeight: 600,marginBottom: "10px" }}>
													Gửi nhà xe Phương Trang - Chúng tôi sẽ liên hệ bạn
												</Typography>{" "}
												<Typography className={classes.txtInfoUser}>
													{deliveryMessage}

												</Typography>
											</Radio>
											<Radio value="gojek">
												<Typography className={classes.nameProduct} style={{ fontSize: "1rem",fontWeight: 600,marginBottom: "10px" }}>
													Gửi cho đơn vị vận chuyển (ViettelPost hoặc GHTK)
												</Typography>{" "}
												<Typography className={classes.txtInfoUser}>Giao hàng tiết kiệm</Typography>
											</Radio>

										</>
									)}

								</WrapperRadio>

							</Box>
							<Box>
								<Box>
									<Lable>   <Typography className={classes.txtShipping}>Chọn phương thức thanh toán</Typography></Lable>
									<WrapperRadio onChange={handlePayment} value={payment}>
										<Radio value="bank">  <Typography className={classes.txtInfoUser}  >Chuyển khoản qua ngân hàng</Typography></Radio>
										{delivery !== "fast" && (
											<Radio value="later_money">
												<Typography className={classes.txtInfoUser}>
													Thanh toán tiền mặt khi nhận hàng (COD)
												</Typography>
											</Radio>
										)}
										{/* <Radio value="paypal">  <Typography className={classes.txtInfoUser}>Thanh toán tiền bằng paypal</Typography></Radio> */}
									</WrapperRadio>
								</Box>
							</Box>

						</Box>


					</Grid>
					{/* </Grid> */}
					<Grid item xs={12} sm={12} md={12} lg={4} xl={6} style={{ backgroundColor: "rgb(247, 248, 250)" }}>
						<Box className={classes.WrapperRight}>

							<Box>
								{order?.orderItemsSlected?.map((order) => (
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
										<Box sx={{ display: "flex",flexDirection: "column" }}>
											<CardContent style={{ flex: "1 0 auto",padding: "10px 0px 0px 0px" }}>
												<Box style={{ marginBottom: "10px" }}>
													<Typography className={classes.nameProduct} style={{ fontSize: "1rem",fontWeight: 600,marginBottom: "10px" }} component='Box' >
														{order?.name}
													</Typography>
													{order?.discount > 0 && (
														<Typography className={classes.txtPrice} style={{ textAlign: 'left',marginBottom: 5,textDecoration: "line-through",fontSize: ".6rem" }}><FontAwesomeIcon icon={faTags} />{convertPrice(order?.price)}</Typography>
													)}

													<Typography className={classes.priceTitle} style={{ fontSize: "1rem",textAlign: "left",fontWeight: 500,marginTop: "5px" }} >
														{convertPrice((calculateDiscountedPriceNoConvert(order)) * order?.amount)}
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
									<Typography style={{ color: '#000',fontSize: '14px',fontWeight: 'bold' }}>0 ₫</Typography>
								</Box>
								<Box style={{ display: 'flex',alignItems: 'center',justifyContent: 'space-between' }}>
									<Typography className={classes.txtValueTotal}>Phí giao hàng</Typography>
									<Typography style={{ color: '#000',fontSize: '14px',fontWeight: 'bold' }}>{convertPrice(diliveryPriceMemo)}</Typography>
								</Box>
							</WrapperInfo>
							<WrapperTotal>
								<Typography className={classes.txtValueTotal}>Tổng tiền</Typography>
								<Typography style={{ display: 'flex',flexDirection: 'column' }}>
									<Typography className={classes.txtValueTotal} style={{ color: '#436E67',fontSize: '24px',fontWeight: 'bold',textAlign: "end" }}>{convertPrice(totalPriceMemo)}</Typography>
									<Typography className={classes.txtValueTotal} style={{ color: '#000',fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</Typography>
									<Typography className={classes.txtValueTotal} style={{ color: '#436E67',fontSize: '13px',textAlign: "right",cursor: 'pointer' }} onClick={backToOrder}> <FontAwesomeIcon icon={faArrowLeftLong} /> Quay lại</Typography>
								</Typography>
							</WrapperTotal>
							<Grid style={{ with: "100%",marginTop: "90px" }} sx={{ display: { xl: "none !important",lg: "none !important",md: "none !important",xs: "flex !important" } }}>
								<MobileCartTotalPriceComponent name={"Đặt hàng"} totalPriceMemo={totalPriceMemo} handleAddOrderProduct={handleAddOrder} classes={classes} />
							</Grid>
							{payment === 'paypal' && sdkReady ? (
								<Box style={{ width: '320px' }}>
									<PayPalButton
										amount={Math.round(totalPriceMemo / 30000)}
										// shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
										onSuccess={onSuccessPaypal}
										onError={() => {
											alert('Erroe')
										}}
									/>
								</Box>
							) : (
								<>

									<Grid style={{ with: "100%",marginTop: "90px" }} sx={{ display: { xl: "none !important",lg: "none !important",md: "none !important",xs: "flex !important" } }}>
										<MobileCartTotalPriceComponent name={"Đặt hàng"} totalPriceMemo={totalPriceMemo} handleAddOrderProduct={handleAddOrder} classes={classes} loading={isProcessing} />
									</Grid>
									<LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isProcessing}
										onClick={() => handleAddOrder()}
										className={classes.customLoadingButton}
										sx={{ display: { xl: "flex !important",lg: "flex !important",md: "flex !important",xs: "none !important" } }}
									>Đặt hàng</LoadingButton>

								</>

							)}

						</Box>
					</Grid>

					{/* </Grid> */}
				</Grid >
			</Loading >

		</>

	)
}

export default ConfirmPaymentPage
