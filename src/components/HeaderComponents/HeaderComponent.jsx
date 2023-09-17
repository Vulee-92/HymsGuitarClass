import React,{ Fragment,useEffect,useState } from "react";
import {
	MobileIcon,
	Nav,
	NavContainer,
	NavItem,
	NavLinks,
	NavLogo,
	NavMenu,
	WrapperContentPopup,
	WrapperHeader,
	WrapperHeaderAccout,
	WrapperTextHeader,
	WrapperTextHeaderSmall,
} from "./style";
import { Badge,Col,Popover } from "antd";
import Button from "@mui/material/Button";
import * as ProductService from "../../services/ProductService";
// import Search from 'antd/es/input/Search'
import { resetUser } from "../../redux/slides/userSlide";

import { UserOutlined,ShoppingCartOutlined } from "@ant-design/icons";
import ButttonInputSearch from "../ButttonInputSearch/ButttonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
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
import { ProductCartWidget } from "../../sections/@dashboard/products";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const HeaderComponent = ({ isHiddenSearch = false,isHiddenCart = false }) => {
	const dispatch = useDispatch();
	const [openProfile,setOpenProfile] = useState(false);
	const navigate = useNavigate();
	const classes = styles();
	const { t } = useTranslation();
	const user = useSelector((state) => state.user);
	const order = useSelector((state) => state.order);
	const [userName,setUserName] = useState("");
	const [search,setSearch] = useState("");
	const [userAvatar,setUserAvatar] = useState("");
	const [loading,setLoading] = useState(false);
	const [isMobile,setMobile] = useState(false);
	const [lang,setLang] = useState(Helpers.getDataStorage(Keys.lang) || 'vi');

	const [isDrawerOpen,setIsDrawerOpen] = useState(false);
	const [currentIcon,setCurrentIcon] = useState(faBarsStaggered);


	const handleNavigateLogin = () => {
		navigate("/login");
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
		setLoading(false);
	};

	useEffect(() => {
		setLoading(true);
		setUserName(user?.name);
		setUserAvatar(user?.avatar);
		setLoading(false);
	},[user?.name,user?.avatar]);
	const [anchorEl,setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const [anchorElNav,setAnchorElNav] = React.useState(null);
	const [anchorElUser,setAnchorElUser] = React.useState(null);
	const handleClose = () => {
		setAnchorEl(null);
	};
	const [isOpenPopup,setIsOpenPopup] = useState(false)
	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	const fetchProductAll = async (context) => {
		const limit = context?.queryKey && context?.queryKey[1];
		const search = context?.queryKey && context?.queryKey[2];
		const res = await ProductService.getAllProduct(search,limit);

		return res;
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const {
		isLoading,
		data: products,
	} = useQuery([],fetchProductAll,{
		retry: 3,
		retryDelay: 100,
		keepPreviousData: true,
	});
	const onChangeLanguage = (lang) => {
		setLang(lang);
		i18n.changeLanguage(lang);
		Helpers.setDataStorage(Keys.lang,lang);
	};



	// };

	const content = (

		<div>
			<Loading isLoading={loading}>
				<Box
					id="basic-button"
					aria-controls={open ? "basic-menu" : undefined}
					aria-haspopup="true"
					aria-expanded={open ? "true" : undefined}
					onClick={handleClick}
				>
					<Typography className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}>
						{userName?.length ? userName : user?.email}
					</Typography>
				</Box>
				<Menu
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					hover
					onClose={handleClose}
					MenuListProps={{
						"aria-labelledby": "basic-button",
					}}
					style={{ marginTop: '20px' }}
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
					<MenuItem onClick={() => handleClickNavigate(`my-order`)}>
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
	const settings = ["Profile","Account","Dashboard","Logout"];
	return (
		<Container maxWidth="md">
			<AppBar className={colorChange ? classes.colorChangeDark : classes.colorChangeLight}>
				<Container width={{ md: "xs",xl: "xs",lg: "xs" }} style={{ overflow: "hidden" }}>
					<Toolbar disableGutters style={{ display: "flex",justifyContent: "space-between",alignItems: 'center' }}>


						<Box sx={{ flexGrow: 0,display: { xs: "flex",md: "none" },position: "relative",zIndex: 1,overflow: 'auto' }} className={classes.headerHontainer}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={(event) => {
									event.stopPropagation();
									setIsDrawerOpen(!isDrawerOpen);
									setCurrentIcon(isDrawerOpen ? faBarsStaggered : faTimes);
								}}
								color="inherit"
							>
								<FontAwesomeIcon icon={currentIcon} style={{ fontSize: "18px" }} />
							</IconButton>
							{/* <Button >{"top"}</Button> */}
							<Drawer anchor="left"
								open={isDrawerOpen}
								onClose={() => setIsDrawerOpen(false)}
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
											<FontAwesomeIcon icon={faUser} fontSize="18px" color="#245c4f" style={{ marginRight: "16px" }} />
											<Typography className={classes.txtTilte}>
												{userName?.length ? userName : user?.email}
											</Typography>
										</>
									) : (
										<>
											<FontAwesomeIcon icon={faUser} fontSize="18px" color="#245c4f" sx={{ marginRight: "10px" }} />
											<Button onClick={handleNavigateLogin}
												className={classes.txtTilte}
											>
												{t('sign_in')}
											</Button>
										</>

									)}

								</MenuItem>
								<MenuItem sx={{ display: !user?.access_token ? "flex" : "none" }}>
									<>
										<FontAwesomeIcon icon={faUser} fontSize="18px" color="#245c4f" style={{
											marginRight: "0px",
										}} />
										<Button onClick={handleNavigateSignIn} className={classes.txtTilte}>
											{t('sign_up')}
										</Button>
									</>
								</MenuItem>
								{user?.access_token ? (
									<>
										{/* <MenuItem onClick={() => handleClickNavigate('profile')}>  <Typography className={classes.txtTilte}>Tài khoản của bạn </Typography></MenuItem> */}
										{user?.isAdmin && (
											<MenuItem onClick={() => handleClickNavigate('admin')}>
												<Typography className={classes.txtTilte}>
													quản lý
												</Typography>
											</MenuItem>
										)}
										<MenuItem onClick={() => handleClickNavigate(`my-order`)}>
											<FontAwesomeIcon icon={faTruckFast} fontSize="18px" color="#245c4f" style={{ marginRight: "10px" }} />
											<Typography className={classes.txtTilte} >
												Đơn hàng của bạn
											</Typography>
										</MenuItem>
										<MenuItem onClick={() => handleClickNavigate()}>
											<FontAwesomeIcon icon={faRightFromBracket} fontSize="18px" color="#245c4f" style={{ marginRight: "14px",}} />
											<Typography className={classes.txtTilte} >
												Đăng xuất
											</Typography>
										</MenuItem>
									</>

								) : (<></>)}
								<MenuItem>
									<Typography className={classes.txtTitleNNavBar} href="/" textAlign="center">Xem thêm</Typography>
								</MenuItem>
								<MenuItem onClick={handleCloseNavMenu}>
									<Button className={classes.txtTilte} href="/" textAlign="center">{t('home')}</Button>
								</MenuItem>
								<MenuItem onClick={handleCloseNavMenu}>
									<Button className={classes.txtTilte} href="/product" textAlign="center">{t('product')}</Button>
								</MenuItem>
								<MenuItem onClick={handleCloseNavMenu}>
									<Button className={classes.txtTilte} href="/about" textAlign="center">{t('about')}</Button>
								</MenuItem>
								<MenuItem onClick={handleCloseNavMenu}>
									<Button className={classes.txtTilte} href="/contact" textAlign="center">{t('blog')}</Button>
								</MenuItem>
								<MenuItem onClick={handleCloseNavMenu}>
									<Button className={classes.txtTilte} href="/contact" textAlign="center">{t('contact')}</Button>
								</MenuItem>
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
							}} className={classes.hymnsName} style={{ justifyContent: "center",color: colorChange ? "#000" : "#fff",}} >HYMNS</Typography>
						<Box sx={{
							display: { xs: "block",md: "none" }
						}}>
							{!isHiddenCart && user.access_token && (
								<div onClick={() => navigate('/order')} style={{ cursor: 'pointer',display: 'float' }}>
									<Badge count={order?.orderItems?.length} size="small">
										<ShoppingCartOutlined style={{ fontSize: '20px',paddingRight: '5px',color: colorChange ? "#000" : "#fff" }} />

									</Badge>
									{/* <WrapperTextHeaderSmall style={{ fontSize: '16px', color: colorChange ? "#000" : "#fff" }}>Giỏ hàng</WrapperTextHeaderSmall> */}
								</div>

							)
							}
						</Box>

						<Box sx={{ flexGrow: 0,display: { xs: "none",md: "flex" } }} style={{ justifyContent: "space-between",alignItems: 'center' }}>
							<Button
								onClick={handleCloseNavMenu}
								sx={{ color: "white",display: "block" }}
								href="/"
								className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}
							>
								{t('home')}
							</Button>
							<Button
								onClick={handleCloseNavMenu}
								sx={{ color: "white",display: "block" }}
								href="/product"
								className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}
							>
								{t('product')}
							</Button>
							<Button
								onClick={handleCloseNavMenu}
								sx={{ color: "white",display: "block" }}
								href="/contact"
								className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}
							>
								{t('contact')}
							</Button>
							<Button
								onClick={handleCloseNavMenu}
								sx={{ color: "white",display: "block" }}
								className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}
							>
								{t('blog')}
							</Button>
							<Button
								onClick={handleCloseNavMenu}
								sx={{ color: "white",display: "block" }}
								href="/about"
								className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}
							>
								{t('about')}
							</Button>
						</Box>
						{/* <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }} style={{ justifyContent: "space-between", alignItems: 'center' }}>
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
						<Box sx={{ flexGrow: 0,display: { xs: "none",md: "flex",justifyContent: "center",alignItems: 'center' } }} >
							<Box>

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
													<div style={{ cursor: 'pointer',maxWidth: 100,overflow: 'hidden',fontSize: '20px',}} >{content} </div>
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
								{!isHiddenCart && user.access_token && (
									<div onClick={() => navigate('/order')} style={{ cursor: 'pointer',display: 'float' }}>
										<Badge count={order?.orderItems?.length} size="small">
											<ShoppingCartOutlined style={{ fontSize: '20px',paddingRight: '5px',color: colorChange ? "#000" : "#fff" }} />

										</Badge>
										{/* <WrapperTextHeaderSmall style={{ fontSize: '16px', color: colorChange ? "#000" : "#fff" }}>Giỏ hàng</WrapperTextHeaderSmall> */}
									</div>

								)
								}
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
						</Box>


					</Toolbar>
				</Container>
			</AppBar >
		</Container>

	);
	// <Stack spacing={1}>
	//   {
	//     !products ? (
	//       <Skeleton sx={{ height: '100%' }} animation="wave" variant="rectangular" />
	//     ) : (
	//       <div>


	//         <Fragment>
	//           <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset', padding: '0px' }}>
	//             <AppBar className={
	//               colorChange ? classes.colorChangeDark : classes.colorChangeLight
	//             }>
	//               <NavContainer style={{ alignItems: "center" }}>
	//                 <Col span={3} >
	//                   <Typography
	//                     href="/"

	//                     sx={{
	//                       // display: { xs: "flex", md: "none" },
	//                       fontFamily: "monospace",
	//                       fontWeight: 700,
	//                       letterSpacing: '.3rem',
	//                       color: "inherit",
	//                       textDecoration: "none",
	//                       // cursor: 'pointer',
	//                     }} className={classes.hymnsName} style={{ color: colorChange ? "#000" : "#fff", }} >HYMNS</Typography>



	//                 </Col>
	//                 <Col>
	//                   <Button className={classes.mobile_menu_icon} >
	//                     {isMobile ? (
	//                       <FontAwesomeIcon icon={faX} />
	//                     ) : (
	//                       <FontAwesomeIcon icon={faX} />
	//                     )}
	//                   </Button>
	//                 </Col>
	//                 <Col className={isMobile ? classes.nav_link_mobile : classes.nav_link} span={5} style={{ gap: '54px', alignItems: 'center' }}>
	//                   <NavMenu>
	//                     <NavItem>
	//                       <NavLinks href="/" style={{ marginRight: "3rem", fontSize: "20px", fontWeight: "400", width: "100%" }}>  <Typography className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}>    {t("navbar_home")}</Typography></NavLinks>
	//                     </NavItem>
	//                     <NavItem>
	//                       <NavLinks href="/about" style={{ marginRight: "3rem", fontSize: "20px", fontWeight: "400", width: "100%" }}>  <Typography className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}>About</Typography></NavLinks>
	//                     </NavItem>
	//                     <NavItem>
	//                       <NavLinks href="/products" style={{ marginRight: "3rem", fontSize: "20px", fontWeight: "400", width: "100%" }}>  <Typography className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}>Khoá học</Typography></NavLinks>
	//                     </NavItem>
	//                     <NavItem>
	//                       <NavLinks href="/products" style={{ marginRight: "3rem", fontSize: "20px", fontWeight: "400", width: "100%" }}>  <Typography className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}>Product</Typography></NavLinks>
	//                     </NavItem>
	//                     <NavItem>
	//                       <NavLinks href="/contact" style={{ marginRight: "3rem", fontSize: "20px", fontWeight: "400", width: "100%" }}>  <Typography className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}>Contact</Typography></NavLinks>
	//                     </NavItem>

	//                   </NavMenu>

	//                 </Col>

	//                 <Col span={4} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
	//                   <Loading isLoading={loading}>
	//                     <WrapperHeaderAccout>
	//                       {/* {!isHiddenSearch && (
	//                   <Col span={13}>
	//                     <ButttonInputSearch
	//                       size="large"
	//                       bordered={false}
	//                       textbutton="Tìm kiếm"
	//                       placeholder="input search text"
	//                       onChange={onSearch}
	//                       backgroundColorButton="#5a20c1"
	//                     />
	//                   </Col>
	//                 )} */}
	//                       {userAvatar ? (
	//                         // <img src={userAvatar} alt="avatar" style={{
	//                         //   height: '20px',
	//                         //   width: '20px',
	//                         //   borderRadius: '50%',
	//                         //   objectFit: 'cover'
	//                         // }} />
	//                         <img src={Assets.logoUser} alt="avatar" style={{
	//                           height: '20px',
	//                           width: '20px',
	//                           borderRadius: '50%',
	//                           objectFit: 'cover'
	//                         }} />
	//                       ) : (
	//                         <></>
	//                       )}
	//                       {user?.access_token ? (
	//                         <>
	//                           <>
	//                             <Popover trigger="click" open={isOpenPopup} >
	//                               <div style={{ cursor: 'pointer', maxWidth: 100, overflow: 'hidden', fontSize: '20px', }} >{content} </div>
	//                             </Popover>
	//                           </>
	//                         </>
	//                       ) : (
	//                         <Box onClick={handleNavigateLogin}>
	//                           <Button
	//                             className={classes.btnLoginHeader}
	//                             variant="contained"
	//                             size="medium"
	//                           >
	//                             Login
	//                           </Button>
	//                         </Box>
	//                       )}
	//                     </WrapperHeaderAccout>
	//                   </Loading>

	//                   {!isHiddenCart && user.access_token && (
	//                     <div onClick={() => navigate('/order')} style={{ cursor: 'pointer', display: 'float' }}>
	//                       <Badge count={order?.orderItems?.length} size="small">
	//                         <ShoppingCartOutlined style={{ fontSize: '20px', paddingRight: '5px', color: colorChange ? "#000" : "#fff" }} />

	//                       </Badge>
	//                       {/* <WrapperTextHeaderSmall style={{ fontSize: '16px', color: colorChange ? "#000" : "#fff" }}>Giỏ hàng</WrapperTextHeaderSmall> */}
	//                     </div>

	//                   )
	//                   }
	//                   <FormControlLabel
	//                     control={
	//                       <LanguageSwitch
	//                         sx={{ m: 1 }}
	//                         checked={lang === 'en'}
	//                         onClick={handleLanguageChange}
	//                       />
	//                     }
	//                   />
	//                 </Col>
	//               </NavContainer>
	//             </AppBar>
	//           </WrapperHeader>
	//         </Fragment>
	//         <WrapperHeader>
	//           {/* <ProfileScreen open={openProfile} onClose={() => setOpenProfile(false)} /> */}
	//           <Col span={6}>
	//             <WrapperTextHeader>Hymns</WrapperTextHeader>
	//           </Col>
	//           <Col span={12}>
	//             {/* <ButttonInputSearch
	//         size="large"
	//         bordered={false}
	//         textbutton="Tìm kiếm"
	//         placeholder="input search text"
	//       onChange={onSearch}
	//       backgroundColorButton="#5a20c1"
	//       /> */}
	//           </Col>
	//           {/* <Col span={6} style={{ display: 'flex', gap: '20px' }}>
	//       <Loading isLoading={loading}>
	//         <WrapperHeaderAccout>
	//           {userAvatar ? (
	//             <img src={userAvatar} alt="avatar" style={{
	//               height: '30px',
	//               width: '30px',
	//               borderRadius: '50%',
	//               objectFit: 'cover'
	//             }} />
	//           ) : (
	//             <div></div>
	//           )}
	//           {user?.access_token ? (
	//             <>
	//               <Popover trigger="click">
	//                 <div>{content}</div>
	//               </Popover>
	//             </>
	//           ) : (
	//             <div onClick={handleNavigateLogin}>
	//               <Button className={classes.btnLoginHeader} variant="contained" size="medium">
	//                 Login
	//               </Button>
	//             </div>
	//           )}

	//         </WrapperHeaderAccout>
	//       </Loading>
	//       <div>

	//       </div>
	//     </Col> */}
	//         </WrapperHeader>
	//       </div >
	//     )
	//   }

	// </Stack >
	// );
};

export default HeaderComponent;

