import React from "react";
import {
	Box,
	Grid,
	Input,
	InputAdornment,
	Typography,
} from "@mui/material";

import { Colors } from "../../utils/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate } from "react-router-dom";

import Loading from "../../components/LoadingComponent/Loading";

/** COMPONENTS */
import CButton from "../../components/CButton";
/** STYLES */
import styles from "./style";
import CarouselComponent from "components/CarouselComponent/CarouselComponent";


const SendEmailForgotPasswordSuccess = () => {

	const navigate = useNavigate();
	const classes = styles();

	const handleNavigateSignUp = () => {
		navigate("/sign-in");
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
							onClick={handleNavigateSignUp}
							className={classes.txtDesTitle}
							sx={{ fontSize: { xs: "14px !important",xl: "18px" } }}
						>
							Trong vài phút nữa, bạn sẽ có thể đặt lại mật khẩu tài khoản của mình. Nhấp vào liên kết trong email và thực hiện các bước hướng dẫn.
						</Typography>
						<Typography
							onClick={handleNavigateSignUp}
							className={classes.txtDesTitle}
							sx={{ fontSize: { xs: "14px !important",xl: "18px" } }}
						>
							Nếu bạn vẫn chưa nhận được email, hãy đợi vài giây hoặc kiểm tra thư mục spam của bạn.
						</Typography>




					</Box>
				</Grid>
			</Grid>
		</>

	);
};

export default SendEmailForgotPasswordSuccess;
