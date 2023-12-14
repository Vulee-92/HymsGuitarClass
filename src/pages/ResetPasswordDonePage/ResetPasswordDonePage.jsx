/** LIBRARY */
import React,{ useEffect,useState } from "react";
import {
	Box,
	Input,
	Grid,
	InputAdornment,
	Typography,
	Container,
	Button,
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
import { useDispatch,useSelector } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";
import Loading from "../../components/LoadingComponent/Loading";
import CButton from "../../components/CButton";
import AnimationComponent from "components/AnimationComponent/AnimationComponent";
import { Assets } from "configs";
import { faArrowLeftLong,faCircleCheck,faLock } from "@fortawesome/free-solid-svg-icons";
import { useLocation,useNavigate } from "react-router-dom";
import OrderTable from "components/FooterComponent/TableOrderComponent/TableOrderComponent";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { LoadingButton } from "@mui/lab";
import CarouselComponent from "components/CarouselComponent/CarouselComponent";

const ResetPasswordDonePage = () => {
	const navigate = useNavigate()
	const classes = styles();
	const { t } = useTranslation();
	const [loading,setLoading] = useState(false);
	const handleToLogin = () => {
		setLoading(true);
		navigate("/login")
		setLoading(false)
	}
	return (

		<>
			<Helmet>
				<title> Verify Email </title>
			</Helmet>
			<CarouselComponent />


			<Grid container style={{ marginTop: "60px" }}>
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
					<Box className={classes.boxCard}>
						<Box
							className={classes.conCard}
						>
							<Box
								className={classes.conTickDone}
							>
								<FontAwesomeIcon
									icon={faCircleCheck}
									fontSize={25}
									color={"#436E67"}
								/>
							</Box>
							<Typography className={classes.txtHeaderTitle}> Đổi mật khẩu thành công!</Typography>
							<Typography className={classes.txtTitleInput}>

								Bây giờ bạn có thể truy cập tài khoản của mình và tận hưởng tất cả nội dung!
							</Typography>
							<LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading} onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleToLogin();
								}
							}}
								onClick={() => handleToLogin()}
								className={classes.customLoadingButton}
							>Login</LoadingButton>
						</Box>

					</Box>

				</Grid>
			</Grid>
		</>


	);
};

export default ResetPasswordDonePage;
