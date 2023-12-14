import React,{ useEffect } from "react";
import {
	Box,
	Grid,
	Input,
	InputAdornment,
	Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Colors } from "../../utils/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useLocation,useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
// import * as message from '../../components/Message/Message'

/** STYLES */
import styles from "./style";
import { LoadingButton } from "@mui/lab";
import CarouselComponent from "components/CarouselComponent/CarouselComponent";


const ForgotPassordPage = () => {
	const { t } = useTranslation();
	const classes = styles();
	const [loading,setLoading] = useState(false);
	const navigate = useNavigate();
	const [errorMsg,setErrorMsg] = useState("");
	const mutation = useMutationHooks((data) => UserService.forgotPassword(data));

	const { data,isLoading,isSuccess } = mutation;


	const [form,setForm] = useState({
		email: {
			value: "",
			isFocus: false,
			msg: "",
			error: false,
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
		setForm(prevState => ({
			...prevState,
			[field]: { ...prevState[field],isFocus: value }
		}));
	};

	/** FUNCTIONS */
	// const onChangeLanguage = (lang) => {
	// 	setLang(lang);
	// 	i18n.changeLanguage(lang);
	// 	Helpers.setDataStorage(Keys.lang,lang);
	// };

	const handleLogin = () => {
		navigate("/login");
	};



	const handleSignIn = () => {
		mutation.mutate({
			email: form.email.value,
		});
	};
	useEffect(() => {
		if (!isLoading && isSuccess) {
			// Khi isLoading kết thúc và xử lý thành công, chuyển hướng đến trang /recover-password/sent
			navigate("/recover-password/sent");
		}
	},[isLoading,isSuccess,navigate]);
	const onValidate = () => {
		setErrorMsg("");
		setForm({
			...form,

			email: {
				...form.email,
				error: false,
			}


		});

		let isError = false,
			newForm = { ...form };


		if (form.email.value.trim() === "") {
			isError = true;
			form.email.error = true;
			form.email.msg = t("txt_error_name_empty");
		}


		if (isError) {
			return setForm(newForm);
		}
		handleSignIn();
	};
	return (
		<>

			<CarouselComponent />

			<Grid container className={classes.conContent}>
				<Grid item xs={12} sm={6} lg={4} xl={3} className={classes.conCard}>
					<Box className={classes.conLogin}>
						<Typography className={classes.txtHeaderTitle} sx={{ fontSize: { xs: "32px !important" } }}>
							Lấy lại mật khẩu
						</Typography>
						<Typography
							className={classes.txtDesTitle}
							sx={{ fontSize: { xs: "14px !important",xl: "18px" } }}
						>
							Chúng tôi sẽ gửi cho bạn một email để đặt lại mật khẩu mới.
						</Typography>
						{/* <Box className={classes.imgLogo} component={'img'} src={Assets.logo} alt="logo"/> */}
						<Box className={classes.conForm}>
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
												// fontSize={20}
												color={
													form.email.isFocus || form.email.value.trim() !== ""
														? Colors.bgLogin
														: Colors.bgLogin
												}
												className={classes.conIconInput}
											/>
										</InputAdornment>
									}
									// onChange={handleOnChangeEmail}
									onChange={(event) => onChangeInput(event,"email")}
									disabled={loading}
									onFocus={() => onBlurFocusInput(true,"email")}
									onBlur={() => onBlurFocusInput(false,"email")}
								/>
							</Box>


						</Box>
						{/* <Box className={classes.conMsg}>
							<Typography className={classes.txtForgot}>"Bạn nhớ mật khẩu của mình? Đăng nhập ngay"</Typography>
						</Box> */}
						<Box className={classes.conMsg}>
							<Typography className={classes.txtError}>
								{t(errorMsg)}
							</Typography>
						</Box>
						<Box className={classes.conMsg}>
							<Typography className={classes.txtForgot} onClick={handleLogin}>Đăng nhập?</Typography>
						</Box>
						<LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading} onKeyDown={(e) => {
							if (e.key === "Enter") {
								onValidate();
							}
						}}
							onClick={() => onValidate()}
							className={classes.customLoadingButton}
						>Gửi</LoadingButton>



					</Box>
				</Grid>
			</Grid>
		</>

	);
};

export default ForgotPassordPage;
