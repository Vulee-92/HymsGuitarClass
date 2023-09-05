import React, { useEffect, useRef, useState } from "react";
import {
  WrapperButtonMore,
  WrapperTitle,
} from "./style";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Box, Button, Container, Grid, ImageList, ImageListItem, ImageListItemBar, Link, Paper, Stack, Typography, styled } from "@mui/material";
import styles from "./stylemui";
import { Assets } from "../../configs";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import { Parallax, ParallaxBanner, ParallaxProvider, useParallax } from "react-scroll-parallax";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";
import AnimationComponent from "components/AnimationComponent/AnimationComponent";
import Typical from "react-typical";
<script src="https://unpkg.com/codyhouse-framework/main/assets/js/util.js"></script>;
const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 100);
  const [limit, setLimit] = useState(4);
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
      <Helmet>
        <title> Hymns </title>
      </Helmet>
      {!isLoading && (
        <>
          <Box className={classes.container} >
          </Box>
          <Container maxWidth="lx" style={{ marginTop: '100px' }}>
            <Box>

              {/* <Typography className={classes.txtTitleBox}>Latest Releases</Typography> */}
              <AnimationComponent type="text" text="Latest Releases" className={classes.txtTitleBox} />
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
                            {/* <ImageListItemBar position="below" title={product.name} /> */}
                          </ImageListItem>
                        </div>

                      )
                    })}
                  </Slider>
                </ImageList>
              </div>

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


          <Container maxWidth="xl" style={{ marginTop: '50px' }}>
            <ParallaxProvider>
              <>
                <Parallax speed={-5}>
                  <Container maxWidth="xl">
                    <Box sx={{ width: '100%', maxWidth: 1900, paddingLeft: '30px', paddingRight: '30px' }}>
                      <Typography className={classes.txtTitleBox}>           <AnimationComponent type="text" text="Giới thiệu" /></Typography>


                      <AnimationComponent text="   Trung tâm dạy đàn guitar Hymns Guitar Class - Nơi học đàn chuyên nghiệp từ cơ bản đến nâng cao" className={classes.txtTilte} />
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
        </>
      )}
    </Loading>
  );
};

export default HomePage;
