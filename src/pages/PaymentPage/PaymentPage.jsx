import { Form,Radio } from 'antd'
import React,{ useEffect,useState } from 'react'
import { Lable,WrapperInfo,WrapperLeft,WrapperRadio,WrapperRight,WrapperTotal } from './style';
import { useDispatch,useSelector } from 'react-redux';
import { calculateDiscountedPrice,calculateDiscountedPriceNoConvert,convertPrice } from '../../utils';
import { useMemo } from 'react';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as  UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';
import { removeAllOrderProduct,setShippingAddress,setUserInfo } from '../../redux/slides/orderSlide';
import { PayPalButton } from "react-paypal-button-v2";
import * as PaymentService from '../../services/PaymentService'
import { Badge,Box,Breadcrumbs,Button,Card,CardContent,CardMedia,Container,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Grid,Link,MenuItem,Modal,Paper,Select,Slide,TextField,Typography } from "@mui/material";
import styles from "./stylemui";
import MobileCartTotalPriceComponent from '../../components/MobileCartTotalPriceComponent/MobileCartTotalPriceComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong,faLocationDot,faTags } from '@fortawesome/free-solid-svg-icons';
import { LoadingButton } from '@mui/lab';
import useUpdateUserMutation from 'hooks/useUpdateUserMutation';
import { useMutation,useQuery } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';
import UpdateUserComponentPayment from '../../components/UpdateUserComponentPayment';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PaymentPage = () => {
	const order = useSelector((state) => state.order)
	const shippingAddress = useSelector(state => state.order.shippingAddress);

	const user = useSelector((state) => state.user)
	const [localUserInfo,setLocalUserInfo] = useState(user);
	useEffect(() => {
		// Theo dõi thay đổi của thông tin người dùng từ Redux Store
		setLocalUserInfo(user); // Cập nhật state local khi thông tin người dùng thay đổi
	},[user]);
	const [delivery,setDelivery] = useState('fast')
	const [payment,setPayment] = useState('later_money','bank')
	const navigate = useNavigate()
	const [sdkReady,setSdkReady] = useState(false)
	const classes = styles();
	const [isOpenModalUpdateInfo,setIsOpenModalUpdateInfo] = useState(false)
	const [isProcessing,setIsProcessing] = useState(false);
	const [stateUserDetails,setStateUserDetails] = useState({
		id: '',
		name: '',
		phone: '',
		address: '',
		province: '',
		ward: '',
		city: ''
	})
	const [form] = Form.useForm();

	const dispatch = useDispatch()


	useEffect(() => {
		form.setFieldsValue(stateUserDetails)
	},[form,stateUserDetails])

	useEffect(() => {
		if (isOpenModalUpdateInfo) {
			setStateUserDetails({
				id: user.id,
				city: user?.city,
				name: user?.name,
				province: user?.province,
				ward: user?.ward,
				address: user?.address,
				phone: user?.phone
			})
		}
	},[isOpenModalUpdateInfo])


	const backToOrder = () => {
		navigate("/order");
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

	// const priceDiscountMemo = useMemo(() => {
	// 	const result = order?.orderItemsSlected?.reduce((total,cur) => {
	// 		const totalDiscount = cur.discount ? cur.discount : 0
	// 		return total + (priceMemo * (totalDiscount * cur.amount) / 100)
	// 	},0)
	// 	if (Number(result)) {
	// 		return result
	// 	}
	// 	return 0
	// },[order])

	// const diliveryPriceMemo = useMemo(() => {
	// 	if (priceMemo > 200000) {
	// 		return 10000
	// 	} else if (priceMemo === 0) {
	// 		return 0
	// 	} else {
	// 		return 20000
	// 	}
	// },[priceMemo])
	// - Number(priceDiscountMemo)
	const totalPriceMemo = useMemo(() => {
		return Number(priceMemo)
	},[priceMemo])
	const mutationAddOrder = useMutationHooks(
		(data) => {
			const {
				token,
				...rests } = data
			const res = OrderService.createOrder(
				{ ...rests },token)
			return res
		},
	)
	const [formData,setFormData] = useState({
		email: shippingAddress?.email,
		address: shippingAddress?.address,
		city: shippingAddress?.city,
		province: shippingAddress?.province,
		ward: shippingAddress?.ward,
		phone: shippingAddress?.phone,
		name: shippingAddress?.name
	});
	useEffect(() => {
		setFormData({
			email: shippingAddress?.email,
			address: shippingAddress?.address,
			city: shippingAddress?.city,
			province: shippingAddress?.province,
			ward: shippingAddress?.ward,
			phone: shippingAddress?.phone,
			name: shippingAddress?.name
		});
	},[shippingAddress]);
	const handleAddOrder = () => {
		setIsProcessing(true);

		// Kiểm tra xem thông tin đã được nhập đầy đủ hay chưa
		const isAddressValid = formData.address && formData.address.length > 0;
		const isCityValid = formData.city && formData.city.length > 0;
		const isProvinceValid = formData.province && formData.province.length > 0;
		const isWardValid = formData.ward && formData.ward.length > 0;
		const isPhoneValid = formData.phone && formData.phone.length > 0;
		const isNameValid = formData.name && formData.name.length > 0;
		const isUserNameValid = user && user.name && user.name.length > 0;

		const isUserInfoComplete =
			isAddressValid &&
			isCityValid &&
			isProvinceValid &&
			isWardValid &&
			isPhoneValid &&
			(isNameValid || isUserNameValid);

		if (isUserInfoComplete) {
			// Hiển thị hiệu ứng quay
			setIsProcessing(true);

			// Tạm dừng trong 1 giây trước khi chuyển hướng đến trang mới
			setTimeout(() => {
				navigate("/payment-ship");
			},1000); // Thời gian tạm dừng 1000ms (1 giây)
		} else {
			// Hiển thị thông báo lỗi hoặc thực hiện hành động khác khi thông tin chưa được nhập đầy đủ
			toast.error("Vui lòng nhập đầy đủ thông tin.");
			setIsProcessing(false);
		}
	};



	const updateUserInfo = (data) => {
		setFormData({
			...formData,
			name: user?.name || data.name.value,
			email: user?.email,
			address: data.address.value,
			city: data?.city?.value,
			province: data?.province?.value,
			ward: data?.ward?.value,
			phone: data.phone.value,
		});
	};

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
			navigate('/order-success',{
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

	const handleCancleUpdate = () => {
		setStateUserDetails({
			id: '',
			name: '',
			email: '',
			phone: '',
			isAdmin: false,
		})
		form.resetFields()
		setIsOpenModalUpdateInfo(false)
	}

	const handleChange = (e) => {
		const { name,value } = e.target;
		setStateUserDetails({ ...stateUserDetails,[name]: value });
		setErrors({ ...errors,[name]: value.trim() === '' });
		// Gọi hàm để lấy danh sách thành phố
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
			}
		}
	};
	// const handleUpdateInforUser = new Promise(async (resolve,reject) => {
	// 	try {
	// 		const updatedUser = await mutationUpdate.mutate({
	// 			id: user?.id,
	// 			token: user?.access_token,
	// 			name: user?.name,
	// 			phone: user?.phone,
	// 			city: user?.city,
	// 			address: user?.address,
	// 		});

	// 		// Sau khi cập nhật, gọi dispatch để cập nhật trạng thái Redux
	// 		dispatch(updateUser(updatedUser));

	// 		resolve(updatedUser);
	// 	} catch (error) {
	// 		reject(error);
	// 	}
	// });





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






	const handleOnchangeDetails = (e) => {
		setStateUserDetails({
			...stateUserDetails,
			[e.target.name]: e.target.value
		})
	}
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

	return (

		<>
			<Loading isLoading={isLoadingAddOrder}>

				<Grid container sx={{ width: "100vw !important",height: "100vh !important" }}>
					{/* <Typography className={classes.txtOrder}>				Phương thức thanh toán & giao hàng</Typography> */}
					{/* <Grid
								style={{
									padding: "11px 16px",borderBottom: "1px solid rgb(224, 224, 224)"
								}}
								sx={
									{
										margin: '30px',
										borderBottom: { xl: "1px solid #d6d6d4",xs: "none" },
										display: "flex",justifyContent: "center"
									}
								}
							>

							</Grid> */}
					{/* {style = {{display: "flex",justifyContent: "center" }}} */}
					{/* <Grid spacing={2} sx={{ display: { xs: "flex" },justifyContent: "space-around",flexDirection: { xs: "column",sm: "column-reverse",md: "column-reverse",xl: "row",lg: "row" } }}>
								<Grid item xs={12} sm={12} md={12} lg={8} xl={12} sx={{ padding: "0px",marginLeft: { xs: "0px",xl: "-16px",md: "-16px",sm: "-16px" },margin: { xs: "0px",xl: "40px" } }}> */}
					<Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{
						display: 'flex',
						justifyContent: 'flex-end',
						backgroundColor: "#fff",
						marginTop: "30px"
					}}>
						<Box className={classes.WrapperLeft}>
							<Box>
								<Link
									href="/"

									style={{

										flexGrow: 1,
										fontFamily: "monospace",
										fontWeight: 700,
										fontSize: "2.5rem",
										color: "#333333",
										letterSpacing: '1rem',
										color: "inherit",
										height: '100%',
										backgroundColor: "#fff",
										marginTop: "30px",
										textDecoration: "none"
										// cursor: 'pointer',
									}} className={classes.hymnsName} >HYMNS CENTER</Link>
								<UpdateUserComponentPayment updateUserInfo={updateUserInfo} />
							</Box>

						</Box>
					</Grid>

					{/* <Grid container spacing={2} sx={{ width: "100%",justifyContent: { xs: "center" },marginLeft: { xs: "0px",xl: "-16px",md: "-16px",sm: "-16px" },margin: { xs: "0px",xl: "40px" },paddingLeft: { xs: "0px !important",xl: "0px" } }} item xs={12} sm={12} md={12} lg={4} xl={4} style={{ height: "fit-content" }}> */}
					<Grid item xs={12} sm={12} md={12} lg={4} xl={6} style={{ backgroundColor: "rgb(247, 248, 250)" }}>
						<Box className={classes.WrapperRight}>


							{order?.orderItemsSlected?.map((order) => (
								< Card style={{ padding: "none",boxShadow: "none",backgroundColor: "rgb(247, 248, 250)" }} sx={{ display: "flex",justifyContent: "flex-start" }}>

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
									<Box sx={{ display: "flex",flexDirection: "column",marginLeft: "15px" }}>
										<CardContent sx={{ flex: "1 0 auto",padding: "10px 0px 0px 0px" }}>
											<Box style={{ marginBottom: "10px" }}>
												<Typography className={classes.nameProduct} style={{ fontSize: "1rem",fontWeight: 600 }} component='Box' >
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
									<Typography style={{ color: '#000',fontSize: '14px',fontWeight: 'bold',marginBottom: "10px" }}>Sẽ được tính ở bước tiếp theo</Typography>
								</Box>
							</WrapperInfo>
							<WrapperTotal>
								<Typography className={classes.txtValueTotal}>Tổng tiền</Typography>
								<Typography style={{ display: 'flex',flexDirection: 'column' }}>
									<Typography className={classes.txtValueTotal} style={{ color: '#436E67',fontSize: '24px',fontWeight: 'bold',textAlign: "end" }}>{convertPrice(totalPriceMemo)}</Typography>
									<Typography className={classes.txtValueTotal} style={{ color: '#000',fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</Typography>
									<Typography className={classes.txtValueTotal} style={{ color: '#436E67',fontSize: '13px',textAlign: "right",cursor: 'pointer' }} onClick={backToOrder}> <FontAwesomeIcon icon={faArrowLeftLong} /> Quay lại giỏ hàng</Typography>
								</Typography>
							</WrapperTotal>
							<Grid style={{ with: "100%",marginTop: "90px" }} sx={{ display: { xl: "none !important",lg: "none !important",md: "none !important",xs: "flex !important" } }}>
								<MobileCartTotalPriceComponent name={"Đặt hàng"} totalPriceMemo={totalPriceMemo} handleAddOrderProduct={handleAddOrder} classes={classes} loading={isProcessing} />
							</Grid>
							<LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isProcessing}
								onClick={() => handleAddOrder()}
								className={classes.customLoadingButton}
								sx={{ display: { xl: "flex !important",lg: "flex !important",md: "flex !important",xs: "none !important" } }}
							>Tiếp tục</LoadingButton>
						</Box>
					</Grid>

				</Grid>
				<ToastContainer
					position="bottom-center"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="dark"
				/>
			</Loading>

		</>

	)
}

export default PaymentPage
