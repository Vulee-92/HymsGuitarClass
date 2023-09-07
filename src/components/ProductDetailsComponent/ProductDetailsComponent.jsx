import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import * as ProductService from "../../services/ProductService";
import { addOrderProduct, resetOrder } from "../../redux/slides/orderSlide";
import * as message from '../Message/Message'
import {
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperInputNumber,
} from "./style";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./stylemui";
import { Accordion, AccordionDetails, AccordionSummary, useScrollTrigger, Alert, Box, Breadcrumbs, Button, Card, CardContent, CardMedia, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Drawer, Fab, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Link, Paper, Rating, Snackbar, Stack, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Zoom from "react-img-zoom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import AnimationComponent from "components/AnimationComponent/AnimationComponent";
import Slider from "react-slick";
import CardComponent from "components/CardComponent/CardComponent";
import { useDebounce } from "hooks/useDebounce";
import { convertPrice } from "utils";
import { faker } from "@faker-js/faker";
import { ShoppingCart } from "@mui/icons-material";


const ProductDetailsComponent = ({ idProduct }) => {


  // const classess = useStyles({ isMobile });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order)
  const classes = styles();
  const [limit, setLimit] = useState(6);
  const [showFab, setShowFab] = useState(false);
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 100);
  const [open, setOpen] = React.useState(false);
  const [errorLimitOrder, setErrorLimitOrder] = useState(false)
  const [openDialog, setOpenDialog] = useState(false);


  const [isCartOpen, setIsCartOpen] = useState(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };
  const [open1, setOpen1] = useState(false);
  const onChange = (value) => {
    setNumProduct(Number(value));
  };


  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);

    return res;
  };
  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };
  useEffect(() => {
    if (order.isSucessOrder) {
      message.success('Đã thêm vào giỏ hàng')
    }
    return () => {
      dispatch(resetOrder())
    }
  }, [order.isSucessOrder])
  const handleChangeCount = (type, limited) => {
    if (type === "increase") {
      if (!limited) {
        setNumProduct(numProduct + 1);
      }
    } else {
      if (!limited) {
        setNumProduct(numProduct - 1);
      }
    }
  };

  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate('/sign-in', { state: location?.pathname })
    } else {
      setOpen(true);
      const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
      if ((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
        dispatch(addOrderProduct({
          orderItem: {
            name: productDetails?.name,
            amount: numProduct,
            image: productDetails?.image,
            price: productDetails?.price,
            product: productDetails?._id,
            discount: productDetails?.discount,
            countInstock: productDetails?.countInStock
          }
        }))
      } else {
        setErrorLimitOrder(true)
      }
    }
    handleCartClick()
    setOpenDialog(true);
  }
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const { isLoading, data: productDetails } = useQuery(
    ["product-details", idProduct],
    fetchGetDetailsProduct,
    { enabled: !!idProduct }
  );
  useEffect(() => {
    const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
    if ((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
      setErrorLimitOrder(false)
    } else if (productDetails?.countInStock === 0) {
      setErrorLimitOrder(true)
    }
  }, [numProduct])

  const handleClose = () => {
    setOpen(false);
  };


  const {
    isLoadings,
    data: products,
    isPreviousData,
  } = useQuery(["products", limit, searchDebounce], fetchProductAll, {
    retry: 3,
    retryDelay: 100,
    keepPreviousData: true,
  });
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <Box className={classes.buttontoi} onClick={onClick}>
        <FontAwesomeIcon icon={faCircleArrowLeft} rotation={180} />
      </Box>
    );
  }



  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <Box className={classes.samplePrevArrow} onClick={onClick}>
        <FontAwesomeIcon icon={faCircleArrowLeft} />
      </Box>
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    centerPadding: "60px",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const handleToggleDrawer = () => {
    setOpen1(!open1);
  };
  const cartButtonRef = useRef(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (cartButtonRef.current) {
  //       const cartButtonTop = cartButtonRef.current.getBoundingClientRect().top;
  //       if (cartButtonTop < 0) {
  //         setIsCartOpen(true);
  //       } else {
  //         setIsCartOpen(false);
  //       }
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);
  useEffect(() => {
    const handleScroll = () => {
      const cartButtonTop = cartButtonRef.current.getBoundingClientRect().top;
      if (cartButtonTop < 0) {
        setIsCartOpen(true);
      } else {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const CartDrawer = ({ isOpen, onClose }) => {
    return (
      <Drawer
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"

        anchor="bottom" open={isCartOpen} onClose={handleCartClose} disableDiscovery>
        {/* Nội dung của Drawer */}
        <Typography>XIn chào</Typography>
      </Drawer>
    );
  };
  return (
    <>

      <Loading isLoading={isLoading}>
        <div>
          <h1>Chi tiết sản phẩm</h1>
          {/* Nội dung trang chi tiết sản phẩm */}

          <Drawer
            sx={{
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"

            anchor="bottom" open={isCartOpen} onClose={handleCartClose} disableDiscovery>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }} style={{ background: 'rgb(36, 92, 79,0.1)' }}>
              <Typography className={classes.priceTitle} style={{ alignItems: "center", gap: "12px", padding: '30px', textAlign: "center" }}>
                {productDetails?.price?.toLocaleString()}₫
              </Typography>
              <div style={{ alignItems: "center", gap: "12px", padding: '16px', textAlign: "center" }}>
                <div>
                  <Button variant="contained"
                    style={{
                      background: "#245c4f",
                      height: "48px",
                      width: "100%",
                      border: "none",
                      borderRadius: "4px",
                      color: "#fff",
                      fontSize: "15px",
                      textTransform: "capitalize",
                      fontWeight: "700",
                    }}
                    href="/order"
                  >Xem giỏ hàng</Button>
                  {errorLimitOrder && <div style={{ color: 'red' }}>San pham het hang</div>}
                </div>
              </div>
            </Box>
          </Drawer>
        </div>


        <Container width={{ md: "xs", xl: "xs", lg: "xs" }} >
          <Grid spacing={2}>
            <Grid item xs={12}>
            </Grid>

          </Grid>
          <Divider variant="middle" style={{ display: { xs: "none", xl: "flex", lg: "flex", md: "none", sm: "none" } }} />
          <Grid container spacing={2} >
            {/* xs, extra-small: 0px
          sm, small: 600px
          md, medium: 900px
          lg, large: 1200px
          xl, extra-large: 1536px */}
            <Grid sx={{ display: { xs: "none", xl: "flex", lg: "flex", md: "none", sm: "none" }, flexDirection: { xl: "column-reverse", lg: "column-reverse" } }} item sm={12} md={12} lg={12} xl={12} style={{ height: 'fit-content', marginTop: "15px", padding: '10px 16px ' }}>
              <Paper sx={{ boxShadow: "none" }}>
                <div style={{
                  display: "flex", float: 'right', aliggItems: "center", gap: "12px", alignItems: 'center',
                  justifyContent: ' space-between',
                  width: 'fit-content'
                }}>

                  <Box style={{ alignItems: 'flex-end !important' }}>
                    <Typography className={classes.priceTitle}>
                      {productDetails?.price?.toLocaleString()}₫
                    </Typography>
                    <Typography className={classes.txtTilte}>
                      Bao gồm thuế. Miễn phí vận chuyển cho mọi đơn hàng!
                    </Typography>
                  </Box>
                  <Button variant="contained"
                    style={{
                      background: "#245c4f",
                      height: "48px",
                      width: "300px",
                      border: "none",
                      borderRadius: "4px",
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: "700",
                    }}
                    onClick={handleAddOrderProduct}
                  >Thêm vào giỏ hàng</Button>
                  {!errorLimitOrder ? (
                    <>
                      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                        <Alert style={{ border: "1px solid #245c4f", fontSize: "13px" }} severity="success" sx={{ width: '100%' }}>
                          Đã thêm vào giỏ hàng!
                        </Alert>
                      </Snackbar></>
                  ) : (
                    <>
                      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                        <Alert style={{ border: "1px solid red", fontSize: "13px", color: "red" }} severity="error" sx={{ width: '100%' }}>
                          Sản phẩm đã hết hàng!
                        </Alert>
                      </Snackbar></>
                  )}

                  {/* {errorLimitOrder && <div style={{ color: 'red' }}>San pham het hang</div>} */}
                </div>
              </Paper>
            </Grid>

          </Grid>
          <Divider variant="fullWidth" style={{ display: { xs: "none", xl: "flex", lg: "flex", md: "none", sm: "none" } }} />
          <Grid container spacing={2} style={{
            // textAlign: '-webkit-center', marginBottom: '50px',
          }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Grid spacing={2} item sm={12} md={12} lg={12} xl={12} sx={{ display: { xs: "none", xl: "flex", lg: "flex", md: "none", sm: "none" } }}>
              <Grid item xs={12}>
                <div role="presentation" >
                  <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/" style={{ fontSize: '16px', textAlign: "center" }}>
                      Trang chủ
                    </Link>
                    <Link
                      style={{ fontSize: '16px' }}
                      underline="hover"
                      color="inherit"
                      href="/product"
                    >
                      sản phẩm
                    </Link>
                    <Link className={classes.nameProduct}>     {productDetails?.name}</Link>
                  </Breadcrumbs>
                </div>
              </Grid>

            </Grid>
            <Grid item xs={8}>

            </Grid>
            <Grid item xs={8}>
              <div>
                {/* <Rate
                allowHalf
                defaultValue={productDetails?.rating}
                value={productDetails?.rating}
              />
              <WrapperStyleTextSell>
                {" "}
                | Da ban {productDetails?.countInStock}+
              </WrapperStyleTextSell> */}
              </div>
            </Grid>


          </Grid>
          <Typography sx={{ display: { xs: "flex", xl: "none", lg: "none", md: "none", sm: "none" } }}
            style={{ marginTop: "15px", marginBottom: "15px", padding: '10px 16px ', textAlign: "left" }} className={classes.nameProduct}>
            {productDetails?.name}</Typography>
          <Divider variant="fullWidth" style={{ display: { xs: "none", xl: "flex", lg: "flex", md: "none", sm: "none" } }} />
          <Grid container spacing={2} style={{
            // textAlign: '-webkit-center', marginBottom: '50px',
          }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Zoom key={productDetails?.image}
              style={{ maxHeight: '400px', textAlign: '-webkit-center' }}
              img={productDetails?.image}
              zoomScale={3}
              height={400}
              width={1200}
            />
          </Grid>

          {/* xs, extra-small: 0px
          sm, small: 600px
          md, medium: 900px
          lg, large: 1200px
          xl, extra-large: 1536px */}

          <Grid container spacing={2} sx={{ display: { xs: "flex" }, justifyContent: "space-around", flexDirection: { xs: "column-reverse", sm: "column-reverse", md: "column-reverse", xl: "row", lg: "row" } }}>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8} style={{ padding: '30px' }}>
              <Paper style={{ boxShadow: 'none' }}>
                <Typography sx={{ margin: "0 !important" }} className={classes.txtTitleBox}>Mô tả sản phẩm</Typography>
                <Typography className={classes.txtTilte}
                  dangerouslySetInnerHTML={{
                    __html: productDetails?.description
                  }}></Typography></Paper>
              <div>
                <Typography className={classes.txtTitleBox}>Frequently Asked Questions</Typography>

                <Accordion style={{ marginTop: "30px" }}>
                  <AccordionSummary
                    expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.txtTilte}>Tôi có được kiểm tra sản phẩm trước khi mua?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className={classes.txtTilte}>
                      Nếu bạn muốn kiểm tra sản phẩm trước khi mua online, vui lòng gọi cho Hymns trước khi đến cửa hàng, nhân viên của chúng tôi luôn nhiệt tình hỗ trợ!
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography className={classes.txtTilte}>Đơn hàng của tôi có phụ kiện đi kèm không?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className={classes.txtTilte}>
                      Sản phẩm không có phụ kiện đi kèm, trừ trường hợp những phụ kiện đó được nêu rõ trong phần mô tả sản phẩm. Bạn có thể tìm trên cửa hàng trực tuyến hoặc hỏi Đội Ngũ Kinh Doanh & Chăm Sóc Khách Hàng nhiệt tình của chúng tôi để được hỗ trợ ngay hôm nay!
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion >
                  <AccordionSummary
                    expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                  >
                    <Typography className={classes.txtTilte}>Đơn hàng của tôi có được bảo hành không?</Typography>
                  </AccordionSummary>
                </Accordion>
              </div>

            </Grid>
            <Grid container spacing={2} sx={{ justifyContent: { xs: "center" }, marginTop: "40px" }} item xs={12} sm={12} md={12} lg={4} xl={4} style={{ height: 'fit-content' }} >
              <Paper style={{ background: 'rgb(36, 92, 79,0.1)', boxShadow: 'none', }} >
                <Box sx={{ display: { xs: "flex" }, justifyContent: "space-around", flexDirection: { xs: "column-reverse", sm: "column-reverse", md: "column-reverse", xl: "column", lg: "column" } }}>
                  <WrapperPriceProduct style={{ padding: '10px 16px ', background: 'rgb(36, 92, 79,0.01)' }}>
                    <WrapperPriceTextProduct style={{ textAlign: 'center' }}>
                      {productDetails?.price?.toLocaleString()}₫
                    </WrapperPriceTextProduct>
                  </WrapperPriceProduct>
                  <Typography className={classes.nameProduct} style={{ padding: '10px 16px ' }}>
                    {productDetails?.name}
                    {/* // <Stack spacing={1}>
                  //   <Rating name="size-small" defaultValue={productDetails?.rating} size="small" />
                  // </Stack> */}

                    {/* Da ban {productDetails?.countInStock}+ */}
                  </Typography>
                  {/* <Rate
                  allowHalf
                  defaultValue={productDetails?.rating}
                  value={productDetails?.rating}

                /> */}


                  {/* <Box style={{ padding: '10px 16px ' }}>
                <Typography className={classes.nameProduct}>Giao đến </Typography>
                <Typography className="address">{user?.address}</Typography>
                <Typography className={classes.nameProduct}>Đổi địa chỉ</Typography>
              </Box> */}
                </Box>

                <Box style={{ padding: '10px 16px ', display: 'flex' }}>

                  <Typography className={classes.nameProduct}>Slượng:</Typography>

                  <Box>

                    <button
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                      onClick={() => handleChangeCount("decrease", numProduct === 1)}
                    >
                      <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
                    </button>
                    <WrapperInputNumber
                      onChange={onChange}
                      defaultValue={1}
                      max={productDetails?.countInStock}
                      min={1}
                      value={numProduct}
                      size="small"

                    />
                    <button
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleChangeCount(
                          "increase",
                          numProduct === productDetails?.countInStock
                        )
                      }
                    >
                      <PlusOutlined style={{ color: "#000", fontSize: "20px" }} />
                    </button>
                  </Box>
                </Box>
                <div style={{ alignItems: "center", gap: "12px", padding: '16px', textAlign: "center" }}>
                  <div>

                    <Fab variant="contained"
                      ref={cartButtonRef}
                      color="primary"
                      aria-label="Mua hàng"
                      style={{
                        background: "#245c4f",
                        height: "48px",
                        width: "100%",
                        border: "none",
                        borderRadius: "4px",
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: "700",
                      }}



                      onClick={handleAddOrderProduct}
                    >Thêm vào giỏ hàng</Fab>
                    {errorLimitOrder && <div style={{ color: 'red' }}>San pham het hang</div>}
                  </div>
                </div>
              </Paper >
            </Grid >
          </Grid >

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }} style={{ background: 'rgb(36, 92, 79,0.1)' }}>
              <DialogTitle className={classes.nameProduct}>Sản phẩm thêm vào giỏ hàng!</DialogTitle>
              <DialogActions>
                <Button onClick={handleCloseDialog} style={{ paddingRight: "30px", color: "#245c4f" }} autoFocus>
                  X
                </Button>
              </DialogActions>
            </Box>
            <DialogContent style={{ padding: "0px", boxShadow: "none", }}>
              <Card style={{ padding: "none", boxShadow: "none", }} sx={{ display: 'flex' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 70, height: 70 }}
                  image={productDetails?.image}
                  alt="Live from space album cover"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography className={classes.nameProduct} style={{ fontSize: "14px" }} component="div" variant="h5">
                      {productDetails?.name}
                    </Typography>
                    <Typography className={classes.priceTitle} style={{ textAlign: 'left', marginTop: '10px' }} variant="subtitle1" color="text.secondary" component="div">
                      {productDetails?.price?.toLocaleString()}₫
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                  </Box>
                </Box>

              </Card>
              <div style={{ alignItems: "center", gap: "12px", padding: '16px', textAlign: "center", background: 'rgb(36, 92, 79,0.1)' }}>
                <div>
                  <Button variant="contained"
                    style={{
                      background: "#245c4f",
                      height: "48px",
                      width: "100%",
                      border: "none",
                      borderRadius: "4px",
                      color: "#fff",
                      fontSize: "15px",
                      textTransform: "capitalize",
                      fontWeight: "700",
                    }}
                    href="/order"
                  >Xem giỏ hàng</Button>
                  {errorLimitOrder && <div style={{ color: 'red' }}>San pham het hang</div>}
                </div>
              </div>
            </DialogContent>

          </Dialog>
          {showFab && (
            <Fab sx={{
              position: 'fixed', display: "flex"
            }} color="primary" onClick={handleAddOrderProduct}>
              <div style={{ alignItems: "center", gap: "12px", padding: '16px', textAlign: "center" }}>
                <div>
                  <Button variant="contained"
                    style={{
                      background: "#245c4f",
                      height: "48px",
                      width: "100%",
                      border: "none",
                      borderRadius: "4px",
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: "700",
                    }}
                    onClick={handleAddOrderProduct}
                  >Thêm vào giỏ hàng</Button>
                  {errorLimitOrder && <div style={{ color: 'red' }}>San pham het hang</div>}
                </div>
              </div>
            </Fab>
          )}
          <hr style={{ margin: "60px 0" }} />
          <Box style={{ margin: "60px 0", }}>

            {/* <Typography className={classes.txtTitleBox}>Latest Releases</Typography> */}
            <AnimationComponent type="text" text="Có thể bạn quan tâm" className={classes.txtTitleBox} />
            <div className={classes.sliderWrapper}>

              <ImageList variant="masonry" cols={1} gap={8}>
                {/* <Slider {...settings} style={{ overflow: 'hidden' }}> */}
                <Slider {...settings} style={{ overflow: 'hidden' }}>

                  {products?.data?.map((product, post, index) => {
                    return (

                      <div>

                        <ImageListItem key={product.image} style={{ cursor: 'pointers' }} >
                          <CardComponent
                            post={post}
                            index={index}
                            key={product._id}
                            countInStock={product.countInStock}
                            description={product.description}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            rating={product.rating}
                            type={product.type}
                            discount={product.discount}
                            selled={product.selled}
                            id={product._id}
                            createdAt={product.createdAt}
                            style={{ cursor: 'pointers' }}
                          />
                        </ImageListItem>
                      </div>

                    )
                  })}
                </Slider>
              </ImageList>
            </div>

          </Box>
        </Container >

      </Loading >

    </>
  );
};

export default ProductDetailsComponent;
