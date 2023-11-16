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
import moment from 'moment';
import 'moment/locale/vi'; // Import ngôn ngữ tiếng Việt của Moment.js

/** COMMON */
// import { useDispatch, useSelector } from 'react-redux'
import * as UserService from "../../services/UserService";
import * as OrderService from '../../services/OrderService'
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
import { Assets } from "configs";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useLocation,useNavigate } from "react-router-dom";
import OrderTable from "components/FooterComponent/TableOrderComponent/TableOrderComponent";
import { useQuery } from "@tanstack/react-query";

const ProfileScreen = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { state } = location
	console.log("state",state)
	const classes = styles();
	const { t } = useTranslation();
	console.log(state)

	const user = useSelector((state) => state.user);
	console.log("user",user)
	const [email,setEmail] = useState("");
	const [name,setName] = useState("");
	const [phone,setPhone] = useState("");
	const [password,setPassword] = useState("");
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



	const handleGetDetailsUser = async (id,token) => {
		const res = await UserService.getDetailsUser(id,token);
		dispatch(updateUser({ ...res?.data,access_token: token }));
	};


	const handleUpdate = () => {
		mutation.mutate({
			id: user?.id,
			name: form.name.value,
			// email: form.email.value,q
			password: form.password.value,
			access_token: user?.access_token,
		});
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
		},
		email: {
			value: user?.email,
			isFocus: false,
			msg: "",
			error: false,
		},
		password: {
			value: user?.password,
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
	const handleToChangePassword = () => {
		navigate("/change-password")
	}

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
		// if (form.email.value.trim() === "") {
		// 	isError = true;
		// 	form.email.error = true;
		// 	form.email.msg = t("txt_error_name_empty");
		// }
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
	const formattedTime = moment(user?.createdAt).locale('vi');

	let timeOfDay;
	const hour = formattedTime.hour();

	if (hour >= 6 && hour < 12) {
		timeOfDay = <Typography>am</Typography>;
	} else if (hour >= 12 && hour < 18) {
		timeOfDay = 'pm';
	} else {
		timeOfDay = 'pm';
	}
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
				<Typography className={classes.conTextCreate}>  <AnimationComponent type="text" text="Thông tin tài khoản" className={classes.conTextCreate} /></Typography>
			</Box>
			<Grid className={classes.conContent}>
				<Grid item xs={12} sm={6} lg={4} className={classes.conCard}>
					<Box className={classes.conLogin}>
						<Grid container>
							<Grid item xs={12} sm={6} lg={4} xl={1}>
								<img src={Assets.logoUser} alt="avatar" style={{
									height: '50px',
									width: '50px',
									borderRadius: '50%',

									objectFit: 'cover'
								}} />
							</Grid>
							<Grid item xs={12} sm={6} lg={4} xl={7} >
								<Typography className={classes.txtTitleInput}>
									<strong style={{ color: "#0b2238" }}>{user?.name}</strong>
								</Typography>
								<Typography className={classes.txtTitleInput}>
									<strong style={{ color: "#0b2238" }}>Email:</strong> {user?.email}
								</Typography>
								<Typography className={classes.txtTitleInput}>
									<strong style={{ color: "#0b2238" }}>Thành viên từ:</strong> {formattedTime.format(`DD [tháng] M, YYYY, h`)}
									{timeOfDay}
									{timeOfDay !== 'pm' && <Typography>{timeOfDay}</Typography>}
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6} lg={4} xl={4} sx={{ display: "flex",alignItems: "center",justifyContent: "flex-end" }}>
								<Typography className={classes.txtTitleInput} onClick={handleToChangePassword}>
									<FontAwesomeIcon
										icon={faLock}
										fontSize={20}
										color={"#436E67"}
										className={classes.conIconInput}
									/>Thay đổi thông tin
								</Typography>
							</Grid>
						</Grid>


					</Box>
				</Grid>
				<Typography className={classes.txtHeaderTitle}> Đơn hàng</Typography>
				<Grid item xs={12} sm={6} lg={4} className={classes.conCard}>
					<Box className={classes.conLogin}>
						<Grid container>
							<Grid item xs={12} sm={6} lg={4} xl={12} sx={{ display: "flex",alignItems: "center",justifyContent: "flex-start" }}>
								<Typography className={classes.txtTitleInputOrderNew} onClick={handleToChangePassword}>
									Đơn hàng mới nhất
								</Typography>
							</Grid>
						</Grid>


					</Box>
					<OrderTable />

				</Grid>

			</Grid>
		</Loading>
	);
};

export default ProfileScreen;
