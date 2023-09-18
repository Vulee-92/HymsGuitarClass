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
	Typography,
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
import AnimationComponent from "components/AnimationComponent/AnimationComponent";

const ProfileScreen = () => {
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
	const mutation = useMutationHooks((data) => {
		const { id,access_token,...rests } = data;
		UserService.updateUser(id,rests,access_token);
	});
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

	useEffect(() => {
		if (isSuccess) {
			message.success();
			handleGetDetailsUser(user?.id,user?.access_token);
		} else if (isError) {
			message.error();
		}
	},[isSuccess,isError]);

	const handleGetDetailsUser = async (id,token) => {
		const res = await UserService.getDetailsUser(id,token);
		dispatch(updateUser({ ...res?.data,access_token: token }));
	};
	const handleUpdate = () => {
		mutation.mutate({
			id: user?.id,
			name: form.name.value,
			email: form.email.value,
			phone,
			address,
			password,
			avatar,
			access_token: user?.access_token,
		});
	};

	const [form,setForm] = useState({
		name: {
			value: "",
			isFocus: false,
			msg: "",
			error: false,
		},
		email: {
			value: "",
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
			email: {
				...form.email,
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

		<Loading isLoading={isLoading || loading}>
			<Box className={classes.container}>
				<Typography className={classes.conTextCreate}>  <AnimationComponent type="text" text="My Account" className={classes.conTextCreate} /></Typography>
			</Box>
			<Grid className={classes.conContent}>
				<Grid item xs={12} sm={6} lg={4} className={classes.conCard}>
					<Box className={classes.conLogin}>
						<Typography className={classes.txtHeaderTitle}>
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
							</Box>
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
						<Loading isLoading={isLoading}>

							<CButton style={{ fullWidth: "30%" }}
								// disabled={!name.length || !email.length || !password.length}
								title={t('save')}
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
		</Loading>
	);
};

export default ProfileScreen;
