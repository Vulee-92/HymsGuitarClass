import { Col, Row, Image, InputNumber, Rate } from "antd";
import React, { useEffect, useState } from "react";
import imageProductSmall from "../../assets/images/imagesmall.webp";
import imageProduct from "../../assets/images/test.webp";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
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
import { Accordion, AccordionDetails, AccordionSummary, Box, Breadcrumbs, Button, Container, Grid, Link, Paper, Rating, Stack, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Zoom from "react-img-zoom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
const ProductDetailsComponent = ({ idProduct }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order)
  const classes = styles();
  const [errorLimitOrder, setErrorLimitOrder] = useState(false)
  const onChange = (value) => {
    setNumProduct(Number(value));
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
  // const handleAddOrderProduct = () => {
  //   if (!user?.id) {
  //     navigate('/sign-in', { state: location?.pathname })
  //   } else {
  //     dispatch(addOrderProduct({
  //       orderItem: {
  //         name: productDetails?.name,
  //         amount: numProduct,
  //         image: productDetails?.image,
  //         price: productDetails?.price,
  //         product: productDetails?._id,
  //         discount: productDetails?.discount,
  //         countInStock: productDetails?.countInStock
  //       }
  //     }))
  //     // {
  //     //     name: { type: String, required: true },
  //     //     amount: { type: Number, required: true },
  //     //     image: { type: String, required: true },
  //     //     price: { type: Number, required: true },
  //     //     product: {
  //     //         type: mongoose.Schema.Types.ObjectId,
  //     //         ref: 'Product',
  //     //         required: true,
  //     //     },
  //     // },
  //   }
  // }
  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate('/sign-in', { state: location?.pathname })
    } else {
      // {
      //     name: { type: String, required: true },
      //     amount: { type: Number, required: true },
      //     image: { type: String, required: true },
      //     price: { type: Number, required: true },
      //     product: {
      //         type: mongoose.Schema.Types.ObjectId,
      //         ref: 'Product',
      //         required: true,
      //     },
      // },
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


  return (
    <Loading isLoading={isLoading}>
      <Container maxWidth="lg" style={{ marginTop: '50px' }}>
        <Grid spacing={2}>
          <Grid item xs={12}>
          </Grid>

        </Grid>
        <Grid spacing={2}>
          <Grid item xs={8}>

          </Grid>
          <Grid item xs={4}>
            <Paper>
              <div style={{
                display: "flex", float: 'right', aliggItems: "center", gap: "12px", alignItems: 'center',
                justifyContent: ' space-between',
                width: 'fit-content'
              }}>

                <Box style={{ alignItems: 'flex-end !important' }}>
                  <Typography className={classes.priceTitle}>
                    {productDetails?.price?.toLocaleString()}
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
                {errorLimitOrder && <div style={{ color: 'red' }}>San pham het hang</div>}
              </div>
            </Paper>
          </Grid>

        </Grid>
        <Grid spacing={2}>
          <Grid item xs={12}>
            <div role="presentation" >
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                  Trang chủ
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  href="/material-ui/getting-started/installation/"
                >
                  Guitar
                </Link>
                <Typography className={classes.nameProduct}>     {productDetails?.name}</Typography>
              </Breadcrumbs>
            </div>
            <Paper className={classes.nameProduct}>             <Typography className={classes.nameProduct}><span style={{ cursor: 'pointer' }} onClick={() => { navigate('/') }}>Trang chủ</span> - Chi tiết sản phẩm</Typography>
            </Paper>
          </Grid>

        </Grid>
        <Grid container spacing={2} style={{
          // textAlign: '-webkit-center', marginBottom: '50px',
        }}>
          <Grid item xs={8}>
            <Typography className={classes.nameProduct}>
              {productDetails?.name}
            </Typography>
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
        <Grid container spacing={2} >
          <Grid item xs={8} style={{ padding: '30px' }}>
            <Paper style={{ boxShadow: 'none' }}>      <Typography className={classes.txtTilte}
              dangerouslySetInnerHTML={{
                __html: productDetails?.description
              }}></Typography></Paper>
            <div>
              <Accordion>
                <AccordionSummary
                  expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.txtTilte}>Tôi có được kiểm tra sản phẩm trước khi mua?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes.txtTilte}>
                    Trừ những sản phẩm được trưng bày tại cửa hàng, hàng hoá trong kho của chúng tôi luôn được giữ nguyên kiện nguyên tem. Nếu bạn muốn kiểm tra sản phẩm trước khi mua online, vui lòng gọi showroom Swee Lee trước khi đến cửa hàng, nhân viên của chúng tôi luôn nhiệt tình hỗ trợ!
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
          <Grid item xs={4} style={{ height: 'fit-content', marginTop: '30px', padding: '10px 16px ' }}>
            <Paper style={{ background: 'rgb(36, 92, 79,0.1)', boxShadow: 'none', }}>
              <WrapperPriceProduct style={{ padding: '10px 16px ', background: 'rgb(36, 92, 79,0.01)' }}>
                <WrapperPriceTextProduct style={{ textAlign: 'center' }}>
                  {productDetails?.price?.toLocaleString()}₫
                </WrapperPriceTextProduct>
              </WrapperPriceProduct>
              <Typography className={classes.nameProduct} style={{ padding: '10px 16px ' }}>
                {productDetails?.name}   <Stack spacing={1}>
                  <Rating name="size-small" defaultValue={productDetails?.rating} size="small" />
                </Stack>

                Da ban {productDetails?.countInStock}+
              </Typography>
              <Rate
                allowHalf
                defaultValue={productDetails?.rating}
                value={productDetails?.rating}

              />


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
                      width: "300px",
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
      </Container >

    </Loading >
  );
};

export default ProductDetailsComponent;
