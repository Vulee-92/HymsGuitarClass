import { Box,Container,Grid,IconButton,InputBase,Link,Paper,Typography } from '@mui/material'
import React from 'react'
import styles from "./stylemui";
import * as ProductService from "../../services/ProductService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useDispatch,useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import Loading from '../LoadingComponent/Loading';
import { resetUser } from "../../redux/slides/userSlide";
import * as UserService from "../../services/UserService";
import { useNavigate } from 'react-router';
const FooterComponent = () => {
	const classes = styles();
	const navigate = useNavigate()
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const fetchProductAll = async (context) => {
		const limit = context?.queryKey && context?.queryKey[1];
		const search = context?.queryKey && context?.queryKey[2];
		const res = await ProductService.getAllProduct(search,limit);

		return res;
	};
	const goToHome = () => {
		navigate("/order");
	}
	const goToProduct = () => {
		navigate("/product");
	}
	const goToAbout = () => {
		navigate("/about");
	}
	const goToContact = () => {
		navigate("/contact");
	}
	const goToLogin = () => {
		navigate("/login");
	}

	const goToProfile = () => {
		navigate("/profile");
	}
	const goToMyOrder = () => {
		navigate("/my-order");
	}
	const goToSignIn = () => {
		navigate("/sign-up");
	}

	// const handleNavigateLogout = async () => {
	// 	await UserService.logoutUser();
	// 	dispatch(resetUser());
	// 	// Xoá cookie
	// 	localStorage.removeItem('refresh_token');
	// 	localStorage.removeItem('access_token');
	// 	document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	// };
	const handleNavigateLogout = () => {
		UserService.logoutUser();
		dispatch(resetUser());
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('access_token');
		document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	};
	const {
		isLoading,
		data: products,
	} = useQuery([],fetchProductAll,{
		retry: 3,
		retryDelay: 100,
		keepPreviousData: true,
	});
	return (
		<Box>
			{products && (
				<Box
					component="footer"
					className={classes.footer}
				>
					<Container className={classes.container}>
						<Grid container spacing={5}>
							<Grid item xs={12} sm={4} >
								<Typography className={classes.nameProduct} onClick={goToHome}>
									Hymns
								</Typography>
								<Typography className={classes.txtTilte}>
									Trang web chính thức của Hymns. Cảm ơn bạn đã ghé thăm!
								</Typography>
							</Grid>
							<Grid item xs={12} sm={2}>
								<Typography className={classes.nameProduct}>
									Trang
								</Typography>
								<Typography className={classes.txtTilte} onClick={goToAbout}>
									Giới thiệu
								</Typography>
								<Typography className={classes.txtTilte} onClick={goToProduct}>
									Sản phẩm
								</Typography>
								<Typography className={classes.txtTilte} onClick={goToContact}>
									Liên hệ
								</Typography>
							</Grid>
							<Grid item xs={12} sm={2}>
								<Typography className={classes.nameProduct}>
									Tài khoản
								</Typography>

								{user?.access_token ? (
									<>
										<Typography className={classes.txtTilte} onClick={goToProfile}>
											Thông tin tài khoản
										</Typography>
										<Typography className={classes.txtTilte} onClick={goToMyOrder}>
											Đơn hàng của bạn
										</Typography>
										<Typography className={classes.txtTilte} onClick={handleNavigateLogout}>
											Đăng xuất
										</Typography>
									</>
								) : (
									<>
										<Typography className={classes.txtTilte} onClick={goToLogin}>
											Đăng nhập
										</Typography>
										<Typography className={classes.txtTilte} onClick={goToSignIn}>
											Đăng ký
										</Typography>
									</>

								)}

							</Grid>
							<Grid item xs={12} sm={4}>
								<Typography className={classes.nameProduct} >
									Đăng ký
								</Typography>
								<Typography className={classes.txtTilte}>

									Đăng ký để nhận nội dung độc quyền và tin tức mới nhất
								</Typography>
								<Paper
									className={classes.inputEmail}
									component="form"
									sx={{ display: 'flex',alignItems: 'left',width: 350 }}
								>
									<InputBase
										className={classes.inputEmailBase}
										sx={{ ml: 1,flex: 1 }}
										placeholder="Enter email address"
										inputProps={{ 'aria-label': 'Enter email address' }}
									/>
									<IconButton className={classes.customSendEmail} type="button" aria-label="search">
										<FontAwesomeIcon icon={faPaperPlane} />
									</IconButton>

								</Paper>
							</Grid>
						</Grid>
						<Box mt={5}>
							<Typography className={classes.txtCopyRight} align="center">
								{" © "}
								<Link className={classes.txtCopyRightLink} color="inherit" href="/">
									Hymns. All Rights Reserved
								</Link>{" "}
								{new Date().getFullYear()}
							</Typography>
						</Box>
					</Container>
				</Box>
			)}
		</Box>
	)
}

export default FooterComponent