import React, { Fragment, useEffect, useState } from "react";
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
import { Badge, Col, Popover } from "antd";
import Button from "@mui/material/Button";
import * as ProductService from "../../services/ProductService";
// import Search from 'antd/es/input/Search'
import { resetUser } from "../../redux/slides/userSlide";

import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import ButttonInputSearch from "../ButttonInputSearch/ButttonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import shopping from '../../assets/images/shopping.png'
import { Assets, Configs, Keys } from "../../configs";
import { styled } from "@mui/material/styles";
import Loading from "../LoadingComponent/Loading";
import Switch from "@mui/material/Switch";
import AdbIcon from "@mui/icons-material/Adb";
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
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ProfileScreen from "../../pages/profile";
import styles from "./stylemui";
import "../../App.css";
import { searchProduct } from "../../redux/slides/productSlide";
import { Header } from "antd/es/layout/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import i18n from "../../utils/languages/i18n";
import { Helpers } from "../../utils/helpers";
import { ProductCartWidget } from "../../sections/@dashboard/products";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const dispatch = useDispatch();
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();
  const classes = styles();
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [userName, setUserName] = useState("");
  const [search, setSearch] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [lang, setLang] = useState(Helpers.getDataStorage(Keys.lang) || 'vi');
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

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
  }, [user?.name, user?.avatar]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isOpenPopup, setIsOpenPopup] = useState(false)
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
    const res = await ProductService.getAllProduct(search, limit);

    return res;
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const {
    isLoading,
    data: products,
  } = useQuery([], fetchProductAll, {
    retry: 3,
    retryDelay: 100,
    keepPreviousData: true,
  });
  const onChangeLanguage = (lang) => {
    setLang(lang);
    i18n.changeLanguage(lang);
    Helpers.setDataStorage(Keys.lang, lang);
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
          <MenuItem onClick={() => handleClickNavigate('profile')}>  <Typography className={classes.txtTilteInfo}>Tài khoản của bạn </Typography></MenuItem>
          {user?.isAdmin && (
            <MenuItem onClick={() => handleClickNavigate('admin')}>
              <Typography className={classes.txtTilteInfo}>
                quản lý
              </Typography>
            </MenuItem>
          )}
          <MenuItem onClick={() => handleClickNavigate(`my-order`)}>
            <Typography className={classes.txtTilteInfo}>
              Đơn hàng của bạn
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => handleClickNavigate()}>
            <Typography className={classes.txtTilteInfo}>
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
    Helpers.setDataStorage(Keys.lang, newLang);
  };


  const LanguageSwitch = styled(Switch)(({ theme, lang }) => ({
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
      navigate('/my-order', {
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
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  return (

    <AppBar className={colorChange ? classes.colorChangeDark : classes.colorChangeLight}>
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{ alignItems: 'center' }}>

          <Typography
            href="/"

            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: "inherit",
              textDecoration: "none"
              // cursor: 'pointer',
            }} className={classes.hymnsName} style={{ color: colorChange ? "#000" : "#fff", justifyContent: "center" }} >HYMNS</Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <FontAwesomeIcon icon={faBarsStaggered} style={{ fontSize: "18px" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Product</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">About</Typography>
              </MenuItem>   <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Contact</Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none"
            }}
          >
            LOGO
          </Typography> */}
          <Typography
            href="/"

            sx={{

              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: "inherit",
              textDecoration: "none"
              // cursor: 'pointer',
            }} className={classes.hymnsName} style={{ justifyContent: "center", color: colorChange ? "#000" : "#fff", }} >HYMNS</Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex", justifyContent: "center", alignItems: 'center' } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ color: "white", display: "block" }}
              href="/"
              className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}
            >
              Home
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ color: "white", display: "block" }}
              href="/products"
              className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}
            >
              Product
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ color: "white", display: "block" }}
              className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}
            >
              Contact
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ color: "white", display: "block" }}
              className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}
            >
              About
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0, mr: 1 }}>
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
          <Box sx={{ flexGrow: 0, mr: 2 }}>
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
            <Tooltip>


              {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}> */}

              {user?.access_token ? (
                <>
                  <>
                    <Popover trigger="click" open={isOpenPopup} >
                      <div style={{ cursor: 'pointer', maxWidth: 100, overflow: 'hidden', fontSize: '20px', }} >{content} </div>
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

          </Box>
          <Box sx={{ flexGrow: 0, mr: 2 }}>
            {!isHiddenCart && user.access_token && (
              <div onClick={() => navigate('/order')} style={{ cursor: 'pointer', display: 'float' }}>
                <Badge count={order?.orderItems?.length} size="small">
                  <ShoppingCartOutlined style={{ fontSize: '20px', paddingRight: '5px', color: colorChange ? "#000" : "#fff" }} />

                </Badge>
                {/* <WrapperTextHeaderSmall style={{ fontSize: '16px', color: colorChange ? "#000" : "#fff" }}>Giỏ hàng</WrapperTextHeaderSmall> */}
              </div>

            )
            }
          </Box>
          <Box>
            <FormControlLabel
              control={
                <LanguageSwitch
                  sx={{ m: 1 }}
                  checked={lang === 'en'}
                  onClick={handleLanguageChange}
                />
              }
            />
          </Box>

        </Toolbar>
      </Container>
    </AppBar >
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

