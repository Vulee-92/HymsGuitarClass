import React,{ Fragment,useEffect,useMemo,useRef,useState } from "react";
// import JSONLD from 'react-jsonld';

import { Badge,Col,Popover } from "antd";
import Button from "@mui/material/Button";
// import Search from 'antd/es/input/Search'
import { resetUser } from "../../redux/slides/userSlide";

import { UserOutlined,ShoppingCartOutlined } from "@ant-design/icons";
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
import Loading from "../LoadingComponent/Loading";
import {
	Menu,
	MenuItem,
	Typography,
} from "@mui/material";
import { motion } from 'framer-motion';

import { useTranslation } from "react-i18next";
import styles from "./stylemui";
import "../../App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import i18n from "../../utils/languages/i18n";
import { Helpers } from "../../utils/helpers";
import Nav from "./dashboard/nav";
// import debounce from 'lodash/debounce'
import _ from 'lodash';
import SearchComponent from "components/SearchComponent/SearchComponent";




const HeaderComponent = ({ isHiddenSearch = false,isHiddenCart = true }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const classes = styles();
	const { t } = useTranslation();
	const user = useSelector((state) => state.user);
	const order = useSelector((state) => state.order);
	const [userName,setUserName] = useState("");
	const [search,setSearch] = useState('');
	const [productsSearch,setProductsSearch] = useState([]);
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
		setOpen(true)
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

	const [open,setOpen] = useState(false);
	const [menuOpen,setMenuOpen] = useState(false);
	const [isOpenPopup,setIsOpenPopup] = useState(false)
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
	useEffect(() => {
		Helpers.setDataStorage(Keys.language,lang)
		i18n.changeLanguage(lang);
	},[]);
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
	useEffect(() => {
		// Xóa giá trị của productsSearch khi giá trị search thay đổi
		return () => {
			setProductsSearch(null); // Giả sử setProductsSearch là hàm để cập nhật giá trị productsSearch
		};
	},[search]);
	const [anchorElSearchs,setAnchorElSearchs] = React.useState(null);


	return (
		<Container maxWidth="xl">
			<AppBar className={colorChange ? classes.colorChangeDark : classes.colorChangeDark}>
				<Container width={{ md: "xs",xl: "xl",lg: "xs" }} style={{ overflow: "hidden" }}>
					<Toolbar disableGutters style={{ display: "flex",justifyContent: "space-between",alignItems: 'center' }}>
						<Box sx={{ flexGrow: 0,display: { xs: "flex",md: "none" },position: "relative",zIndex: 1,overflow: 'auto' }} className={classes.headerHontainer}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleToggleDrawer}
								color="inherit"
							>
								<FontAwesomeIcon icon={currentIcon} style={{ fontSize: "18px" }} />
							</IconButton>
							<Nav openNav={open} onCloseNav={() => setOpen(false)} />
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
							}} className={classes.hymnsName} style={{ justifyContent: "flex-start",color: colorChange ? "#000" : "#000",fontSize: "1.1rem",lineHeight: 0 }} >HYMNS CENTER</Typography>
						<Box sx={{
							display: { xs: "block",md: "none" }
						}}>
							<SearchComponent />

							{/* <Searchbar /> */}
						</Box>

						<Box sx={{
							display: { xs: "block",md: "none" }
						}}>
							<div onClick={() => navigate('/order')} style={{ cursor: 'pointer',display: 'float' }}>
								<Badge count={order?.orderItems?.length} size="small">
									<ShoppingCartOutlined style={{ fontSize: '20px',paddingRight: '5px',color: colorChange ? "#000" : "#000" }} />
								</Badge>
							</div>
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
								}} className={classes.hymnsName} style={{ color: colorChange ? "#000" : "#000",paddingRight: '100px' }} >HYMNS CENTER</Typography>

							<Box sx={{ flexGrow: 0,display: { xs: "none",md: "flex" } }} style={{ justifyContent: "flex-start",alignItems: 'center' }}>

								<Button
									onClick={() => navigate('/')}
									sx={{ color: "white",display: "block" }}
									className={colorChange ? classes.txtTilteDark : classes.txtTilteDark}
								>
									{t('home')}
								</Button>
								<Button
									onClick={() => navigate('/about')}
									sx={{ color: "white",display: "block" }}
									className={colorChange ? classes.txtTilteDark : classes.txtTilteDark}
								>
									{t('about')}
								</Button>
								<Button
									onClick={() => navigate('/category')}
									sx={{ color: "white",display: "block" }}
									className={colorChange ? classes.txtTilteDark : classes.txtTilteDark}
								>
									{t('product')}
								</Button>

								<Button
									onClick={() => navigate('/blog')}
									sx={{ color: "white",display: "block" }}
									className={colorChange ? classes.txtTilteDark : classes.txtTilteDark}
								>
									{t('blog')}
								</Button>

								<Button
									onClick={() => navigate('/contact')}
									sx={{ color: "white",display: "block" }}
									className={colorChange ? classes.txtTilteDark : classes.txtTilteDark}
								>
									{t('contact')}
								</Button>
							</Box>
						</Box>


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
							<MenuItem sx={{ width: "80px" }}>

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
							<MenuItem sx={{ padding: "0px !important" }}>

								<SearchComponent />
							</MenuItem>



							<MenuItem>
								{/* {!isHiddenCart && user.access_token && ( */}
								<div onClick={() => navigate('/order')} style={{ cursor: 'pointer',display: 'float' }}>
									<Badge count={order?.orderItems?.length} size="small">
										<ShoppingCartOutlined style={{ fontSize: '20px',paddingRight: '5px',color: colorChange ? "#000" : "#000" }} />

									</Badge>
									{/* <WrapperTextHeaderSmall style={{ fontSize: '16px', color: colorChange ? "#000" : "#fff" }}>Giỏ hàng</WrapperTextHeaderSmall> */}
								</div>

								{/* )
								} */}
							</MenuItem>

						</Box>


					</Toolbar>

				</Container>

			</AppBar >
		</Container >

	);


};

export default HeaderComponent;

