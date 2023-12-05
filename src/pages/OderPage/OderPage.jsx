import { Checkbox,Form } from "antd";
import PropTypes from "prop-types";
import React,{ Suspense,useEffect,useState } from "react";
import { CustomCheckbox,Lable,WrapperCountOrder,WrapperInfo,WrapperItemOrder,WrapperLeft,WrapperListOrder,WrapperRight,WrapperStyleHeader,WrapperStyleHeaderDilivery,WrapperTotal } from "./style";
import { DeleteOutlined,MinusOutlined,PlusOutlined } from "@ant-design/icons";
import { WrapperInputNumber } from "../../components/ProductDetailsComponent/style";
import { useDispatch,useSelector } from "react-redux";
import { decreaseAmount,increaseAmount,removeAllOrderProduct,removeOrderProduct,selectedOrder } from "../../redux/slides/orderSlide";
import { convertPrice } from "../../utils";
import { useMemo } from "react";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { useNavigate } from "react-router-dom";
import { Accordion,AccordionSummary,Box,Breadcrumbs,Button,Container,Grid,Link,Snackbar,Stack,Step,StepConnector,StepLabel,Stepper,Typography,stepConnectorClasses } from "@mui/material";
import styles from "./stylemui";
import { styled } from "@mui/styles";

import { Check,Label } from "@mui/icons-material";

import { Helmet } from "react-helmet-async";
import UpdateUserComponent from "components/UpdateUserComponent";
import AnswerComponent from "components/AnswerComponent/AnswerComponent";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from "@mui/lab";
const ButtonComponent = React.lazy(() => import('../../components/ButtonComponent/ButtonComponent'));
const Loading = React.lazy(() => import('../../components/LoadingComponent/Loading'));
const InputComponent = React.lazy(() => import('../../components/InputComponent/InputComponent'));
const MobileCartTotalPriceComponent = React.lazy(() => import('../../components/MobileCartTotalPriceComponent/MobileCartTotalPriceComponent'));


const QontoStepIconRoot = styled("div")(({ theme,ownerState }) => ({
	// color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
	display: "flex",
	height: 22,
	alignItems: "center",
	...(ownerState.active && {
		color: "#784af4",
	}),
	"& .QontoStepIcon-completedIcon": {
		color: "#784af4",
		zIndex: 1,
		fontSize: 18,
	},
	"& .QontoStepIcon-circle": {
		width: 8,
		height: 8,
		borderRadius: "50%",
		backgroundColor: "currentColor",
	},
}));

function QontoStepIcon(props) {
	const { active,completed,className } = props;

	return (
		<QontoStepIconRoot ownerState={{ active }} className={className}>
			{completed ? <Check className='QontoStepIcon-completedIcon' /> : <div className='QontoStepIcon-circle' />}
		</QontoStepIconRoot>
	);
}

QontoStepIcon.propTypes = {
	/**
	 * Whether this step is active.
	 * @default false
	 */
	active: PropTypes.bool,
	className: PropTypes.string,
	/**
	 * Mark the step as completed. Is passed to child components.
	 * @default false
	 */
	completed: PropTypes.bool,
};




const OrderPage = () => {
	// Sử dụng useSelector để lấy state từ Redux store
	const order = useSelector((state) => state.order);
	const user = useSelector((state) => state.user);
	// Sử dụng styles để tạo các class CSS cho component
	const classes = styles();
	const [email,setEmail] = useState("");
	const [name,setName] = useState("");
	const [phone,setPhone] = useState("");
	const [password,setPassword] = useState("");
	const [city,setCity] = useState("");
	const [address,setAddress] = useState("");
	const [avatar,setAvatar] = useState("");
	// Sử dụng useState để lưu trữ các giá trị cần thiết cho component
	const [listChecked,setListChecked] = useState([]);
	const [isOpenModalUpdateInfo,setIsOpenModalUpdateInfo] = useState(false);
	const handleClose = () => {
		setIsOpenModalUpdateInfo(false);
	};
	const [stateUserDetails,setStateUserDetails] = useState({
		name: "",
		phone: "",
		address: "",
		city: "",
	});
	const [isProcessing,setIsProcessing] = useState(false);

	// Sử dụng useNavigate để chuyển hướng trang
	const navigate = useNavigate();

	// Sử dụng Form để tạo form và lưu trữ giá trị của form
	const [form] = Form.useForm();

	// Sử dụng useDispatch để gửi các action tới Redux store
	const dispatch = useDispatch();

	// Hàm xử lý sự kiện khi checkbox được chọn hoặc bỏ chọn
	const onChange = (e) => {
		if (listChecked.includes(e.target.value)) {
			const newListChecked = listChecked.filter((item) => item !== e.target.value);
			setListChecked(newListChecked);
		} else {
			setListChecked([...listChecked,e.target.value]);
		}
	};

	// Hàm xử lý sự kiện khi số lượng sản phẩm được thay đổi
	const handleChangeCount = (type,idProduct,limited) => {
		if (type === "increase") {
			if (!limited) {
				dispatch(increaseAmount({ idProduct }));
			}
		} else {
			if (!limited) {
				dispatch(decreaseAmount({ idProduct }));
			}
		}
	};

	// Hàm xử lý sự kiện khi sản phẩm được xóa khỏi đơn hàng
	const handleDeleteOrder = (idProduct) => {
		dispatch(removeOrderProduct({ idProduct }));
	};

	// Hàm xử lý sự kiện khi checkbox "Chọn tất cả" được chọn hoặc bỏ chọn
	const handleOnchangeCheckAll = (e) => {
		if (e.target.checked) {
			const newListChecked = [];
			order?.orderItems?.forEach((item) => {
				newListChecked.push(item?.product);
			});
			setListChecked(newListChecked);
		} else {
			setListChecked([]);
		}
	};

	// Sử dụng useEffect để thực hiện các tác vụ khi state thay đổi
	useEffect(() => {
		dispatch(selectedOrder({ listChecked }));
	},[listChecked]);

	useEffect(() => {
		form.setFieldsValue(stateUserDetails);
	},[form,stateUserDetails]);



	// useEffect(() => {
	// 	setEmail(user?.email);
	// 	setName(user?.name);
	// 	setCity(user?.city);
	// 	setPhone(user?.phone);
	// 	setPassword(user?.password);
	// 	setAddress(user?.address);
	// 	setAvatar(user?.avatar);
	// },[user]);


	useEffect(() => {
		if (isOpenModalUpdateInfo) {
			setStateUserDetails({
				city: user?.city,
				name: user?.name,
				address: user?.address,
				phone: user?.phone,
			});
		}
	},[isOpenModalUpdateInfo,user]);

	// Render ra giao diện cho component bằng cách sử dụng các thẻ HTML và CSS

	const handleChangeAddress = () => {
		setIsOpenModalUpdateInfo(true);
	};

	const priceMemo = useMemo(() => {
		const result = order?.orderItemsSlected?.reduce((total,cur) => {
			return total + cur.price * cur.amount;
		},0);
		return result;
	},[order]);

	const priceDiscountMemo = useMemo(() => {
		const result = order?.orderItemsSlected?.reduce((total,cur) => {
			const totalDiscount = cur.discount ? cur.discount : 0;
			return total + (priceMemo * (totalDiscount * cur.amount)) / 100;
		},0);
		if (Number(result)) {
			return result;
		}
		return 0;
	},[order]);
	// const diliveryPriceMemo = useMemo(() => {
	// 	if (priceMemo >= 20000 && priceMemo < 500000) {
	// 		return 10000;
	// 	} else if (priceMemo >= 500000 || order?.orderItemsSlected?.length === 0) {
	// 		return 0;
	// 	} else {
	// 		return 20000;
	// 	}
	// },[priceMemo]);

	const totalPriceMemo = useMemo(() => {
		return Number(priceMemo) - Number(priceDiscountMemo);
	},[priceMemo,priceDiscountMemo]);

	const handleRemoveAllOrder = () => {
		if (listChecked?.length > 1) {
			dispatch(removeAllOrderProduct({ listChecked }));
		}
	};

	const handleToProduct = () => {

		navigate("/product");
		// if (!order?.orderItemsSlected?.length) {
		// 	message.error("Vui lòng chọn sản phẩm");
		// } else if (!user?.phone || !user.address || !user.name || !user.city) {
		// 	setIsOpenModalUpdateInfo(true);
		// } else {
		// 	navigate("/payment");
		// }
	};
	const handleAddCard = () => {
		setIsProcessing(true);

		if (order?.orderItemsSlected?.length === 0) {
			toast.error('Vui lòng chọn sản phẩm');
			setIsProcessing(false);
		} else if (order?.orderItems?.length === 0) {
			toast.error('Hiện bạn chưa có sản phẩm nào trong giỏ hàng.');
			setIsProcessing(false);
		} else {
			setTimeout(() => {
				navigate("/payment");
				setIsProcessing(false);
			},1000);
		}
	};

	const mutationUpdate = useMutationHooks((data) => {
		const { id,token,...rests } = data;
		const res = UserService.updateUser(id,{ ...rests },token);
		return res;
	});
	const mutation = useMutationHooks(
		(data) => {
			const { id,access_token,...rests } = data;
			UserService.updateUser(id,rests,access_token);
		}
	)
	const { data,isLoading,isSuccess,isError } = mutation;

	const handleCancleUpdate = () => {
		setStateUserDetails({
			name: "",
			email: "",
			phone: "",
			isAdmin: false,
		});
		form.resetFields();
		setIsOpenModalUpdateInfo(false);
	};
	// const handleUpdate = () => {
	// 	const { name,address,city,phone } = stateUserDetails;
	// 	if (name && address && city && phone) {
	// 		mutationUpdate.mutate(
	// 			{
	// 				id: user?.id,
	// 				token: user?.access_token,
	// 				...stateUserDetails,
	// 			},
	// 			{
	// 				onSuccess: () => {
	// 					dispatch(updateUser({ name,address,city,phone }));
	// 					setIsOpenModalUpdateInfo(false);
	// 				},
	// 			}
	// 		);
	// 	}
	// };

	const handleUpdate = () => {
		mutation.mutate({
			id: user?.id,
			name: user?.name,
			email: user?.email,
			phone,
			address,
			// password,
			city,
			avatar,
			token: user?.access_token,
		},
			{
				onSuccess: () => {
					dispatch(updateUser({ name,address,city,phone }));
					setIsOpenModalUpdateInfo(false);
				},
			}
		);
	};
	const handleGetDetailsUser = async (id,token) => {
		const res = await UserService.getDetailsUser(id,token);
		dispatch(updateUser({ ...res?.data,access_token: token }));
	};
	useEffect(() => {
		if (isSuccess) {
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
			[e.target.name]: e.target.value,
		});
	};
	const itemsDelivery = [
		{
			title: "Mua",
			// description: "Dưới 200.000 VND",
		},
		{
			title: "< 499K",
			description: "30k ship",
		},
		{
			title: "Free ship",
			description: "Trên 500.000 VND",
		},
	];
	const isMobileDevice = window.innerWidth <= 768;
	return (
		<>
			<Helmet>
				<title>Giỏ hàng của bạn - Hymns</title>
			</Helmet>
			{isMobileDevice ? (
				<>
					<Suspense fallback={<div>...loading</div>}>
						<Box style={{ with: "100%" }} >
							<MobileCartTotalPriceComponent name={"Đặt hàng"} totalPriceMemo={totalPriceMemo} handleAddOrderProduct={handleAddCard} classes={classes} loading={isProcessing} />
						</Box>
					</Suspense>
					<div style={{ with: "100%",marginTop: "100px" }}>
						<Typography className={classes.txtOrder}>Giỏ hàng</Typography>
						<Grid
							style={{
								padding: "11px 16px",borderBottom: "1px solid rgb(224, 224, 224)"
							}}
							sx={
								{
									marginTop: '0px',
									borderBottom: { xl: "1px solid #d6d6d4",xs: "none" },
									display: "flex",justifyContent: "flex-	start"
								}
							}
						>
							<Grid item sm={12} md={12} lg={12} xl={12} sx={{ display: { xs: "flex",xl: "flex",lg: "flex",md: "none",sm: "none" },paddingTop: "10px !important",paddingBottom: "10px" }}>
								<Grid item xs={12}>
									<div role='presentation'>
										<Breadcrumbs aria-label='breadcrumb' separator='›' sx={{ fontSize: "11px" }}>
											<Typography style={{ fontSize: ".8rem",marginTop: "0px !important" }} underline='hover' color='inherit' href='/order' className={classes.nameProduct}	>
												Giỏ hàng
											</Typography>
											<Typography className={classes.txtValueTotal} style={{ fontSize: ".8rem",marginBottom: "0px",color: 'rgb(128, 128, 137)' }} underline='hover' href='/payment'>
												Phương thức thanh toán & giao hàng
											</Typography>

										</Breadcrumbs>
									</div>
								</Grid>
							</Grid>
						</Grid>
						{/* <Grid style={{
							padding: "11px 16px",borderBottom: "1px solid rgb(224, 224, 224)"
						}} sx={{ display: { xs: "flex",lx: "none",md: "none" } }} >
							<WrapperInfo>
								<Grid container spacing={2} columns={16} style={{ alignItems: 'baseline' }}>
									<Grid item xs={8}>
										<Typography className={classes.nameInfoUser}>
											<FontAwesomeIcon icon={faLocationDot} style={{ color: "#212B36" }} />	{user?.name}	     - {user?.phone}
										</Typography>
									</Grid>
									<Grid item xs={8} style={{ textAlign: "right",color: "#212B36",cursor: "pointer",fontSize: "14px" }}>
										<Typography className={classes.txtValueTotal} onClick={handleChangeAddress} style={{ color: "#212B36",cursor: "pointer",fontSize: "14px",}}>{" "}Thay đổi</Typography>
									</Grid>
								</Grid>
						

								<Box>
									<Typography className={classes.txtValueTotal} style={{ color: 'rgb(128, 128, 137)',fontSize: '13px' }}>
										{" "}<span style={{ fontWeight: "bold",color: "#212B36",fontStyle: "italic",fontSize: "13px",}}> Nhà  </span>
										{" "}{`${user?.address}, ${user?.ward}, ${user?.city}, ${user?.province}`}{" "}
									</Typography>
								</Box>
							</WrapperInfo>
						</Grid> */}
						<Grid style={{
							padding: "11px 16px",borderBottom: "1px solid rgb(224, 224, 224)"
						}} sx={{ display: { xs: "flex",lx: "none",md: "none" } }} >
							<Box className={classes.BoxnameAllProduct}
								sx={{ width: { xs: "100%",md: "390px",xl: "390px",},display: { xs: "flex",xl: "none" } }}

							>
								<CustomCheckbox onChange={handleOnchangeCheckAll} checked={listChecked?.length === order?.orderItems?.length}></CustomCheckbox>
								<Box sx={{ display: { xs: "flex",xl: "none" },justifyContent: "space-between",width: "100%" }}>
									<Typography className={classes.nameAllProduct} > Tất cả ({order.orderItems.length} sản phẩm)</Typography>
									<DeleteOutlined style={{ cursor: "pointer" }} onClick={handleRemoveAllOrder} />

								</Box>
							</Box>

						</Grid>

						<Container style={{ margin: "0 auto" }}>
							{/* width: "1270px", */}
							<Typography sx={{ display: { xs: "none",lx: "flex",md: "flex" } }} className={classes.txtOrder}>Giỏ hàng của bạn</Typography>
							<Grid container spacing={2} style={{ display: "flex",justifyContent: "center" }}>
								<Grid item xs={12} xl={9}>


									<WrapperStyleHeader>

										<Grid
											sx={{ display: { xs: "none",xl: "flex" } }}
											style={{
												flex: 1,
												// display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
											}}
										>
											<Typography className={classes.txtNameTable}>Đơn giá</Typography>
											<Typography className={classes.txtNameTable}>Số lượng</Typography>
											<Typography className={classes.txtNameTable}>Thành tiền</Typography>
											<DeleteOutlined style={{ cursor: "pointer" }} onClick={handleRemoveAllOrder} />
										</Grid>

									</WrapperStyleHeader>
									<WrapperListOrder>
										{order?.orderItems?.map((order) => {
											return (
												<WrapperItemOrder key={order?.product}>
													<CustomCheckbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></CustomCheckbox>
													<Box style={{
														width: "calc(100%)",
													}}>
														<Grid
															style={{
																width: "calc(100% - 5px)",
																display: "flex",
																alignItems: "center",
																width: "100%",
																justifyContent: "space-between",
															}}
														>
															<img
																src={order?.image[0]}
																style={{
																	width: "3rem",
																	height: "3rem",
																	objectFit: "cover",
																}}
															/>


															<Grid
																sx={{ display: "flex",flexDirection: { xs: "column",md: "row",xl: "row" },width: { xs: " calc(100% - 92px)",md: "390px",xl: "390px" },alignItems: { xs: " flex-start",md: "center",xl: "center" },flex: { xs: "none",md: 1,xl: 1 } }}
															>
																<Typography className={classes.nameProductCard}
																>

																	{order?.name.length > 30 ? `${order?.name.slice(0,50)}...` : order?.name}
																</Typography>
																<Typography sx={{ display: { xs: "none",xl: "flex" } }} className={classes.txtNameTable} style={{ fontSize: "13px",color: "#242424" }}>
																	{convertPrice(order?.price)}
																</Typography>
																<WrapperCountOrder>
																	<button
																		style={{
																			border: "none",
																			background: "transparent",
																			cursor: "pointer",
																		}}
																		onClick={() => handleChangeCount("decrease",order?.product,order?.amount === 1)}
																	>
																		<MinusOutlined
																			style={{
																				color: "#000",
																				fontSize: "10px",
																				display: "flex",
																			}}
																		/>
																	</button>
																	<WrapperInputNumber defaultValue={order?.amount} value={order?.amount} size='small' min={1} max={order?.countInStock} />
																	<button
																		style={{
																			border: "none",
																			background: "transparent",
																			cursor: "pointer",
																		}}
																		onClick={() => handleChangeCount("increase",order?.product,order?.amount === order.countInStock,order?.amount === 1)}
																	>
																		<PlusOutlined
																			style={{
																				color: "#000",
																				fontSize: "10px",
																				display: "flex",
																			}}
																		/>
																	</button>
																</WrapperCountOrder>
																<Typography
																	className={classes.nameProduct}
																	style={{
																		fontSize: "15px",
																		color: "rgb(255, 66, 78)",
																		marginTop: "10px",
																		marginBottom: "10px",
																	}}
																>
																	{convertPrice(order?.price * order?.amount)}
																</Typography>

															</Grid>
															<Grid
																style={{
																	display: "flex",
																	alignItems: "center",
																	flexDirection: "row",
																}}
															>
																<DeleteOutlined style={{ cursor: "pointer" }} onClick={() => handleDeleteOrder(order?.product)} />
															</Grid>
														</Grid>
													</Box>


												</WrapperItemOrder>
											);
										})}
									</WrapperListOrder>

								</Grid>
								<Grid item xs={12} xl={3}>

									<Button className={classes.btnAddCard} sx={{ display: { xs: "none",lx: "flex",md: "flex" } }}
										variant='contained'

										onClick={() => handleAddCard()}
									>Đặt hàng</Button>
									{/* <ButtonComponent
								onClick={() => handleAddCard()}
								size={40}
								styleButton={{
									background: "#212B36",
									height: "48px",
									width: "320px",
									border: "none",
									borderRadius: "4px",
								}}
								textbutton={"Mua hàng"}
								styleTextButton={{
									color: "#fff",
									fontSize: "15px",
									fontWeight: "700",
								}}
							></ButtonComponent> */}
								</Grid>
							</Grid>
						</Container>
						<Grid style={{
							padding: "11px 16px",borderBottom: "1px solid rgb(224, 224, 224)",borderTop: "1px solid rgb(224, 224, 224)"
						}} sx={{ display: { xs: "flex",lx: "none",md: "none" } }} >
							<WrapperInfo>
								<Box
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
									}}
								>
									<Typography className={classes.txtValueTotal}>Tạm tính</Typography>
									<Typography className={classes.txtValueTotal}
										style={{
											color: "#000",
											fontSize: "14px",
											fontWeight: "bold",
										}}
									>
										{convertPrice(priceMemo)}
									</Typography>
								</Box>
								<Box
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
									}}
								>
									<Typography className={classes.txtValueTotal}>Giảm giá</Typography>
									<Typography className={classes.txtValueTotal}
										style={{
											color: "#000",
											fontSize: "14px",
											fontWeight: "bold",
										}}
									>
										{convertPrice(priceDiscountMemo)}
									</Typography>
								</Box>

							</WrapperInfo>
						</Grid>
						<Grid style={{
							padding: "11px 16px"
						}} >
							<WrapperTotal>
								<Typography
									style={{
										fontSize: "14px",
										fontWeight: "bold",
									}}
									className={classes.nameProductCard}>Tổng tiền</Typography>
								<Typography
									style={{
										display: "flex",
										fontSize: "14px",
										flexDirection: "column",
									}}
								>
									<Typography className={classes.txtValueTotal}
										style={{
											color: "#212B36",
											fontSize: "16px",
											fontWeight: "bold",
											textAlign: "right",
											justifyContent: 'end'
										}}
									>
										{convertPrice(totalPriceMemo)}
									</Typography>
									<Typography className={classes.txtValueTotal} sx={{ textAlign: "right" }}>
										(Đã bao gồm VAT nếu có)
									</Typography>
								</Typography>
							</WrapperTotal>
						</Grid>
						<UpdateUserComponent open={isOpenModalUpdateInfo} handleClose={handleClose} />
						{/* <ModalComponent style={{ width: "100% !important" }} className={classes.updateInfo} title='Cập nhật thông tin' open={isOpenModalUpdateInfo} onCancel={handleCancleUpdate} onOk={handleUpdate}>

							<Loading isLoading={isLoading}>

								<Form
									className={classes.updateInfo}
									name='basic'
									labelCol={{ span: 4 }}
									wrapperCol={{ span: 20 }}
									wrapperRow={{ span: 20 }}
									// onFinish={onUpdateUser}
									autoComplete='on'
									form={form}
									style={{ fontFamily: 'Public Sans, sans-serif' }}
								>
									<Form.Item
										style={{ fontFamily: 'Public Sans, sans-serif' }}
										label='Name'
										name='name'
										rules={[
											{
												required: true,
												message: "Please input your name!",
											},
										]}
									>
										<InputComponent className={classes.updateInfo} value={stateUserDetails["name"]} onChange={handleOnchangeDetails} name='name' />
									</Form.Item>
									<Form.Item
										style={{ fontFamily: 'Public Sans, sans-serif' }}
										label='City'
										name='city'
										rules={[
											{
												required: true,
												message: "Please input your city!",
											},
										]}
									>
										<InputComponent className={classes.updateInfo} value={stateUserDetails["city"]} onChange={handleOnchangeDetails} name='city' />
									</Form.Item>
									<Form.Item
										style={{ fontFamily: 'Public Sans, sans-serif' }}
										label='Phone'
										name='phone'
										rules={[
											{
												required: true,
												message: "Please input your  phone!",
											},
										]}
									>
										<InputComponent className={classes.updateInfo} value={stateUserDetails.phone} onChange={handleOnchangeDetails} name='phone' />
									</Form.Item>

									<Form.Item
										style={{ fontFamily: 'Public Sans, sans-serif' }}
										label='Adress'
										name='address'
										rules={[
											{
												required: true,
												message: "Please input your  address!",
											},
										]}
									>
										<InputComponent className={classes.updateInfo} value={stateUserDetails.address} onChange={handleOnchangeDetails} name='address' />
									</Form.Item>
								</Form>
							</Loading>
						</ModalComponent> */}
					</div>
				</>
			) : (
				<>
					<Helmet>
						<title>Giỏ hàng của bạn - Hymns</title>
					</Helmet>
					<Container maxWidth="xl" style={{ with: "100%",height: "100vh",marginTop: '100px' }}>
						{/* <div style={{ with: "100%",height: "100vh",marginTop: '100px' }}>

							<div style={{ height: "100%",width: "1270px",margin: "0 auto" }}> */}
						<Grid style={{ marginTop: '100px' }}>
							<Typography style={{ marginBottom: "30px" }} className={classes.txtOrder}>Giỏ hàng của bạn</Typography>
							{/* <Grid
									container
									spacing={2}
									sx={
										{
											textAlign: '-webkit-center',marginTop: '0px',
											borderBottom: { xl: "1px solid #d6d6d4",xs: "none" },
											display: "flex",justifyContent: "center"
										}
									}
								>
									<Grid item sm={12} md={12} lg={12} xl={12} sx={{ display: { xs: "none",xl: "flex",lg: "flex",md: "none",sm: "none" },paddingTop: "10px !important",paddingBottom: "10px" }}>
										<Grid item xs={12}>
											<div role='presentation'>
												<Breadcrumbs aria-label='breadcrumb' separator='›' sx={{ fontSize: "13px" }}>
													<Link underline='hover' color='inherit' href='/' style={{}}>
														Giỏ hàng
													</Link>
													<Link style={{}} underline='hover' color='inherit' href='/product'>
														Thông tin tài khoản
													</Link>
													<Link sx={{ fontSize: "13px !important" }} className={classes.nameProductTotal}>
														Phương thức thanh toán
													</Link>
												</Breadcrumbs>
											</div>
										</Grid>
									</Grid>
								</Grid> */}
						</Grid>
						<div style={{ display: "flex",justifyContent: "center" }}>
							{/* <Container maxWidth="md" className={classes.ConWrapperLeft}> */}
							<WrapperLeft>

								{/* 
									<Typography className={classes.nameAllProduct}>Phí giao hàng</Typography>
									<WrapperStyleHeaderDilivery>
										<StepComponent
											items={itemsDelivery}
											current={
												diliveryPriceMemo === 10000
													? 1
													: diliveryPriceMemo === 20000
														? 1
														: order.orderItemsSlected.length === 0
															? 0
															: 3
											}
										/>
									</WrapperStyleHeaderDilivery> */}
								<WrapperStyleHeader style={{ padding: "20px",backgroundColor: "#f4f4f2",borderBottom: "1px solid #d6d6d4" }}>
									<span style={{ display: "flex",width: "280px" }}>
										<CustomCheckbox
											onChange={handleOnchangeCheckAll}
											checked={listChecked?.length === order?.orderItems?.length}
										></CustomCheckbox>
										<Typography className={classes.txtValueTotal} > Tất cả ({order.orderItems.length} sản phẩm)</Typography>
									</span>
									<div
										style={{
											flex: 1,
											display: "flex",
											alignItems: "center",
											justifyContent: "space-evenly",
										}}
									>
										<Typography className={classes.txtValueTotal} > Đơn giá</Typography>
										<Typography className={classes.txtValueTotal} > Số lượng</Typography>
										<Typography className={classes.txtValueTotal} > Thành tiền</Typography>
										<DeleteOutlined
											style={{ cursor: "pointer" }}
											onClick={handleRemoveAllOrder}
										/>
									</div>
								</WrapperStyleHeader>
								<WrapperListOrder>
									{order.orderItems.length === 0 ? (
										<>
											<Typography className={classes.txtValueTotal}
												style={{
													color: "#212B36",
													fontSize: "1.1rem",
													marginTop: "5%",
													textAlign: "center",
												}}
											>Hiện bạn chưa có sản phẩm nào trong giỏ hàng.</Typography>
											<Typography className={classes.txtValueTotal}
												onClick={() => handleToProduct()}
												style={{
													color: "#212B36",
													fontSize: "1rem",
													marginTop: "1%",
													textDecoration: "underline",
													cursor: "pointer",
													textAlign: "center",
												}}
											>Tiếp tục mua hàng tại đây.</Typography>
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
										</>

									) : (
										order.orderItems.map((order) => {
											return (
												<WrapperItemOrder key={order.product}>
													<Box
														style={{
															width: "280px",
															display: "flex",
															alignItems: "center",
															gap: 4,
														}}
													>
														<CustomCheckbox
															onChange={onChange}
															value={order.product}
															checked={listChecked.includes(order.product)}
														></CustomCheckbox>
														<img
															src={order.image[0]}
															style={{
																width: "77px",
																height: "79px",
																objectFit: "cover",
															}}
														/>
														<Typography
															className={classes.txtValueTotal}
															style={{
																width: 180,
																overflow: "hidden",
																textOverflow: "ellipsis",
																whiteSpace: "nowrap",
															}}
														>
															{order.name}
														</Typography>
													</Box>
													<Box
														style={{
															flex: 1,
															width: 80,
															display: "flex",
															alignItems: "center",
															justifyContent: "space-evenly",
														}}
													>
														<Typography className={classes.txtNumberPrice}>
															{convertPrice(order.price)}
														</Typography>
														<WrapperCountOrder>
															<button
																style={{
																	border: "none",
																	background: "transparent",
																	cursor: "pointer",
																}}
																onClick={() =>
																	handleChangeCount(
																		"decrease",
																		order.product,
																		order.amount === 1
																	)
																}
															>
																<MinusOutlined style={{ color: "#000",fontSize: "10px" }} />
															</button>
															<WrapperInputNumber
																defaultValue={order.amount}
																value={order.amount}
																size="small"
																min={1}
																max={order.countInStock}
															/>
															<button
																style={{
																	border: "none",
																	background: "transparent",
																	cursor: "pointer",
																}}
																onClick={() =>
																	handleChangeCount(
																		"increase",
																		order.product,
																		order.amount === order.countInStock,
																		order.amount === 1
																	)
																}
															>
																<PlusOutlined style={{ color: "#000",fontSize: "10px" }} />
															</button>
														</WrapperCountOrder>
														<Typography
															className={classes.txtNumberPrice}
															style={{
																width: 80,
																color: "rgb(255, 66, 78)",
															}}
														>
															{convertPrice(order.price * order.amount)}
														</Typography>
														<DeleteOutlined
															style={{ cursor: "pointer" }}
															onClick={() => handleDeleteOrder(order.product)}
														/>
													</Box>
												</WrapperItemOrder>
											);
										})
									)}
								</WrapperListOrder>

							</WrapperLeft>
							{/* </Container> */}

							<WrapperRight>
								<div style={{ width: "100%" }}>
									{/* <WrapperInfo >
											<Grid container spacing={2} columns={16} style={{ paddingBottom: "16px" }}>
												<Grid item xs={8}>
													<Typography style={{ color: 'rgb(128, 128, 137)',fontSize: '18px' }}>Giao tới</Typography>
												</Grid>
												<Grid item xs={8} style={{ textAlign: "right" }}>
													<Typography
														onClick={handleChangeAddress}
														style={{ color: "#212B36",cursor: "pointer",fontSize: '18px' }}>
														Thay đổi
													</Typography>
												</Grid>
											</Grid>
											<Box >
												<Typography className={classes.nameProductCard} style={{ color: 'rgb(128, 128, 137)',fontSize: '16px' }}>
													<span style={{ fontWeight: "bold",color: "#212B36",fontStyle: "italic",fontSize: "16px" }}>
														Nhà{" "}
													</span>{" "}{`${user?.address}, ${user?.ward}, ${user?.city}, ${user?.province}`}{" "} </Typography>
											</Box>
										</WrapperInfo> */}
									<WrapperInfo>
										<div
											style={{
												paddingTop: "20px",
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
											}}
										>
											<Typography className={classes.txtValueTotal}>Tạm tính</Typography>
											<Typography
												className={classes.txtNumberPrice}
												style={{
													color: "#000",
													fontSize: "14px",
													fontWeight: "bold",
												}}
											>
												{convertPrice(priceMemo)}
											</Typography>
										</div>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
											}}
										>
											<Typography className={classes.txtValueTotal}>Giảm giá</Typography>
											<Typography
												className={classes.txtNumberPrice}
												style={{
													color: "#000",
													fontSize: "14px",
													fontWeight: "bold",
												}}
											>
												{convertPrice(priceDiscountMemo)}
											</Typography>
										</div>
										{/* <div
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "space-between",
												}}
											>
												<Typography className={classes.txtValueTotal}>Phí giao hàng</Typography>
												<Typography
													style={{
														color: "#000",
														fontSize: "14px",
														fontWeight: "bold",
													}}
												>
													{convertPrice(diliveryPriceMemo)}
												</Typography>
											</div> */}

									</WrapperInfo>
									<WrapperTotal>
										<Typography className={classes.txtValueTotal}>Tổng tiền</Typography>
										<Typography style={{ display: "flex",flexDirection: "column" }}>
											<Typography className={classes.txtValueTotal}
												style={{
													color: "#212B36",
													fontSize: "24px",
													fontWeight: "bold",
													textAlign: "right"
												}}
											>
												{convertPrice(totalPriceMemo)}
											</Typography>
											<Typography className={classes.txtValueTotal} style={{ color: "#000",fontSize: "11px",textAlign: "right" }}>
												(Đã bao gồm VAT nếu có)
											</Typography>
										</Typography>
									</WrapperTotal>
								</div>
								<Suspense fallback={<div>...loading</div>}>
									<LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isProcessing}
										onClick={() => handleAddCard()}
										className={classes.customLoadingButton}
										sx={{ display: { xl: "flex !important",lg: "flex !important",md: "flex !important",xs: "none !important" } }}
									>Đặt hàng</LoadingButton>
								</Suspense>

							</WrapperRight>
						</div>
						{/* </div >
						</div > */}

					</Container>
					<Container maxWidth="xl">
						<AnswerComponent />

					</Container>
				</>
			)
			}

		</>

	);
};

export default OrderPage;
