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
import { Accordion,AccordionSummary,Box,Breadcrumbs,Button,Card,CardContent,Container,Grid,Link,Snackbar,Stack,Step,StepConnector,StepLabel,Stepper,Tooltip,Typography,stepConnectorClasses } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import styles from "./stylemui";
import { styled } from "@mui/styles";

import { Check,Label } from "@mui/icons-material";

import { Helmet } from "react-helmet-async";
import UpdateUserComponent from "components/UpdateUserComponent";
import AnswerComponent from "components/AnswerComponent/AnswerComponent";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from "@mui/lab";
import { Assets } from "configs";
import OrderTable from "./TableOrderComponent/TableOrderComponent";




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
	const [isProcessing,setIsProcessing] = useState(false);

	// Sử dụng useNavigate để chuyển hướng trang
	const navigate = useNavigate();

	// Sử dụng Form để tạo form và lưu trữ giá trị của form
	const [form] = Form.useForm();

	// Sử dụng useDispatch để gửi các action tới Redux store
	const dispatch = useDispatch();

	// Hàm xử lý sự kiện khi checkbox được chọn hoặc bỏ chọn
	// const onChange = (e) => {
	// 	if (listChecked.includes(e.target.value)) {
	// 		const newListChecked = listChecked.filter((item) => item !== e.target.value);
	// 		setListChecked(newListChecked);
	// 	} else {
	// 		setListChecked([...listChecked,e.target.value]);
	// 	}
	// };

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
	// const handleOnchangeCheckAll = (e) => {
	// 	if (e.target.checked) {
	// 		const newListChecked = [];
	// 		order?.orderItems?.forEach((item) => {
	// 			newListChecked.push(item?.product);
	// 		});
	// 		setListChecked(newListChecked);
	// 	} else {
	// 		setListChecked([]);
	// 	}
	// };
	// Thêm sử dụng useEffect
	useEffect(() => {
		// Kiểm tra nếu có sản phẩm trong đơn hàng và listChecked đang trống
		if (order?.orderItems?.length > 0 && listChecked.length === 0) {
			// Tự động chọn tất cả sản phẩm
			const newListChecked = order?.orderItems?.map((item) => item.product) || [];
			setListChecked(newListChecked);
		}
	},[order,listChecked]); // Theo dõi sự thay đổi của order và listChecked
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


	const totalPriceMemo = useMemo(() => {
		return Number(priceMemo) - Number(priceDiscountMemo);
	},[priceMemo,priceDiscountMemo]);

	const handleRemoveAllOrder = () => {
		if (listChecked?.length > 1) {
			dispatch(removeAllOrderProduct({ listChecked }));
		}
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


	const mutation = useMutationHooks(
		(data) => {
			const { id,access_token,...rests } = data;
			UserService.updateUser(id,rests,access_token);
		}
	)
	const { data,isLoading,isSuccess,isError } = mutation;




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



	return (
		<>
			<Helmet>
				<title>Giỏ hàng của bạn - Hymns</title>
			</Helmet>
			<Container maxWidth="lg" >
				<Container >

					<Typography className={classes.hymnsName} style={{ fontSize: "1.5rem",textAlign: "left",marginBottom: "20px",fontWeight: 600,marginTop: "100px" }}	>
						Giỏ hàng
					</Typography>
				</Container>
				<Grid container spacing={2}>
					<Grid item xs={12} xl={8}>
						<Box sx={{ borderBottom: { xl: "blue",xs: "3px solid #F3F3F3" },paddingBottom: "30px" }}>


							<Container sx={{ display: { xl: "none",xs: "block" } }}>


								{order?.orderItems?.map((order) => {
									return (
										<Card sx={{ display: 'flex',marginBottom: 1 }} className={classes.boxCard}>
											<CardMedia
												component="img"
												sx={{ width: 130 }}
												image={order?.image[0]}
												alt="Live from space album cover"
											/>
											<Box sx={{ display: 'flex',flexDirection: 'column' }}>
												<CardContent sx={{ flex: '1 0 auto' }}>
													<Tooltip title={order?.name}>
														<Typography className={classes.nameProductCard}
														>

															{order?.name.length > 30 ? `${order?.name.slice(0,50)}...` : order?.name}
														</Typography>

													</Tooltip>

													<Typography className={classes.txtValueTotal}>
														Còn hàng
													</Typography>
													<Typography
														className={classes.nameProduct}
														style={{
															fontSize: "15px",
															color: "#0a0a0a",
															marginTop: "10px",
															marginBottom: "10px",
														}}
													>
														{convertPrice(order.price * order.amount)}
													</Typography>
												</CardContent>
												<Box sx={{ display: 'flex',alignItems: 'center',pl: 1,pb: 1 }}>

												</Box>
											</Box>

										</Card>
									);
								})}
							</Container>
							<Box sx={{ display: { xl: "block",xs: "none" } }} >
								<OrderTable order={order} />
							</Box>

						</Box>
					</Grid>
					<Grid item xs={12} xl={4}>
						<Container sx={{ marginTop: { xs: "30px",xl: "0px" } }} className={classes.WrapperRight} >
							<Grid container spacing={2} >
								<Grid item xs={6}>
									<Typography className={classes.txtValueTotal}>Tạm tính</Typography>


									{/* <Typography className={classes.txtValueTotal}>Giảm giá</Typography> */}

								</Grid>
								<Grid item xs={6}>
									<Typography className={classes.txtValueTotal}
										style={{
											color: "#000",
											fontSize: "14px",
											fontWeight: "bold",
											textAlign: "right"

										}}
									>
										{convertPrice(priceMemo)}
									</Typography>
								</Grid>

								<Grid item xs={6}>
									<Typography className={classes.txtValueTotal}>Giảm giá</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography className={classes.txtValueTotal}
										style={{
											color: "#000",
											fontSize: "14px",
											fontWeight: "bold",
											textAlign: "right"
										}}
									>
										{convertPrice(priceDiscountMemo)}
									</Typography>
								</Grid>
							</Grid>


							<Container style={{ marginTop: "30px" }}>
								<Grid item xs={12} sm={6} md={6} xl={12} style={{ marginBottom: "30px" }}>
									<LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isProcessing}
										className={classes.nameProductInfo}
										style={{
											background: "#436E67",
											color: "#fff"
										}} onClick={() => handleAddCard()}
									>
										Tiếp tục
									</LoadingButton>
								</Grid>
							</Container >
						</Container>

					</Grid>
				</Grid>
			</Container>






		</>

	);
};

export default OrderPage;
