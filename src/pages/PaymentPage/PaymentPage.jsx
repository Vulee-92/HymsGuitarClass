import { Form,Radio } from 'antd'
import React,{ useEffect,useState } from 'react'
import { Lable,WrapperInfo,WrapperLeft,WrapperRadio,WrapperRight,WrapperTotal } from './style';

import { useDispatch,useSelector } from 'react-redux';
import { convertPrice } from '../../utils';
import { useMemo } from 'react';

import { useMutationHooks } from '../../hooks/useMutationHook';
import * as  UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';
import { removeAllOrderProduct } from '../../redux/slides/orderSlide';
import { PayPalButton } from "react-paypal-button-v2";
import * as PaymentService from '../../services/PaymentService'
import { Assets } from "../../configs";
import { Box,Breadcrumbs,Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Grid,MenuItem,Modal,Paper,Select,Slide,TextField,Typography } from "@mui/material";
import styles from "./stylemui";
import MobileCartTotalPriceComponent from '../../components/MobileCartTotalPriceComponent/MobileCartTotalPriceComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong,faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { LoadingButton } from '@mui/lab';
import ModalUserComponent from 'components/ModalUserComponent/ModalUserComponent';
import useUpdateUserMutation from 'hooks/useUpdateUserMutation';
import { useMutation,useQuery } from '@tanstack/react-query';
import axios from 'axios';
import InputComponent from 'components/InputComponent/InputComponent';
import ModalComponent from 'components/ModalComponent/ModalComponent';
import ProfileScreen from 'pages/profile';
import UpdateUserComponent from 'components/UpdateUserComponent';

const PaymentPage = () => {
	const order = useSelector((state) => state.order)
	const user = useSelector((state) => state.user)
	console.log("useruseruseruseruseruser",user)
	const [localUserInfo,setLocalUserInfo] = useState(user);
	useEffect(() => {
		// Theo dõi thay đổi của thông tin người dùng từ Redux Store
		setLocalUserInfo(user); // Cập nhật state local khi thông tin người dùng thay đổi
	},[user]);
	console.log("localUserInfo",localUserInfo)
	const [delivery,setDelivery] = useState('fast')
	const [payment,setPayment] = useState('later_money','bank')
	const navigate = useNavigate()
	const [sdkReady,setSdkReady] = useState(false)
	const classes = styles();
	const [isOpenModalUpdateInfo,setIsOpenModalUpdateInfo] = useState(false)


	const handleClose = () => {
		setIsOpenModalUpdateInfo(false);
	};
	const [stateUserDetails,setStateUserDetails] = useState({
		id: '',
		name: '',
		phone: '',
		address: '',
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
				address: user?.address,
				phone: user?.phone
			})
		}
	},[isOpenModalUpdateInfo])

	const handleChangeAddress = () => {
		setIsOpenModalUpdateInfo(true)
	}
	const backToOrder = () => {
		navigate("/order");
	}
	const priceMemo = useMemo(() => {
		const result = order?.orderItemsSlected?.reduce((total,cur) => {
			return total + ((cur.price * cur.amount))
		},0)
		return result
	},[order])

	const priceDiscountMemo = useMemo(() => {
		const result = order?.orderItemsSlected?.reduce((total,cur) => {
			const totalDiscount = cur.discount ? cur.discount : 0
			return total + (priceMemo * (totalDiscount * cur.amount) / 100)
		},0)
		if (Number(result)) {
			return result
		}
		return 0
	},[order])

	const diliveryPriceMemo = useMemo(() => {
		if (priceMemo > 200000) {
			return 10000
		} else if (priceMemo === 0) {
			return 0
		} else {
			return 20000
		}
	},[priceMemo])

	const totalPriceMemo = useMemo(() => {
		return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
	},[priceMemo,priceDiscountMemo,diliveryPriceMemo])
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
	const handleAddOrder = () => {
		if (user?.access_token && order?.orderItemsSlected && user?.name
			&& user?.address && user?.phone && user?.city && priceMemo && user?.id) {
			// eslint-disable-next-line no-unused-expressions
			mutationAddOrder.mutate(
				{
					token: user?.access_token,
					orderItems: order?.orderItemsSlected,
					fullName: user?.name,
					address: user?.address,
					phone: user?.phone,
					city: user?.city,
					paymentMethod: payment,
					itemsPrice: priceMemo,
					shippingPrice: diliveryPriceMemo,
					totalPrice: totalPriceMemo,
					user: user?.id,
					email: user?.email
				}
			)
		}
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

	const onSuccessPaypal = (details,data) => {
		mutationAddOrder.mutate(
			{
				token: user?.access_token,
				orderItems: order?.orderItemsSlected,
				fullName: user?.name,
				address: user?.address,
				phone: user?.phone,
				city: user?.city,
				paymentMethod: payment,
				itemsPrice: priceMemo,
				shippingPrice: diliveryPriceMemo,
				totalPrice: totalPriceMemo,
				user: user?.id,
				isPaid: true,
				paidAt: details.update_time,
				email: user?.email
			}
		)
	}

	// const handleUpdateUsers = async () => {
	// 	console.log("user?.id",user?.id)
	// 	try {
	// 		const { name,address,city,phone } = stateUserDetails
	// 		console.log("stateUserDetails",stateUserDetails)
	// 		if (name && address && city && phone) {
	// 			mutationUpdate.mutate({ id: user?.id,token: user?.access_token,...stateUserDetails },{
	// 				onSuccess: () => {
	// 					dispatch(updateUser({ name,address,city,phone }))
	// 					setIsOpenModalUpdateInfo(false)
	// 				}
	// 			})
	// 		}
	// 	} catch (error) {
	// 		console.error(error);
	// 		// Xử lý lỗi nếu cần
	// 	}
	// };

	// const handleUpdateUsers = async (selectedUserId) => {
	// 	console.log("user?.id",selectedUserId);

	// 	try {
	// 		await mutationUpdate.mutateAsync(selectedUserId._id,{
	// 			onSuccess: () => {
	// 				dispatch(updateUser(selectedUserId._id));
	// 				setIsOpenModalUpdateInfo(false);
	// 			},
	// 		});
	// 	} catch (error) {
	// 		console.error(error);
	// 		// Xử lý lỗi nếu cần
	// 	}
	// };
	// const handleGetDetailsUser = async (id,token) => {
	// 	let storageRefreshToken = localStorage.getItem("refresh_token");
	// 	const refreshToken = JSON.parse(storageRefreshToken);
	// 	const res = await UserService.getDetailsUser(id,token);
	// 	dispatch(
	// 		updateUser({
	// 			...res?.data,
	// 			access_token: token,
	// 			refreshToken: refreshToken,
	// 		})
	// 	);
	// };
	// const queryUser = useQuery({
	// 	queryKey: ["users"],
	// 	queryFn: handleGetDetailsUser,
	// });

	const handleUpdateUsers = async (selectedUserId) => {
		try {
			await mutationUpdateUser.mutateAsync(selectedUserId);
			// Khi bạn muốn làm mới trang
			// window.location.reload();


			// queryUser.refetch();
			// toast.success(`Cập nhật thành công`);

		} catch (error) {
			console.error(error);
			// Xử lý lỗi nếu cần
		}
	};
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
				console.log("updatedUser",updatedUser)
				dispatch(updateUser(updatedUser));
			} catch (error) {
				// Xử lý lỗi tại đây nếu cần
				console.error(error);
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
		email: false,
		isAdmin: false,
		address: false,
		phone: false,
		password: false,
	});

	return (

		<>


			<div style={{ with: "100%",marginTop: '100px' }}>
				<Loading isLoading={isLoadingAddOrder}>
					<Box sx={{ width: { xl: "1270px",xs: "100%" },margin: "0 auto" }}>
						<Typography className={classes.txtOrder}>				Phương thức thanh toán & giao hàng</Typography>
						<Grid
							style={{
								padding: "11px 16px",borderBottom: "1px solid rgb(224, 224, 224)"
							}}
							sx={
								{
									marginTop: '0px',
									borderBottom: { xl: "1px solid #d6d6d4",xs: "none" },
									display: "flex",justifyContent: "center"
								}
							}
						>
							<Grid item sm={12} md={12} lg={12} xl={12} sx={{ display: { xs: "flex",xl: "flex",lg: "flex",md: "none",sm: "none" },paddingTop: "10px !important",paddingBottom: "10px" }}>
								<Grid item xs={12}>
									<div role='presentation'>

										<Breadcrumbs aria-label='breadcrumb' separator='›' sx={{ fontSize: "11px" }}>
											<Typography style={{ fontSize: "13px" }} underline='hover' color='inherit' href='/order'	>
												Giỏ hàng
											</Typography>
											<Typography style={{ fontSize: "13px",marginBottom: "0px" }} underline='hover' href='/payment' className={classes.nameProduct}>
												Phương thức thanh toán & giao hàng
											</Typography>
											{/* <Typography className={classes.txtValueTotal} style={{ fontSize: "13px",marginBottom: "0px",color: 'rgb(128, 128, 137)' }} >
												Tiến hành đặt hàng
											</Typography> */}
										</Breadcrumbs>
									</div>
								</Grid>
							</Grid>
						</Grid>
						{/* {style = {{display: "flex",justifyContent: "center" }}} */}
						<Grid spacing={2} sx={{ display: { xs: "flex" },justifyContent: "space-around",flexDirection: { xs: "column",sm: "column-reverse",md: "column-reverse",xl: "row",lg: "row" } }}>
							<Grid item xs={12} sm={12} md={12} lg={8} xl={8} sx={{ padding: "0px",marginLeft: { xs: "0px",xl: "-16px",md: "-16px",sm: "-16px" },margin: { xs: "0px",xl: "40px" } }}>
								<Box className={classes.WrapperLeft}>
									{/* <Typography className={classes.txtOrder}>Phí giao hàng</Typography> */}
									<WrapperInfo>
										<div>
											<Lable><Typography className={classes.nameProduct}>Chọn phương thức giao hàng</Typography></Lable>

											<WrapperRadio onChange={handleDilivery} value={delivery}>
												<Radio value="fast">
													<span style={{ color: "#ea8500",fontWeight: "bold" }}>
														FAST
													</span>{" "}
													<Typography className={classes.txtTilte}>
														Giao hàng ngoài Tam Kỳ (Đơn hàng dưới 3.000.000đ)
													</Typography>
												</Radio>
												<Radio value="gojek">
													<span style={{ color: "#ea8500",fontWeight: "bold" }}>
														GO_JEK
													</span>{" "}
													<Typography className={classes.txtTilte}>
														Giao hàng tiết kiệm
													</Typography>
												</Radio>
											</WrapperRadio>
										</div>

									</WrapperInfo>
									<WrapperInfo>
										<div>
											<Lable>   <Typography className={classes.nameProduct}>Chọn phương thức thanh toán</Typography></Lable>
											<WrapperRadio onChange={handlePayment} value={payment}>
												<Radio value="later_money">
													{" "}
													<Typography className={classes.txtTilte}>Thanh toán tiền mặt khi nhận hàng (COD)</Typography>
												</Radio>
												<Radio value="paypal">  <Typography className={classes.txtTilte}>Thanh toán tiền bằng paypal</Typography></Radio>
												<Radio value="bank">  <Typography className={classes.txtTilte}  >Chuyển khoản qua ngân hàng</Typography></Radio>
											</WrapperRadio>
										</div>
									</WrapperInfo>
									{payment === 'bank' && (
										<Box className={classes.boxTotal}>
											<Typography className={classes.txtTilteBank} sx={{ margin: { xs: "0px" },padding: { xs: "10px" } }}   >Nội dung chuyển khoản: <span style={{ color: '#245c4f',fontWeight: 'bold' }}>Tên và số điện thoại của bạn ^^</span></Typography>
											<Box sx={{ width: { xs: "200px",xl: '290px' },height: 'auto',margin: "0 auto" }} component={'img'} src={Assets.bankOrder} alt="logo" />
										</Box>
									)}
								</Box>


							</Grid>
							<Grid container spacing={2} sx={{ width: "100%",justifyContent: { xs: "center" },marginLeft: { xs: "0px",xl: "-16px",md: "-16px",sm: "-16px" },margin: { xs: "0px",xl: "40px" },paddingLeft: { xs: "0px !important",xl: "0px" } }} item xs={12} sm={12} md={12} lg={4} xl={4} style={{ height: "fit-content" }}>
								<WrapperRight>
									<div style={{ width: "100%" }}>
										<WrapperInfo>
											{/* <div>
                    <span>Địa chỉ: </span>
                    <span style={{ fontWeight: 'bold' }}>{`${user?.address} ${user?.city}`} </span>
                    <span onClick={handleChangeAddress} style={{ color: '#245c4f', cursor: 'pointer' }}>- Thay đổi</span>
                  </div> */}

											<Grid container spacing={2} columns={16} style={{ alignItems: 'baseline' }}>
												<Grid item xs={8}>
													<Typography className={classes.nameInfoUser}>
														<FontAwesomeIcon icon={faLocationDot} style={{ color: "#245c4f" }} />	{user?.name}	     - {user?.phone}
													</Typography>
												</Grid>
												<Grid item xs={8} style={{ textAlign: "right",color: "#245c4f",cursor: "pointer",fontSize: "14px" }}>
													<Typography className={classes.txtValueTotal} onClick={handleChangeAddress} style={{ color: "#245c4f",cursor: "pointer",fontSize: "14px",}}>{" "}Thay đổi</Typography>
												</Grid>
											</Grid>
											<Box >

												<Typography className={classes.txtValueTotal} style={{ color: 'rgb(128, 128, 137)',fontSize: '16px' }}><span className={classes.txtValueTotal} style={{ fontWeight: "bold",color: "#245c4f",fontStyle: "italic",fontSize: "16px" }}>

													Nhà
												</span>{" "}{`${user?.address}, ${user?.ward}, ${user?.city}, ${user?.province}`}{" "}  </Typography>
											</Box>
										</WrapperInfo>
										<WrapperInfo>
											<div style={{ display: 'flex',alignItems: 'center',justifyContent: 'space-between' }}>
												<Typography className={classes.txtValueTotal}>Tạm tính</Typography>
												<Typography style={{ color: '#000',fontSize: '14px',fontWeight: 'bold' }}>{convertPrice(priceMemo)}</Typography>
											</div>
											<div style={{ display: 'flex',alignItems: 'center',justifyContent: 'space-between' }}>
												<Typography className={classes.txtValueTotal}>Giảm giá</Typography>
												<Typography style={{ color: '#000',fontSize: '14px',fontWeight: 'bold' }}>{convertPrice(priceDiscountMemo)}</Typography>
											</div>
											<div style={{ display: 'flex',alignItems: 'center',justifyContent: 'space-between' }}>
												<Typography className={classes.txtValueTotal}>Phí giao hàng</Typography>
												<Typography style={{ color: '#000',fontSize: '14px',fontWeight: 'bold' }}>{convertPrice(diliveryPriceMemo)}</Typography>
											</div>
										</WrapperInfo>
										<WrapperTotal>
											<Typography className={classes.txtValueTotal}>Tổng tiền</Typography>
											<Typography style={{ display: 'flex',flexDirection: 'column' }}>
												<Typography className={classes.txtValueTotal} style={{ color: '#245c4f',fontSize: '24px',fontWeight: 'bold',textAlign: "end" }}>{convertPrice(totalPriceMemo)}</Typography>
												<Typography className={classes.txtValueTotal} style={{ color: '#000',fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</Typography>
												<Typography className={classes.txtValueTotal} style={{ color: '#245c4f',fontSize: '13px',textAlign: "right",cursor: 'pointer' }} onClick={backToOrder}> <FontAwesomeIcon icon={faArrowLeftLong} /> Quay lại giỏ hàng</Typography>
											</Typography>
										</WrapperTotal>
									</div>
									{payment === 'paypal' && sdkReady ? (
										<div style={{ width: '320px' }}>
											<PayPalButton
												amount={Math.round(totalPriceMemo / 30000)}
												// shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
												onSuccess={onSuccessPaypal}
												onError={() => {
													alert('Erroe')
												}}
											/>
										</div>
									) : (
										<>

											<Grid style={{ with: "100%",marginTop: "90px" }} sx={{ display: { xl: "none !important",lg: "none !important",md: "none !important",xs: "flex !important" } }}>
												<MobileCartTotalPriceComponent name={"Đặt hàng"} totalPriceMemo={totalPriceMemo} handleAddOrderProduct={handleAddOrder} classes={classes} />
											</Grid>
											<LoadingButton variant="contained" color="primary"
												onClick={() => handleAddOrder()}
												style={{
													background: '#245c4f',
													height: '48px',
													width: '93%',
													border: 'none',
													borderRadius: '4px',color: '#fff',fontSize: '15px',fontWeight: '700',
													textTransform: "capitalize"
												}}
												sx={{ display: { xl: "flex !important",lg: "flex !important",md: "flex !important",xs: "none !important" } }}
											>Đặt hàng</LoadingButton>
										</>

									)}

								</WrapperRight>
							</Grid>

						</Grid>
					</Box>
					<UpdateUserComponent open={isOpenModalUpdateInfo} handleClose={handleClose} />
				</Loading>
			</div >
		</>

	)
}

export default PaymentPage
