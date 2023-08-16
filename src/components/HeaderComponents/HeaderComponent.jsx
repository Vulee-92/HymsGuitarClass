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
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import i18n from "../../utils/languages/i18n";
import { Helpers } from "../../utils/helpers";
import { ProductCartWidget } from "../../sections/@dashboard/products";

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
  const [lang, setLang] = useState(i18n.language);
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


  // const handleChange = (event) => {
  //   setState({
  //     ...state,
  //     [event.target.name]: event.target.checked,
  //   });
  // };

  const content = (
    // <div>
    //   <WrapperContentPopup onClick={handleNavigateLogout}>dang xuat</WrapperContentPopup>
    //   <WrapperContentPopup>thong tin nguoi dung</WrapperContentPopup>
    // </div>
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
  // const MaterialUISwitch = styled(Switch)(({ theme, lang }) => (
  //   {

  //     width: 62,
  //     height: 34,
  //     padding: 7,
  //     '& .MuiSwitch-switchBase': {
  //       margin: 1,
  //       padding: 0,
  //       transform: 'translateX(6px)',
  //       '&.Mui-checked': {
  //         color: '#fff',
  //         transform: 'translateX(22px)',
  //         '& .MuiSwitch-thumb:before': {
  //           backgroundImage: `url(${Assets.usFlag})`,
  //           width: '100%',
  //           height: '100%',
  //           backgroundSize: "cover",

  //         },
  //         // '& + .MuiSwitch-track': {
  //         //   opacity: 1,
  //         //   backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
  //         // },
  //       },
  //     },
  //     '& .MuiSwitch-thumb': {
  //       // backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
  //       width: 32,
  //       height: 32,
  //       '&:before': {
  //         content: "''",
  //         position: 'absolute',
  //         width: '100%',
  //         height: '100%',
  //         left: 0,
  //         top: 0,
  //         backgroundImage: `url(${Assets.vnFlag})`,
  //         backgroundSize: "cover",
  //         backgroundRepeat: "no-repeat",
  //       },

  //       // '& .MuiSwitch-track': {
  //       //   opacity: 1,
  //       //   backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
  //       //   borderRadius: 20 / 2,
  //       // },
  //     }

  //   }

  // )
  // );
  return (


    <Stack spacing={1}>
      {
        !products ? (
          <Skeleton sx={{ height: '100%' }} animation="wave" variant="rectangular" />
        ) : (
          <div>
            {/* <AppBar
        position=""
        className={
          colorChange ? classes.colorChangeLight : classes.colorChangeDark
        }
      >
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            className={colorChange ? classes.txtDark : classes.txtLight}
          >
            HYMNS
          </Typography>
          {isHiddenSearch && (
            <ButttonInputSearch
              size="large"
              bordered={false}
              textbutton="Tìm kiếm"
              placeholder="input search text"
              onChange={onSearch}
            // backgroundColorButton="#5a20c1"
            />
          )}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#000"
            >
              <Box />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    className={
                      colorChange ? classes.txtDark : classes.txtLight
                    }
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              // letterSpacing: '.3rem',
              color: "inherit",
              textDecoration: "none",
            }}
            className={colorChange ? classes.txtDark : classes.txtLight}
          >
            HYMNS
          </Typography>


          <Box sx={{ flexGrow: 0 }}>
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {userAvatar ? (
                  <Box
                    className={classes.imgAvatar}
                    sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                  >
                    <Avatar
                      className={classes.imgAvatar}
                      alt="Remy Sharp"
                      src={
                        userAvatar
                          ? userAvatar
                          : "/static/images/avatar/2.jpg"
                      }
                    />
                  </Box>
                ) : (
                  <IconButton onClick={handleNavigateLogin} sx={{ p: 0 }}>
                    <Avatar className={classes.imgAvatar} alt="Remy Sharp" src={"/static/images/avatar/2.jpg"} />
                  </IconButton>
                )}
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {user?.access_token ? (
                  <>
                    <>
                      <Popover trigger="click" open={isOpenPopup}>
                        <div style={{ cursor: 'pointer', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', color: 'red' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{content} </div>
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
                <Box
                  onClick={() => navigate("/order")}
                  style={{ cursor: "pointer" }}
                >
                  <Box >
                    <Badge showZero badgeContent={0} color="error" max={99}>
                      <Icon icon="eva:shopping-cart-fill" width={24} height={24} />
                    </Badge>
                  </Box>
                  <Badge count={order.orderItems.length} size="small">
                    <ShoppingCartOutlined
                      style={{ fontSize: "30px", color: "white" }}
                    />
                  </Badge>
                </Box>
                <WrapperTextHeaderSmall>giỏ hàng</WrapperTextHeaderSmall>
              </Box>
            </Toolbar>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleNavigateLogin}
            >
              <Grid container spacing={7}> <Grid item xs={4}>
                {userAvatar ? (
                  <img src={userAvatar} alt="avatar" style={{
                    height: '30px',
                    width: '30px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }} />
                ) : (
                  <div></div>
                )}
              </Grid>
                <Grid container spacing={7}> <Grid item xs={4}>
                  {user?.access_token ? (
                    <>
                      <Popover trigger="click">
                        <div>{content}</div>
                      </Popover>
                    </>
                  ) : (
                    <div onClick={handleNavigateLogin}>
                      <Button className={classes.btnLoginHeader} variant="contained" size="medium">
                        Login
                      </Button>
                    </div>
                  )}
                </Grid>
                </Grid>
              </Grid>
            </Menu>
          </Box> */}
            {/* </Toolbar> */}
            {/* </AppBar> */}
            {/* <div style={{ heiht: '100%', width: '100%', display: 'flex', background: '#9255FD', justifyContent: 'center' }}>
        <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
          <Col span={5}>
            <NavLogo className={colorChange ? classes.txtDark : classes.txtLight} href="/">HYMNS</NavLogo>
          </Col>
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
          <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
            <Loading isLoading={loading}>
              <WrapperHeaderAccout>
                {userAvatar ? (
                  <img src={userAvatar} alt="avatar" style={{
                    height: '30px',
                    width: '30px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }} />
                ) : (
                  <UserOutlined style={{ fontSize: '30px' }} />
                )}
                {user?.access_token ? (
                  <>
                    <Popover content={content} trigger="click" open={isOpenPopup}>
                      <div style={{ cursor: 'pointer', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div>
                    </Popover>
                  </>
                ) : (
                  <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                    <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                    <div>
                      <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                    </div>
                  </div>
                )}
              </WrapperHeaderAccout>
            </Loading>
            {!isHiddenCart && (
              <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
                <Badge count={order?.orderItems?.length} size="small">
                  <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                </Badge>
                <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
              </div>
            )}
          </Col>
        </WrapperHeader>
      </div> */}

            <Fragment>
              <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset', padding: '0px' }}>
                <AppBar className={
                  colorChange ? classes.colorChangeDark : classes.colorChangeLight
                }>
                  <NavContainer style={{ alignItems: "center" }}>
                    <Col span={3} >
                      <Typography
                        href="/"

                        sx={{
                          // display: { xs: "flex", md: "none" },
                          fontFamily: "monospace",
                          fontWeight: 700,
                          letterSpacing: '.3rem',
                          color: "inherit",
                          textDecoration: "none",
                          // cursor: 'pointer',
                        }} className={classes.hymnsName} style={{ color: colorChange ? "#000" : "#fff", }} >HYMNS</Typography>



                    </Col>
                    <Col span={5} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
                      <NavMenu>
                        <NavItem>
                          <NavLinks href="/" style={{ marginRight: "3rem", fontSize: "20px", fontWeight: "400" }}>  <Typography className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}>    {t("navbar_home")}</Typography></NavLinks>
                        </NavItem>
                        <NavItem>
                          <NavLinks href="/about" style={{ marginRight: "3rem", fontSize: "20px", fontWeight: "400" }}>  <Typography className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}>About</Typography></NavLinks>
                        </NavItem>
                        <NavItem>
                          <NavLinks href="/products" style={{ marginRight: "3rem", fontSize: "20px", fontWeight: "400" }}>  <Typography className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}>Product</Typography></NavLinks>
                        </NavItem>
                        <NavItem>
                          <NavLinks href="/contact" style={{ marginRight: "3rem", fontSize: "20px", fontWeight: "400" }}>  <Typography className={colorChange ? classes.txtTilteDark : classes.txtTilteLight}>Contact</Typography></NavLinks>
                        </NavItem>
                      </NavMenu>

                    </Col>
                    <Col span={4} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                      <Loading isLoading={loading}>
                        <WrapperHeaderAccout>
                          {/* {!isHiddenSearch && (
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
                    )} */}
                          {userAvatar ? (
                            // <img src={userAvatar} alt="avatar" style={{
                            //   height: '20px',
                            //   width: '20px',
                            //   borderRadius: '50%',
                            //   objectFit: 'cover'
                            // }} />
                            <img src={Assets.logoUser} alt="avatar" style={{
                              height: '20px',
                              width: '20px',
                              borderRadius: '50%',
                              objectFit: 'cover'
                            }} />
                          ) : (
                            <></>
                          )}
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
                        </WrapperHeaderAccout>
                      </Loading>

                      {!isHiddenCart && user.access_token && (
                        <div onClick={() => navigate('/order')} style={{ cursor: 'pointer', display: 'float' }}>
                          <Badge count={order?.orderItems?.length} size="small">
                            <ShoppingCartOutlined style={{ fontSize: '20px', paddingRight: '5px', color: colorChange ? "#000" : "#fff" }} />

                          </Badge>
                          {/* <WrapperTextHeaderSmall style={{ fontSize: '16px', color: colorChange ? "#000" : "#fff" }}>Giỏ hàng</WrapperTextHeaderSmall> */}
                        </div>

                      )

                      }
                      <FormControlLabel
                        control={
                          <LanguageSwitch
                            sx={{ m: 1 }}
                            checked={lang === 'en'}
                            onClick={handleLanguageChange}
                          />
                        }
                      // label="MUI switch"
                      />
                      {/* <FormControlLabel
                        control={<MaterialUISwitch onChange={onChangeLanguage(Configs.language.us)} sx={{ m: 1 }} defaultChecked />}
                      /> */}

                      {/* <Box className={classes.conLanguage}>
                        <Box

                          className={classes.conLanguageItem}
                          // component={"img"}
                          // src={Assets.vnFlag}
                          // style={{ opacity: lang === Configs.language.vi ? 1 : 0.5 }}
                          onClick={() => onChangeLanguage(Configs.language.vi)}
                        >
                          <FormControlLabel
                            control={<MaterialUISwitch onChange={onChangeLanguage(Configs.language.vi)} sx={{ m: 1 }} defaultChecked />}
                          />
                        </Box>
                        <Box
                          className={classes.conLanguageItem}
                          // component={"img"}
                          // src={Assets.usFlag}
                          style={{ opacity: lang === Configs.language.en ? 1 : 0.5 }}
                          onClick={() => onChangeLanguage(Configs.language.en)}
                        >
                         
                        </Box>
                      </Box> */}
                    </Col>


                  </NavContainer>
                </AppBar>
              </WrapperHeader>
            </Fragment>
            <WrapperHeader>
              {/* <ProfileScreen open={openProfile} onClose={() => setOpenProfile(false)} /> */}
              <Col span={6}>
                <WrapperTextHeader>Hymns</WrapperTextHeader>
              </Col>
              <Col span={12}>
                {/* <ButttonInputSearch
            size="large"
            bordered={false}
            textbutton="Tìm kiếm"
            placeholder="input search text"
          onChange={onSearch}
          backgroundColorButton="#5a20c1"
          /> */}
              </Col>
              {/* <Col span={6} style={{ display: 'flex', gap: '20px' }}>
          <Loading isLoading={loading}>
            <WrapperHeaderAccout>
              {userAvatar ? (
                <img src={userAvatar} alt="avatar" style={{
                  height: '30px',
                  width: '30px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} />
              ) : (
                <div></div>
              )}
              {user?.access_token ? (
                <>
                  <Popover trigger="click">
                    <div>{content}</div>
                  </Popover>
                </>
              ) : (
                <div onClick={handleNavigateLogin}>
                  <Button className={classes.btnLoginHeader} variant="contained" size="medium">
                    Login
                  </Button>
                </div>
              )}

            </WrapperHeaderAccout>
          </Loading>
          <div>

          </div>
        </Col> */}
            </WrapperHeader>
          </div >
        )
      }

    </Stack >
  );
};

export default HeaderComponent;

