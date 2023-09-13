import React,{ useEffect,useState } from 'react'
import InputForm from '../../components/InputForm/InputForm'
import { EyeFilled,EyeInvisibleFilled } from '@ant-design/icons'
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
import { Box,FormControl,Grid,Typography } from '@mui/material'
import { Colors } from '../../utils/colors'
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import AnimationComponent from 'components/AnimationComponent/AnimationComponent'
import { useNavigate } from 'react-router-dom'
const SignUpPage = () => {
	const [isShowPassword,setIsShowPassword] = useState(false)
	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');
	const [confirmPassword,setConfirmPassword] = useState('');
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const classes = styles();
	const [level,setLevel] = useState();
	const [lang,setLang] = useState(i18n.language);
	const handleOnChangeEmail = (value) => {
		setEmail(value)
	}

	const mutation = useMutationHooks(
		data => UserService.signupUser(data)
	)

	const { data,isLoading,isSuccess,isError } = mutation
	console.log("mutation",data)
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
		}
	});
	/** FUNCTIONS */
	const onChangeLanguage = (lang) => {
		setLang(lang)
		i18n.changeLanguage(lang);
		Helpers.setDataStorage(Keys.lang,lang)
	}

	const handleNavigateSignUp = () => {
		navigate('/sign-in')
	}
	const handleOnchangeConfirmPassword = (value) => {
		setConfirmPassword(value)
	}
	const handleSignUp = () => {
		mutation.mutate({
			email,
			password,
			confirmPassword
		})
		console.log("mutation",mutation)
	}
	// has number
	const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

	// has mix of small and capitals
	const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

	// has special chars
	const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

	// set color based on password strength
	const strengthColor = (count) => {
		if (count < 2) return { label: `${t('weak')}`,color: 'error.main' };
		if (count < 3) return { label: `${t('weak')}`,color: 'warning.main' };
		if (count < 4) return { label: `${t('normal')}`,color: 'warning.dark' };
		if (count < 5) return { label: `${t('good')}`,color: 'success.main' };
		if (count < 6) return { label: `${t('strong')}`,color: 'success.dark' };
		return { label: `${t('weak')}`,color: 'error.main' };
	};

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
			}
		})
	}

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

	const navigate = useNavigate()
	const handleNavigateSignIn = () => {
		navigate('/verify')
	}
	return (
		//   <div>
		//   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
		//     <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
		//       <WrapperContainerLeft>
		//         <h1> Xin chao</h1>
		//         <p>Dang nhap vao tao tai khoan</p>
		//         <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnChangeEmail}  />
		//         <div style={{ position: 'relative' }}>
		//         <span
		//           onClick={() => setIsShowPassword(!isShowPassword)}
		//           style={{
		//             zIndex: 10,
		//             position: 'absolute',
		//             top: '4px',
		//             right: '8px'
		//           }}
		//         >{
		//             isShowPassword ? (
		//               <EyeFilled />
		//             ) : (
		//               <EyeInvisibleFilled />
		//             )
		//           }
		//         </span>
		//         <InputForm
		//           placeholder="password"
		//           type={isShowPassword ? "text" : "password"}
		//           value={password}
		//           onChange={handleOnChangePassword}
		//         />
		//         </div>
		//         <div style={{ position: 'relative' }}>
		//           <span
		//             onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
		//             style={{
		//               zIndex: 10,
		//               position: 'absolute',
		//               top: '4px',
		//               right: '8px'
		//             }}
		//           >{
		//               isShowConfirmPassword ? (
		//                 <EyeFilled />
		//               ) : (
		//                 <EyeInvisibleFilled />
		//               )
		//             }
		//           </span>
		//           <InputForm placeholder="comfirm password" type={isShowConfirmPassword ? "text" : "password"}
		//             value={confirmPassword} onChange={handleOnchangeConfirmPassword}
		//           />
		//         </div>
		//         {data?.status === 'ERR' && <span>{data?.message}</span>}
		//           <Loading isLoading={isLoading}>
		//         <ButtonComponent
		//         disabled={!email.length || !password.length || !confirmPassword.length}
		//         onClick={handleSignUp}
		//           size={40}
		//           styleButton={{
		//             background: "rgb(255, 57, 69)",
		//             height: "48px",
		//             width: "220px",
		//             border: "none",
		//             borderRadius: "4px",
		//           }}
		//           // onClick={handleAddOrderProduct}
		//           textbutton={"Dang ky"}
		//           styleTextButton={{
		//             color: "#fff",
		//             fontSize: "15px",
		//             fontWeight: "700",
		//           }}
		//         ></ButtonComponent>
		//            </Loading>
		//           <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
		//       <p>Ban da có tài khoản? <WrapperTextLight onClick={handleNavigateSignIn}>Dang nhap</WrapperTextLight></p>
		//       </WrapperContainerLeft>
		//       <WrapperContainerRight>
		//       <Image src={imageLogo} preview={false} alt="iamge-logo" height="203px" width="203px" />
		//       <h4>Mua sắm tại LTTD</h4>
		//       </WrapperContainerRight>
		//     </div>
		//   </div>
		// </div>
		<Box className={classes.container}>

			<Grid container className={classes.conContent} spacing={5}>

				<Grid item xs={12} sm={6} lg={4} my={30} >
					{/* <Box className={classes.imgLogo} component={'img'} src={Assets.logo} alt="logo"/> */}
					<Typography className={classes.conTextCreate}>  <AnimationComponent type="text" text="Create an account" className={classes.conTextCreate} /></Typography>
					<Typography onClick={handleNavigateSignUp} className={classes.txtDesTitleSignUp}>  <AnimationComponent type="text" text="Already have an account? " className={classes.txtDesTitleSignUp} /><Typography className={classes.txtDesTitleSignUpLight}><AnimationComponent type="text" text="Sign in" className={classes.txtDesTitleSignUpLight} /></Typography></Typography>
				</Grid>
				<Grid item xs={12} sm={6} lg={4} className={classes.conCard}>
					<AnimationComponent type="box">
						<Box className={classes.conLogin}>
							<Typography className={classes.txtHeaderTitle}>{t('sign_up')}</Typography>
							{/* <Box className={classes.imgLogo} component={'img'} src={Assets.logo} alt="logo"/> */}
							<Box className={classes.conForm}>
								<Box className={classes.conItemInput}>
									<Typography className={classes.txtTitleInput}>{t('email')}</Typography>
									<InputForm style={{ border: !form.email.isFocus && `2px solid ${form.email.error ? Colors.secondary : form.email.value.trim() !== '' ? Colors.success : 'transparent'}` }}
										className={classes.conInput}
										// fullWidth
										placeholder={t('email')}
										// startAdornment={
										//   <InputAdornment position='start'>
										//     <FontAwesomeIcon icon={faAddressCard} fontSize={20} color={form.email.isFocus || form.email.value.trim() !== '' ? Colors.primary : Colors.placeHolder} className={classes.conIconInput} />
										//   </InputAdornment>
										// }
										// disabled={loading}
										onFocus={() => onBlurFocusInput(true,'email')}
										onBlur={() => onBlurFocusInput(false,'email')}
										value={email} onChange={handleOnChangeEmail}
									/>
								</Box>
								<Box className={classes.conItemInput}>
									<Typography className={classes.txtTitleInput}>{t('password')}</Typography>
									<InputForm style={{ border: !form.password.isFocus && `2px solid ${form.password.error ? Colors.secondary : form.password.value.trim() !== '' ? Colors.success : 'transparent'}` }}
										className={classes.conInput}
										// fullWidth
										placeholder={t('password')}

										// startAdornment={
										//   <InputAdornment position='start'>
										//     <FontAwesomeIcon          icon={faLock}  fontSize={20} color={form.password.isFocus || form.password.value.trim() !== '' ? Colors.primary : Colors.placeHolder} className={classes.conIconInput} />
										//   </InputAdornment>
										// }

										// endAdornment={
										//   <InputAdornment position='end'>
										//     <FontAwesomeIcon
										icon={form.password.isShow ? faEye : faEyeSlash}
										fontSize={20}
										value={password}
										type={isShowPassword ? "text" : "password"}
										onChange={handleOnChangePassword}
										color={Colors.primary}
										// className={classes.conIconInputRight}
										onClick={onChangeTypePassword}
									/>
									{/* </InputAdornment> */}
									{/* } */}
									{/* type={form.password.isShow ? 'text' : 'password'}
              // disabled={loading}
              onFocus={() => onBlurFocusInput(true, 'password')}
              onBlur={() => onBlurFocusInput(false, 'password')} */}
									{/* onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  // onValidate()
                }
              }} */}
									{/* /> */}
								</Box>
								<Box className={classes.conItemInput}>
									<Typography className={classes.txtTitleInput}>{t('password')}</Typography>
									<InputForm style={{ border: !form.password.isFocus && `2px solid ${form.password.error ? Colors.secondary : form.password.value.trim() !== '' ? Colors.success : 'transparent'}` }}
										className={classes.conInput}
										// fullWidth
										placeholder={t('password')}

										// startAdornment={
										//   <InputAdornment position='start'>
										//     <FontAwesomeIcon          icon={faLock}  fontSize={20} color={form.password.isFocus || form.password.value.trim() !== '' ? Colors.primary : Colors.placeHolder} className={classes.conIconInput} />
										//   </InputAdornment>
										// }

										// endAdornment={
										//   <InputAdornment position='end'>
										//     <FontAwesomeIcon
										icon={form.password.isShow ? faEye : faEyeSlash}
										fontSize={20}
										value={confirmPassword}

										onChange={handleOnchangeConfirmPassword}
										color={Colors.primary}
									// className={classes.conIconInputRight}
									/>
									{/* </InputAdornment> */}
									{/* } */}
									{/* type={form.password.isShow ? 'text' : 'password'}
              // disabled={loading}
              onFocus={() => onBlurFocusInput(true, 'password')}
              onBlur={() => onBlurFocusInput(false, 'password')} */}
									{/* onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  // onValidate()
                }
              }} */}
									{/* /> */}
								</Box>
							</Box>
							<FormControl fullWidth sx={{ mt: 2 }}>
								<Grid container spacing={2} alignItems="center">
									<Grid item>
										<Box sx={{ bgcolor: level?.color,width: 85,height: 8,borderRadius: '7px' }} />
									</Grid>
									<Grid item>
										<Typography variant="subtitle1" fontSize="0.75rem">
											{level?.label}
										</Typography>
									</Grid>
								</Grid>
							</FormControl>
							<Typography className={classes.txtDesTitle}>{t('txt_agree')}</Typography>

							{/* <Box className={classes.conMsg}> */}
							{/* <Typography className={classes.txtError}>{t(errorMsg)}</Typography> */}
							{/* <Typography className={classes.txtForgot}>{t('for_ta_click_here')}</Typography> */}
							{/* </Box> */}
							{/* onClick={onPressJoinClassTa}  */}
							{data?.status === 'ERR' && <span>{data?.message}</span>}
							<Loading isLoading={isLoading}>
								<CButton
									disabled={!email.length || !password.length}
									title={t('create_account')}
									onClick={handleSignUp}

								// onClick={onValidate}
								// loading={loading}
								/>
							</Loading>
							{/* <Box className={classes.conTitleLoginMethod}>
          <Box className={classes.conLine} />
          <Typography className={classes.txtTitleLoginMethod}>{t('txt_login_another')}</Typography>
          <Box className={classes.conLine} />
        </Box>

        <Button fullWidth className={classes.conBtnGoogle} 
          disabled={loading}
          onClick={onClick}
        >
          <Box className={classes.imgLogoGoogle} component={'img'} src={Assets.logoGoogle} />
          <Typography className={classes.txtBtnGoogle}>{t('sign_in_with_google')}</Typography>
        </Button> */}

							<Typography onClick={handleNavigateSignUp} className={classes.txtRegister}>{t('txt_alrealy_account')}  <span className={classes.txtBtnRegister}>{t('sign_in')}</span></Typography>
							{/* 
            <Box className={classes.conLanguage}>
              <Box className={classes.conLanguageItem} component={'img'} src={Assets.vnFlag}
                style={{ opacity: lang === Configs.language.vi ? 1 : .5 }}
                onClick={() => onChangeLanguage(Configs.language.vi)}
              />
              <Box className={classes.conLanguageItem} component={'img'} src={Assets.usFlag}
                style={{ opacity: lang === Configs.language.en ? 1 : .5 }}
                onClick={() => onChangeLanguage(Configs.language.en)}
              />
            </Box> */}
						</Box>
					</AnimationComponent>

				</Grid>
			</Grid>

		</Box>
	)
}

export default SignUpPage