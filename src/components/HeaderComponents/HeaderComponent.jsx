import React,{ Fragment,useEffect,useRef,useState } from "react";

import { Badge,Col,Popover } from "antd";
import Button from "@mui/material/Button";
import * as ProductService from "../../services/ProductService";
// import Search from 'antd/es/input/Search'
import { resetUser } from "../../redux/slides/userSlide";

import { UserOutlined,ShoppingCartOutlined } from "@ant-design/icons";
import ButttonInputSearch from "../ButttonInputSearch/ButttonInputSearch";
import { unstable_HistoryRouter,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import { Assets,Configs,Keys } from "../../configs";
import { styled } from "@mui/material/styles";
import Loading from "../LoadingComponent/Loading";
import Switch from "@mui/material/Switch";
import {
	Menu,
	MenuItem,
	Grid,
	Typography,
	FormControlLabel,
	Stack,
	FormGroup,
	Icon,
	Skeleton,
	CardMedia,
	Drawer,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ProfileScreen from "../../pages/profile";
import styles from "./stylemui";
import "../../App.css";
import { searchProduct } from "../../redux/slides/productSlide";
import { Header } from "antd/es/layout/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered,faTimes,faXmark,faUser,faX,faRightFromBracket,faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import i18n from "../../utils/languages/i18n";
import { Helpers } from "../../utils/helpers";

const HeaderComponent = ({ isHiddenSearch = false,isHiddenCart = true }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const classes = styles();
	const { t } = useTranslation();
	const user = useSelector((state) => state.user);
	const order = useSelector((state) => state.order);
	const [userName,setUserName] = useState("");
	const [search,setSearch] = useState("");
	const [userAvatar,setUserAvatar] = useState("");
	const [loading,setLoading] = useState(false);
	const [lang,setLang] = useState(Helpers.getDataStorage(Keys.lang) || 'vi');
	const [isDrawerOpen,setIsDrawerOpen] = useState(false);
	const [isPageLoaded,setIsPageLoaded] = useState(false);
	const [currentIcon,setCurrentIcon] = useState(faBarsStaggered);
	const [anchorEl,setAnchorEl] = useState(null);

	const handleMouseOver = (event) => {
		setAnchorEl(event.currentTarget);
		setMenuOpen(true);
	};

	useEffect(() => {
		// Simulate page loading time
		const timeout = setTimeout(() => {
			setIsPageLoaded(true);
		},2000);

		// Clear the timeout when the component unmounts or when the page is loaded
		return () => clearTimeout(timeout);
	},[]);

	const handleToggleDrawer = () => {
		if (isPageLoaded) {
			setIsDrawerOpen((prev) => !prev);
			setCurrentIcon((prevIcon) =>
				prevIcon === faBarsStaggered ? faTimes : faBarsStaggered
			);
		}
	};

	const handleCloseDrawer = () => {
		setIsDrawerOpen(false);
		setCurrentIcon(faBarsStaggered);
	};


	const handleClose = () => {
		if (menuOpen) {
			setAnchorEl(null);
			setMenuOpen(false);
		}
	};
	const handleNavigateLogin = () => {
		navigate("/login");
	};
	const handleNavigateProfile = () => {
		navigate("/profile");
	};

	const handleNavigateSignIn = () => {
		navigate("/sign-up");
	};
	const [colorChange,setColorchange] = useState(false);
	const changeNavbarColor = () => {
		if (window.scrollY >= 80) {
			setColorchange(true);
		} else {
			setColorchange(false);
		}
	};
	window.addEventListener("scroll",changeNavbarColor);

	const handleNavigateLogout = async () => {
		setLoading(true);
		await UserService.logoutUser();
		dispatch(resetUser());
		// Xoá cookie
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('access_token');
		document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		setLoading(false);
	};

	useEffect(() => {
		setLoading(true);
		setUserName(user?.name);
		// setUserAvatar(user?.avatar);
		setLoading(false);
	},[user?.name]);

	const open = Boolean(anchorEl);




	const [anchorElUser,setAnchorElUser] = React.useState(null);
	const [menuOpen,setMenuOpen] = useState(false);
	const [isOpenPopup,setIsOpenPopup] = useState(false)

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const menuItems = [
		{ path: '/',label: t('home') },
		{ path: '/product',label: t('product') },
		{ path: '/about',label: t('about') },
		{ path: '/blog',label: t('blog') },
		{ path: '/contact',label: t('contact') },
	];

	const handleMenuItemClick = (path) => {
		setIsDrawerOpen(!isDrawerOpen);
		navigate(path);
	};


	const content = (

		<div>
			<Loading isLoading={loading}>
				<Box
					id="basic-button"
					aria-controls={open ? "basic-menu" : undefined}
					aria-haspopup="menu"
					aria-expanded={open ? "true" : undefined}
					onMouseOver={handleMouseOver}

				>
					<Typography className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}>
						{userName?.length ? userName : user?.email}
					</Typography>
				</Box>
				<Menu
					id="basic-menu"
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleClose}
					style={{ marginTop: "30px" }}
				>
					<Typography className={classes.txtInfoUser}>THÔNG TIN TÀI KHOẢN</Typography>
					<MenuItem onClick={() => handleClickNavigate('profile')}>  <Typography className={classes.txtTilte}>Tài khoản của bạn </Typography></MenuItem>
					{user?.isAdmin && (
						<MenuItem onClick={() => handleClickNavigate('admin')}>
							<Typography className={classes.txtTilte}>
								quản lý
							</Typography>
						</MenuItem>
					)}
					<MenuItem onClick={() => handleClickNavigate(`profile`)}>
						<Typography className={classes.txtTilte}>
							Đơn hàng của bạn
						</Typography>
					</MenuItem>
					<MenuItem onClick={() => handleClickNavigate()}>
						<Typography className={classes.txtTilte}>
							Đăng xuất
						</Typography>
					</MenuItem>
				</Menu>
			</Loading>
		</div>
	);

	// const [lang, setLang] = useState(Helpers.getDataStorage(Keys.lang) || 'en');

	const handleLanguageChange = () => {
		const newLang = lang === 'en' ? 'vi' : 'en';
		setLang(newLang);
		i18n.changeLanguage(newLang);
		Helpers.setDataStorage(Keys.lang,newLang);
	};
	useEffect(() => {
		Helpers.setDataStorage(Keys.language,lang)
		i18n.changeLanguage(lang);
	},[]);

	const LanguageSwitch = styled(Switch)(({ theme,lang }) => ({
		width: 62,
		height: 34,
		padding: 7,
		'& .MuiSwitch-switchBase': {
			margin: 1,
			padding: 0,
			transform: 'translateX(6px)',
			'&.Mui-checked': {
				color: '#fff',
				transform: 'translateX(22px)',
				'& .MuiSwitch-thumb:before': {
					backgroundImage: `url(${lang === 'vi' ? Assets.vnFlag : Assets.usFlag})`,
					width: '100%',
					height: '100%',
					backgroundSize: "cover",
				},
				'& + .MuiSwitch-track': {
					opacity: 1,
					backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
				},
			},
		},
		'& .MuiSwitch-thumb': {
			width: 32,
			height: 32,
			'&:before': {
				content: "''",
				position: 'absolute',
				width: '100%',
				height: '100%',
				left: 0,
				top: 0,
				backgroundImage: `url(${lang === 'vi' ? Assets.usFlag : Assets.vnFlag})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			},
		},
		'& .MuiSwitch-track': {
			opacity: 1,
			backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
			borderRadius: 20 / 2,
		},
	}));




	const handleClickNavigate = (type) => {
		if (type === 'profile') {
			navigate('/profile')
		} else if (type === 'admin') {
			navigate('/system/admin')
		} else if (type === 'my-order') {
			navigate('/my-order',{
				state: {
					id: user?.id,
					token: user?.access_token
				}
			})
		} else {
			handleNavigateLogout()
		}
		setIsOpenPopup(false)
	}
	const onSearch = (e) => {
		setSearch(e.target.value);
		dispatch(searchProduct(e.target.value));
	};
	return (
		<Container maxWidth="xl">
			<AppBar className={colorChange ? classes.colorChangeDark : classes.colorChangeLight}>
				<Container width={{ md: "xs",xl: "xl",lg: "xs" }} style={{ overflow: "hidden" }}>
					<Toolbar disableGutters style={{ display: "flex",justifyContent: "space-between",alignItems: 'center' }}>


						<Box sx={{ flexGrow: 0,display: { xs: "flex",md: "none" },position: "relative",zIndex: 1,overflow: 'auto' }} className={classes.headerHontainer}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								// onClick={(event) => {
								// 	// event.stopPropagation();
								// 	setIsDrawerOpen(!isDrawerOpen);
								// 	setCurrentIcon(isDrawerOpen ? faBarsStaggered : faTimes);
								// }}
								onClick={handleToggleDrawer}
								color="inherit"
							>
								<FontAwesomeIcon icon={currentIcon} style={{ fontSize: "18px" }} />
							</IconButton>
							{/* <Button >{"top"}</Button> */}
							<Drawer anchor="left"
								open={isDrawerOpen} onClose={handleCloseDrawer}
								// onClose={() => setIsDrawerOpen(false)}
								variant="temporary"
								disableScrollLock="false"
								className={classes.menuContent}
								sx={{
									flexGrow: 0,display: { xs: "flex",md: "none" },position: "fixed",
									width: 210,
									flexShrink: 0,
									'& .MuiDrawer-paper': {
										width: 240,
										boxSizing: 'border-box',
										zIndex: 1,top: '80px !important'
									},
								}}
							>

								<MenuItem>
									<Typography className={classes.txtTitleNNavBar} href="/" textAlign="center">Thông tin của bạn</Typography>

								</MenuItem>
								<MenuItem>
									{user?.access_token ? (
										<>
											<FontAwesomeIcon icon={faUser} fontSize="18px" color="#212B36" style={{ marginRight: "16px" }} />
											<Typography onClick={(event) => {
												event.stopPropagation();
												setIsDrawerOpen(!isDrawerOpen);
												handleNavigateProfile()
											}}
												className={classes.txtTilte} >
												{userName?.length ? userName : user?.email}
											</Typography>
										</>
									) : (
										<>
											<FontAwesomeIcon icon={faUser} fontSize="18px" color="#212B36" sx={{ marginRight: "10px" }} />
											<Button onClick={(event) => { event.stopPropagation(); setIsDrawerOpen(!isDrawerOpen); handleNavigateLogin() }}
												className={classes.txtTilte}
											>
												{t('sign_in')}
											</Button>
										</>

									)}

								</MenuItem>
								<MenuItem sx={{ display: !user?.access_token ? "flex" : "none" }} onClick={(event) => { event.stopPropagation(); setIsDrawerOpen(!isDrawerOpen) }}>
									<>
										<FontAwesomeIcon icon={faUser} fontSize="18px" color="#212B36" style={{
											marginRight: "0px",
										}} />
										<Button onClose={() => setIsDrawerOpen(false)}
											onClick={handleNavigateSignIn} className={classes.txtTilte}>
											{t('sign_up')}
										</Button>
									</>
								</MenuItem>
								{user?.access_token ? (
									<>
										{/* <MenuItem onClick={() => handleClickNavigate('profile')}>  <Typography className={classes.txtTilte}>Tài khoản của bạn </Typography></MenuItem> */}
										{user?.isAdmin && (
											<MenuItem onClick={() => handleClickNavigate('admin')}
											>
												<Typography className={classes.txtTilte} onClick={(event) => { event.stopPropagation(); setIsDrawerOpen(isDrawerOpen) }}>
													quản lý
												</Typography>
											</MenuItem>
										)}
										<MenuItem onClick={() => handleClickNavigate(`my-order`)}
										>
											<FontAwesomeIcon icon={faTruckFast} fontSize="18px" color="#212B36" style={{ marginRight: "10px" }} />
											<Typography className={classes.txtTilte} onClick={(event) => { event.stopPropagation(); setIsDrawerOpen(isDrawerOpen) }}>
												Đơn hàng của bạn
											</Typography>
										</MenuItem>
										<MenuItem onClick={() => handleClickNavigate()}
										>
											<FontAwesomeIcon icon={faRightFromBracket} fontSize="18px" color="#212B36" style={{ marginRight: "14px",}} />
											<Typography className={classes.txtTilte} onClick={(event) => { event.stopPropagation(); setIsDrawerOpen(isDrawerOpen) }}>
												Đăng xuất
											</Typography>
										</MenuItem>
									</>

								) : (<></>)}
								<MenuItem>
									<Typography className={classes.txtTitleNNavBar} href="/" textAlign="center">Trang</Typography>
								</MenuItem>
								{menuItems.map((item,index) => (
									<MenuItem key={index} onClick={(event) => { event.stopPropagation(); handleMenuItemClick(item.path); }}>
										<Typography className={classes.txtTilte} textAlign="center">{item.label}</Typography>
									</MenuItem>
								))}
								<MenuItem>
									<Typography className={classes.txtTitleNNavBar} href="/" textAlign="center">{t('language')}</Typography>
								</MenuItem>
								<MenuItem>
									<FormControlLabel
										control={
											<LanguageSwitch
												sx={{ m: 1 }}
												checked={lang === 'en'}
												onClick={handleLanguageChange}
											/>
										}
									/>
								</MenuItem>
							</Drawer>

						</Box>
						<Typography
							href="/"

							sx={{

								display: { xs: "flex",md: "none" },
								flexGrow: 1,
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: "inherit",
								textDecoration: "none"
								// cursor: 'pointer',
							}} className={classes.hymnsName} style={{ justifyContent: "center",color: colorChange ? "#000" : "#fff",}} >HYMNS CENTER</Typography>
						<Box sx={{
							display: { xs: "block",md: "none" }
						}}>
							{/* {!isHiddenCart && user.access_token && ( */}
							<div onClick={() => navigate('/order')} style={{ cursor: 'pointer',display: 'float' }}>
								<Badge count={order?.orderItems?.length} size="small">
									<ShoppingCartOutlined style={{ fontSize: '20px',paddingRight: '5px',color: colorChange ? "#000" : "#fff" }} />

								</Badge>
								{/* <WrapperTextHeaderSmall style={{ fontSize: '16px', color: colorChange ? "#000" : "#fff" }}>Giỏ hàng</WrapperTextHeaderSmall> */}
							</div>
							{/* 
							)
							} */}
						</Box>





						{/* CHO DESKTOP */}
						<Box sx={{ flexGrow: 0,display: { xs: "none",md: "flex" } }} style={{ justifyContent: "space-between",alignItems: 'center' }}>
							<Typography
								href="/"
								sx={{
									fontFamily: "monospace",
									fontWeight: 700,
									letterSpacing: '.3rem',
									color: "inherit",
									textDecoration: "none",
									cursor: 'pointer',
								}} className={classes.hymnsName} style={{ color: colorChange ? "#000" : "#fff",paddingRight: '250px' }} >HYMNS CENTER</Typography>
							<Button
								onClick={() => navigate('/')}
								sx={{ color: "white",display: "block" }}
								className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}
							>
								{t('home')}
							</Button>
							<Button
								onClick={() => navigate('/about')}
								sx={{ color: "white",display: "block" }}
								className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}
							>
								{t('about')}
							</Button>
							<Button
								onClick={() => navigate('/product')}
								sx={{ color: "white",display: "block" }}
								className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}
							>
								{t('product')}
							</Button>

							<Button
								onClick={() => navigate('/blog')}
								sx={{ color: "white",display: "block" }}
								className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}
							>
								{t('blog')}
							</Button>

							<Button
								onClick={() => navigate('/contact')}
								sx={{ color: "white",display: "block" }}
								className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}
							>
								{t('contact')}
							</Button>
						</Box>
						{/* <Box sx={{ flexGrow: 0,display: { xs: "none",md: "flex" } }} style={{ justifyContent: "space-between",alignItems: 'center' }}>
							{!isHiddenSearch && (
								<Col span={13}>
									<ButttonInputSearch
										size="large"
										bordered={false}
										textbutton="Tìm kiếm"
										placeholder="input search text"
										onChange={onSearch}
										backgroundColorButton="#5a20c1"
									/>
								</Col>
							)}
						</Box> */}
						<Box sx={{ flexGrow: 0,display: { xs: "none",md: "flex",xl: "flex" },justifyContent: "center",alignItems: 'center' }} >
							<Box >

								{userAvatar ? (

									<img src={Assets.logoUser} alt="avatar" style={{
										height: '20px',
										width: '20px',
										borderRadius: '50%',
										objectFit: 'cover'
									}} />
								) : (
									<></>
								)}
							</Box>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right"
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right"
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								<MenuItem onClick={handleCloseUserMenu}>
									{userAvatar ? (

										<img src={Assets.logoUser} alt="avatar" style={{
											height: '20px',
											width: '20px',
											borderRadius: '50%',
											objectFit: 'cover'
										}} />
									) : (
										<></>
									)}

								</MenuItem>
								<MenuItem onClick={handleCloseUserMenu}>
									<Typography textAlign="center"></Typography>
								</MenuItem>

							</Menu>
							<MenuItem>

								<Tooltip>


									{/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}> */}
									{user?.access_token ? (
										<>
											<>
												<Popover trigger="click" open={isOpenPopup} >
													<div style={{ cursor: 'pointer',maxWidth: 200,overflow: 'hidden',fontSize: '20px',}} >{content} </div>
												</Popover>
											</>
										</>
									) : (
										<Box onClick={handleNavigateLogin}>
											<Button
												className={classes.btnLoginHeader}
												variant="contained"
												size="medium"
											>
												Login
											</Button>
										</Box>
									)}
									{/* </IconButton> */}
								</Tooltip>
							</MenuItem>
							<MenuItem>
								{/* {!isHiddenCart && user.access_token && ( */}
								<div onClick={() => navigate('/order')} style={{ cursor: 'pointer',display: 'float' }}>
									<Badge count={order?.orderItems?.length} size="small">
										<ShoppingCartOutlined style={{ fontSize: '20px',paddingRight: '5px',color: colorChange ? "#000" : "#fff" }} />

									</Badge>
									{/* <WrapperTextHeaderSmall style={{ fontSize: '16px', color: colorChange ? "#000" : "#fff" }}>Giỏ hàng</WrapperTextHeaderSmall> */}
								</div>

								{/* )
								} */}
							</MenuItem>

							{/* <MenuItem>
								<FormControlLabel
									control={
										<LanguageSwitch
											sx={{ m: 1 }}
											checked={lang === 'en'}
											onClick={handleLanguageChange}
										/>
									}
								/>
							</MenuItem> */}
						</Box>


					</Toolbar>
				</Container>
			</AppBar >
		</Container >

	);


};

export default HeaderComponent;

