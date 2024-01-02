/** LIBRARY */
import React,{ useEffect,useState } from "react";
import {
	Box,
	FormControl,
	Grid,
	Input,
	InputAdornment,
	InputLabel,
	Tooltip,
	Typography,
	tooltipClasses,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEye,
	faEyeSlash,
	faAddressCard,
	faLock,
} from "@fortawesome/free-solid-svg-icons";
/** COMMON */
// import { useDispatch, useSelector } from 'react-redux'
import * as UserService from "../../services/UserService";
import * as message from "../../components/Message/Message";

/** STYLES */
import styles from "./style";
// import { faPen } from '@fortawesome/free-light-svg-icons';
import { Colors } from "../../utils/colors";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useDispatch,useSelector } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import PasswordCheckerComponent from "components/PasswordCheckerComponent/PasswordCheckerComponent";
import { styled } from "@mui/styles";
import CarouselComponent from "components/CarouselComponent/CarouselComponent";
const LightTooltip = styled(({ className,...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: "#fff",
		color: 'rgba(0, 0, 0, 0.87)',
		// boxShadow: theme.shadows[1],
		fontSize: 11,
		borderBottom: "0px",
		borderTop: "2px solid #454F5B",
		borderRadius: "9px",
		boxShadow: "0px 18px 28px rgba(0,0,0,0.15),0px 0px 1px rgba(0,0,0,0.31)",
		transition: "boxShadow 0.3s ease -in -out 0s"
	},
}));

const ChangePassword = () => {
	const classes = styles();
	const { t } = useTranslation();
	// const dispatch = useDispatch();
	// const user = useSelector((state) => state.user.data);
	const user = useSelector((state) => state.user);
	const [email,setEmail] = useState("");
	const [name,setName] = useState("");
	const [phone,setPhone] = useState("");
	const [password,setPassword] = useState("");
	const navigate = useNavigate();
	const [address,setAddress] = useState("");
	const [avatar,setAvatar] = useState("");
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
		setEmail(user?.email);
		setName(user?.name);
		setPhone(user?.phone);
		setPassword(user?.password);
		setAddress(user?.address);
		setAvatar(user?.avatar);
	},[user]);

	const [error,setError] = useState('');

	const handleGetDetailsUser = async (id,token) => {
		const res = await UserService.getDetailsUser(id,token);
		dispatch(updateUser({ ...res?.data,access_token: token }));
	};

	const handleUpdate = () => {
		const newPassword = form.password.value;

		// Kiểm tra xem người dùng đã nhập mật khẩu mới hay không
		if (newPassword) {
			// Nếu có mật khẩu mới, cập nhật cả id, name và password
			mutation.mutate({
				id: user?.id,
				name: form.name.value,
				phone: form.phone.value,
				province: form.province.value,
				city: form.city.value,
				ward: form.ward.value,
				password: newPassword,
				address: form.address.value,
				access_token: user?.access_token,
			});
		}
		else {
			// Nếu không có mật khẩu mới, chỉ cập nhật id và name
			mutation.mutate({
				id: user?.id,
				name: form.name.value,
				phone: form.phone.value,
				province: form.province.value,
				city: form.city.value,
				ward: form.ward.value,
				address: form.address.value,
				access_token: user?.access_token,
			});
		}
	};
	// const handleUpdate = () => {
	// 	const newPassword = form.password.value;

	// 	// Tạo một đối tượng để lưu trữ dữ liệu cần cập nhật
	// 	const updatedData = {
	// 		id: user?.id,
	// 		name: form.name.value,
	// 		phone: form.phone.value,
	// 		province: form.province.value,
	// 		city: form.city.value,
	// 		ward: form.ward.value,
	// 		address: form.address.value,
	// 	};

	// 	// Kiểm tra xem người dùng đã nhập mật khẩu mới hay không
	// 	if (newPassword) {
	// 		// Nếu có mật khẩu mới, thêm trường password vào đối tượng cập nhật
	// 		updatedData.password = newPassword;
	// 	}

	// 	// Kiểm tra từng trường nếu có giá trị mới và khác giá trị cũ thì thêm vào đối tượng cập nhật
	// 	Object.keys(updatedData).forEach((key) => {
	// 		const newValue = updatedData[key];
	// 		const oldValue = user[key];

	// 		if (newValue !== undefined && newValue !== oldValue) {
	// 			updatedData[key] = newValue;
	// 		} else {
	// 			delete updatedData[key];
	// 		}
	// 	});

	// 	// Gọi mutation với dữ liệu cập nhật
	// 	mutation.mutate({
	// 		updatedData,
	// 		access_token: user?.access_token,
	// 	}
	// 	);
	// };



	useEffect(() => {
		if (isSuccess && !isLoading) {
			message.success();
			navigate("/profile");
			setTimeout(() => {
				handleGetDetailsUser(user?.id,user?.access_token);
			},1000); // Chờ 200 mili giây trước khi gọi
		} else if (isError) {
			message.error();
		}
	},[isSuccess,isError,navigate]);
	// const comparePassword = bcrypt.compareSync(password,checkUser.password);

	const [form,setForm] = useState({
		name: {
			value: user?.name,
			isFocus: false,
			msg: "",
			error: false,
		},
		email: {
			value: user?.email,
			isFocus: false,
			msg: "",
			error: false,
		},
		phone: {
			value: user?.phone || "",
			isFocus: false,
			msg: "",
			error: false,
			name: user?.phone || "",
			isShow: false,
		},
		province: {
			value: user?.province || "",
			isFocus: false,
			msg: "",
			error: false,
			name: user?.province || "",
			isShow: false,
		},
		city: {
			value: user?.city || "",
			isFocus: false,
			msg: "",
			error: false,
			name: user?.city || "",
			isShow: false,
		},
		ward: {
			value: user?.ward || "",
			isFocus: false,
			msg: "",
			error: false,
			name: user?.ward || "",
			isShow: false,
		},
		address: {
			value: user?.address || "",
			isFocus: false,
			msg: "",
			error: false,
			name: user?.address || "",
			isShow: false,
		},
		password: {
			value: "",
			isFocus: false,
			msg: "",
			error: false,
			isShow: false,
		},
	});
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
					value: event.target.value,
				},
			});
		};
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
	const onValidate = () => {
		handleUpdate();

		setErrorMsg("");
		setForm({
			...form,
			name: {
				...form.name,
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
		// Kiểm tra điều kiện mật khẩu
		const passwordValidationResult = checkPassword(form.password.value);
		if (passwordValidationResult) {
			setError(passwordValidationResult);
		} else {
			// Nếu không có lỗi, tiến hành xử lý đăng ký
			setError('');
			handleUpdate();
			// Gọi hàm handleSignUp() ở đây
		}
	};
	const checkPassword = (password) => {
		const uppercaseRegex = /[A-Z]/;
		const digitRegex = /\d/;
		const specialCharRegex = /[!@#$%^&*()-_+=<>?/\\]/;
		if (password.length < 8) {
			return "Mật khẩu phải có ít nhất 8 ký tự.";
		}
		if (!uppercaseRegex.test(password)) {
			return "Mật khẩu phải có ít nhất một chữ cái đầu in hoa.";
		}

		if (!digitRegex.test(password)) {
			return "Mật khẩu phải có ít nhất một số.";
		}

		if (!specialCharRegex.test(password)) {
			return "Mật khẩu phải có ít nhất một ký tự đặc biệt.";
		}

		return "";
	};
	/** LIFE CYCLE */

	/** RENDER */
	return (
		// <Modal
		//   open={open}
		//   onClose={onClose}
		//   onBackdropClick={onClose}
		//   disableAutoFocus={true}
		// >
		<>
			<CarouselComponent />
			<Grid className={classes.conContent}>
				<Grid item xs={12} sm={6} lg={4} className={classes.conCard}>
					<Box className={classes.conLogin}>
						<Typography className={classes.txtHeaderTitle}>
							Điền vào biểu mẫu để thay đổi thông tin của bạn.
						</Typography>
						<Box className={classes.conForm}>
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

							<Grid container spacing={2}>
								<Grid item xs={12} sm={6} lg={6} xl={6} >
									<Box className={classes.conItemInput}>
										<Typography className={classes.txtTitleInput}>
											{t("email")}
										</Typography>
										<Input

											className={classes.conInput}
											fullWidth
											placeholder={t("email")}
											disabled
											value={form.email.value}

										/>
									</Box>
								</Grid>

								<Grid item xs={12} sm={6} lg={6} xl={6} >
									<Box className={classes.conItemInput}>
										<InputLabel className={classes.txtTitleInput} >Số điện thoại</InputLabel>
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
									</Box>
								</Grid>

							</Grid>
							<Grid container spacing={2}>

								<Grid item xs={12} sm={12} lg={12} xl={6}>
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


								</Grid>
								<Grid item xs={12} sm={12} lg={12} xl={6}>

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
								</Grid>
								<Grid item xs={12} sm={12} lg={12} xl={6}>

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
								</Grid>
								<Grid item xs={12} sm={12} lg={12} xl={6}>

									<Box className={classes.conItemInput}>
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
									</Box>
								</Grid>
							</Grid>

							<Grid item xs={12} sm={12} lg={12} xl={12}>
								<Box className={classes.conMsg}>
									<Typography className={classes.txtError}>
										{t(errorMsg)}
									</Typography>
								</Box>
							</Grid>
							<Box className={classes.conItemInput}>
								<Typography className={classes.txtTitleInput}>
									{t("password")}
								</Typography>
								<LightTooltip
									arrow title={<PasswordCheckerComponent password={form.password.value} />} sx={{ placement: { xs: "top",xl: "left",md: "left",lg: "left" } }}>

									<Input
										style={{
											border:
												!form.password.isFocus &&
												`2px solid ${form.password.error
													? Colors.secondary
													: form.password.value
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
															form.password.value
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
								</LightTooltip>
							</Box>
						</Box>
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
						<LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading} onKeyDown={(e) => {
							if (e.key === "Enter") {
								onValidate();
							}
						}}
							onClick={() => onValidate()}
							className={classes.customLoadingButton}
						>Cập nhập</LoadingButton>
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default ChangePassword;
