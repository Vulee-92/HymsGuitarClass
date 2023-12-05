/** LIBRARY */
import React,{ useEffect,useState } from "react";
import {
	Avatar,
	Box,
	Breadcrumbs,
	Grid,
	Input,
	InputAdornment,
	MenuItem,
	Select,
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
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import { resetUser } from "../../redux/slides/userSlide";
import { setShippingAddress } from "redux/slides/orderSlide";
const UpdateUserComponentPayment = ({
	updateUserInfo,
}) => {
	const classes = styles();
	const { t } = useTranslation();
	const user = useSelector((state) => state.user);
	const order = useSelector((state) => state.order);
	const shippingAddress = useSelector(state => state.order.shippingAddress);
	const [email,setEmail] = useState("");
	const [name,setName] = useState("");
	const [phone,setPhone] = useState("");
	const [password,setPassword] = useState("");
	const [address,setAddress] = useState("");
	const [avatar,setAvatar] = useState("");
	const [province,setProvince] = useState("");
	const [cityhehe,setCity] = useState("");
	const [ward,setWard] = useState("");
	const [provinces,setProvinces] = useState([]);
	const [citys,setCitys] = useState([]);
	const [wards,setWards] = useState([]);
	const dispatch = useDispatch();
	const BASE_API_URL = 'https://provinces.open-api.vn/api';
	const [loading,setLoading] = useState(false);
	const [errorMsg,setErrorMsg] = useState("");
	const [activePage,setActivePage] = useState('payment'); // Ban đầu, trang là "Giỏ hàng"

	const handleNavigate = (page) => {
		setActivePage(page);
	};

	useEffect(() => {
		setEmail(shippingAddress?.email);
		setName(shippingAddress?.name);
		setPhone(shippingAddress?.phone);
		// setPassword(user?.password);
		setAddress(shippingAddress?.address);
		setAvatar(user?.avatar);
		setProvince(shippingAddress?.province);
		setCity(shippingAddress?.city);
		setWard(shippingAddress?.ward);
	},[shippingAddress]);

	const fetchProvinces = async () => {
		try {
			const response = await axios.get(`${BASE_API_URL}/p`);
			setProvinces(response?.data);
		} catch (error) {
			// console.log(error);
		}
	};

	const fetchDistricts = async (provinceId) => {
		try {
			const response = await axios.get(
				`${BASE_API_URL}/p/${provinceId}/?depth=2`);
			setCitys(response?.data?.districts);
		} catch (error) {
			setCitys([]); // Set districts to an empty array or handle the error in an appropriate way
		}
	};

	const fetchWards = async (districtId) => {
		try {
			const response = await axios.get(
				`${BASE_API_URL}/d/${districtId}/?depth=2`
			);
			setWards(response?.data?.wards);
		} catch (error) {
			// console.log(error);
		}
	};

	const [form,setForm] = useState({
		name: {
			value: shippingAddress?.name,
			isFocus: false,
			msg: "",
			error: false,
			name: ""
		},
		email: {
			value: shippingAddress?.email || user?.email,
			isFocus: false,
			msg: "",
			error: false,
			name: shippingAddress?.email,
		},

		phone: {
			value: shippingAddress?.phone,
			isFocus: false,
			msg: "",
			error: false,
			name: shippingAddress?.phone,
			isShow: false,
		},
		province: {
			value: shippingAddress?.province,
			isFocus: false,
			msg: "",
			error: false,
			name: shippingAddress?.province,
			isShow: false,
		},
		city: {
			value: shippingAddress?.city,
			isFocus: false,
			msg: "",
			error: false,
			name: shippingAddress?.city,
			isShow: false,
		},
		ward: {
			value: shippingAddress?.ward,
			isFocus: false,
			msg: "",
			error: false,
			name: shippingAddress?.ward,
			isShow: false,
		},
		address: {
			value: shippingAddress?.address,
			isFocus: false,
			msg: "",
			error: false,
			name: shippingAddress?.address,
			isShow: false,
		},
	});
	// Hàm tính phí vận chuyển
	const calculateShippingFee = (address,products) => {
		const freeShippingCities = ['Thành phố Tam Kỳ'];
		const shippingFeePerAccessory = 50000;
		const shippingFeePerAccessoryBulk = 30000;
		const shippingFeePerGuitar = 150000;
		const shippingFeePerTwoGuitars = 200000;

		const isFreeShipping = freeShippingCities.includes(address);
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
			if (address !== 'Thành phố Tam Kỳ') {
				if (totalGuitarQuantity === 1) {
					totalShippingFee += shippingFeePerGuitar;
				} else if (totalGuitarQuantity === 2) {
					totalShippingFee += shippingFeePerTwoGuitars;
				}
				return totalShippingFee;
			}
		}

		if (totalAccessoryQuantity > 0) {
			if (address === 'Thành phố Tam Kỳ') {
				// Miễn phí vận chuyển cho phụ kiện nếu mua tại Thành phố Thành phố Tam Kỳ
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
			if (address === 'Thành phố Tam Kỳ') {
				// Miễn phí vận chuyển cho đàn guitar nếu mua tại Thành phố Thành phố Tam Kỳ
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
		const shippingFee = calculateShippingFee(form.city.name,order?.orderItemsSlected); // Thay products bằng danh sách sản phẩm trong giỏ hàng
		const shippingInfo = {
			name: form.name.value,
			email: form.email.value || user?.email,
			city: form.city.name,
			ward: form.ward.name,
			province: form.province.name,
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
		if (field === 'province') {
			const selectedProvince = provinces.find(province => province.code === value);
			if (selectedProvince) {
				name = selectedProvince.name;
			}
			setProvince(name);
			setForm({
				...form,
				[field]: {
					...form[field],
					value: value,
					name: name,
				},
			});
			if (value) {
				// Gọi API để lấy danh sách thành phố dựa trên mã code của tỉnh
				fetchDistricts(value)
			}
		} else if (field === 'city') {
			const selectedCity = citys.find(city => city.code === value);
			if (selectedCity) {
				name = selectedCity.name;
			}
			setCity(name);
			setForm({
				...form,
				[field]: {
					...form[field],
					value: value,
					name: name,
				},
			});
			if (value) {
				// Gọi API để lấy danh sách phường xã dựa trên mã code của thành phố
				fetchWards(value)
			}
		} else if (field === "ward") {
			const selectedWard = wards.find(ward => ward.code === value);
			if (selectedWard) {
				name = selectedWard.name;
			}
			setWard(name);
			// Lưu giá trị của phường/xã đã chọn vào state
			setForm({
				...form,
				[field]: {
					...form[field],
					value: value,
					name: name,
				},
			});

		}
		else if (field === "phone") {
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
			// Kiểm tra xem người dùng đã thay đổi giá trị của trường nào hay chưa
			// Gọi hàm updateUserInfo để truyền thông tin người dùng qua props
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
		if (form.city.value === "") {
			isError = true;
			form.city.error = true;
			form.city.msg = "txt_error_access_code_empty";
		}
		if (form.ward.value === "") {
			isError = true;
			form.ward.error = true;
			form.ward.msg = "txt_error_access_code_empty";
		}
		if (form.province.value === "") {
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
		// handleUpdate();
	};
	/** LIFE CYCLE */


	useEffect(() => {
		fetchProvinces();
	},[]);

	/** RENDER */
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
								<Input
									className={classes.conInput}
									fullWidth
									placeholder={t("email")}
									value={form?.email?.value}
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
								<Grid item xs={6} sm={6} lg={6} xl={6}>
									<Box className={classes.conItemInput}>
										{/* <Typography className={classes.txtTitleInput}>
											{t("name")}
										</Typography> */}
										<Input
											// style={{
											// 	border:
											// 		!form.name.isFocus &&
											// 		`2px solid ${form.name.error
											// 			? Colors.secondary
											// 			: form.name.value.trim() !== ""
											// 				? Colors.success
											// 				: "transparent"
											// 		}`,
											// }}
											className={classes.conInput}
											fullWidth
											placeholder={t("name")}
											value={form?.name?.value || user.name}
											startAdornment={
												<InputAdornment position="start">
													<FontAwesomeIcon
														fontSize={20}
														// color={
														// 	form.name.isFocus || form.name.value.trim() !== ""
														// 		? Colors.bgLogin
														// 		: Colors.bgLogin
														// }
														className={classes.conIconInput}
													/>
												</InputAdornment>
											}
											onChange={(event) => onChangeInput(event,"name")}
											disabled={loading}
											onFocus={() => onBlurFocusInput(true,"name")}
											onBlur={() => onBlurFocusInput(false,"name")}
										/>
									</Box>

									<Box className={classes.conItemInput}>
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
														// color={
														// 	form.phone.isFocus || form.phone.value !== ""
														// 		? Colors.bgLogin
														// 		: Colors.bgLogin
														// }
														className={classes.conIconInput}
													/>
												</InputAdornment>
											}
											onChange={(event) => onChangeInput(event,"phone")}
											disabled={loading}
											onFocus={() => onBlurFocusInput(true,"phone")}
											onBlur={() => onBlurFocusInput(false,"phone")}
										/>
									</Box>


								</Grid>
							</Grid>
							<Grid container spacing={2}>

								<Grid item xs={12} sm={12} lg={12} xl={12}>

									<Box className={classes.conItemInput}>
										{/* <Typography className={classes.txtTitleInput}>
											{t("province")}
										</Typography> */}
										<Select
											// style={{
											// 	border: !form.province.isFocus && `2px solid ${form.province.error ? Colors.secondary : form.province.value !== "" ? Colors.success : "transparent"}`,
											// }}
											value={shippingAddress?.province || form.province.value}
											// Đây là giá trị được chọn
											fullWidth
											displayEmpty
											onChange={(event) => onChangeInput(event,"province")}
											disabled={loading}
											className={classes.conInput}
											onFocus={() => onBlurFocusInput(true,"province")}
											onBlur={() => onBlurFocusInput(false,"province")}
											MenuProps={{ PaperProps: { style: { maxHeight: 400,width: 250 } } }} // Điều chỉnh kích thước của Menu
											startAdornment={
												<InputAdornment position="start">
													<FontAwesomeIcon
														fontSize={20}
														// color={
														// 	form.province.isFocus || (form.province.value && form.province.value !== "")
														// 		? Colors.bgLogin
														// 		: Colors.placeHolder
														// }
														className={classes.conIconInput}
													/>
												</InputAdornment>
											}
										>
											<MenuItem value={shippingAddress?.province || ""}>
												{shippingAddress?.province || "Tỉnh"}
											</MenuItem>
											{provinces.map((province) => (
												<MenuItem
													className={classes.conInput}
													value={province.code}
													data-key={province.name}
													key={province.code}
													name={province.name}
												>
													{province.name}
												</MenuItem>
											))}
										</Select>
									</Box>
									<Box className={classes.conItemInput}>
										{/* <Typography className={classes.txtTitleInput}>
											{t("city")}
										</Typography> */}
										<Select
											// style={{
											// 	border: !form.city.isFocus && `2px solid ${form.city.error ? Colors.secondary : form.city.value !== "" ? Colors.success : "transparent"}`,
											// }}
											value={form.city.value || ""} // Đây là giá trị được chọn
											fullWidth
											onChange={(event) => onChangeInput(event,"city")}
											disabled={loading}
											displayEmpty
											className={classes.conInput}
											onFocus={() => onBlurFocusInput(true,"city")}
											onBlur={() => onBlurFocusInput(false,"city")}
											inputProps={{ style: { border: 'none' } }}
											startAdornment={
												<InputAdornment position="start">
													<FontAwesomeIcon
														fontSize={20}
														// color={
														// 	form.city.isFocus || (form.city.value && form.city.value !== "")
														// 		? Colors.bgLogin
														// 		: Colors.placeHolder
														// }
														className={classes.conIconInput}
													/>
												</InputAdornment>
											}
										>
											<MenuItem value={shippingAddress?.city || ""}>
												{shippingAddress?.city || "Thành phố"}
											</MenuItem>
											{citys?.map((city) => (
												<MenuItem
													className={classes.conInput}
													value={city.code} // Đây là giá trị cần chuyển đi khi MenuItem được chọn
													key={city.code}
													data-key={city.code}
													name={city.name}
												// onClick={(e) => getNameCity(e,city?.code)}
												>
													{city.name}
												</MenuItem>
											))}
										</Select>
									</Box>
									<Box className={classes.conItemInput}>
										<Select
											// style={{
											// 	border: !form.ward.isFocus && `2px solid ${form.ward.error ? Colors.secondary : form.ward.value !== "" ? Colors.success : "transparent"}`,
											// }}
											value={shippingAddress?.ward || form.province.value}
											fullWidth
											onChange={(event) => onChangeInput(event,"ward")}
											disabled={loading}
											displayEmpty
											className={classes.conInput}
											onFocus={() => onBlurFocusInput(true,"ward")}
											onBlur={() => onBlurFocusInput(false,"ward")}
											MenuProps={{ PaperProps: { style: { maxHeight: 200,width: 250 } } }} // Điều chỉnh kích thước của Menu
											startAdornment={
												<InputAdornment position="start">
													<FontAwesomeIcon
														fontSize={20}
														// color={
														// 	form.ward.isFocus || (form.ward.value && form.ward.value !== "")
														// 		? Colors.bgLogin
														// 		: Colors.placeHolder
														// }
														className={classes.conIconInput}
													/>
												</InputAdornment>
											}
										>
											<MenuItem value={shippingAddress?.ward || ""}>
												{shippingAddress?.ward || "Phường/Xã"}
											</MenuItem>
											{wards?.map((ward) => (
												<MenuItem
													className={classes.conInput}
													value={ward.code}
													data-key={ward.name}// Đây là giá trị cần chuyển đi khi MenuItem được chọn
													key={ward.code}
													name={ward.name}
												// onClick={(e) => getNameWard(e,ward?.code)}

												>
													{ward.name}
												</MenuItem>
											))}
										</Select>
									</Box>
									<Box className={classes.conItemInput}>
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
