import React,{ Suspense,useEffect,useRef,useState } from "react";
import { Box,Button,Card,CardContent,Container,Grid,ImageList,ImageListItem,ImageListItemBar,Link,Paper,Stack,Typography,styled } from "@mui/material";
import styles from "./stylemui";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import * as RecentlyViewed from "../../services/RecentlyViewed";
import { Swiper,SwiperSlide } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import { Helmet } from "react-helmet-async";
import * as BlogService from "../../services/BlogService";
import Typical from "react-typical";
import BlogPostCardMobile from "../../sections/@dashboard/blog/BlogPostCardMobile";
import YourSwiperComponent from "../../components/YourSwiperComponent/YourSwiperComponent";
import CarouselComponent from "components/CarouselComponent/CarouselComponent";
import Loading from "components/LoadingComponent/Loading";
import ChucTetComponent from "components/ChucTetComponent/ChucTetComponent";
import CategoryProductPage from "pages/CategoryProductPage/CategoryProductPage";
import { useNavigate } from "react-router-dom";
import { Assets } from "configs";
import CategoryList from "components/SchemaComponent/SchemaComponent";
import FilterBrandComponent from "components/FilterBrandComponent/FilterBrandComponent";
<script src='https://unpkg.com/codyhouse-framework/main/assets/js/util.js'></script>;

const HomePage = () => {
	const searchProduct = useSelector((state) => state?.product?.search);
	const searchDebounce = useDebounce(searchProduct,100);
	const [limit,setLimit] = useState(12);
	const classes = styles();
	const [loading,setLoading] = useState(false);
	const { t } = useTranslation();
	const [typeProducts,setTypeProducts] = useState([]);
	const navigate = useNavigate();
	// const { filter: categoryId } = useParams();
	const categories = [
		{ id: 'Acoustic-guitars',name: 'Guitar',icon: Assets.guitar },
		{ id: 'piano-electric',name: 'Piano điện',icon: Assets.piano },
		{ id: 'accessories',name: 'Phụ kiện',icon: Assets.daydeoguitar },
		{ id: '',name: 'Tất cả',icon: Assets.allguitar },
		// Thêm các danh mục khác nếu cần
	];
	const slides = [];
	for (let i = 0; i < 5; i++) {
		slides.push(<SwiperSlide key={`slide-${i}`}>Slide {i + 1}</SwiperSlide>);
	}

	const handleDetailsProduct = (categoryId) => {
		// Chuyển đến trang chi tiết sản phẩm với giá trị danh mục
		navigate(`/product/${categoryId}`);
	};
	const fetchProductAll = async () => {
		// const limit = context?.queryKey && context?.queryKey[1];
		// const search = context?.queryKey && context?.queryKey[2];
		const res = await ProductService.getAllProduct();

		return res;
	};
	const fetchProductAllNosearch = async (context) => {
		const res = await ProductService.getAllProduct();

		return res;
	};
	const fetchBlogAll = async (context) => {
		const limit = context?.queryKey && context?.queryKey[1];
		const search = context?.queryKey && context?.queryKey[2];
		const res = await BlogService.getAllBlog(search,limit);

		return res;
	};

	const fetchRecentlyViewed = async () => {
		let storageUserID = localStorage.getItem("userId");
		if (storageUserID === "undefined") {
			// const res = await RecentlyViewed.postRecentlyViewed(slug,userId);
			localStorage.removeItem('userId');
			// return res.data;
		}
		let userIdWithQuotes = storageUserID;

		// Sử dụng replace để loại bỏ dấu \ và "
		let userIdWithoutQuotes = userIdWithQuotes?.replace(/\\/g,'')?.replace(/"/g,'');
		if (!userIdWithoutQuotes) {
			// Nếu userId chưa được set, bạn có thể thực hiện các hành động như đăng nhập hoặc tạo mới userId
			return
		}
		// Bạn cần cung cấp slug từ nơi đó (hoặc từ state hoặc một nguồn khác)
		const res = await RecentlyViewed.getRecentlyViewed(userIdWithoutQuotes);
		const productData = res.data;

		return productData;
	};
	const {
		data: recentlyViewed,
	} = useQuery(["recentlyViewed"],fetchRecentlyViewed,{
		retry: 3,
		retryDelay: 100,
		keepPreviousData: true,
	});
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
	},[]);
	const {
		isLoading,
		data: products,
	} = useQuery(["products"],fetchProductAll,{
		retry: 3,
		retryDelay: 100,
		keepPreviousData: true,
	});
	const {
		isLoadingx,
		data: productsNosearch,
	} = useQuery(["productsNosearch"],fetchProductAllNosearch,{
		retry: 3,
		retryDelay: 100,
		keepPreviousData: true,
	});
	const sortedProducts = products?.data?.sort((a,b) => b.createdAt - a.createdAt);
	// Lấy ra 5 sản phẩm mới nhất
	const latestProducts = sortedProducts?.slice(0,24);
	const acousticProducts = latestProducts?.filter(
		product => product.type === "piano-electric"
	);


	// Then, filter out all products without type "Acoustic-guitars"
	const otherProducts = latestProducts?.filter(product => product.type == "Acoustic-guitars");

	const sortedProductsGuitar = acousticProducts;
	const sortedProductsGuitars = otherProducts;
	const filteredProducts = productsNosearch?.data
		?.filter(product => product.selled > 1)
		?.sort((a,b) => b.selled - a.selled);

	const {
		data: blogs,
		isPreviousData
	} = useQuery(["blogs",limit,searchDebounce],fetchBlogAll,{
		retry: 3,
		retryDelay: 100,
		keepPreviousData: true,
	});
	return (
		<Loading isLoading={loading}>
			<>
				<Helmet>
					<title> Hymns Center</title>
				</Helmet>
				<CategoryList />
				<CarouselComponent />
				<Container maxWidth='lg'>
					<Box>
						<Typography className={classes.txtTitleBox}>Sản phẩm mới</Typography>
						<div className={classes.sliderWrapper}>
							{isLoading ? (
								<Typical
									steps={[
										'Loading...',500
									]}
									loop={Infinity}
									wrapper="span"
									className={classes.txtTilteLoading}
									style={{ textAlign: "center",willChange: "transform" }}
								/>
							) : (
								<YourSwiperComponent latestProducts={sortedProductsGuitars} classes={classes} isLoading={isLoadingx} />

							)}

						</div>
					</Box>

				</Container>
				{/* <Container maxWidth='lg'>
					<Box>
						<Typography className={classes.txtTitleBox}>Tìm theo thương hiệu</Typography>
						<FilterBrandComponent />

					</Box>

				</Container> */}
				<Container maxWidth='lg'>
					<Box>
						<Typography className={classes.txtTitleBox}>PIANO ĐIỆN</Typography>
						<div className={classes.sliderWrapper}>
							{isLoading ? (
								<Typical
									steps={[
										'Loading...',500
									]}
									loop={Infinity}
									wrapper="span"
									className={classes.txtTilteLoading}
									style={{ textAlign: "center",willChange: "transform" }}
								/>
							) : (
								<YourSwiperComponent latestProducts={sortedProductsGuitar} classes={classes} isLoading={isLoadingx} />

							)}

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
						{/* <WrapperButtonMore
								className={classes.ButtonAllPost}
								textbutton={isPreviousData ? "Load more" : "Xem thêm"}
								type='outline'
								styleButton={{
									border: `1px solid ${products?.total === products?.data?.length ? "#f5f5f5" : "#436E67"}`,
									color: `${products?.total === products?.data?.length ? "#f5f5f5" : "#436E67"}`,
									width: "240px",
									height: "38px",
									borderRadius: "4px",
									display: `${products?.total === products?.data?.length || products?.totalPage === 1 ? "none" : "block"}`,
								}}
								disabled={products?.total === products?.data?.length || products?.totalPage === 1}
								styleTextButton={{
									fontWeight: 500,
									color: products?.total === products?.data?.length && "#fff",
								}}
								onClick={() => setLimit((prev) => prev + 6)}
							/> */}
					</Button>

				</Container>

				<Container maxWidth='lg'>
					<Typography className={classes.txtTitleBox}>Sản phẩm bán chạy</Typography>
					<YourSwiperComponent latestProducts={filteredProducts} classes={classes} />
				</Container>
				<Container maxWidth="lg"  >
					<Typography className={classes.txtTitleBox}>Tìm theo danh mục</Typography>
					<Swiper
						grabCursor={true}
						breakpoints={{
							320: { slidesPerView: 2 },
							480: { slidesPerView: 2 },
							768: { slidesPerView: 2 },
							1024: { slidesPerView: 4 },
							1200: { slidesPerView: 4 },
							1489: { slidesPerView: 4 }
						}}
						spaceBetween={30}
						pagination={{
							clickable: true,
						}}
						modules={[Pagination]}
						className="mySwiper"
					>
						{categories.map((category) => {

							return (
								<SwiperSlide >
									<Box className={classes.conCard} >
										<Box style={{ cursor: "pointer",}} onClick={() => handleDetailsProduct(category.id)}>
											<img src={category.icon} style={{ height: "30%",width: "30%",margin: "0 auto",display: "flex" }} />
											<Typography className={classes.nameProduct} >{category.name}</Typography>
										</Box>
									</Box>

								</SwiperSlide>
							);
						})}
					</Swiper>
				</Container>
				<Box sx={{ backgroundColor: "#f7f8fa !important",paddingTop: "20px",paddingBottom: "20px" }}>
					<Container maxWidth='md' style={{ marginTop: "50px",padding: 0 }}>
						<>
							<Container maxWidth='md' style={{ padding: 0 }}>
								<Box sx={{
									paddingLeft: "30px",paddingRight: "30px",display: { xl: "block",xs: "none" }
								}}>
									<Typography className={classes.txtTitleHymnsCenter}>Hymns Center</Typography>
									<Typography className={classes.txtTilte}>Hymns Center - Nơi Hợp Nhất Chất Lượng và Đam Mê Âm Nhạc!</Typography>
									<Typography className={classes.txtTilte}>Nếu bạn đang tìm kiếm một trung tâm dạy đàn guitar chuyên nghiệp, Hymns Center sẽ là một lựa chọn tuyệt vời cho bạn. Tại đây, chúng tôi cung cấp các khóa học đàn guitar từ cơ bản đến nâng cao, giúp học viên phát triển kỹ năng và trở thành một người chơi guitar thành thạo. Với đội ngũ giáo viên giàu kinh nghiệm và tâm huyết, Hymns Center cam kết mang đến cho học viên những bài học chất lượng nhất, giúp họ tiến bộ nhanh chóng và hiệu quả. Chúng tôi luôn tập trung vào việc xây dựng một môi trường học tập thân thiện và đầy đủ các tiện ích để học viên có thể tiếp thu kiến thức một cách dễ dàng và thoải mái nhất.</Typography>
									<Typography className={classes.txtTilte}>Ngoài ra, Hymns Center còn cung cấp các dịch vụ bán đàn guitar và phụ kiện liên quan, giúp học viên có thể sở hữu một cây đàn tốt nhất để phục vụ cho việc học tập và luyện tập. Chúng tôi cam kết chỉ bán các sản phẩm chất lượng cao, đảm bảo sự hài lòng của khách hàng. Nếu bạn muốn học đàn guitar một cách chuyên nghiệp và hiệu quả, Hymns Center là sự lựa chọn tốt nhất cho bạn. Hãy đến với chúng tôi để trải nghiệm những khóa học tuyệt vời và được hỗ trợ tận tình từ các giáo viên giàu kinh nghiệm của chúng tôi.</Typography>
								</Box>
							</Container>
						</>
					</Container >

					<Container maxWidth='lg' style={{ marginTop: "50px",padding: 0 }} sx={{ display: { xl: "none",xs: "block" } }}>
						<>
							<Container maxWidth='lg' style={{ padding: 0 }}>
								<Box sx={{ paddingLeft: "30px",paddingRight: "30px" }}>
									<Typography className={classes.txtTitleBox} >Hymns Center</Typography>
									<Typography className={classes.txtTilte}>Hymns Center - Nơi Hợp Nhất Chất Lượng và Đam Mê Âm Nhạc!</Typography>
									<Typography className={classes.txtTilte}>Khám phá đàn guitar và phụ kiện chất lượng tại Hymns Center. Chúng tôi không chỉ cung cấp những sản phẩm tốt, giá cả phải chăng mà còn mang đến trải nghiệm học guitar chuyên nghiệp. </Typography>
									<Typography className={classes.txtTilte}>Với kinh nghiệm và sự chu cần, Hymns Center sẽ là điểm đến hoàn hảo cho hành trình âm nhạc của bạn. Rất mong được gặp các bạn!"</Typography>
								</Box>
							</Container>
						</>
					</Container>
				</Box>

				<Container maxWidth='lg' style={{ width: "95%",background: "#f7f8fa !important" }} >
					<Box>
						<Typography className={classes.txtTitleBox}>Trích từ Blog</Typography>
						<Grid container  >
							<Swiper
								spaceBetween={10}
								grabCursor={true}
								// navigation={true}
								style={{ paddingLeft: '0px',paddingRight: '0px' }}
								modules={[Pagination]}
								className="mySwiper"
								breakpoints={{
									320: { slidesPerView: 1 },
									396: { slidesPerView: 1 },
									480: { slidesPerView: 1 },
									768: { slidesPerView: 1 },
									1024: { slidesPerView: 3 },
									1200: { slidesPerView: 3 },
								}}
							>
								{blogs?.data?.map((post,index) => {
									return (
										<SwiperSlide className={classes.SwiperSlideBlog} key={post._id}>
											<BlogPostCardMobile id={post?._id} key={post?._id} blog={post} index={index} responsive={12} />
										</SwiperSlide>
									);
								})}
							</Swiper>
						</Grid>
					</Box>
				</Container >

				{(recentlyViewed?.products && (
					<Container maxWidth='lg'>
						<Typography className={classes.txtTitleBox}>Xem gần đây</Typography>
						<YourSwiperComponent latestProducts={recentlyViewed?.products} classes={classes} />
					</Container>
				))}

			</>
		</Loading >
	);
};

export default HomePage;
