import React, { useEffect, useRef, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
  WrapperButtonMore,
  WrapperDiscountGrid,
  WrapperDiscountGridItem,
  WrapperProducts,
  WrapperTitle,
  WrapperTypeProduct,
} from "./style";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.jpg";
import slider3 from "../../assets/images/slider3.webp";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Box, Button, ButtonBase, Container, Grid, ImageList, ImageListItem, ImageListItemBar, Link, Paper, Stack, Typography, styled } from "@mui/material";
import styles from "./stylemui";
import { Assets } from "../../configs";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { useTranslation } from "react-i18next";
import { Label } from '@mui/icons-material';
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import { Card } from "antd";
import { Masonry } from "@mui/lab";
import { Parallax, ParallaxBanner, ParallaxProvider, useParallax } from "react-scroll-parallax";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
<script src="https://unpkg.com/codyhouse-framework/main/assets/js/util.js"></script>;
const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 100);
  const [limit, setLimit] = useState(5);
  const classes = styles();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [typeProducts, setTypeProducts] = useState([]);

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);

    return res;
  };
  // const fetchProductAll = async (search) => {
  //   let res = [];
  //     res = await ProductService.getAllProduct(search);
  //   if (search?.length > 0 || refSearch?.current) {
  //     setStateProducts(res?.data);
  //     return []
  //   } else {
  //     return res;
  //   }
  // }
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchAllTypeProduct();
    setLoading(false);

  }, []);
  const {
    isLoading,
    data: products,
    isPreviousData,
  } = useQuery(["products", limit, searchDebounce], fetchProductAll, {
    retry: 3,
    retryDelay: 100,
    keepPreviousData: true,
  });
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        // style={{ display: "none", marginLeft: '40px', marginTop: '30px', zIndex: 100000, }}
        onClick={onClick}
      >
        <FontAwesomeIcon style={{
          right: '40px', height: '30px', display: "block",
          width: '30px', color: "#245c4f",
        }} icon={faCircleArrowLeft} rotation={180} />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        // style={{ display: "block", marginLeft: '40px', marginTop: '30px', zIndex: 100000, position: 'fixed' }}
        onClick={onClick}
      >
        <FontAwesomeIcon className={className} onClick={onClick} style={{
          position: 'fixed', height: '30px',
          width: '30px', color: "#245c4f", marginLeft: '50px'
        }} icon={faCircleArrowLeft} />
      </div>
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
    prevArrow: <SamplePrevArrow />
  };
  // const lastProduct = products?.data?.[products?.data?.length - 1]
  // useEffect(() => {
  //   if (refSearch.current) {
  //     setLoading(true);
  //     fetchProductAll(searchDebounce);
  //   }
  //   refSearch.current = true;
  //   setLoading(false);
  // }, [searchDebounce]);

  // useEffect(() => {
  //   if (products?.data?.length > 0) {
  //     setStateProducts(products?.data);
  //   }
  // }, [products]);
  function Component() {
    const parallax = useParallax({
      speed: -10,
    });
    return <div ref={parallax.ref} />;
  }
  const ParallaxBannerw = styled(ParallaxBanner)(({ theme }) => ({
    padding: theme.spacing(1),
    height: '300px',
    width: '400px',
    textAlign: 'center',
  }));
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    ...theme.typography.body2,
    padding: theme.spacing(1),

    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return (
    <Loading isLoading={isLoading || loading}>
      {/* <WrapperTypeProduct>
        {typeProducts.map((item) => {
          return <TypeProduct name={item} key={item} />;
        })}
      </WrapperTypeProduct> */}
      <Box className={classes.container}>

        {/*   <Grid container className={classes.conContent} spacing={5}>
          <Grid item xs={12} sm={6} lg={4} my={30} >
          </Grid>
          <Grid item xs={12} sm={6} lg={8} className={classes.conCard}>
            <Grid spacing={3}>
              <Grid item xs={12} sm={12} md={12}>
                <Card className={classes.crypto_section}> */}
        {/* <Box className={classes.bg_section}>
                    <Box sx={{ width: '100%' }}>

                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                        <Grid item xs={6}>
                          <CardComponent
                            post={lastProduct}
                            index={lastProduct}
                            key={lastProduct._id}
                            countInStock={lastProduct.countInStock}
                            description={lastProduct.description}
                            image={lastProduct.image}
                            name={lastProduct.name}
                            price={lastProduct.price}
                            rating={lastProduct.rating}
                            type={lastProduct.type}
                            discount={lastProduct.discount}
                            selled={lastProduct.selled}
                            id={lastProduct._id}
                            createdAt={lastProduct.createdAt}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <Item>1</Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item>2</Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item>3</Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item>4</Item>
                        </Grid>

                      </Grid>

                    </Box>
                  </Box> */}

        {/* <Stack spacing={2} sx={{ p: 3 }}>
                    <Link color="inherit" underline="hover">
                      <Typography
                        onClick={() => handleDetailsProduct(id)}
                        className={classes.NameCard}
                        variant="subtitle2"
                        noWrap
                      >
                        {name}
                      </Typography>
                    </Link>

                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    onClick={() => handleDetailsProduct(id)}
                    >
                      <Box></Box>
                      <Typography variant="subtitle1">
                        <Typography
                          component="span"
                          variant="body1"
                          sx={{
                            color: "text.disabled",
                            textDecoration: "line-through",
                          }}
                        >
                          {selled && fCurrency(selled)}
                        </Typography>
                        <span> da ban {selled || 1000}+</span>
                        {fCurrencyVND(price)}
                      </Typography>
                    </Stack>
                  </Stack> */}
        {/* </Card>
              </Grid>
            </Grid>

          </Grid>
        </Grid>*/}
      </Box>


      <Container maxWidth="lx" style={{ marginTop: '100px' }}>
        <Box>
          <WrapperTitle >Latest Releases</WrapperTitle>

          <ImageList variant="masonry" cols={1} gap={8}>
            <div>
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
                        {/* <ImageListItemBar position="below" title={product.name} /> */}

                      </ImageListItem>

                    </div>
                  )

                })}

              </Slider>
            </div>
            {/* {products?.data?.map((product, post, index) => {
              return (
                <div>
                  <ImageListItem key={product.image}>
                    <Slider {...settings}>

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
                      />
                      <ImageListItemBar position="below" title={product.name} />
                    </Slider>

                  </ImageListItem>

                </div>



              );
            })} */}
          </ImageList>
        </Box>
        <Button
          sx={{ p: 3 }}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <WrapperButtonMore
            className={classes.ButtonAllPost}
            textbutton={isPreviousData ? "Load more" : "Xem thêm"}
            type="outline"
            styleButton={{
              border: `1px solid ${products?.total === products?.data?.length
                ? "#f5f5f5"
                : "#245c4f"
                }`,
              color: `${products?.total === products?.data?.length
                ? "#f5f5f5"
                : "#245c4f"
                }`,
              width: "240px",
              height: "38px",
              borderRadius: "4px",
              display: `${products?.total === products?.data?.length ||
                products?.totalPage === 1 ? "none" : "block"}`
            }}
            disabled={
              products?.total === products?.data?.length ||
              products?.totalPage === 1
            }

            styleTextButton={{
              fontWeight: 500,
              color: products?.total === products?.data?.length && "#fff",
            }}
            onClick={() => setLimit((prev) => prev + 6)}
          />
        </Button>

      </Container>

      <Container maxWidth="md" style={{ marginTop: '50px' }}>
        <ParallaxProvider>
          <>
            <Parallax speed={-5}>
              <Container maxWidth="md">
                <Box sx={{ width: '100%', maxWidth: 800, paddingLeft: '30px', paddingRight: '30px' }}>

                  <WrapperTitle style={{ marginBottom: '20px' }}>
                    Giới thiệu
                  </WrapperTitle>


                  <Typography className={classes.txtTilte}>
                    Trung tâm dạy đàn guitar Hymns Guitar Class - Nơi học đàn chuyên nghiệp từ cơ bản đến nâng cao
                  </Typography>
                  <Typography className={classes.txtTilte}>
                    Nếu bạn đang tìm kiếm một trung tâm dạy đàn guitar chuyên nghiệp, Hymns Guitar Class sẽ là một lựa chọn tuyệt vời cho bạn. Tại đây, chúng tôi cung cấp các khóa học đàn guitar từ cơ bản đến nâng cao, giúp học viên phát triển kỹ năng và trở thành một người chơi guitar thành thạo.
                    Với đội ngũ giáo viên giàu kinh nghiệm và tâm huyết, Hymns Guitar Class cam kết mang đến cho học viên những bài học chất lượng nhất, giúp họ tiến bộ nhanh chóng và hiệu quả. Chúng tôi luôn tập trung vào việc xây dựng một môi trường học tập thân thiện và đầy đủ các tiện ích để học viên có thể tiếp thu kiến thức một cách dễ dàng và thoải mái nhất.
                  </Typography>
                  <Typography className={classes.txtTilte}>
                    Ngoài ra, Hymns Guitar Class còn cung cấp các dịch vụ bán đàn guitar và phụ kiện liên quan, giúp học viên có thể sở hữu một cây đàn tốt nhất để phục vụ cho việc học tập và luyện tập. Chúng tôi cam kết chỉ bán các sản phẩm chất lượng cao, đảm bảo sự hài lòng của khách hàng.
                    Nếu bạn muốn học đàn guitar một cách chuyên nghiệp và hiệu quả, Hymns Guitar Class là sự lựa chọn tốt nhất cho bạn. Hãy đến với chúng tôi để trải nghiệm những khóa học tuyệt vời và được hỗ trợ tận tình từ các giáo viên giàu kinh nghiệm của chúng tôi.
                  </Typography>
                  {/* <Typography variant="overline" display="block" gutterBottom>
                    overline text
                  </Typography> */}
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2} columns={16}>
                    <Grid item xs={8}>
                      <ParallaxBannerw
                        layers={[
                          { image: `${Assets.bgClass}`, speed: -20 },
                          // { image: `${Assets.bgClass}`, speed: -10 },
                        ]}
                        className="aspect-[2/1]"
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <ParallaxBannerw
                        layers={[
                          { image: `${Assets.bgClass}`, speed: -20 },
                          // { image: `${Assets.bgClass}`, speed: -10 },
                        ]}
                        className="aspect-[2/1]"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </Parallax>
          </>



        </ParallaxProvider>
        {/* <Box className={classes.containerMaxWidth}> */}
        {/* <Typography className={classes.txtHeaderTitle}>
            Recent Posts
          </Typography>
          <Typography className={classes.txtDesTitleSignUp}>
            Exclusive content from yours truly on this website ONLY. Join us
            now!
          </Typography> */}
        {/* <WrapperTitle >SẢN PHẨM</WrapperTitle> */}

        {/* </Box> */}

        {/* <Grid container spacing={3}>
          {products?.data?.map((product, post, index) => {
            return (
              <Grid item xs={12} sm={6} md={3}>
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
                />
              </Grid>
            );
          })}
        </Grid> */}


      </Container>
      <Container maxWidth="2100px" style={{ marginTop: '100px' }}>
        <ParallaxProvider>
          <>
            <Parallax speed={-5}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <ParallaxBannerw
                      style={{ height: '500px', background: 'linear - gradient(0deg, rgba(0, 0, 0, 0.86), rgba(0, 0, 0, 0.86))' }}
                      layers={[
                        { image: `${Assets.bgBanner}`, speed: -20 },
                      ]}
                      className="aspect-[2/1]"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Parallax>
          </>



        </ParallaxProvider>
      </Container>

    </Loading>
  );
};

export default HomePage;
