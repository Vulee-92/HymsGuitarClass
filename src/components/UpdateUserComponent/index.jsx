/** LIBRARY */
import React,{ useEffect,useState } from "react";
import {
	Box,
	Grid,
	Input,
	InputAdornment,
	MenuItem,
	Modal,
	NativeSelect,
	Select,
	Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEye,
	faEyeSlash,
	faAddressCard,
	faLock,
	faLocationPin,
	faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
/** COMMON */
// import { useDispatch, useSelector } from 'react-redux'
import * as UserService from "../../services/UserService";
import * as message from "../../components/Message/Message";

import CStyles from "../../utils/common/index";
/** STYLES */
import styles from "./style";
// import { faPen } from '@fortawesome/free-light-svg-icons';
import { Colors } from "../../utils/colors";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useDispatch,useSelector } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";
import Loading from "../../components/LoadingComponent/Loading";
import CButton from "../../components/CButton";
import AnimationComponent from "components/AnimationComponent/AnimationComponent";
import axios from "axios";

const UpdateUserComponent = ({ open,
	handleClose }) => {
	const classes = styles();
	const { t } = useTranslation();
	// const dispatch = useDispatch();
	// const user = useSelector((state) => state.user.data);
	const user = useSelector((state) => state.user);
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

	const BASE_API_URL = 'https://provinces.open-api.vn/api';
	// const mutation = useMutationHooks((data) => {
	// 	const { id,access_token,...rests } = data;
	// 	UserService.updateUser(id,rests,access_token);
	// });
	const mutation = useMutationHooks(
		(data) => {
			const { id,access_token,...rests } = data;
			UserService.updateUser(id,rests,access_token);
		}
	)
	const [loading,setLoading] = useState(false);
	const [errorMsg,setErrorMsg] = useState("");

	const dispatch = useDispatch();
	const { data,isLoading,isSuccess,isError } = mutation;


	useEffect(() => {
		// setEmail(user?.email);
		setName(user?.name);
		setPhone(user?.phone);
		// setPassword(user?.password);
		setAddress(user?.address);
		setAvatar(user?.avatar);
		setProvince(user?.province);
		setCity(user?.city);
		setWard(user?.ward);
	},[user]);



	const handleGetDetailsUser = async (id,token) => {
		const res = await UserService.getDetailsUser(id,token);
		dispatch(updateUser({ ...res?.data,access_token: token }));
	};

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
	const handleUpdate = () => {
		mutation.mutate({
			id: user?.id,
			name: form.name.value,
			// email: form.email.value,
			phone: form.phone.value,
			address: form.address.value,
			// password: form.password.value,
			province: form.province.name,
			city: form.city.name,
			ward: form.ward.name,
			access_token: user?.access_token,
		});
		handleClose();
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

	const [form,setForm] = useState({
		name: {
			value: user?.name,
			isFocus: false,
			msg: "",
			error: false,
			name: ""
		},
		// email: {
		// 	value: "",
		// 	isFocus: false,
		// 	msg: "",
		// 	error: false,
		// 	name: "",
		// },
		// password: {
		// 	value: "",
		// 	isFocus: false,
		// 	msg: "",
		// 	error: false,
		// 	name: "",
		// 	isShow: false,
		// },
		phone: {
			value: user?.phone,
			isFocus: false,
			msg: "",
			error: false,
			name: "",
			isShow: false,
		},
		province: {
			value: user?.province,
			isFocus: false,
			msg: "",
			error: false,
			name: "",
			isShow: false,
		},
		city: {
			value: user?.city,
			isFocus: false,
			msg: "",
			error: false,
			name: "",
			isShow: false,
		},
		ward: {
			value: user?.ward,
			isFocus: false,
			msg: "",
			error: false,
			name: "",
			isShow: false,
		},
		address: {
			value: user?.address,
			isFocus: false,
			msg: "",
			error: false,
			name: "",
			isShow: false,
		},
	});


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
			// Kiểm tra người dùng đã chọn tỉnh hay chưa
			if (value) {
				// Gọi API để lấy danh sách thành phố dựa trên mã code của tỉnh
				fetchDistricts(value)
					.then((cities) => {
						// Xử lý danh sách thành phố
						// setCitys(cities);
					})
					.catch((error) => {
						// Xử lý lỗi nếu cần
					});
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
					.then((wards) => {
						// Xử lý danh sách phường xã
						// setWards(wards);
					})
					.catch((error) => {
						// Xử lý lỗi nếu cần
					});
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
		} else {

			setForm({
				...form,
				[field]: {
					...form[field],
					value: value,
				},
			});
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

	const onChangeTypePassword = () => {
		setForm({
			...form,
			password: {
				...form.password,
				isShow: !form.password.isShow,
			},
		});
	};


	const onValidate = () => {
		setErrorMsg("");
		setForm({
			...form,
			name: {
				...form.name,
				error: false,
			},
			// email: {
			// 	...form.email,
			// 	error: false,
			// },
			// password: {
			// 	...form.password,
			// 	error: false,
			// },
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
		// if (form.email.value.trim() === "") {
		// 	isError = true;
		// 	form.email.error = true;
		// 	form.email.msg = t("txt_error_name_empty");
		// }
		// if (form.password.value.trim() === "") {
		// 	isError = true;
		// 	form.password.error = true;
		// 	form.password.msg = "txt_error_access_code_empty";
		// }
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
		handleUpdate();
	};
	/** LIFE CYCLE */
	const handleCancel = () => {
		handleClose(); // Đóng component
	};


	useEffect(() => {
		fetchProvinces();
	},[]);

	/** RENDER */
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			disableAutoFocus={true}
		>

			<Loading isLoading={isLoading || loading}>

				<Grid className={classes.conContent}>
					<Grid item xs={12} sm={6} lg={4} xl={12} className={classes.conCard}>

						<Box className={classes.conLogin}>
							<Typography className={classes.txtHeaderTitle}> Cập nhật thông tin
							</Typography>
							<Box className={classes.conForm}>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6} lg={6} xl={12}>
										<Box className={classes.conItemInput}>
											<Typography className={classes.txtTitleInput}>
												{t("name")}
											</Typography>
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
												value={form?.name?.value}
												startAdornment={
													<InputAdornment position="start">
														<FontAwesomeIcon
															icon={faAddressCard}
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
										</Box>

										{/* <Box className={classes.conItemInput}>
											<Typography className={classes.txtTitleInput}>
												{t("password")}
											</Typography>
											<Input
												style={{
													border:
														!form.password.isFocus &&
														`2px solid ${form.password.error
															? Colors.secondary
															: form.password.value.trim() !== ""
																? Colors.success
																: "transparent"
														}`,
												}}
												className={classes.conInput}
												fullWidth
												placeholder={t("password")}
												value={form.password.value}
												onChange={(event) => onChangeInput(event,"password")}
												startAdornment={
													<InputAdornment position="start">
														<FontAwesomeIcon
															icon={faLock}
															fontSize={20}
															color={
																form.password.isFocus ||
																	form.password.value.trim() !== ""
																	? Colors.bgLogin
																	: Colors.placeHolder
															}
															className={classes.conIconInput}
														/>
													</InputAdornment>
												}
												endAdornment={
													<InputAdornment position="end">
														<FontAwesomeIcon
															icon={form.password.isShow ? faEye : faEyeSlash}
															fontSize={20}
															color={Colors.bgLogin}
															className={classes.conIconInputRight}
															onClick={onChangeTypePassword}
														/>
													</InputAdornment>
												}
												type={form.password.isShow ? "text" : "password"}
												onFocus={() => onBlurFocusInput(true,"password")}
												onBlur={() => onBlurFocusInput(false,"password")}
												onKeyDown={(e) => {
													if (e.key === "Enter") {
														onValidate();
													}
												}}
											/>
										</Box> */}

										<Box className={classes.conItemInput}>
											<Typography className={classes.txtTitleInput}>
												{t("province")}
											</Typography>
											<Select
												style={{
													border: !form.province.isFocus && `2px solid ${form.province.error ? Colors.secondary : form.province.value !== "" ? Colors.success : "transparent"}`,
												}}
												value={form.province.value} // Đây là giá trị được chọn
												fullWidth
												onChange={(event) => onChangeInput(event,"province")}
												disabled={loading}
												className={classes.conInput}
												onFocus={() => onBlurFocusInput(true,"province")}
												onBlur={() => onBlurFocusInput(false,"province")}
												startAdornment={
													<InputAdornment position="start">
														<FontAwesomeIcon
															icon={faLocationPin}
															fontSize={20}
															color={
																form.province.isFocus || (form.province.value && form.province.value !== "")
																	? Colors.bgLogin
																	: Colors.placeHolder
															}
															className={classes.conIconInput}
														/>
													</InputAdornment>
												}
											>

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
											<Typography className={classes.txtTitleInput}>
												{t("ward")}
											</Typography>
											<Select
												style={{
													border: !form.ward.isFocus && `2px solid ${form.ward.error ? Colors.secondary : form.ward.value !== "" ? Colors.success : "transparent"}`,
												}}
												value={form.ward.value || ""}
												key={form.ward.key || ""} // Đây là giá trị được chọn
												fullWidth
												onChange={(event) => onChangeInput(event,"ward")}
												disabled={loading}
												className={classes.conInput}
												onFocus={() => onBlurFocusInput(true,"ward")}
												onBlur={() => onBlurFocusInput(false,"ward")}
												startAdornment={
													<InputAdornment position="start">
														<FontAwesomeIcon
															icon={faLocationPin}
															fontSize={20}
															color={
																form.ward.isFocus || (form.ward.value && form.ward.value !== "")
																	? Colors.bgLogin
																	: Colors.placeHolder
															}
															className={classes.conIconInput}
														/>
													</InputAdornment>
												}
											>
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
									</Grid>
									<Grid item xs={6} sm={6} lg={6} xl={12}>
										{/* <Box className={classes.conItemInput}>
											<Typography className={classes.txtTitleInput}>
												{t("email")}
											</Typography>
											<Input
												style={{
													border:
														!form.email.isFocus &&
														`2px solid ${form.email.error
															? Colors.secondary
															: form.email.value.trim() !== ""
																? Colors.success
																: "transparent"
														}`,
												}}
												className={classes.conInput}
												fullWidth

												placeholder={t("email")}
												value={form.email.value}
												startAdornment={
													<InputAdornment position="start">
														<FontAwesomeIcon
															icon={faAddressCard}
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
										</Box> */}
										<Box className={classes.conItemInput}>
											<Typography className={classes.txtTitleInput}>
												{t("phone")}
											</Typography>
											<Input
												style={{
													border:
														!form.phone.isFocus &&
														`2px solid ${form.phone.error
															? Colors.secondary
															: form.phone.value !== ""
																? Colors.success
																: "transparent"
														}`,
												}}
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
										</Box>
										<Box className={classes.conItemInput}>
											<Typography className={classes.txtTitleInput}>
												{t("city")}
											</Typography>
											<Select
												style={{
													border: !form.city.isFocus && `2px solid ${form.city.error ? Colors.secondary : form.city.value !== "" ? Colors.success : "transparent"}`,
												}}
												value={form.city.value || ""} // Đây là giá trị được chọn
												fullWidth
												onChange={(event) => onChangeInput(event,"city")}
												disabled={loading}
												className={classes.conInput}
												onFocus={() => onBlurFocusInput(true,"city")}
												onBlur={() => onBlurFocusInput(false,"city")}
												startAdornment={
													<InputAdornment position="start">
														<FontAwesomeIcon
															icon={faLocationPin}
															fontSize={20}
															color={
																form.city.isFocus || (form.city.value && form.city.value !== "")
																	? Colors.bgLogin
																	: Colors.placeHolder
															}
															className={classes.conIconInput}
														/>
													</InputAdornment>
												}
											>
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
											<Typography className={classes.txtTitleInput}>
												{t("address")}
											</Typography>
											<Input
												style={{
													border:
														!form.address.isFocus &&
														`2px solid ${form.address.error
															? Colors.secondary
															: form.address.value.trim() !== ""
																? Colors.success
																: "transparent"
														}`,
												}}
												className={classes.conInput}
												fullWidth
												placeholder={t("address")}
												value={form.address.value}
												startAdornment={
													<InputAdornment position="start">
														<FontAwesomeIcon
															icon={faAddressCard}
															fontSize={20}
															color={
																form.address.isFocus || form.address.value.trim() !== ""
																	? Colors.bgLogin
																	: Colors.bgLogin
															}
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
										{data?.status === "ERR" && (
											<span style={{ color: "red" }}>
												{(form.email.msg = t("txt_error_name_empty"))}
											</span>
										)}
										<Loading isLoading={isLoading}>
											<div style={{ display: "flex",justifyContent: "flex-end" }}>
												<div style={{ marginRight: "10px" }}>
													<CButton
														style={{ fullWidth: "30%" }}
														// disabled={!name.length || !email.length || !password.length}
														title={t('save')}
														onClick={onValidate}
														onKeyDown={(e) => {
															if (e.key === "Enter") {
																onValidate();
															}
														}}
													/>
												</div>
												<div >
													<CButton
														style={{ fullWidth: "30%",backgroundColor: "red !important",color: "white" }}
														title={t('cancel')}
														onClick={handleCancel}
													/>
												</div>

											</div>
										</Loading>
									</Grid>

								</Grid>

							</Box>



						</Box>
					</Grid>
				</Grid>
			</Loading>
		</Modal >
	);
};

export default UpdateUserComponent;
