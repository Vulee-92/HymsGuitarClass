/** LIBRARY */
import React,{ useEffect,useState } from "react";
import {
	Box,
	Button,
	CircularProgress,
	Container,
	Grid,
	Input,
	InputAdornment,
	Modal,
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
import AnimationComponent from "../../components/AnimationComponent/AnimationComponent";
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

		mutation.mutate({
			id: user?.id,
			name: form.name.value,
			password: newPassword || user?.password,
			access_token: user?.access_token,
		});
	};


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
		password: {
			value: "",
			isFocus: false,
			msg: "",
			error: false,
			isShow: false,
		},
	});
	const onChangeInput = (event,field) => {
		setForm({
			...form,
			[field]: {
				...form[field],
				value: event.target.value,
			},
		});
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

			password: {
				...form.password,
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
							<Box className={classes.conItemInput}>
								<Typography className={classes.txtTitleInput}>
									{t("email")}
								</Typography>
								<Input

									// style={{
									// 	border:
									// 		!form.email.isFocus &&
									// 		`2px solid ${form.email.error
									// 			? Colors.secondary
									// 			: form.email.value.trim() !== ""
									// 				? Colors.success
									// 				: "transparent"
									// 		}`,
									// }}
									className={classes.conInput}
									fullWidth
									placeholder={t("email")}
									disabled
									value={form.email.value}
								// startAdornment={
								// 	<InputAdornment position="start">
								// 		<FontAwesomeIcon
								// 			icon={faAddressCard}
								// 			fontSize={20}
								// 			color={
								// 				form.email.isFocus || form.email.value.trim() !== ""
								// 					? Colors.bgLogin
								// 					: Colors.bgLogin
								// 			}
								// 			className={classes.conIconInput}
								// 		/>
								// 	</InputAdornment>
								// }
								// onChange={(event) => onChangeInput(event,"email")}
								// onFocus={() => onBlurFocusInput(true,"email")}
								// onBlur={() => onBlurFocusInput(false,"email")}
								/>
							</Box>
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
						{/* {error && <Typography className={classes.txtStrongPassword} style={{ color: 'red',marginTop: "10px" }}>{error}</Typography>} */}
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

						{/* <Loading isLoading={isLoading}>

							<CButton style={{ fullWidth: "30%" }}
								disabled={!name.length || !password.length}
								title={"Cập nhập"}
								onClick={onValidate}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										onValidate();
									}
								}}
							/>
						</Loading> */}

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
