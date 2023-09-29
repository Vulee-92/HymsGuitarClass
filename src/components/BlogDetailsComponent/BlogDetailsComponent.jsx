import React,{ useEffect,useRef,useState } from "react";
import * as BlogService from "../../services/BlogService";

import { useQuery } from "@tanstack/react-query";
import { useDispatch,useSelector } from "react-redux";
import { useLocation,useNavigate } from "react-router-dom";
import styles from "./stylemui";
import { Box,Container,Grid,ImageList,Paper,Typography } from "@mui/material";
import "react-medium-image-zoom/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox,faChevronDown,faCircleArrowLeft,faPeopleCarryBox,faTruck,faXmark } from "@fortawesome/free-solid-svg-icons";
import AnimationComponent from "components/AnimationComponent/AnimationComponent";

import { useDebounce } from "hooks/useDebounce";

import { Helmet } from "react-helmet-async";

const BlogDetailPage = ({ idBlog }) => {
	// const classess = useStyles({ isMobile });
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const [numBlog,setNumBlog] = useState(1);
	const user = useSelector((state) => state.user);
	const order = useSelector((state) => state.order);
	const classes = styles();
	const [limit,setLimit] = useState(6);
	const searchBlog = useSelector((state) => state?.blog?.search);
	const searchDebounce = useDebounce(searchBlog,100);




	const [isCartOpen,setIsCartOpen] = useState(false);

	const fetchGetDetailsBlog = async (context) => {
		const id = context?.queryKey && context?.queryKey[1];

		if (id) {
			const res = await BlogService.getDetailsBlog(id);
			return res.data;
		}
	};


	const fetchBlogAll = async (context) => {
		const limit = context?.queryKey && context?.queryKey[1];
		const search = context?.queryKey && context?.queryKey[2];
		const res = await BlogService.getAllBlog(search,limit);
		return res;
	};
	const fetchData = async () => {
		const context = { queryKey: ["blogs",idBlog] };
		const result = await fetchGetDetailsBlog(context);
	};

	fetchData();
	// useEffect(() => {
	// 	if (order.isSucessOrder) {
	// 		message.success("Đã thêm vào giỏ hàng");
	// 	}
	// 	return () => {
	// 		dispatch(resetOrder());
	// 	};
	// },[order.isSucessOrder]);
	const handleChangeCount = (type,limited) => {
		if (type === "increase") {
			if (!limited) {
				setNumBlog(numBlog + 1);
			}
		} else {
			if (!limited) {
				setNumBlog(numBlog - 1);
			}
		}
	};
	console.log("idBlog",idBlog)

	const { isLoading,data: blogDetails } = useQuery(
		["blogs",idBlog],
		fetchGetDetailsBlog
	);

	// // Kiểm tra xem dữ liệu đang được tải hay không
	// if (isLoading) {
	// 	return <p>Loading...</p>;
	// }

	// // Kiểm tra xem có dữ liệu chi tiết blog hay không
	// if (!blogDetails) {
	// 	return <p>No blog details available.</p>;
	// }

	console.log("blogDetails",blogDetails)

	// const { isLoading,data: blogDetails } = useQuery(["blog-details",idBlog],fetchGetDetailsBlog,{ enabled: !!idBlog });
	// useEffect(() => {
	// 	const orderRedux = order?.orderItems?.find((item) => item.product === blogDetails?._id);
	// 	if (orderRedux?.amount + numBlog <= orderRedux?.countInstock || (!orderRedux && blogDetails?.countInStock > 0)) {
	// 		setErrorLimitOrder(false);
	// 	} else if (blogDetails?.countInStock === 0) {
	// 		setErrorLimitOrder(true);
	// 	}
	// },[numBlog]);


	const {
		isLoadings,
		data: blogs,
		isPreviousData,
	} = useQuery(["blogs",limit,searchDebounce],fetchBlogAll,{
		retry: 3,
		retryDelay: 100,
		keepPreviousData: true,
	});
	console.log("first",blogs)
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
					dots: true,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};






	return (
		<>

			<Helmet>
				<title>{blogDetails?.name}</title>
			</Helmet>

			<Box sx={
				{
					textAlign: '-webkit-center',marginTop: '0px',
					borderBottom: { xl: "1px solid #d6d6d4",xs: "none",md: "1px solid #d6d6d4" },
					display: "flex",justifyContent: "center",
					// backgroundColor: "#f4f4f2"
				}
			} >
				<Container width={{ md: "xs",xl: "xs",lg: "xs" }} style={{ overflow: "hidden" }}>
					<Grid container spacing={2}>

						<Grid sx={{ display: { xs: "none",xl: "flex",lg: "flex",md: "none",sm: "none" },flexDirection: { xl: "column-reverse",lg: "column-reverse" } }} item sm={12} md={12} lg={12} xl={12} style={{ height: "fit-content",margin: "16px",padding: "0px" }}>

						</Grid>
					</Grid>
				</Container>
			</Box>
			<Container width={{ md: "xs",xl: "xs",lg: "xs" }} style={{ overflow: "hidden" }}>


				<Typography sx={{ display: { xs: "flex",xl: "flex",lg: "none",md: "none",sm: "none" },borderBottom: { xs: "2px solid #d6d6d4",xl: "none" },paddingBottom: { xs: "10px" },marginTop: { xs: 0,xl: "16px",lg: "16px",md: "16px" },}} style={{ marginBottom: "16px",textAlign: "left" }} className={classes.nameProductMobile}>
					{blogDetails?.title}
				</Typography>

				<Grid container spacing={2} sx={{ display: { xs: "flex" },marginLeft: "0px",width: "100%",justifyContent: "space-around",flexDirection: { xs: "column-reverse",sm: "column-reverse",md: "column-reverse",xl: "row",lg: "row" } }}>
					<Grid item xs={12} sm={12} md={12} lg={8} xl={8} style={{ padding: "10px" }}>
						<Paper style={{ boxShadow: "none" }}>
							<Typography sx={{ margin: "0 !important",textAlign: { xs: "left" } }} className={classes.txtTitleBox}>
								Mô tả sản phẩm
							</Typography>
							<Typography
								className={classes.txtTilte} style={{ textAlign: "left",fontSize: "15px" }}
								dangerouslySetInnerHTML={{
									__html: blogDetails?.description,
								}}
							></Typography>
						</Paper>
						<hr style={{ marginBottom: "60px" }} />


					</Grid>
					<Grid container spacing={2} sx={{ width: "100%",justifyContent: { xs: "center" },marginLeft: { xs: "0px",xl: "-16px",md: "-16px",sm: "-16px" },marginTop: { xs: "0px",xl: "40px" },paddingLeft: { xs: "0px !important",xl: "0px" } }} item xs={12} sm={12} md={12} lg={4} xl={4} style={{ height: "fit-content" }}>

					</Grid>
				</Grid>

				<hr style={{ margin: "60px 0" }} />
				<Box style={{ margin: "60px 0" }}>
					{/* <Typography className={classes.txtTitleBox}>Latest Releases</Typography> */}
					<AnimationComponent type='text' text='Có thể bạn quan tâm' className={classes.txtTitleBox} />
					<div className={classes.sliderWrapper}>
						<ImageList variant='masonry' cols={1} gap={8}>
							{/* <Slider {...settings} style={{ overflow: 'hidden' }}> */}
							{/* <Slider {...settings} style={{ overflow: "hidden" }}>
									{products?.data?.map((product,post,index) => {
										return (
											<div>
												<ImageListItem key={product.image} style={{ cursor: "pointers" }}>
													<CardComponent post={post} index={index} key={product._id} countInStock={product.countInStock} description={product.description} image={product.image} name={product.name} price={product.price} rating={product.rating} type={product.type} discount={product.discount} selled={product.selled} id={product._id} createdAt={product.createdAt} style={{ cursor: "pointers" }} />
												</ImageListItem>
											</div>
										);
									})}
								</Slider> */}
						</ImageList>
					</div>
				</Box>
			</Container >
		</>
	);
};

export default BlogDetailPage;