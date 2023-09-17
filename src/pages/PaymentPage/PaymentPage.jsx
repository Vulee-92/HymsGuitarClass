import { Form,Radio } from 'antd'
import React,{ useEffect,useState } from 'react'
import { Lable,WrapperInfo,WrapperLeft,WrapperRadio,WrapperRight,WrapperTotal } from './style';

import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch,useSelector } from 'react-redux';
import { convertPrice } from '../../utils';
import { useMemo } from 'react';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
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
import { Box,Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Grid,Paper,Slide,Typography } from "@mui/material";
import styles from "./stylemui";
import MobileCartTotalPriceComponent from '../../components/MobileCartTotalPriceComponent/MobileCartTotalPriceComponent';
import { styled } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';


const Item = styled(Paper)(({ theme }) => ({
	textAlign: 'center',
}));
const PaymentPage = () => {
	const order = useSelector((state) => state.order)
	const user = useSelector((state) => state.user)

	const [delivery,setDelivery] = useState('fast')
	const [payment,setPayment] = useState('later_money','bank')
	const navigate = useNavigate()
	const [sdkReady,setSdkReady] = useState(false)
	const classes = styles();
	const [isOpenModalUpdateInfo,setIsOpenModalUpdateInfo] = useState(false)
	const [stateUserDetails,setStateUserDetails] = useState({
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
		(data) => {
			const { id,
				token,
				...rests } = data
			const res = UserService.updateUser(
				id,
				{ ...rests },token)
			return res
		},
	)


	console.log('mutationAddOrder',mutationAddOrder)

	const { isLoading,data } = mutationUpdate
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


	const handleUpdateInforUser = () => {
		const { name,address,city,phone } = stateUserDetails
		if (name && address && city && phone) {
			mutationUpdate.mutate({ id: user?.id,token: user?.access_token,...stateUserDetails },{
				onSuccess: () => {
					dispatch(updateUser({ name,address,city,phone }))
					setIsOpenModalUpdateInfo(false)
				}
			})
		}
	}

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

	return (

		<>


			<div style={{ with: "100%",marginTop: '100px' }}>
				<Loading isLoading={isLoadingAddOrder}>
					<Box sx={{ width: { xl: "1270px",xs: "100%" },margin: "0 auto" }}>
						<Typography className={classes.txtOrder}>Phí giao hàng</Typography>
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
													<Typography onClick={handleChangeAddress} style={{ color: "#245c4f",cursor: "pointer",fontSize: "14px",}}>{" "}Thay đổi</Typography>
												</Grid>
											</Grid>
											<Box >

												<Typography style={{ color: 'rgb(128, 128, 137)',fontSize: '13px' }}>      <span style={{ fontWeight: "bold",color: "#245c4f",fontStyle: "italic",fontSize: "12px" }}>

													Nhà
												</span>   {" "}{`${user?.address} ${user?.city}`}{" "} </Typography>
											</Box>
										</WrapperInfo>
										<WrapperInfo>
											<div style={{ display: 'flex',alignItems: 'center',justifyContent: 'space-between' }}>
												<span>Tạm tính</span>
												<span style={{ color: '#000',fontSize: '14px',fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
											</div>
											<div style={{ display: 'flex',alignItems: 'center',justifyContent: 'space-between' }}>
												<span>Giảm giá</span>
												<span style={{ color: '#000',fontSize: '14px',fontWeight: 'bold' }}>{convertPrice(priceDiscountMemo)}</span>
											</div>
											<div style={{ display: 'flex',alignItems: 'center',justifyContent: 'space-between' }}>
												<span>Phí giao hàng</span>
												<span style={{ color: '#000',fontSize: '14px',fontWeight: 'bold' }}>{convertPrice(diliveryPriceMemo)}</span>
											</div>
										</WrapperInfo>
										<WrapperTotal>
											<span>Tổng tiền</span>
											<span style={{ display: 'flex',flexDirection: 'column' }}>
												<span style={{ color: '#245c4f',fontSize: '24px',fontWeight: 'bold',textAlign: "end" }}>{convertPrice(totalPriceMemo)}</span>
												<span style={{ color: '#000',fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
											</span>
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
										<div style={{ with: "100%",marginTop: "90px" }}>
											<MobileCartTotalPriceComponent name={"Đặt hàng"} totalPriceMemo={totalPriceMemo} handleAddOrderProduct={handleAddOrder} classes={classes} />
										</div>
										// <ButtonComponent
										// 	onClick={() => handleAddOrder()}
										// 	size={40}
										// 	styleButton={{
										// 		background: '#245c4f',
										// 		height: '48px',
										// 		width: '320px',
										// 		border: 'none',
										// 		borderRadius: '4px'
										// 	}}
										// 	textbutton={'Đặt hàng'}
										// 	styleTextButton={{ color: '#fff',fontSize: '15px',fontWeight: '700' }}
										// ></ButtonComponent>
									)}

								</WrapperRight>
							</Grid>

						</Grid>
					</Box>
					<ModalComponent title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancleUpdate} onOk={handleUpdateInforUser}>
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
									rules={[{ required: true,message: 'Please input your name!' }]}
								>
									<InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
								</Form.Item>
								<Form.Item
									label="City"
									name="city"
									rules={[{ required: true,message: 'Please input your city!' }]}
								>
									<InputComponent value={stateUserDetails['city']} onChange={handleOnchangeDetails} name="city" />
								</Form.Item>
								<Form.Item
									label="Phone"
									name="phone"
									rules={[{ required: true,message: 'Please input your  phone!' }]}
								>
									<InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
								</Form.Item>

								<Form.Item
									label="Adress"
									name="address"
									rules={[{ required: true,message: 'Please input your  address!' }]}
								>
									<InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
								</Form.Item>
							</Form>
						</Loading>
					</ModalComponent>
				</Loading>
			</div >
		</>

	)
}

export default PaymentPage
