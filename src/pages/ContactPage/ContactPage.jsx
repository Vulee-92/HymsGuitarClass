import { Box,FormControl,Input,InputAdornment,Typography,Grid,Snackbar,Alert,Container } from "@mui/material";
import { useMutationHooks } from "hooks/useMutationHook";
import React,{ useState,useEffect } from "react";
import { useSelector } from "react-redux";
import * as ContactService from '../../services/ContactService'
import CButton from "../../components/CButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as message from '../../components/Message/Message'
import { Colors } from "../../utils/colors";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import i18n from "utils/languages/i18n";
/** STYLES */
import styles from "./style";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../components/LoadingComponent/Loading";
import AnimationComponent from "../../components/AnimationComponent/AnimationComponent";
import InputForm from "../../components/InputForm/InputForm";
import { PatternFormat } from "react-number-format";
import CarouselComponent from "components/CarouselComponent/CarouselComponent";

const ContactPage = () => {
	const [name,setName] = useState("");
	const [phone,setPhone] = useState("");
	const [email,setEmail] = useState("");
	const [contactmessenger,setContactMessages] = useState("");
	const { t } = useTranslation();
	const classes = styles();
	const location = useLocation();
	const [loading,setLoading] = useState(false);
	const [lang,setLang] = useState(i18n.language);
	const [errorMsg,setErrorMsg] = useState("");
	const user = useSelector((state) => state.user);

	const handleOnChangeEmail = (value) => setEmail(value);
	const handleOnChangeName = (value) => setName(value);
	const handleOnChangePhone = (value) => setPhone(value.toString());
	const handleOnChangeMessage = (value) => setContactMessages(value);

	const mutation = useMutationHooks(data => ContactService.createContacts(data));
	const { data,isLoading,isSuccess,isError } = mutation;

	const clearForm = () => {
		setName("");
		setEmail("");
		setPhone("");
		setContactMessages("");
	};




	const [form,setForm] = useState({
		name: { value: "",isFocus: false,msg: "",error: false },
		phone: { value: "",isFocus: false,msg: "",error: false },
		email: { value: "",isFocus: false,msg: "",error: false },
		contactmessenger: { value: "",isFocus: false,msg: "",error: false },
	});

	const onBlurFocusInput = (value,field) => {
		setForm(prevState => ({
			...prevState,
			[field]: { ...prevState[field],isFocus: value }
		}));
	};

	const handleContact = () => {
		mutation.mutate({ name,email,phone,contactmessenger });
	};

	const onValidate = () => {
		let isError = false;
		let newForm = {
			name: { ...form.name,error: false,msg: "" },
			phone: { ...form.phone,error: false,msg: "" },
			email: { ...form.email,error: false,msg: "" },
			contactmessenger: { ...form.contactmessenger,error: false,msg: "" }
		};

		if (name.trim() === "") {
			isError = true;
			newForm.name.error = true;
			newForm.name.msg = t("txt_error_name_empty");
		}

		if (phone.trim() === "") {
			isError = true;
			newForm.phone.error = true;
			newForm.phone.msg = t("txt_error_name_empty");
		}

		if (email.trim() === "") {
			isError = true;
			newForm.email.error = true;
			newForm.email.msg = t("txt_error_name_empty");
		}

		if (contactmessenger.trim() === "") {
			isError = true;
			newForm.contactmessenger.error = true;
			newForm.contactmessenger.msg = t("txt_error_name_empty");
		}

		setForm(newForm);

		if (!isError) {
			handleContact();
			setForm({
				name: { ...form.name,value: "",error: false,msg: "" },
				phone: { ...form.phone,value: "",error: false,msg: "" },
				email: { ...form.email,value: "",error: false,msg: "" },
				contactmessenger: { ...form.contactmessenger,value: "",error: false,msg: "" }
			});
			setErrorMsg("");
		}
	};

	useEffect(() => {
		if (isSuccess) {
			message.success()
			clearForm();
		} else if (isError) {
			message.error()
		}
	},[isSuccess,isError])
	return (
		<>
			<Loading isLoading={isLoading || loading}>

				<CarouselComponent />
				<Container maxWidth="xl" sx={{ overflow: 'hidden' }}>
					<Grid container className={classes.conContent} sx={{ overflow: 'hidden' }}>

						<Grid item xs={12} sm={12} lg={4} className={classes.conInfo} >
							<Typography className={classes.txtHeaderTitle} style={{ color: "#000" }} >  <AnimationComponent style={{ color: "#000" }} type="text" text={t('get_in_touch')} className={classes.txtHeaderTitle} /></Typography>
							<Typography className={classes.txtTilteInfoContact} >Nếu bạn đang quan tâm đến các thông tin về đàn guitar, hãy liên hệ ngay với chúng tôi. Ngoài ra, chúng tôi còn cung cấp dịch vụ về làm web cho cá nhân hoặc tổ chức, chúng tôi sẵn sàng hợp tác và mang đến cho bạn một trang web chất lượng. Bên cạnh đó, nếu bạn có bất kỳ lời nhắn hoặc câu hỏi nào, vui lòng để lại tại đây. Chúng tôi sẽ nhanh chóng phản hồi và giải đáp mọi thắc mắc của bạn.</Typography>

							{/* <Typography className={classes.txtDesTitleSignUp}>  <AnimationComponent type="text" text="Already have an account? " className={classes.txtDesTitleSignUp} /><Typography className={classes.txtDesTitleSignUpLight}><AnimationComponent type="text" text="Sign in" className={classes.txtDesTitleSignUpLight} /></Typography></Typography> */}
						</Grid>
						<Grid item xs={12} sm={12} lg={4} className={classes.conCard} sx={{ marginTop: { xs: "0px",xl: "30px !important",md: "30px" } }}>
							<Box className={classes.conLogin}>
								<Box className={classes.conForm}>

									<Box className={classes.conItemInput}>
										<Typography className={classes.txtTitleInput}>{t('name')}</Typography>
										<InputForm style={{ border: !form.name.isFocus && `2px solid ${form.name.error ? Colors.danger : form.name.value.trim() !== '' ? Colors.success : 'transparent'}` }}
											className={classes.conInput}
											placeholder={t('name')}
											fontSize={20}
											color={Colors.primary}
											onFocus={() => onBlurFocusInput(true,'name')}
											onBlur={() => onBlurFocusInput(false,'name')}
											value={name} onChange={handleOnChangeName}
										/>
									</Box>
									<Box className={classes.conItemInput}>
										<Typography className={classes.txtTitleInput}>{t('phone')}</Typography>
										<InputForm style={{ border: !form.phone.isFocus && `2px solid ${form.phone.error ? Colors.danger : form.phone.value.trim() !== '' ? Colors.success : 'transparent'}` }}
											className={classes.conInput}
											placeholder={t('phone')}
											fontSize={20}
											color={Colors.primary}
											onFocus={() => onBlurFocusInput(true,'phone')}
											onBlur={() => onBlurFocusInput(false,'phone')}
											value={phone} onChange={handleOnChangePhone}
										/>
									</Box>


									<Box className={classes.conItemInput}>
										<Typography className={classes.txtTitleInput}>{t('email')}</Typography>
										<InputForm style={{ border: !form.email.isFocus && `2px solid ${form.email.error ? Colors.danger : form.email.value.trim() !== '' ? Colors.success : 'transparent'}` }}
											className={classes.conInput}
											placeholder={t('email')}
											onFocus={() => onBlurFocusInput(true,'email')}
											onBlur={() => onBlurFocusInput(false,'email')}
											value={email} onChange={handleOnChangeEmail}
										/>
									</Box>

									<Box className={classes.conItemInput}>
										<Typography className={classes.txtTitleInput}>{t('contactmessenger')}</Typography>
										<InputForm style={{ border: !form.contactmessenger.isFocus && `2px solid ${form.contactmessenger.error ? Colors.danger : form.contactmessenger.value.trim() !== '' ? Colors.success : 'transparent'}` }}
											className={classes.conInputMessage}
											placeholder={t('type_your_message')}
											fontSize={20}
											value={contactmessenger}
											onFocus={() => onBlurFocusInput(true,'contactmessenger')}
											onBlur={() => onBlurFocusInput(false,'contactmessenger')}
											onChange={handleOnChangeMessage}
										/>
									</Box>
								</Box>


								{/* <Typography className={classes.txtDesTitle}>{t('txt_agree')}</Typography> */}
								{data?.status === 'ERR' && <span>{data?.message}</span>}
								<Loading isLoading={isLoading}>
									<CButton style={{ fullWidth: "30%" }}
										disabled={!name.length || !email.length || !contactmessenger.length}
										title={t('send_message')}
										onClick={onValidate}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												onValidate();
											}
										}}
									/>

								</Loading>
							</Box>

						</Grid>
					</Grid>
				</Container>

			</Loading>

		</>

	);
};

export default ContactPage;
