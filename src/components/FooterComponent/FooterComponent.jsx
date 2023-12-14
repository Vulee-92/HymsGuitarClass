import { Box,Button,Container,Grid,IconButton,InputBase,Link,Paper,Typography } from '@mui/material'
import React from 'react'
import styles from "./stylemui";
import * as ProductService from "../../services/ProductService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane,faFacebook } from '@fortawesome/free-solid-svg-icons';
import { useDispatch,useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import Loading from '../LoadingComponent/Loading';
import { resetUser } from "../../redux/slides/userSlide";
import * as UserService from "../../services/UserService";
import { useNavigate } from 'react-router';
import { AddBoxOutlined } from '@mui/icons-material';
const FooterComponent = () => {
	const classes = styles();
	const navigate = useNavigate()
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const goToHome = () => {
		navigate("/order");
	}
	const goToProduct = () => {
		navigate("/product");
	}
	const goToAbout = () => {
		navigate("/about");
	}
	const goToNews = () => {
		navigate("/blog");
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

	return (
		<Box>
			<Box
				component="footer"
				className={classes.footer}
			>
				<Box className={classes.blockHymnsInsider}>
					<Container maxWidth='lg'>
						<Box className={classes.innerInsider}>
							<Grid container>
								<Grid item xs={12} sm={12} xl={7} md={12} >
									<Typography className={classes.txtFooterInsider} sx={{ fontSize: {} }}>
										Trở thành thành viên đặc biệt của Hymns
									</Typography>
									<Box >

										<Typography className={classes.txtTilteInsider}>
											Đăng ký ngay để nhận các email với cơ hội nhận giải thưởng đàn guitar, ưu đãi hấp dẫn, tin tức về guitar và nhiều hơn nữa từ Hymns Center!
										</Typography>
									</Box>
								</Grid>

								<Grid item xs={12} sm={2} xl={5} sx={{ textAlign: { xl: "right",xs: "left" },marginTop: 3 }}>
									<Button
										className={classes.btnLoginHeader}
										onClick={goToSignIn}
									>
										Đăng ký
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Container>
				</Box>
				{/* <Box className={classes.blockFooterConnect}>
					<Container maxWidth='lg'>
						<Grid container>

							<Box className={classes.innerConnect} sx={{
								width: {
									xl: "100%",md: "100%"
								},justifyContent: { xl: "flex-start" }
							}}>
								<Typography className={classes.txtFooterConnect
								} sx={{ fontSize: {} }}>
									Kết nối với Hymns
								</Typography>
								
								<Grid item xs={12} sm={2} xl={4}>

								</Grid>
							</Box>
						</Grid>

					</Container>
				</Box > */}
				<Box className={classes.blockFooterConnect} sx={{ paddingTop: "30px" }}>
					<Container maxWidth='lg'>



						<Grid container sx={{ padding: "0px 13px" }}>
							<Grid item xs={12} sm={3} sx={{ marginBottom: { xl: "0",xs: "20px" } }}>
								<Typography className={classes.nameProduct} onClick={goToHome}>
									Hymns
								</Typography>
								<Typography className={classes.txtTilte} sx={{ lineHeight: 2,width: { md: "80%",xs: "100%" } }}>
									Trang web chính thức của Hymns. Cảm ơn bạn đã ghé thăm!
								</Typography>
								<Grid item xs={12} sm={12} xl={8} md={12} >
									<Grid container sx={{ justifyContent: { xl: "flex-start",md: "flex-start",xs: "flex-start" } }}>
										<Grid item xs={12} sm={2} xl={4} sx={{ maxWidth: { xl: "13% !important",xs: "30%" } }}>
											<Link className={classes.IconConnect} href="https://www.facebook.com/hymnscenter/" target="_blank">
												<svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 512 512"><path fill="#6c7a87" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" /></svg>
											</Link>

										</Grid>
										<Grid item xs={12} sm={2} xl={4} sx={{ maxWidth: { xl: "13% !important",xs: "30%" } }}>
											<Link className={classes.IconConnect} href="https://www.instagram.com/hymnscenter/" target="_blank">
												<svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 448 512">
													<path fill="#6c7a87" d=" M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
											</Link>
										</Grid>
										<Grid item xs={12} sm={2} xl={4} sx={{ maxWidth: { xl: "13% !important",xs: "30%" } }}>
											<Link className={classes.IconConnect} href="https://www.youtube.com/@Vuleebithanh/videos" target="_blank">
												<svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 576 512"><path fill="#6c7a87" d=" M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" /></svg>
											</Link>
										</Grid>
										{/* <Grid item xs={12} sm={2} xl={4} sx={{ maxWidth: { xl: "13% !important",xs: "30%" } }}>
											<Typography className={classes.IconConnect}>
												<Box className={classes.borderIconConnect} >
													<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" >
														<path fill="#e9e6e0" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg>
												</Box>
												<Typography className={classes.txtTilteConnect}>FACEBOOK</Typography>
											</Typography>
										</Grid> */}
									</Grid>

								</Grid>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Typography className={classes.nameProduct}>
									Trang
								</Typography>
								<Typography className={classes.txtTilte} onClick={goToAbout}>
									Giới thiệu
								</Typography>
								<Typography className={classes.txtTilte} onClick={goToProduct}>
									Sản phẩm
								</Typography>
								<Typography className={classes.txtTilte} onClick={goToNews}>
									Tin tức
								</Typography>
								<Typography className={classes.txtTilte} onClick={goToContact}>
									Liên hệ
								</Typography>
							</Grid>
							<Grid item xs={12} sm={3}>
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
							<Grid item xs={12} sm={3}>
								<Typography className={classes.nameProduct} >
									Đăng ký
								</Typography>
								<Typography className={classes.txtTilte} sx={{ lineHeight: 2 }}>

									Đăng ký để nhận nội dung độc quyền và tin tức mới nhất
								</Typography>
								<Paper
									className={classes.inputEmail}
									component="form"
									sx={{ display: 'flex',alignItems: 'left',width: { xs: 300,xl: 270,md: 270 } }}
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
			</Box >

		</Box >
	)
}

export default FooterComponent