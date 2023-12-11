import React,{ Suspense,useEffect,useRef,useState } from "react";
import { WrapperButtonMore,WrapperTitle } from "./style";
import { Box,Button,Card,CardContent,Container,Grid,ImageList,ImageListItem,ImageListItemBar,Link,Paper,Stack,Typography,styled } from "@mui/material";
import styles from "./stylemui";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import * as RecentlyViewed from "../../services/RecentlyViewed";


import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import { ParallaxBanner } from "react-scroll-parallax";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";
import * as BlogService from "../../services/BlogService";
import ShopBLogCard from "../../sections/@dashboard/blog/BlogPostCard";
import { Assets } from "../../configs";
import Typical from "react-typical";
import BlogPostCardMobile from "../../sections/@dashboard/blog/BlogPostCardMobile";
import Carousel from "components/CardComponent/CarouselComponent/CarouselComponent";
<script src='https://unpkg.com/codyhouse-framework/main/assets/js/util.js'></script>;

const CardComponent = React.lazy(() => import('../../components/CardComponent/CardComponent'));

const HomePage = () => {
	const searchProduct = useSelector((state) => state?.product?.search);
	const searchDebounce = useDebounce(searchProduct,100);
	const [limit,setLimit] = useState(6);
	const classes = styles();
	const [loading,setLoading] = useState(false);
	const { t } = useTranslation();
	const [typeProducts,setTypeProducts] = useState([]);
	function getCookieValue(cookieName) {
		var cookieArray = document.cookie.split('; ');
		for (var i = 0; i < cookieArray.length; i++) {
			var cookie = cookieArray[i];
			if (cookie.startsWith(cookieName + '=')) {
				return cookie.split('=')[1];
			}
		}
		return null;
	}

	// Lấy giá trị của cookie 'deviceid'
	var deviceIdValue = getCookieValue('deviceId');

	// Hiển thị giá trị của cookie 'deviceid'
	console.log("Value of 'deviceid' cookie:",deviceIdValue);

	// Sử dụng giá trị userId tại đây
	const fetchProductAll = async (context) => {
		const limit = context?.queryKey && context?.queryKey[1];
		const search = context?.queryKey && context?.queryKey[2];
		const res = await ProductService.getAllProduct(search,limit);

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
	const user = useSelector((state) => state.user);
	const isLoggedIn = user?.access_token; // Kiểm tra xem người dùng đã đăng nhập chưa
	// ...


	const fetchRecentlyViewed = async () => {
		let storageUserID = localStorage.getItem("userId");
		let userIdWithQuotes = storageUserID;

		// Sử dụng replace để loại bỏ dấu \ và "
		let userIdWithoutQuotes = userIdWithQuotes.replace(/\\/g,'').replace(/"/g,'');
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
	console.log("recentlyViewedrecentlyViewed",recentlyViewed)
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
	} = useQuery(["products",limit,searchDebounce],fetchProductAll,{
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
	console.log("productsNosearch",productsNosearch)
	const sortedProducts = products?.data?.sort((a,b) => b.createdAt - a.createdAt);

	// Lấy ra 5 sản phẩm mới nhất
	const latestProducts = sortedProducts?.slice(0,5);

	const filteredProducts = productsNosearch?.data?.filter(product => product.selled > 1);

	console.log(filteredProducts);


	const {
		data: blogs,
		isPreviousData
	} = useQuery(["blogs",limit,searchDebounce],fetchBlogAll,{
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
	const settingsBlog = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		cssEase: "linear",
		pauseOnHover: true,
		appendDots: dots => (
			<div
				style={{
					borderRadius: "10px",
					marginTop: "15px"
				}}
			>
				<ul style={{
					margin: "0px",
				}}>
					{dots}
				</ul>
			</div>
		),
		customPaging: i => (
			<button
				style={{
					width: "10px",
					height: "10px",

					".slick-dots li.slick-active button:before": {
						zIndex: 1000,
						height: "8px !important",
						marginRight: "10px",
						backgroundColor: "#dce0e3",
						borderRadius: "10px",
						content: "",
						opacity: 1,
						transition: "width .3s linear,background-color .3s linear",
						width: "32px",
					}
				}}
			/>
		),
		className: "left",
		centerMode: true,
		centerPadding: "5px",
	};



	const images = [
		{ mobile: Assets.bgHomeM1,default: Assets.bgHome },
		// { mobile: Assets.bgHomeM2,default: Assets.bgHome2 },
		// { mobile: Assets.bgHomeM3,default: Assets.bgHome3 },
		// { mobile: Assets.bgHomeM4,default: Assets.bgHome4 },
		// { mobile: Assets.bgHomeM5,default: Assets.bgHome5 },
		// { mobile: Assets.bgHomeM6,default: Assets.bgHome6 },
		// Thêm các đối tượng hình ảnh khác nếu cần
	];

	const settingsXemlai = {
		focusOnSelect: true,
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		speed: 500
		// responsive: [
		// 	{
		// 		breakpoint: 1024,
		// 		settings: {
		// 			slidesToShow: 3,
		// 			slidesToScroll: 3,
		// 			infinite: true,
		// 			centerMode: false,
		// 			dots: true,
		// 		},
		// 	},
		// 	{
		// 		breakpoint: 768,
		// 		settings: {
		// 			slidesToShow: 2,
		// 			centerMode: false,
		// 			slidesToScroll: 2,
		// 		},
		// 	},
		// 	{
		// 		breakpoint: 480,
		// 		settings: {
		// 			slidesToShow: 1,
		// 			centerMode: false,
		// 			slidesToScroll: 1,
		// 		},
		// 	},
		// ],
	};
	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 5,
		draggable: false,
		className: "center",
		variableWidth: false,

		centerMode: true,
		centerPadding: "60px",
		speed: 500,
		// cssEase: "linear",
		pauseOnHover: true,
		// nextArrow: <SampleNextArrow />,
		// prevArrow: <SamplePrevArrow />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					centerMode: false,

					dots: true,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					centerMode: true,
					variableWidth: false,

					draggable: true, // Tắt chức năng trượt
					infinite: true,

					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					infinite: true,
					variableWidth: false,

					draggable: true, // Tắt chức năng trượt
					centerMode: true,
					slidesToScroll: 1,
				},
			},
		],
	};
	const settingsBanchay = {
		dots: true,
		infinite: true,
		slidesToShow: 4,
		draggable: false,

		centerMode: true,
		// centerPadding: "60px",
		speed: 500,
		// cssEase: "linear",
		pauseOnHover: true,
		// nextArrow: <SampleNextArrow />,
		// prevArrow: <SamplePrevArrow />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					centerMode: false,
					dots: true,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					draggable: true,
					centerMode: false,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					draggable: true,
					centerMode: false,
					slidesToScroll: 1,
				},
			},
		],
	};
	const [reverseOrder,setReverseOrder] = useState(false);
	// Lấy bài viết mới nhất đưa lên đầu
	const sortedBlogs = blogs?.data?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
	const toggleOrder = () => {
		setReverseOrder(!reverseOrder);
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
		height: "300px",
		width: "400px",
		textAlign: "center",
	}));
	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: "#1A2027",
		...theme.typography.body2,
		padding: theme.spacing(1),

		textAlign: "center",
		color: theme.palette.text.secondary,
	}));
	return (
		// <Loading isLoading={isLoading || loading}>
		<>

			<Helmet>
				<title> Hymns </title>
			</Helmet>

			<Box className={classes.container}>
			</Box>
			{/* <Box >
				<ImageCarousel images={images} />
			</Box> */}
			<Container maxWidth='lg' style={{ marginTop: "100px" }}>
				<Box>
					<Typography className={classes.txtTitleBox}>Sản phẩm mới</Typography>
					<div className={classes.sliderWrapper}>
						{isLoading ? (
							<Typical
								steps={[
									'Xin chào!, bạn vui lòng đợi trong giây lát...',1000,
									'Server free có thể "ngủ gật" một chút.',1000,
									'Nhưng đừng lo, nó sẽ tỉnh giấc ngay thôi!',500,
									'Chúc bạn có một ngày thật tuyệt vời! ☕️🌟',500
								]}
								loop={Infinity}
								wrapper="span"
								className={classes.txtTilteLoading}
								style={{ textAlign: "center",willChange: "transform" }}
							/>
						) : (
							<ImageList variant='masonry' cols={1} gap={8}>
								<Suspense fallback={<Typography className={classes.txtTilte} style={{ textAlign: "center" }}>Loading...</Typography>}>
									<Slider {...settings} style={{ overflow: "hidden" }}>
										{latestProducts?.map((product,index,post) => {
											// Lấy hình ảnh ở vị trí đầu tiên trong mảng images
											const firstImage = product.image[0];

											return (
												<div key={product._id} style={{ width: '100px' }}>
													<ImageListItem style={{ cursor: "pointer" }}>
														<CardComponent
															post={post}
															index={index}
															key={product._id}
															countInStock={product.countInStock}
															type={product.type}
															description={product.description}
															image={firstImage} // Sử dụng hình ảnh đầu tiên
															name={product.name.slice(0,200)}
															price={product.price}
															rating={product.rating}
															discount={product.discount}
															selled={product.selled}
															id={product._id}
															slug={product.slug}
															createdAt={product.createdAt}
															style={{ cursor: "pointer" }}
														/>
													</ImageListItem>
												</div>
											);
										})}
									</Slider>

								</Suspense>

							</ImageList>
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
									border: `1px solid ${products?.total === products?.data?.length ? "#f5f5f5" : "#212B36"}`,
									color: `${products?.total === products?.data?.length ? "#f5f5f5" : "#212B36"}`,
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

			<Container maxWidth='lg' style={{ marginTop: "100px" }}>
				<Typography className={classes.txtTitleRecentlyViewed}>Sản phẩm bán chạy</Typography>

				<ImageList variant='masonry' cols={1} gap={8}>
					<Suspense fallback={<Typography className={classes.txtTilte} style={{ textAlign: "center" }}>Loading...</Typography>}>
						<Slider {...settingsBanchay} style={{ overflow: "hidden" }}>
							{filteredProducts?.map((product,index,post) => {
								// Lấy hình ảnh ở vị trí đầu tiên trong mảng images
								const firstImage = product.image[0];

								return (
									<div key={product._id}>
										<ImageListItem style={{ cursor: "pointer" }}>
											<CardComponent
												post={post}
												index={index}
												key={product._id}
												countInStock={product.countInStock}
												type={product.type}
												description={product.description}
												image={firstImage} // Sử dụng hình ảnh đầu tiên
												name={product.name.slice(0,200)}
												price={product.price}
												rating={product.rating}
												discount={product.discount}
												selled={product.selled}
												id={product._id}
												slug={product.slug}
												createdAt={product.createdAt}
												style={{ cursor: "pointer" }}
											/>
										</ImageListItem>
									</div>
								);
							})}
						</Slider>

					</Suspense>

				</ImageList>
			</Container>
			<Container maxWidth='lg' style={{ marginTop: "50px",padding: 0 }}>
				<>
					<Container maxWidth='lg' style={{ padding: 0 }}>
						<Box sx={{
							paddingLeft: "30px",paddingRight: "30px",display: { xl: "block",xs: "none" }
						}}>
							<Typography className={classes.txtTitleBox}>Về Hymns Center</Typography>
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
							<Typography className={classes.txtTitleBox}>Về Hymns Center</Typography>
							<Typography className={classes.txtTilte}>Hymns Center - Nơi Hợp Nhất Chất Lượng và Đam Mê Âm Nhạc!</Typography>
							<Typography className={classes.txtTilte}>Khám phá đàn guitar và phụ kiện chất lượng tại Hymns Center. Chúng tôi không chỉ cung cấp những sản phẩm tốt, giá cả phải chăng mà còn mang đến trải nghiệm học guitar chuyên nghiệp. </Typography>
							<Typography className={classes.txtTilte}>Với kinh nghiệm và sự chu cần, Hymns Center sẽ là điểm đến hoàn hảo cho hành trình âm nhạc của bạn. Rất mong được gặp các bạn!"</Typography>
						</Box>
					</Container>
				</>
			</Container>
			<Container maxWidth='lg' style={{ marginTop: "100px" }}>
				<Box>
					<Typography className={classes.txtTitleBox}>Bài viết</Typography>
					<Grid container spacing={2} sx={{ display: { xl: "block",xs: "none" } }}>
						{[0,1,2].map((row) => (
							<Grid key={row} container item spacing={2}>
								{sortedBlogs?.slice(row * 3,(row + 1) * 3).map((post,index) => (
									<ShopBLogCard id={post?._id} key={post?._id} blog={post} index={index} />
								))}
							</Grid>
						))}
					</Grid>
					<Grid container spacing={2} sx={{ display: { xl: "none",xs: "block" } }}>
						<Slider {...settingsBlog} >
							{blogs?.data?.map((post,index) => (
								<BlogPostCardMobile id={post?._id} key={post?._id} blog={post} index={index} />
							))}
						</Slider>
					</Grid>

				</Box>
				{/* <Button
					sx={{ p: 3 }}
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
						marginTop: "10px",
					}}
				>
					<WrapperButtonMore
						textbutton={isPreviousData ? "Load more" : "Xem thêm"}
						type='outline'
						styleButton={{
							border: `1px solid ${blogs?.total === blogs?.data?.length ? "#f5f5f5" : "#212B36"}`,
							color: `${blogs?.total === blogs?.data?.length ? "#000" : "#212B36"}`,
							width: "180px",
							height: "38px",
							borderRadius: "4px",
							display: `${blogs?.total === blogs?.data?.length || blogs?.totalPage === 1 ? "none" : "block"}`,
						}}
						disabled={blogs?.total === blogs?.data?.length || blogs?.totalPage === 1}
						styleTextButton={{
							fontWeight: 500,
							color: blogs?.total === blogs?.data?.length && "#000",
						}}
						onClick={() => setLimit((prev) => prev + 2)}
					/>
				</Button> */}
			</Container >
			<Container maxWidth='lg' style={{ marginTop: "100px" }}>
				<Typography className={classes.txtTitleRecentlyViewed}>Xem gần đây</Typography>
				<ImageList variant='masonry' cols={1} gap={8}>
					<Suspense fallback={<Typography className={classes.txtTilte} style={{ textAlign: "center" }}>Loading...</Typography>}>
						<Carousel products={recentlyViewed?.products} />
					</Suspense>

				</ImageList>

			</Container>
		</>
		// </Loading >
	);
};

export default HomePage;
