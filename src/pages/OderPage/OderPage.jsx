import { Checkbox,Form } from "antd";
import PropTypes from "prop-types";
import React,{ Suspense,useEffect,useState } from "react";
import { CustomCheckbox,Lable,WrapperCountOrder,WrapperInfo,WrapperItemOrder,WrapperLeft,WrapperListOrder,WrapperRight,WrapperStyleHeader,WrapperStyleHeaderDilivery,WrapperTotal } from "./style";
import { DeleteOutlined,MinusOutlined,PlusOutlined } from "@ant-design/icons";

import { WrapperInputNumber } from "../../components/ProductDetailsComponent/style";
// import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch,useSelector } from "react-redux";
import { decreaseAmount,increaseAmount,removeAllOrderProduct,removeOrderProduct,selectedOrder } from "../../redux/slides/orderSlide";
import { convertPrice } from "../../utils";
import { useMemo } from "react";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
// import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
// import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { useNavigate } from "react-router-dom";
import StepComponent from "../../components/StepComponent/StepComponent";
import { Box,Button,Container,Grid,Snackbar,Stack,Step,StepConnector,StepLabel,Stepper,Typography,stepConnectorClasses } from "@mui/material";
import styles from "./stylemui";
import Item from "antd/es/list/Item";
import { styled } from "@mui/styles";

import { StepIconProps } from "@mui/material/StepIcon";
import { Check,Label } from "@mui/icons-material";
import TableComponent from "components/TableComponent/TableComponent";
import { AvatarTable } from "components/AdminUser/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import AnimationComponent from "components/AnimationComponent/AnimationComponent";
import { Helmet } from "react-helmet-async";
const ButtonComponent = React.lazy(() => import('../../components/ButtonComponent/ButtonComponent'));
const Loading = React.lazy(() => import('../../components/LoadingComponent/Loading'));
const InputComponent = React.lazy(() => import('../../components/InputComponent/InputComponent'));
const MobileCartTotalPriceComponent = React.lazy(() => import('../../components/MobileCartTotalPriceComponent/MobileCartTotalPriceComponent'));
const QontoConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 10,
		left: "calc(-50% + 16px)",
		right: "calc(50% + 16px)",
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: "#784af4",
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: "#784af4",
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		// borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
		borderTopWidth: 3,
		borderRadius: 1,
	},
}));

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

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 22,
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundImage: "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundImage: "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		height: 3,
		border: 0,
		backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
		borderRadius: 1,
	},
}));

const ColorlibStepIconRoot = styled("div")(({ theme,ownerState }) => ({
	backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
	zIndex: 1,
	color: "#fff",
	width: 50,
	height: 50,
	display: "flex",
	borderRadius: "50%",
	justifyContent: "center",
	alignItems: "center",
	...(ownerState.active && {
		backgroundImage: "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
		boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
	}),
	...(ownerState.completed && {
		backgroundImage: "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
	}),
}));

const OrderPage = () => {
	// Sử dụng useSelector để lấy state từ Redux store
	const order = useSelector((state) => state.order);
	const user = useSelector((state) => state.user);

	// Sử dụng styles để tạo các class CSS cho component
	const classes = styles();

	// Sử dụng useState để lưu trữ các giá trị cần thiết cho component
	const [listChecked,setListChecked] = useState([]);
	const [isOpenModalUpdateInfo,setIsOpenModalUpdateInfo] = useState(false);
	const [stateUserDetails,setStateUserDetails] = useState({
		name: "",
		phone: "",
		address: "",
		city: "",
	});

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
	const [rowSelected,setRowSelected] = useState("");
	const diliveryPriceMemo = useMemo(() => {
		if (priceMemo >= 20000 && priceMemo < 500000) {
			return 10000;
		} else if (priceMemo >= 500000 || order?.orderItemsSlected?.length === 0) {
			return 0;
		} else {
			return 20000;
		}
	},[priceMemo]);

	const totalPriceMemo = useMemo(() => {
		return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo);
	},[priceMemo,priceDiscountMemo,diliveryPriceMemo]);

	const handleRemoveAllOrder = () => {
		if (listChecked?.length > 1) {
			dispatch(removeAllOrderProduct({ listChecked }));
		}
	};

	const handleAddCard = () => {
		if (!order?.orderItemsSlected?.length) {
			message.error("Vui lòng chọn sản phẩm");
		} else if (!user?.phone || !user.address || !user.name || !user.city) {
			setIsOpenModalUpdateInfo(true);
		} else {
			navigate("/payment");
		}
	};

	const mutationUpdate = useMutationHooks((data) => {
		const { id,token,...rests } = data;
		const res = UserService.updateUser(id,{ ...rests },token);
		return res;
	});

	const { isLoading,data } = mutationUpdate;

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
	const handleUpdateInforUser = () => {
		const { name,address,city,phone } = stateUserDetails;
		if (name && address && city && phone) {
			mutationUpdate.mutate(
				{
					id: user?.id,
					token: user?.access_token,
					...stateUserDetails,
				},
				{
					onSuccess: () => {
						dispatch(updateUser({ name,address,city,phone }));
						setIsOpenModalUpdateInfo(false);
					},
				}
			);
		}
	};
	const columns = [
		{
			title: "Name",
			key: "avatarName",
			render: (record) => (
				<Stack direction='row' alignItems='center'>
					<AvatarTable size={40} alt={record.image} src={record.image} />
					<Typography variant='subtitle2' noWrap>
						{record.name}
					</Typography>
				</Stack>
			),
		},
		{
			title: "Price",
			dataIndex: "price",
			sorter: (a,b) => a.price - b.price,
			filters: [
				{
					text: ">= 50",
					value: ">=",
				},
				{
					text: "<= 50",
					value: "<=",
				},
			],
			onFilter: (value,record) => {
				if (value === ">=") {
					return record.price >= 50;
				}
				return record.price <= 50;
			},
		},
		{
			title: "Rating",
			dataIndex: "rating",
			render: (value) => {
				return value > 1 && value < 3 ? (
					<Label color={"error"}>
						<Typography color={"error"}>{value}</Typography>
					</Label>
				) : value > 3 && value < 4 ? (
					<Label color={"success"}>
						<Typography color={"success"}>{value}</Typography>
					</Label>
				) : (
					<Label background={"#000"}>
						<Typography color={"primary"}>{value}</Typography>
					</Label>
				);
			},
			sorter: (a,b) => a.rating - b.rating,
			filters: [
				{
					text: ">= 3",
					value: ">=",
				},
				{
					text: "<= 3",
					value: "<=",
				},
			],
			onFilter: (value,record) => {
				if (value === ">=") {
					return Number(record.rating) >= 3;
				}
				return Number(record.rating) <= 3;
			},
		},
		{
			title: "Type",
			dataIndex: "type",
		},
		// {
		//   title: "Action",
		//   dataIndex: "action",
		//   key: "x",
		//   render: () => (
		//     <Dropdown menu={{ items }} trigger={["click"]}>
		//       <Box onClick={(e) => e.preventDefault()}>
		//         <Space>
		//           <Icon
		//             sx={{ color: "#000", cursor: "pointer" }}
		//             component={MoreVertIcon}
		//           />
		//         </Space>
		//       </Box>
		//     </Dropdown>
		//   ),
		// },
	];
	const dataTable = order?.orderItems?.map((product) => {
		return { ...product,key: product._id };
	});
	console.log("dataTable",dataTable);
	const handleOnchangeDetails = (e) => {
		setStateUserDetails({
			...stateUserDetails,
			[e.target.name]: e.target.value,
		});
	};
	const itemsDelivery = [
		{
			title: "20.000 VND",
			description: "Dưới 200.000 VND",
		},
		{
			title: "10.000 VND",
			description: "Từ 200.000 VND đến dưới 500.000 VND",
		},
		{
			title: "Free ship",
			description: "Trên 500.000 VND",
		},
	];
	const steps = ["Mua","149k","200k"];
	const isMobileDevice = window.innerWidth <= 768; // Kiểm tra thiết bị di động
	return (
		<>
			<Helmet>
				<title>Giỏ hàng của bạn - Hymns</title>
			</Helmet>
			{isMobileDevice ? (
				<>
					<Suspense fallback={<div>...loading</div>}>
						<div style={{ with: "100%",marginTop: "90px" }}>
							<MobileCartTotalPriceComponent name={"Mua hàng"} totalPriceMemo={totalPriceMemo} handleAddOrderProduct={handleAddCard} classes={classes} />
						</div>
					</Suspense>
					<div style={{ with: "100%",height: "100vh",marginTop: "65px" }}>
						<Typography className={classes.txtOrder}>Giỏ hàng</Typography>

						<Grid style={{
							padding: "11px 16px",borderBottom: "1px solid rgb(224, 224, 224)"
						}} sx={{ display: { xs: "flex",lx: "none",md: "none" } }} >
							<WrapperInfo>
								<Grid container spacing={2} columns={16} style={{ alignItems: 'baseline' }}>
									<Grid item xs={8}>
										<Typography className={classes.nameInfoUser}>
											<FontAwesomeIcon icon={faLocationDot} style={{ color: "#245c4f" }} />	{user?.name}	     - {user?.phone}
										</Typography>
									</Grid>
									<Grid item xs={8} style={{ textAlign: "right",color: "#245c4f",cursor: "pointer",fontSize: "14px" }}>
										<Typography onClick={handleChangeAddress} style={{ color: "#245c4f",cursor: "pointer",fontSize: "14px",}}>{" "}Thay đổi</Typography>
									</Grid>
								</Grid>
								{/* <Typography variant="h6" component="h2">
                  {`${user?.name} ${user?.phone}`}{" "}
                </Typography> */}

								<Box>
									<Typography className={classes.InfoHomeUser} style={{ color: 'rgb(128, 128, 137)',fontSize: '13px' }}>
										{" "}<span style={{ fontWeight: "bold",color: "#245c4f",fontStyle: "italic",fontSize: "12px",}}> Nhà  </span>
										{" "}{`${user?.address} ${user?.city}`}{" "}
									</Typography>
								</Box>
							</WrapperInfo>
						</Grid>
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
									{/* <Typography className={classes.nameProduct}>Phí giao hàng</Typography> */}
									{/* <Stack sx={{ width: '100%' }} spacing={4}>
								<Stepper alternativeLabel activeStep={1} connector={<QontoConnector />}>
									{steps.map((label) => (
										<Step key={label}>
											<StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
										</Step>
									))}
								</Stepper>
							</Stack> */}
									{/* <WrapperStyleHeaderDilivery>
										<StepComponent
											items={itemsDelivery}
											current={
												diliveryPriceMemo === 10000
													? 2
													: diliveryPriceMemo === 20000
														? 1
														: order.orderItemsSlected.length === 0
															? 0
															: 3
											}
										/>
									</WrapperStyleHeaderDilivery> */}
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
																src={order?.image}
																style={{
																	width: "3rem",
																	height: "3rem",
																	objectFit: "cover",
																}}
															/>

															{/* Hellodsaofksfsokdfk */}
															{/* <Grid
												sx={{ display: "flex",flexDirection: { xs: "column",md: "row",xl: "row" },width: { xs: "60%",md: "390px",xl: "390px" },alignItems: { xs: " flex-start",md: "center",xl: "center" },flex: { xs: "none", md: 1,xl: 1 } }}
												style={{
													justifyContent: "space-between",
												

												}}
											> */}
															<Grid
																// sx={{ flexDirection: { xs: "column",md: "row",xl: "row" } }}
																sx={{ display: "flex",flexDirection: { xs: "column",md: "row",xl: "row" },width: { xs: " calc(100% - 92px)",md: "390px",xl: "390px" },alignItems: { xs: " flex-start",md: "center",xl: "center" },flex: { xs: "none",md: 1,xl: 1 } }}
															>
																<Typography className={classes.nameProductCard}
																>

																	{order?.name.length > 30 ? `${order?.name.slice(0,100)}...` : order?.name}
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
																		marginTop: "5px",
																	}}
																>
																	{convertPrice(order?.price * order?.amount)}
																</Typography>
																{/* <span
                          style={{
                            color: "rgb(255, 66, 78)",
                            fontSize: "13px",
                            fontWeight: 500,
                          }}
                        >
                          {convertPrice(order?.price * order?.amount)}
                        </span> */}
																{/* <DeleteOutlined
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeleteOrder(order?.product)}
                        /> */}
															</Grid>
															{/* </Grid> */}
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
									{/* <TableComponent
              columns={columns}
              data={dataTable}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    setRowSelected(record._id);
                  },
                };
              }}
            /> */}
								</Grid>
								<Grid item xs={12} xl={3}>
									<div style={{ width: "100%" }}>
										<Grid container spacing={2} columns={16} style={{ paddingBottom: "16px" }} sx={{ display: { xs: "none",lx: "flex",md: "flex" } }} className={classes.InfoUserForDesktop}>
											<Grid container spacing={2} columns={16} style={{ paddingBottom: "16px" }} sx={{ display: { xs: "none",lx: "flex" } }}>
												<Grid item xs={8}>
													<Typography
														style={{
															color: "rgb(128, 128, 137)",
															fontSize: "14px",
														}}
													>
														Giao tới
													</Typography>
												</Grid>
												<Grid item xs={8} style={{ textAlign: "right" }}>
													<Typography>
														{" "}
														<span
															onClick={handleChangeAddress}
															style={{
																color: "#245c4f",
																cursor: "pointer",
																fontSize: "14px",
															}}
														>
															Thay đổi
														</span>
													</Typography>
												</Grid>
											</Grid>
											{/* <Typography variant="h6" component="h2">
                  {`${user?.name} ${user?.phone}`}{" "}
                </Typography> */}

											<Box>
												<Typography
													style={{
														color: "rgb(128, 128, 137)",
														fontSize: "13px",
													}}
												>
													{" "}
													<span
														style={{
															fontWeight: "bold",
															color: "#245c4f",
															fontStyle: "italic",
															fontSize: "12px",
														}}
													>
														Nhà
													</span>{" "}
													{`${user?.address} ${user?.city}`}{" "}
												</Typography>
											</Box>
										</Grid>

									</div>
									<Button className={classes.btnAddCard} sx={{ display: { xs: "none",lx: "flex",md: "flex" } }}
										variant='contained'

										onClick={() => handleAddCard()}
									>Mua hàng</Button>
									{/* <ButtonComponent
								onClick={() => handleAddCard()}
								size={40}
								styleButton={{
									background: "#245c4f",
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
									<Typography className={classes.nameProductCard}>Tạm tính</Typography>
									<Typography className={classes.nameProductCard}
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
									<Typography className={classes.nameProductCard}>Giảm giá</Typography>
									<Typography
										style={{
											color: "#000",
											fontSize: "14px",
											fontWeight: "bold",
										}}
									>
										{convertPrice(priceDiscountMemo)}
									</Typography>
								</Box>
								<Box
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
									}}
								>
									<Typography className={classes.nameProductCard}>Phí giao hàng</Typography>
									<Typography className={classes.nameProductCard}
										style={{
											color: "#000",
											fontSize: "14px",
											fontWeight: "bold",
										}}
									>
										{convertPrice(diliveryPriceMemo)}
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
									<Typography className={classes.nameProductCard}
										style={{
											color: "#245c4f",
											fontSize: "16px",
											fontWeight: "bold",
											textAlign: "right",
											justifyContent: 'end'
										}}
									>
										{convertPrice(totalPriceMemo)}
									</Typography>
									<Typography className={classes.nameProductCard}>
										(Đã bao gồm VAT nếu có)
									</Typography>
								</Typography>
							</WrapperTotal>
						</Grid>
						<ModalComponent title='Cập nhật thông tin giao hàng' open={isOpenModalUpdateInfo} onCancel={handleCancleUpdate} onOk={handleUpdateInforUser}>

							<Loading isLoading={isLoading}>

								<Form
									name='basic'
									labelCol={{ span: 4 }}
									wrapperCol={{ span: 20 }}
									// onFinish={onUpdateUser}
									autoComplete='on'
									form={form}
								>
									<Form.Item
										label='Name'
										name='name'
										rules={[
											{
												required: true,
												message: "Please input your name!",
											},
										]}
									>
										<InputComponent value={stateUserDetails["name"]} onChange={handleOnchangeDetails} name='name' />
									</Form.Item>
									<Form.Item
										label='City'
										name='city'
										rules={[
											{
												required: true,
												message: "Please input your city!",
											},
										]}
									>
										<InputComponent value={stateUserDetails["city"]} onChange={handleOnchangeDetails} name='city' />
									</Form.Item>
									<Form.Item
										label='Phone'
										name='phone'
										rules={[
											{
												required: true,
												message: "Please input your  phone!",
											},
										]}
									>
										<InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name='phone' />
									</Form.Item>

									<Form.Item
										label='Adress'
										name='address'
										rules={[
											{
												required: true,
												message: "Please input your  address!",
											},
										]}
									>
										<InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name='address' />
									</Form.Item>
								</Form>
							</Loading>
						</ModalComponent>
					</div>
				</>
			) : (
				<>
					<Helmet>
						<title>Giỏ hàng của bạn - Hymns</title>
					</Helmet>
					<div style={{ with: "100%",height: "100vh",marginTop: '100px' }}>
						<div style={{ height: "100%",width: "1270px",margin: "0 auto" }}>
							<Typography className={classes.txtOrder}>Giỏ hàng của bạn</Typography>
							<div style={{ display: "flex",justifyContent: "center" }}>
								<WrapperLeft>
									<Typography className={classes.nameAllProduct}>Phí giao hàng</Typography>
									<WrapperStyleHeaderDilivery>
										<StepComponent
											items={itemsDelivery}
											current={
												diliveryPriceMemo === 10000
													? 2
													: diliveryPriceMemo === 20000
														? 1
														: order.orderItemsSlected.length === 0
															? 0
															: 3
											}
										/>
									</WrapperStyleHeaderDilivery>
									<WrapperStyleHeader>
										<span style={{ display: "inline-block",width: "390px" }}>
											<CustomCheckbox
												onChange={handleOnchangeCheckAll}
												checked={listChecked?.length === order?.orderItems?.length}
											></CustomCheckbox>
											<span> Tất cả ({order.orderItems.length} sản phẩm)</span>
										</span>
										<div
											style={{
												flex: 1,
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
											}}
										>
											<span>Đơn giá</span>
											<span>Số lượng</span>
											<span>Thành tiền</span>
											<DeleteOutlined
												style={{ cursor: "pointer" }}
												onClick={handleRemoveAllOrder}
											/>
										</div>
									</WrapperStyleHeader>
									<WrapperListOrder>
										{order?.orderItems?.map((order) => {
											return (
												<WrapperItemOrder key={order?.product}>
													<div
														style={{
															width: "390px",
															display: "flex",
															alignItems: "center",
															gap: 4,
														}}
													>
														<CustomCheckbox
															onChange={onChange}
															value={order?.product}
															checked={listChecked.includes(order?.product)}
														></CustomCheckbox>
														<img
															src={order?.image}
															style={{
																width: "77px",
																height: "79px",
																objectFit: "cover",
															}}
														/>
														<div
															style={{
																width: 260,
																overflow: "hidden",
																textOverflow: "ellipsis",
																whiteSpace: "nowrap",
															}}
														>
															{order?.name}
														</div>
													</div>
													<div
														style={{
															flex: 1,
															display: "flex",
															alignItems: "center",
															justifyContent: "space-between",
														}}
													>
														<span>
															<span style={{ fontSize: "13px",color: "#242424" }}>
																{convertPrice(order?.price)}
															</span>
														</span>
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
																		order?.product,
																		order?.amount === 1
																	)
																}
															>
																<MinusOutlined
																	style={{ color: "#000",fontSize: "10px" }}
																/>
															</button>
															<WrapperInputNumber
																defaultValue={order?.amount}
																value={order?.amount}
																size="small"
																min={1}
																max={order?.countInStock}
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
																		order?.product,
																		order?.amount === order.countInStock,
																		order?.amount === 1
																	)
																}
															>
																<PlusOutlined
																	style={{ color: "#000",fontSize: "10px" }}
																/>
															</button>
														</WrapperCountOrder>
														<span
															style={{
																color: "rgb(255, 66, 78)",
																fontSize: "13px",
																fontWeight: 500,
															}}
														>
															{convertPrice(order?.price * order?.amount)}
														</span>
														<DeleteOutlined
															style={{ cursor: "pointer" }}
															onClick={() => handleDeleteOrder(order?.product)}
														/>
													</div>
												</WrapperItemOrder>
											);
										})}
									</WrapperListOrder>
								</WrapperLeft>
								<WrapperRight>
									<div style={{ width: "100%" }}>
										<WrapperInfo >
											<Grid container spacing={2} columns={16} style={{ paddingBottom: "16px" }}>
												<Grid item xs={8}>
													<Typography style={{ color: 'rgb(128, 128, 137)',fontSize: '14px' }}>Giao tới</Typography>
												</Grid>
												<Grid item xs={8} style={{ textAlign: "right" }}>
													<Typography>  <span
														onClick={handleChangeAddress}
														style={{ color: "#245c4f",cursor: "pointer",fontSize: '14px',}}
													>
														Thay đổi
													</span></Typography>
												</Grid>
											</Grid>
											{/* <Typography variant="h6" component="h2">
                  {`${user?.name} ${user?.phone}`}{" "}
                </Typography> */}

											<Box >

												<Typography className={classes.nameProductCard} style={{ color: 'rgb(128, 128, 137)',fontSize: '13px' }}>      <span style={{ fontWeight: "bold",color: "#245c4f",fontStyle: "italic",fontSize: "12px" }}>

													Nhà
												</span>   {" "}{`${user?.address} ${user?.city}`}{" "} </Typography>
											</Box>

										</WrapperInfo>
										<WrapperInfo>
											<div
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "space-between",
												}}
											>
												<span>Tạm tính</span>
												<span
													style={{
														color: "#000",
														fontSize: "14px",
														fontWeight: "bold",
													}}
												>
													{convertPrice(priceMemo)}
												</span>
											</div>
											<div
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "space-between",
												}}
											>
												<span>Giảm giá</span>
												<span
													style={{
														color: "#000",
														fontSize: "14px",
														fontWeight: "bold",
													}}
												>
													{convertPrice(priceDiscountMemo)}
												</span>
											</div>
											<div
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "space-between",
												}}
											>
												<span>Phí giao hàng</span>
												<span
													style={{
														color: "#000",
														fontSize: "14px",
														fontWeight: "bold",
													}}
												>
													{convertPrice(diliveryPriceMemo)}
												</span>
											</div>

										</WrapperInfo>
										<WrapperTotal>
											<span>Tổng tiền</span>
											<span style={{ display: "flex",flexDirection: "column" }}>
												<span
													style={{
														color: "#245c4f",
														fontSize: "24px",
														fontWeight: "bold",
														textAlign: "right"
													}}
												>
													{convertPrice(totalPriceMemo)}
												</span>
												<span style={{ color: "#000",fontSize: "11px" }}>
													(Đã bao gồm VAT nếu có)
												</span>
											</span>
										</WrapperTotal>
									</div>
									<Suspense fallback={<div>...loading</div>}>
										<ButtonComponent
											onClick={() => handleAddCard()}
											size={40}
											styleButton={{
												background: "#245c4f",
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
										></ButtonComponent>
									</Suspense>

								</WrapperRight>
							</div>
						</div >
						<ModalComponent
							title="Cập nhật thông tin giao hàng"
							open={isOpenModalUpdateInfo}
							onCancel={handleCancleUpdate}
							onOk={handleUpdateInforUser}
						>
							<Loading isLoading={isLoading}>
								<Form
									name="basic"
									labelCol={{ span: 4 }}
									wrapperCol={{ span: 20 }}
									// onFinish={onUpdateUser}
									autoComplete="on"
									form={form}
								>
									<Form.Item
										label="Name"
										name="name"
										rules={[{ required: true,message: "Please input your name!" }]}
									>
										<InputComponent
											value={stateUserDetails["name"]}
											onChange={handleOnchangeDetails}
											name="name"
										/>
									</Form.Item>
									<Form.Item
										label="City"
										name="city"
										rules={[{ required: true,message: "Please input your city!" }]}
									>
										<InputComponent
											value={stateUserDetails["city"]}
											onChange={handleOnchangeDetails}
											name="city"
										/>
									</Form.Item>
									<Form.Item
										label="Phone"
										name="phone"
										rules={[{ required: true,message: "Please input your  phone!" }]}
									>
										<InputComponent
											value={stateUserDetails.phone}
											onChange={handleOnchangeDetails}
											name="phone"
										/>
									</Form.Item>

									<Form.Item
										label="Adress"
										name="address"
										rules={[
											{ required: true,message: "Please input your  address!" },
										]}
									>
										<InputComponent
											value={stateUserDetails.address}
											onChange={handleOnchangeDetails}
											name="address"
										/>
									</Form.Item>
								</Form>
							</Loading>
						</ModalComponent>
					</div >
				</>
			)
			}

		</>

	);
};

export default OrderPage;
