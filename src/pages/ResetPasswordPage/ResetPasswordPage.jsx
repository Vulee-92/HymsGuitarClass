/** LIBRARY */
import React,{ useEffect,useState } from "react";
import {
	Box,
	Grid,
	Input,
	InputAdornment,
	Tooltip,
	Typography,
	tooltipClasses,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEye,
	faEyeSlash,
	faLock,
} from "@fortawesome/free-solid-svg-icons";
/** COMMON */
import * as UserService from "../../services/UserService";
import * as message from "../../components/Message/Message";

/** STYLES */
import styles from "./style";
import { Colors } from "../../utils/colors";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useDispatch,useSelector } from "react-redux";

import AnimationComponent from "../../components/AnimationComponent/AnimationComponent";
import { LoadingButton } from "@mui/lab";
import { useNavigate,useParams } from "react-router-dom";
import { styled } from "@mui/styles";
import PasswordCheckerComponent from "components/PasswordCheckerComponent/PasswordCheckerComponent";
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
	const navigate = useNavigate();
	let { id,tokenReset } = useParams();
	const { t } = useTranslation();

	const [confirmPassword,setConfirmPassword] = useState('');
	const mutation = useMutationHooks(
		(data) => {
			const { id,tokenReset,...rest } = data;
			UserService.resetPassword(id,tokenReset,data);
		}
	)
	const [errorMsg,setErrorMsg] = useState("");

	const { data,isLoading,isSuccess,isError } = mutation;

	const [password,setPassword] = useState('');
	const [error,setError] = useState('');

	const checkPassword = () => {
		const uppercaseRegex = /[A-Z]/;
		const digitRegex = /\d/;
		const specialCharRegex = /[!@#$%^&*()-_+=<>?/\\]/;

		if (!uppercaseRegex.test(form.confirmPassword.value)) {
			setError('Mật khẩu phải có ít nhất một chữ cái đầu in hoa.');
		} else if (!digitRegex.test(form.confirmPassword.value)) {
			setError('Mật khẩu phải có ít nhất một số.');
		} else if (!specialCharRegex.test(form.confirmPassword.value)) {
			setError('Mật khẩu phải có ít nhất một ký tự đặc biệt.');
		} else {
			setError('');
		}
	};




	const handleUpdate = () => {
		mutation.mutate({
			id: id,
			password: form.password.value,
			confirmPassword: form.confirmPassword.value,
			tokenReset: tokenReset,
		});
	};

	useEffect(() => {
		if (isSuccess && !isLoading) {
			message.success();
			navigate("/reset-password/done");

		} else if (isError) {
			message.error();
		}
	},[isSuccess,isError,navigate]);

	const [form,setForm] = useState({

		password: {
			value: "",
			isFocus: false,
			msg: "",
			error: false,
			isShow: false,
		},
		confirmPassword: {
			value: '',
			isFocus: false,
			msg: '',
			error: false,
			isShow: false,
		}
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
				isShow: false,
			},
			confirmPassword: {
				...form.confirmPassword,
				error: false,
			},
		});
	};

	const onValidate = () => {
		setErrorMsg("");
		setForm({
			...form,

			password: {
				...form.password,
				error: false,
			},
			confirmPassword: {
				...form.confirmPassword,
				error: false,
			},
		});
		checkPassword();

		let isError = false,
			newForm = { ...form };

		if (form.password.value.trim() === "") {
			isError = true;
			form.password.error = true;
			form.password.msg = "txt_error_access_code_empty";
		}
		if (form.confirmPassword.value.trim() === "") {
			isError = true;
			form.confirmPassword.error = true;
			form.confirmPassword.msg = "txt_error_access_code_empty";
		}
		if (form.confirmPassword.value !== form.password.value) {
			isError = true;
			form.confirmPassword.error = true;
			form.confirmPassword.msg = "Mật khẩu không giống";
		}


		if (isError) {
			return setForm(newForm);
		}
		handleUpdate();
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
			<Box className={classes.container}>
				<Typography className={classes.conTextCreate}>  <AnimationComponent type="text" text="Thay đổi mật khẩu" className={classes.conTextCreate} /></Typography>
			</Box>
			<Grid className={classes.conContent}>
				<Grid item xs={12} sm={6} lg={4} className={classes.conCard}>
					<Box className={classes.conLogin}>
						<Typography className={classes.txtHeaderTitle}>
							Điền vào biểu mẫu để thay đổi mật khẩu của bạn
						</Typography>
						<Box className={classes.conForm}>


							<Box className={classes.conItemInput}>
								<Typography className={classes.txtTitleInput}>
									{t("password")}
								</Typography>
								<LightTooltip sx={{ background: '#000',color: '#fff' }}
									arrow title={<PasswordCheckerComponent password={form.password.value} />} placement="left">
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
													// icon={faLock}
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
							<Box className={classes.conItemInput}>
								<Typography className={classes.txtTitleInput}>
									{t("confirm_password")}
								</Typography>

								<Input
									style={{
										border:
											!form.confirmPassword.isFocus &&
											`2px solid ${form.confirmPassword.error
												? Colors.secondary
												: form.confirmPassword.value.trim() !== ""
													? Colors.success
													: "transparent"
											}`,
									}}
									className={classes.conInput}
									fullWidth
									placeholder={t("confirm_password")}
									value={form.confirmPassword.value}
									onChange={(event) => onChangeInput(event,"confirmPassword")}
									startAdornment={
										<InputAdornment position="start">
											<FontAwesomeIcon
												// icon={faLock}
												fontSize={20}
												color={
													form.confirmPassword.isFocus ||
														form.confirmPassword.value.trim() !== ""
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
												icon={form.confirmPassword.isShow ? faEye : faEyeSlash}
												fontSize={20}
												color={Colors.bgLogin}
												className={classes.conIconInputRight}
												onClick={onChangeTypePassword}
											/>
										</InputAdornment>
									}
									type={form.confirmPassword.isShow ? "text" : "password"}
									onFocus={() => onBlurFocusInput(true,"confirmPassword")}
									onBlur={() => onBlurFocusInput(false,"confirmPassword")}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											onValidate();
										}
									}}
								/>
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
