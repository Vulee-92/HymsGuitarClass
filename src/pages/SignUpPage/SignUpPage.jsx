import React,{ useEffect,useState } from 'react'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import i18n from '../../utils/languages/i18n'
import styles from './style';
import { Helpers } from '../../utils/helpers'
import { Assets,Configs,Keys } from '../../configs'
import CButton from '../../components/CButton';
import { Box,FormControl,Grid,Input,InputAdornment,Typography } from '@mui/material'
import { Colors } from '../../utils/colors'
import { faEye,faEyeSlash,faLock } from '@fortawesome/free-solid-svg-icons'
import AnimationComponent from 'components/AnimationComponent/AnimationComponent'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LoadingButton } from '@mui/lab'
const SignUpPage = () => {
	const [isShowPassword,setIsShowPassword] = useState(false)
	const [name,setName] = useState('');
	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');
	const [confirmPassword,setConfirmPassword] = useState('');
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const classes = styles();
	const [level,setLevel] = useState();
	const [lang,setLang] = useState(i18n.language);
	const [errorMsg,setErrorMsg] = useState("");


	const mutation = useMutationHooks(
		data => UserService.signupUser(data)
	)

	const { data,isLoading,isSuccess,isError } = mutation


	useEffect(() => {
		if (isSuccess) {
			message.success()
			handleNavigateSignIn()
		} else if (isError) {
			message.error()
		}
		handleOnChangePassword('');
	},[isSuccess,isError])


	const [form,setForm] = useState({
		name: {
			value: '',
			isFocus: false,
			msg: '',
			error: false
		},
		email: {
			value: '',
			isFocus: false,
			msg: '',
			error: false
		},
		password: {
			value: '',
			isFocus: false,
			msg: '',
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
	/** FUNCTIONS */
	const onChangeLanguage = (lang) => {
		setLang(lang)
		i18n.changeLanguage(lang);
		Helpers.setDataStorage(Keys.lang,lang)
	}

	const handleNavigateSignUp = () => {
		navigate('/login')
	}
	const handleOnchangeConfirmPassword = (value) => {
		const temp = strengthIndicator(value);
		setLevel(strengthColor(temp));
		setConfirmPassword(value)
	}
	const handleSignUp = () => {
		mutation.mutate({
			name: form.name.value,
			email: form.email.value,
			password: form.password.value,
			confirmPassword: form.confirmPassword.value,
		})
	}
	// has number
	const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

	// has mix of small and capitals
	const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

	// has special chars
	const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

	// set color based on password strength
	const strengthColor = (count) => {
		if (count < 2) return { label: `${t('weak')}`,color: 'error.main',fontSize: "12px" };
		if (count < 3) return { label: `${t('weak')}`,color: 'warning.main' };
		if (count < 4) return { label: `${t('normal')}`,color: 'warning.dark' };
		if (count < 5) return { label: `${t('good')}`,color: 'success.main' };
		if (count < 6) return { label: `${t('strong')}`,color: 'success.dark' };
		return { label: `${t('weak')}`,color: 'error.main' };
	};
	const [error,setError] = useState('');



	// password strength indicator
	const strengthIndicator = (number) => {
		let strengths = 0;
		if (number.length > 5) strengths += 1;
		if (number.length > 7) strengths += 1;
		if (hasNumber(number)) strengths += 1;
		if (hasSpecial(number)) strengths += 1;
		if (hasMixed(number)) strengths += 1;
		return strengths;
	};
	const onChangeTypePassword = () => {
		setForm({
			...form,
			password: {
				...form.password,
				isShow: !form.password.isShow
			},
			confirmPassword: {
				...form.confirmPassword,
				isShow: !form.confirmPassword.isShow
			}
		})
	}
	const onChangeInput = (event,field) => {
		const temp = strengthIndicator(event.target.value);
		setForm({
			...form,
			[field]: {
				...form[field],
				value: event.target.value,
			}
		});
		setLevel(strengthColor(temp))

	};

	const handleOnChangePassword = (value) => {
		const temp = strengthIndicator(value);
		setLevel(strengthColor(temp));
		setPassword(value);
	}
	const onBlurFocusInput = (value,field) => {
		setForm({
			...form,
			[field]: {
				...form[field],
				isFocus: value
			}
		})
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
			password: {
				...form.password,
				error: false,
			},
			confirmPassword: {
				...form.confirmPassword,
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
		// Kiểm tra điều kiện mật khẩu
		const passwordValidationResult = checkPassword(form.password.value);
		if (passwordValidationResult) {
			setError(passwordValidationResult);
		} else {
			// Nếu không có lỗi, tiến hành xử lý đăng ký
			setError('');
			handleSignUp();
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
	const navigate = useNavigate()
	const handleNavigateSignIn = () => {
		if (data.status === "OK") {
			navigate('/verify')
		}
	}
	useEffect(() => {
		if (isSuccess) {
			message.success(t("thành cônng"));
			handleNavigateSignIn();
		} else if (isError) {
			message.error(errorMsg);
		}
	},[isSuccess,isError]);
	return (
		<Box className={classes.container}>

			<Grid container className={classes.conContent} spacing={5}>

				<Grid item xs={12} sm={6} lg={4} my={30} >
					<Typography className={classes.conTextCreate}>  <AnimationComponent type="text" text={t("sign_up")} className={classes.conTextCreate} /></Typography>
					<Typography onClick={handleNavigateSignUp} className={classes.txtDesTitleSignUpLight}>  <AnimationComponent type="text" text={t("txt_alrealy_account")} className={classes.txtDesTitleSignUp} /><Typography className={classes.txtDesTitleSignUpLight}>
						<AnimationComponent type="text" text={t("sign_in")} className={classes.txtDesTitleSignUpLight} /></Typography></Typography>
				</Grid>
				<Grid item xs={12} sm={6} lg={4} className={classes.conCard} sx={{ margin: { xs: "-180px 20px 400px 20px;",xl: "60px 0px 0px 0px",md: "60px 0px 0px 0px" } }}>
					<AnimationComponent type="box">
						<Box className={classes.conSignUp}>
							<Typography className={classes.txtHeaderTitle} sx={{ fontSize: { xs: "24px !important" } }}><AnimationComponent type="text" text={t("sign_up")} className={classes.txtSignUp} /></Typography>
							<Box className={classes.conForm}>
								<Box className={classes.conItemInput}>
									<Typography className={classes.txtTitleInput} sx={{ fontSize: { xs: "13px !important" } }}>{t("name")}</Typography>

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
										value={form.name.value}
										startAdornment={
											<InputAdornment position="start">
												<FontAwesomeIcon
													// icon={faAddressCard}
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
										// onChange={handleOnChangename}
										onChange={(event) => onChangeInput(event,"name")}
										onFocus={() => onBlurFocusInput(true,"name")}
										onBlur={() => onBlurFocusInput(false,"name")}
									/>
								</Box>
								<Box className={classes.conItemInput}>
									<Typography className={classes.txtTitleInput} sx={{ fontSize: { xs: "13px !important" } }}>{t("email")}</Typography>

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
													// icon={faAddressCard}
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
										// onChange={handleOnChangename}
										onChange={(event) => onChangeInput(event,"email")}
										onFocus={() => onBlurFocusInput(true,"email")}
										onBlur={() => onBlurFocusInput(false,"email")}
									/>
								</Box>
								{isError && (
									<Typography className={classes.txtStrongPassword} style={{ color: 'red',marginTop: "10px" }}>
										Email không hợp lệ
									</Typography>
								)}
								{data?.status === "ERR" && (
									<Typography className={classes.txtStrongPassword} style={{ color: 'red',marginTop: "10px" }}>
										Email đã đăng ký
									</Typography>
								)}
								<Box className={classes.conItemInput}>
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
													// icon={faLock}
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

								{error && <Typography className={classes.txtStrongPassword} style={{ color: 'red',marginTop: "10px" }}>{error}</Typography>}
								{/* <Box className={classes.conItemInput}>
									<Typography className={classes.txtTitleInput} sx={{ fontSize: { xs: "13px !important" } }}>{t('confirm_password')}</Typography>
									<InputForm style={{ border: !form.password.isFocus && `2px solid ${form.password.error ? Colors.secondary : form.password.value.trim() !== '' ? Colors.success : 'transparent'}` }}
										className={classes.conInput}
										fullWidth
										placeholder={t('confirm_password')}

										startAdornment={
										  <InputAdornment position='start'>
										    <FontAwesomeIcon          icon={faLock}  fontSize={20} color={form.password.isFocus || form.password.value.trim() !== '' ? Colors.primary : Colors.placeHolder} className={classes.conIconInput} />
										  </InputAdornment>
										}

										endAdornment={
										  <InputAdornment position='end'>
										    <FontAwesomeIcon
										icon={form.password.isShow ? faEye : faEyeSlash}
										fontSize={20}
										value={confirmPassword}
										onChange={handleOnchangeConfirmPassword}
										color={Colors.primary}
										className={classes.conIconInputRight}
										type={form.password.isShow ? 'text' : 'password'}
										onFocus={() => onBlurFocusInput(true,'password')}
										onBlur={() => onBlurFocusInput(false,'password')}
									/>
									</InputAdornment>
								} 

									onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  // onValidate()
                }
              }} 
									 /> 
								</Box> */}
							</Box>
							<FormControl fullWidth sx={{ mt: 2 }}>
								<Grid container spacing={2} alignItems="center">
									<Grid item>
										<Box sx={{ bgcolor: level?.color,width: 85,height: 8,borderRadius: '7px' }} />
									</Grid>
									<Grid item>
										<Typography className={classes.txtStrongPassword} sx={{ fontSize: { xs: "13px !important" } }}>
											{level?.label}
										</Typography>
									</Grid>
									<Grid item>
									</Grid>
								</Grid>
							</FormControl>
							<Typography className={classes.txtDesTitle} sx={{ fontSize: { xs: "13px !important" } }}>{t('txt_agree')}</Typography>

							{/* {form.confirmPassword.value !== form.password.value && (
								<span style={{ color: "red" }}>
									{(form.confirmPassword.msg = t("txt_error_name_empty"))}
								</span>
							)} */}
							<LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading} onKeyDown={(e) => {
								if (e.key === "Enter") {
									onValidate();
								}
							}}
								onClick={() => onValidate()}
								className={classes.customLoadingButton}
							>{t("sign_up")}</LoadingButton>
							<Typography onClick={handleNavigateSignUp} className={classes.txtRegister}>{t('txt_alrealy_account')}  <span className={classes.txtBtnRegister}>{t('sign_in')}</span></Typography>

						</Box>
					</AnimationComponent>

				</Grid>
			</Grid>

		</Box>
	)
}

export default SignUpPage