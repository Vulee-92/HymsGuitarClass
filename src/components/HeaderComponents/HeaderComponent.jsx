import React,{ Fragment,useEffect,useMemo,useRef,useState } from "react";
// import JSONLD from 'react-jsonld';

import { Badge,Col,Popover } from "antd";
import Button from "@mui/material/Button";
import * as ProductService from "../../services/ProductService";
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
import { alpha,styled } from "@mui/material/styles";
import Loading from "../LoadingComponent/Loading";
import {
	Menu,
	MenuItem,
	Typography,
	TextField,
	useAutocomplete,
	InputAdornment,
	Input,
	List,
	ListItem,
	ClickAwayListener,
	Slide,
} from "@mui/material";
import { motion } from 'framer-motion';

import { useTranslation } from "react-i18next";
import styles from "./stylemui";
import "../../App.css";
import { searchProduct } from "../../redux/slides/productSlide";
import { Header } from "antd/es/layout/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered,faTimes,faXmark,faUser,faX,faRightFromBracket,faTruckFast,faMagnifyingGlass,faSearch } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import i18n from "../../utils/languages/i18n";
import { Helpers } from "../../utils/helpers";
import Nav from "./dashboard/nav";
// import debounce from 'lodash/debounce'
import _ from 'lodash';
import { useDebounce } from "hooks/useDebounce";
import Iconify from "components/iconify";
import { convertPrice } from "utils";
import Searchbar from "./dashboard/header/Searchbar";
import { bgBlur } from '../../utils/cssStyles';

// Hàm debounce
function debounce(func,delay) {
	let timeoutId;
	return function (...args) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func.apply(this,args);
		},delay);
	};
}
const StyledMenu = styled(({ numResults,...props }) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
		{...props}
	/>
))(({ theme,numResults }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		minHeight: numResults ? `${Math.min(numResults,5) * 48}px` : '50px',
		width: '300px',
		overflowY: "hidden",

		color:
			theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
		boxShadow:
			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		'& .MuiMenu-list': {
			padding: '4px 0',
		},
		'& .MuiMenuItem-root': {
			'& .MuiSvgIcon-root': {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			'&:active': {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity,
				),
			},
		},
	},
}));


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
	const debounceTimer = useRef(null);
	// const [productsSearch,setProductsSearch] = useState(null);
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

	// const open = Boolean(anchorEl);
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
		const fetchSearchProduct = async () => {
			const res = await ProductService.getSearchProduct(search);
			setProductsSearch(res);
		};

		// Xóa timer debounce cũ nếu có
		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current);
		}

		// Thiết lập timer debounce mới
		debounceTimer.current = setTimeout(() => {
			if (search.trim() !== '') { // Kiểm tra xem search có giá trị không
				fetchSearchProduct();
			}
		},1000);

		// Hủy timer debounce khi component unmount
		return () => {
			clearTimeout(debounceTimer.current);
		};
	},[search]);



	const handleProductClick = (productName) => {
		// Xử lý sản phẩm khi được bấm
		if (productName) {
			const selectedProductSlug = productName?.slug ?? null;
			navigate(`/p/${selectedProductSlug}`);
		}
		handleCloseSearchh()
	};
	// // Hàm search với debounce
	// const debouncedSearch = debounce((value) => {
	// 	setSearch(value);
	// },1000);
	const handleInputChange = (e) => {
		setSearch(e.target.value);
	};





	const renderSearch = () => {
		return (
			<>
				<Button
					id="basic-button"
					aria-controls={opens ? 'basic-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={opens ? 'true' : undefined}
					onClick={handleClickSearch}
				>
					<FontAwesomeIcon icon={faMagnifyingGlass} sx={{ color: "#fff" }} />
				</Button>
				<StyledMenu numResults={productsSearch?.length}
					id="basic-menu"
					anchorEl={anchorElSearchs}
					open={opens}
					onClose={handleCloseSearchh}
					sx={{ maxHeight: "500px",marginTop: "20px" }}
				>
					<Box className={classes.conSearch}>
						<Input className={classes.conInput}
							fullWidth
							onChange={handleInputChange}
							// value={search}
							endAdornment={
								<InputAdornment position='end'
									onClick={() => setSearch('')}
								>
									{search !== '' && <FontAwesomeIcon style={{ cursor: 'pointer',paddingRight: 15 }} icon={faTimes} color={"#000"} />}
								</InputAdornment>
							}
							placeholder="Search…"
						/>
						{search == '' && (
							<Box className={classes.conSearchButton} sx={{ paddingRight: 2 }}>
								<FontAwesomeIcon icon={faSearch} color={"#000"} />
							</Box>
						)}


					</Box>
					<List>
						{productsSearch?.data?.map((option,index) => (
							<ListItem key={index} onClick={() => handleProductClick(option)} sx={{ display: "block",borderBottom: "1px solid #f5f5f5" }}>
								<Box sx={{ display: 'flex',alignItems: 'center',justifyContent: "space-around" }}>
									<Box sx={{ cursor: 'pointer' }} >
										<Typography className={classes.txtNameSearch} >{option?.name}</Typography>
										<Typography className={classes.txtPriceSearch} >{convertPrice(option?.price)}</Typography>
									</Box>
									<img src={option?.image[0]} alt={option?.name} style={{ marginLeft: 'auto',height: 35,width: 35,cursor: 'pointer' }} />
								</Box>
							</ListItem>
						))}

					</List>


				</StyledMenu >
			</>
		)

	};
	useEffect(() => {
		// Xóa giá trị của productsSearch khi giá trị search thay đổi
		return () => {
			setProductsSearch(null); // Giả sử setProductsSearch là hàm để cập nhật giá trị productsSearch
		};
	},[search]);
	const [anchorElSearchs,setAnchorElSearchs] = React.useState(null);

	const opens = Boolean(anchorElSearchs);
	const handleClickSearch = (event) => {
		setAnchorElSearchs(event.currentTarget);
	};
	const handleCloseSearchh = () => {
		setAnchorElSearchs(null);
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
							}} className={classes.hymnsName} style={{ justifyContent: "flex-start",color: colorChange ? "#000" : "#fff",fontSize: "1.1rem",lineHeight: 0 }} >HYMNS CENTER</Typography>
						<Box sx={{
							display: { xs: "block",md: "none" }
						}}>
							{renderSearch()}
							{/* <Searchbar /> */}
						</Box>

						<Box sx={{
							display: { xs: "block",md: "none" }
						}}>
							<div onClick={() => navigate('/order')} style={{ cursor: 'pointer',display: 'float' }}>
								<Badge count={order?.orderItems?.length} size="small">
									<ShoppingCartOutlined style={{ fontSize: '20px',paddingRight: '5px',color: colorChange ? "#000" : "#fff" }} />
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
								}} className={classes.hymnsName} style={{ color: colorChange ? "#000" : "#fff",paddingRight: '100px' }} >HYMNS CENTER</Typography>

							<Box sx={{ flexGrow: 0,display: { xs: "none",md: "flex" } }} style={{ justifyContent: "flex-start",alignItems: 'center' }}>

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
									onClick={() => navigate('/category')}
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
							{/* <Menu
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

							</Menu> */}
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

								{renderSearch()}
							</MenuItem>

							{/* <Box sx={{ height: "100%" }}>
								<Dialog
									open={openSearch}
									// onClose={handleCloseSearch}
									BackdropComponent={Backdrop}
									BackdropProps={{ style: { backdropFilter: 'blur(5px)' } }}
									PaperProps={{
										component: 'form',
										onSubmit: (event) => {
											event.preventDefault();
											const formData = new FormData(event.currentTarget);
											const formJson = Object.fromEntries(formData.entries());
											const email = formJson.email;
											console.log(email);
										},
									}}
									sx={{ height: 'auto' }}
								>

									<DialogTitle>Subscribe</DialogTitle>
									<DialogContent sx={{ height: 'auto' }}>
										<DialogContentText>

											<Box className={classes.conSearch}>
												<div className={classes.conInput}>
													<InputWrapper >
														<Input className={classes.conInput} {...getInputProps()} />
														{groupedOptions.length > 0 && (
															<ListboxWrapper>
																<Listbox {...getListboxProps()}>
																	{groupedOptions.map((option,index) => (
																		<li className={classes.conInput} sx={{ margin: 10 }} {...getOptionProps({ option,index })}>{option.name}</li>
																	))}
																</Listbox>
															</ListboxWrapper>
														)}
													</InputWrapper>
												</div>
											</Box>

										</DialogContentText>
									</DialogContent>

								</Dialog>
							</Box> */}

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

						</Box>


					</Toolbar>

				</Container>

			</AppBar >
		</Container >

	);


};

export default HeaderComponent;

