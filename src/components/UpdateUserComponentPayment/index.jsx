/** LIBRARY */
import React,{ useEffect,useState } from "react";
import {
	Avatar,
	Box,
	Breadcrumbs,
	FormControl,
	Grid,
	Input,
	InputAdornment,
	InputLabel,

	Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/** COMMON */
// import { useDispatch, useSelector } from 'react-redux'
import * as UserService from "../../services/UserService";
/** STYLES */
import styles from "./style";
import { useDispatch,useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { Link,useNavigate } from "react-router-dom";
import { resetUser } from "../../redux/slides/userSlide";
import { setShippingAddress } from "redux/slides/orderSlide";
import { Colors } from "utils/colors";
const UpdateUserComponentPayment = ({
	updateUserInfo,
}) => {
	const classes = styles();
	const { t } = useTranslation();
	const user = useSelector((state) => state.user);
	const order = useSelector((state) => state.order);
	const shippingAddress = useSelector(state => state.order.shippingAddress);


	const dispatch = useDispatch();
	const [loading,setLoading] = useState(false);
	const [errorMsg,setErrorMsg] = useState("");
	const [activePage,setActivePage] = useState('payment'); // Ban đầu, trang là "Giỏ hàng"



	// useEffect(() => {
	// 	setEmail(shippingAddress?.email);
	// 	setName(shippingAddress?.name);
	// 	setPhone(shippingAddress?.phone);
	// 	// setPassword(user?.password);
	// 	setAddress(shippingAddress?.address);
	// 	setAvatar(user?.avatar);
	// 	setProvince(shippingAddress?.province);
	// 	setSelectedProvinceCode(shippingAddress?.province);
	// 	setCity(shippingAddress?.city);
	// 	setWard(shippingAddress?.ward);
	// },[shippingAddress]);




	const [form,setForm] = useState({
		name: {
			value: shippingAddress?.name || user?.name || "",
			isFocus: false,
			msg: "",
			error: false,
			name: ""
		},
		email: {
			value: shippingAddress?.email || user?.email || "",
			isFocus: false,
			msg: "",
			error: false,
			name: shippingAddress?.email || user?.email || "",
		},
		phone: {
			value: shippingAddress?.phone || user?.phone || "",
			isFocus: false,
			msg: "",
			error: false,
			name: shippingAddress?.phone || user?.phone || "",
			isShow: false,
		},
		province: {
			value: shippingAddress?.province || user?.province || "",
			isFocus: false,
			msg: "",
			error: false,
			name: shippingAddress?.province || user?.province || "",
			isShow: false,
		},
		city: {
			value: shippingAddress?.city || user?.city || "",
			isFocus: false,
			msg: "",
			error: false,
			name: shippingAddress?.city || user?.city || "",
			isShow: false,
		},
		ward: {
			value: shippingAddress?.ward || user?.ward || "",
			isFocus: false,
			msg: "",
			error: false,
			name: shippingAddress?.ward || user?.ward || "",
			isShow: false,
		},
		address: {
			value: shippingAddress?.address || user?.address || "",
			isFocus: false,
			msg: "",
			error: false,
			name: shippingAddress?.address || user?.address || "",
			isShow: false,
		},
	});
	// Hàm tính phí vận chuyển
	const calculateShippingFee = (address,products) => {
		const lowerCase = address.toLowerCase();
		const freeShippingCities = ['tam kỳ','tam kỳ','Tam kỳ','Thành phố Tam Kỳ'];
		const shippingFeePerAccessory = 50000;
		const shippingFeePerAccessoryBulk = 30000;
		const shippingFeePerGuitar = 150000;
		const shippingFeePerTwoGuitars = 200000;
		const addressLower = address.toLowerCase();


		const isFreeShipping = freeShippingCities.includes(addressLower);
		let totalGuitarQuantity = 0;
		let totalAccessoryQuantity = 0;
		let totalShippingFee = 0;

		if (isFreeShipping) {
			return totalShippingFee;
		}

		for (const product of products) {
			if (product.type === 'Acoustic Guitars') {
				totalGuitarQuantity += product.amount;
			} else if (product.type === 'Phụ kiện' || 'Tuner - máy lên dây' || 'Acoustic Guitar Strings') {
				totalAccessoryQuantity += product.amount;
			}
		}

		if (totalGuitarQuantity > 0 && totalAccessoryQuantity > 0) {
			// Tính phí vận chuyển cho đàn guitar theo quy định, phụ kiện miễn phí
			if (lowerCase !== 'tam kỳ' || lowerCase !== 'thành phố tam kỳ') {
				if (totalGuitarQuantity === 1) {
					totalShippingFee += shippingFeePerGuitar;
				} else if (totalGuitarQuantity === 2) {
					totalShippingFee += shippingFeePerTwoGuitars;
				}
				return totalShippingFee;
			}
		}

		if (totalAccessoryQuantity > 0) {
			if (lowerCase === 'tam kỳ' || lowerCase == 'thành phố tam kỳ') {
				// Miễn phí vận chuyển cho phụ kiện nếu mua tại Thành phố Thành phố tam kỳ
				return totalShippingFee;
			} else {
				if (totalAccessoryQuantity >= 15) {
					totalShippingFee += shippingFeePerAccessoryBulk;
				} else {
					totalShippingFee += shippingFeePerAccessory * totalAccessoryQuantity;
				}
			}
		}

		if (totalGuitarQuantity > 0) {
			if (lowerCase === 'tam kỳ' || lowerCase == 'thành phố tam kỳ') {
				// Miễn phí vận chuyển cho đàn guitar nếu mua tại Thành phố Thành phố tam kỳ
				return totalShippingFee;
			} else {
				if (totalGuitarQuantity === 1) {
					totalShippingFee += shippingFeePerGuitar;
				} else if (totalGuitarQuantity === 2) {
					totalShippingFee += shippingFeePerTwoGuitars;
				}
			}
		}

		return totalShippingFee;
	};


	useEffect(() => {
		const shippingFee = calculateShippingFee(form.city.value,order?.orderItemsSlected);
		// Thay products bằng danh sách sản phẩm trong giỏ hàng
		const shippingInfo = {
			name: form.name.value,
			email: form.email.value || user?.email,
			city: form.city.value,
			ward: form.ward.value,
			province: form.province.value,
			address: form.address.value,
			phone: form.phone.value,
			shippingFee: shippingFee // Thêm phí vận chuyển vào thông tin vận chuyển
		};

		dispatch(setShippingAddress(shippingInfo));
	},[form]);
	const formatPhoneNumber = (phoneNumber) => {
		const numericPhoneNumber = phoneNumber.replace(/\D/g,''); // Loại bỏ các ký tự không phải số
		if (numericPhoneNumber.length >= 10) {
			const part1 = numericPhoneNumber.substring(0,4);
			const part2 = numericPhoneNumber.substring(4,6);
			const part3 = numericPhoneNumber.substring(6,8);
			const part4 = numericPhoneNumber.substring(8);
			return `(${part1}) ${part2} ${part3} ${part4}`;
		} else {
			return numericPhoneNumber;
		}
	};



	const onChangeInput = (event,field) => {
		let value = event.target.value;
		let name = '';
		if (field === "phone") {
			// Định dạng số điện thoại
			setForm({
				...form,
				[field]: {
					...form[field],
					value: formatPhoneNumber(value),
					name: name,
				},
			});
		}
		else {
			setForm({
				...form,
				[field]: {
					...form[field],
					value: value,
				},
			});
			// onValidate()
			updateUserInfo(form);

		}
	};
	const onBlurFocusInput = (value,field) => {
		setForm({
			...form,
			[field]: {
				...form[field],
				isFocus: value,
			},
		});
	};

	const navigate = useNavigate()
	const handleNavigateSignUp = () => {
		navigate('/login')
	}
	const handleNavigateLogout = () => {
		UserService.logoutUser();
		dispatch(resetUser());
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('access_token');
		document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	}
	const onValidate = () => {
		setErrorMsg("");
		setForm({
			...form,
			name: {
				...form.name,
				error: false,
			},
			email: {
				...form.email,
				error: false,
			},
			phone: {
				...form.phone,
				error: false,
			},
			province: {
				...form.province,
				error: false,
			},
			city: {
				...form.city,
				error: false,
			},
			ward: {
				...form.ward,
				error: false,
			},
			address: {
				...form.address,
				error: false,
			},
		});

		let isError = false,
			newForm = { ...form };

		if (form.name.value.trim() === "") {
			isError = true;
			form.name.error = true;
			form.name.msg = t("txt_error_name_empty");
		}
		if (form.email.value.trim() === "") {
			isError = true;
			form.email.error = true;
			form.email.msg = t("txt_error_name_empty");
		}
		if (form.city.value.trim() === "") {
			isError = true;
			form.city.error = true;
			form.city.msg = "txt_error_access_code_empty";
		}
		if (form.ward.value.trim() === "") {
			isError = true;
			form.ward.error = true;
			form.ward.msg = "txt_error_access_code_empty";
		}
		if (form.province.value.trim() === "") {
			isError = true;
			form.province.error = true;
			form.province.msg = "txt_error_access_code_empty";
		}
		if (form.address.value.trim() === "") {
			isError = true;
			form.address.error = true;
			form.address.msg = "txt_error_access_code_empty";
		}
		if (form.phone.value === "") {
			isError = true;
			form.phone.error = true;
			form.phone.msg = "txt_error_access_code_empty";
		}
		if (isError) {
			return setForm(newForm);
		}

	};

	return (


		<Loading isLoading={loading}>

			<Grid className={classes.conContent}>
				<Grid item xs={12} sm={6} lg={4} xl={12} className={classes.conCard}>

					<Grid item sm={12} md={12} lg={12} xl={12} sx={{ display: { xs: "flex",xl: "flex",lg: "flex",md: "none",sm: "none" },paddingTop: "10px !important",paddingBottom: "10px" }}>
						<Grid item xs={12}>
							<Breadcrumbs aria-label='breadcrumb' separator='›' sx={{ fontSize: "11px" }}>
								<Link to="/order">
									<Typography
										className={classes.txtValueTotal}
										style={{ fontSize: "1rem",fontWeight: 'normal',color: 'rgb(128, 128, 137)' }}
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
										style={{ fontSize: "1rem",marginBottom: "0px",fontWeight: activePage === 'payment' ? 'bold' : 'normal',color: '#333333' }}
										underline='hover'
										onClick={() => setActivePage('payment')}
									>
										Thông tin tài khoản
									</Typography>
								</Link>
								<Typography
									className={classes.txtValueTotal}
									style={{ fontSize: "1rem",marginBottom: "0px",color: 'rgb(128, 128, 137)' }}
								>
									Tiến hành đặt hàng
								</Typography>
							</Breadcrumbs>
						</Grid>
					</Grid>
					<Typography className={classes.txtHeaderTitle}>Thông tin liên hệ</Typography>
					{user?.access_token ? (
						<>
							<Grid container spacing={2} py={2}>
								<Grid item xs={2}>
									<Avatar src={user.avatar} alt={user.name} className={classes.avatar} />
								</Grid>
								<Grid item xs={9}>
									<Typography variant="h6" className={classes.txtInfoUser}>
										{user.name}
										{" "}
										({user.email})

									</Typography>
									<Typography onClick={handleNavigateLogout} className={classes.txtRegister}> <span className={classes.txtBtnRegister}>Đăng xuất </span></Typography>

								</Grid>
							</Grid>
						</>


					) : (
						<>
							<Box className={classes.conItemInput}>
								{/* <InputLabel className={classes.txtTitleInput} id="demo-simple-select-label">Email</InputLabel> */}
								<Input
									className={classes.conInput}
									fullWidth
									placeholder={t("email")}
									value={form?.email?.value}
									startAdornment={
										<InputAdornment position="start">
											<FontAwesomeIcon
												fontSize={20}
												color={
													form.email.isFocus || form.email.value.trim() !== ""
														? Colors.bgLogin
														: Colors.bgLogin
												}
												className={classes.conIconInput}
											/>
										</InputAdornment>
									}
									onChange={(event) => onChangeInput(event,"email")}
									disabled={loading}
									onFocus={() => onBlurFocusInput(true,"email")}
									onBlur={() => onBlurFocusInput(false,"email")}
								/>
							</Box>
							<Typography onClick={handleNavigateSignUp} className={classes.txtRegister}>{t('txt_alrealy_account')}  <span className={classes.txtBtnRegister}>{t('sign_in')}</span></Typography>
						</>
					)}

					<Box className={classes.conLogin}>
						<Typography className={classes.txtHeaderTitle}>Địa chỉ giao hàng</Typography>
						<Box className={classes.conForm}>
							<Grid container>
								<Grid item xs={12} sm={6} lg={6} xl={6} sx={{ paddingRight: "10px" }}>
									<Box className={classes.conItemInput}>
										<FormControl fullWidth>
											<InputLabel className={classes.txtTitleInput} sx={{ fontSize: { xl: "10px",xs: "10px" } }}>Họ tên</InputLabel>
											{/* <Typography className={classes.txtTitleInput}>
											{t("name")}
										</Typography> */}
											<Input
												style={{
													border:
														!form.name.isFocus &&
														`2px solid ${form.name.error
															? Colors.secondary
															: form.name.value.trim() !== ""
																? Colors.success
																: "transparent"
														}`,
												}}
												className={classes.conInput}
												fullWidth
												placeholder={t("name")}
												value={form?.name?.value || user.name}
												startAdornment={
													<InputAdornment position="start">
														<FontAwesomeIcon
															fontSize={20}
															color={
																form.name.isFocus || form.name.value.trim() !== ""
																	? Colors.bgLogin
																	: Colors.bgLogin
															}
															className={classes.conIconInput}
														/>
													</InputAdornment>
												}
												onChange={(event) => onChangeInput(event,"name")}
												disabled={loading}
												onFocus={() => onBlurFocusInput(true,"name")}
												onBlur={() => onBlurFocusInput(false,"name")}
											/>
										</FormControl>
									</Box>
								</Grid>
								<Grid item xs={12} sm={6} lg={6} xl={6} >
									<Box className={classes.conItemInput}>
										<FormControl fullWidth>
											<InputLabel className={classes.txtTitleInput} sx={{ fontSize: { xl: "10px",xs: "10px" } }}>Số điện thoại</InputLabel>
											<Input
												className={classes.conInput}
												fullWidth
												placeholder={t("phone")}
												value={form.phone.value}
												startAdornment={
													<InputAdornment position="start">
														<FontAwesomeIcon
															// icon={faphoneCard}
															fontSize={20}
															color={
																form.phone.isFocus || form.phone.value !== ""
																	? Colors.bgLogin
																	: Colors.bgLogin
															}
															className={classes.conIconInput}
														/>
													</InputAdornment>
												}
												onChange={(event) => onChangeInput(event,"phone")}
												disabled={loading}
												onFocus={() => onBlurFocusInput(true,"phone")}
												onBlur={() => onBlurFocusInput(false,"phone")}
											/>
										</FormControl>
									</Box>

								</Grid>
							</Grid>
							<Grid container spacing={2}>

								<Grid item xs={12} sm={12} lg={12} xl={12}>
									<Box className={classes.conItemInput}>
										<InputLabel className={classes.txtTitleInput} variant="standard" htmlFor="uncontrolled-native">Tỉnh/Thành phố</InputLabel>

										<Input
											className={classes.conInput}
											fullWidth
											placeholder={t("Tỉnh/Thành phố")}
											value={form?.province?.value}
											startAdornment={
												<InputAdornment position="start">
													<FontAwesomeIcon
														fontSize={20}
														// color={
														// 	form.email.isFocus || form.email.value.trim() !== ""
														// 		? Colors.bgLogin
														// 		: Colors.bgLogin
														// }
														className={classes.conIconInput}
													/>
												</InputAdornment>
											}
											onChange={(event) => onChangeInput(event,"province")}
											disabled={loading}
											onFocus={() => onBlurFocusInput(true,"province")}
											onBlur={() => onBlurFocusInput(false,"province")}
										/>
									</Box>
									<Box className={classes.conItemInput}>
										<InputLabel className={classes.txtTitleInput} id="demo-simple-select-label">Thành phố/Quận/Huyện</InputLabel>

										<Input
											className={classes.conInput}
											fullWidth
											placeholder={t("Thành phố/Quận/Huyện")}
											value={form?.city?.value}
											startAdornment={
												<InputAdornment position="start">
													<FontAwesomeIcon
														fontSize={20}
														// color={
														// 	form.email.isFocus || form.email.value.trim() !== ""
														// 		? Colors.bgLogin
														// 		: Colors.bgLogin
														// }
														className={classes.conIconInput}
													/>
												</InputAdornment>
											}
											onChange={(event) => onChangeInput(event,"city")}
											disabled={loading}
											onFocus={() => onBlurFocusInput(true,"city")}
											onBlur={() => onBlurFocusInput(false,"city")}
										/>
									</Box>

									<Box className={classes.conItemInput}>
										<InputLabel className={classes.txtTitleInput} id="demo-simple-select-label">Phường/Thị trấn/Xã</InputLabel>


										<Input
											className={classes.conInput}
											fullWidth
											placeholder={t("Thành phố/Quận/Huyện")}
											value={form?.ward.value}
											startAdornment={
												<InputAdornment position="start">
													<FontAwesomeIcon
														fontSize={20}
														// color={
														// 	form.email.isFocus || form.email.value.trim() !== ""
														// 		? Colors.bgLogin
														// 		: Colors.bgLogin
														// }
														className={classes.conIconInput}
													/>
												</InputAdornment>
											}
											onChange={(event) => onChangeInput(event,"ward")}
											disabled={loading}
											onFocus={() => onBlurFocusInput(true,"ward")}
											onBlur={() => onBlurFocusInput(false,"ward")}
										/>
									</Box>

									<Box className={classes.conItemInput}>
										<FormControl fullWidth>
											<InputLabel className={classes.txtTitleInput} id="demo-simple-select-label">Số nhà - đường</InputLabel>
											<Input
												className={classes.conInput}
												fullWidth
												placeholder={t("address")}
												value={form.address.value}
												startAdornment={
													<InputAdornment position="start">
														<FontAwesomeIcon
															fontSize={20}
															// color={
															// 	form.address.isFocus || form.address.value.trim() !== ""
															// 		? Colors.bgLogin
															// 		: Colors.bgLogin
															// }
															className={classes.conIconInput}
														/>
													</InputAdornment>
												}
												onChange={(event) => onChangeInput(event,"address")}
												disabled={loading}
												onFocus={() => onBlurFocusInput(true,"address")}
												onBlur={() => onBlurFocusInput(false,"address")}
											/>
										</FormControl>
									</Box>
								</Grid>

								<Grid item xs={12} sm={12} lg={12} xl={12}>
									<Box className={classes.conMsg}>
										<Typography className={classes.txtError}>
											{t(errorMsg)}
										</Typography>
									</Box>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Loading>
	);
};

export default UpdateUserComponentPayment;
