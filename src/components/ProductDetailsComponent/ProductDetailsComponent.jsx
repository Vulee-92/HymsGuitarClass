import React, { useEffect, useState } from "react";
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
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Breadcrumbs, Button, Container, Grid, ImageList, ImageListItem, ImageListItemBar, Link, Paper, Rating, Snackbar, Stack, Typography, makeStyles, useMediaQuery } from "@mui/material";
import Zoom from "react-img-zoom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import AnimationComponent from "components/AnimationComponent/AnimationComponent";
import Slider from "react-slick";
import CardComponent from "components/CardComponent/CardComponent";
import { useDebounce } from "hooks/useDebounce";
import { convertPrice } from "utils";
import { faker } from "@faker-js/faker";


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
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 100);
  const [open, setOpen] = React.useState(false);
  const [errorLimitOrder, setErrorLimitOrder] = useState(false)
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
  }
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
  const productList = products?.data?.map((product, index) => ({
    id: product._id,
    cover: product?.image,
    name: product?.name[index],
    price: convertPrice(faker.datatype.number({ min: 4, max: 99, precision: 0.01 })),

    // status: sample(["new", "new", "", ""]),
    ...product,
  }));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Loading isLoading={isLoading}>
        <Container maxWidth="lg" style={{ marginTop: '50px' }}>
          <Grid spacing={2}>
            <Grid item xs={12}>
            </Grid>

          </Grid>
          <hr style={{ margin: "10px 0" }} />
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
          <hr style={{ margin: "10px 0" }} />
          <Grid container spacing={2} style={{
            // textAlign: '-webkit-center', marginBottom: '50px',
          }}>
            <Grid spacing={2}>
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

            <Zoom key={productDetails?.image}
              style={{ maxHeight: '500px', textAlign: '-webkit-center' }}
              img={productDetails?.image}
              zoomScale={3}
              height={500}
              width={1200}
            />
          </Grid>
          {/* xs, extra-small: 0px
          sm, small: 600px
          md, medium: 900px
          lg, large: 1200px
          xl, extra-large: 1536px */}
          <Grid container spacing={2} sx={{ display: { xs: "flex" }, flexDirection: { xs: "column-reverse", sm: "column-reverse", md: "column-reverse", xl: "row", lg: "row" } }}>
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
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4} style={{ height: 'fit-content', marginTop: '30px', padding: '10px 16px ' }}>
              <Paper style={{ background: 'rgb(36, 92, 79,0.1)', boxShadow: 'none', }}>
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
              </Paper >
            </Grid >
          </Grid >
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
