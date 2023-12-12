import { Accordion,AccordionSummary,Box,Container,Grid,Paper,Stack,Typography,styled,AccordionDetails,Button } from "@mui/material";
import React,{ Suspense,useEffect,useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import * as BlogService from "../../services/BlogService";
import { convertPrice } from "../../utils";

import styles from "./style";
import Loading from "../../components/LoadingComponent/Loading";
import Typical from "react-typical";
// import NavbarComponent from "components/NavbarComponent/NavbarComponent";
import { useDebounce } from "hooks/useDebounce";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BLogList from "sections/@dashboard/blog/BlogList";
import { BlogPostCard } from "sections/@dashboard/blog";
import AnimationComponent from "components/AnimationComponent/AnimationComponent";
import ShopBLogCard from "../../sections/@dashboard/blog/BlogPostCard";
import { WrapperButtonMore } from "pages/HomePage/style";
import BlogPostCardMobile from "sections/@dashboard/blog/BlogPostCardMobile";
const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	boxShadow: "none",
	color: theme.palette.text.secondary,
}));
// const ProductList = React.lazy(() => import('../../sections/@dashboard/products'));

const BlogUserPage = () => {

	const classes = styles();
	const [limit,setLimit] = useState(6);
	const searchBlog = useSelector((state) => state?.blog?.search);
	const searchDebounce = useDebounce(searchBlog,500);
	// const fetchProductAll = async () => {
	//   const res = await ProductService.getAllProduct();
	//   return res;
	// };
	// const fetchAllTypeProduct = async () => {
	// 	const res = await BlogService.getProductType()
	// 	if (res?.status === 'OK') {
	// 		setTypeProducts(res?.data)
	// 	}
	// }
	// const fetchBlogAll = async () => {
	// 	setLoading(true);
	// 	let res;
	// 	res = await BlogService.getAllBlog();
	// 	if (res?.status === "OK") {
	// 		setLoading(false);
	// 		setBlog(res?.data);
	// 		// setPanigate({ ...panigate,total: res?.totalPage });
	// 	} else {
	// 		setLoading(false);
	// 	}
	// };

	const fetchBlogAll = async (context) => {
		// const limit = context?.queryKey && context?.queryKey[1];
		// const search = context?.queryKey && context?.queryKey[2];search,limit
		const res = await BlogService.getAllBlog();

		return res;
	};
	const { state } = useLocation();

	const [blogss,setBlog] = useState([]);
	const [loading,setLoading] = useState(false);
	const [panigate,setPanigate] = useState({
		page: 0,
		limit: 10,
		total: 1,
	});
	// const fetchProductType = async (type,page,limit) => {
	// 	setLoading(true);
	// 	const res = await BlogService.getProductType(type,page,limit);
	// 	if (res?.status === "OK") {
	// 		setLoading(false);
	// 		setProducts(res?.data);
	// 		setPanigate({ ...panigate,total: res?.totalPage });
	// 	} else {
	// 		setLoading(false);
	// 	}
	// };
	const {
		isLoadings,
		data: blogs,
		isPreviousData,
	} = useQuery(["blogs",limit,searchDebounce],fetchBlogAll,{
		retry: 3,
		retryDelay: 100,
		keepPreviousData: true,
	});
	// if (isLoading) {
	// 	return <div>Loading...</div>;
	// }
	// useEffect(() => {
	// 	if (state) {
	// 		fetchProductType(state,panigate.page,panigate.limit);
	// 	}
	// },[state,panigate.page,panigate.limit]);
	const blogList = blogs?.data?.map((blog,index) => ({
		id: blog._id,
		image: blog?.image,
		description: blog?.description,
		name: blog?.title[index],
		// price: convertPrice(number({ min: 4,max: 99,precision: 0.01 })),

		// status: sample(["new", "new", "", ""]),
		...blog,
	}));
	return (
		<>

			{/* <Loading isLoading={isLoading} > */}

			<Helmet>
				<title> Blog </title>
			</Helmet>
			< Box className={classes.container}>
				<Typography className={classes.conTextCreate}>  <AnimationComponent type="text" text="Blog" className={classes.conTextCreate} /></Typography>

			</Box>
			<Container maxWidth="xl">
				<Grid container spacing={2} item sm={12} md={12} sx={{ marginTop: { xs: "0px",xl: "50px",lg: "50px",md: "0px",sm: "0px" } }}>
					<Grid item xs={12} sm={12} md={12} xl={12}>
						<Item>
							<Grid container spacing={3}>
								{/* {blogList.map((blog,index) => ( */}
								{/* <BlogPostCard blog={blogList} /> */}
								{/* ))} */}
							</Grid>
							<Grid container sx={{ display: { xl: "block",xs: "none" } }}>
								< Grid container item spacing={2} >
									{blogs?.data?.map((post,index) => (
										<ShopBLogCard id={post?._id} key={post?._id} blog={post} index={index} />
									))
									}

								</Grid>
							</Grid>
							<Grid container sx={{ display: { xl: "none",xs: "block" } }}>
								< Grid container item spacing={2} >
									{blogs?.data?.map((post,index) => (
										<BlogPostCardMobile id={post?._id} key={post?._id} blog={post} index={index} responsive={6} />

									))
									}

								</Grid>
							</Grid>

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
							</Button>
							{/* <BLogList blogs={blogList} /> */}
						</Item>
					</Grid>
				</Grid>
			</Container>
			<Container maxWidth="lg">
				<Grid container spacing={2} sx={{ display: { xs: "flex" },marginLeft: "0px",width: "100%",justifyContent: "space-around",flexDirection: { xs: "column-reverse",sm: "column-reverse",md: "column-reverse",xl: "row",lg: "row" } }}>
					<Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding: { xl: " 10px 30px",xs: "0px 10px" } }}>


						<div>
							<Typography className={classes.txtTitleBox}>Các câu hỏi thường gặp</Typography>

							<Accordion className={classes.boxAnswer} >
								<AccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />} aria-controls='panel1a-content' id='panel1a-header'>
									<Typography className={classes.txtTilte}>Tôi có được kiểm tra sản phẩm trước khi mua?</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography className={classes.txtAnswer}>Nếu bạn muốn kiểm tra sản phẩm trước khi mua online, vui lòng gọi cho Hymns trước khi đến cửa hàng, nhân viên của chúng tôi luôn nhiệt tình hỗ trợ!</Typography>
								</AccordionDetails>
							</Accordion>
							<Accordion className={classes.boxAnswer}>
								<AccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />} aria-controls='panel2a-content' id='panel2a-header'>
									<Typography className={classes.txtTilte}>Đơn hàng của tôi có phụ kiện đi kèm không?</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography className={classes.txtAnswer}>Sản phẩm không có phụ kiện đi kèm, trừ trường hợp những phụ kiện đó được nêu rõ trong phần mô tả sản phẩm. Bạn có thể tìm trên cửa hàng trực tuyến hoặc hỏi Đội Ngũ Kinh Doanh & Chăm Sóc Khách Hàng nhiệt tình của chúng tôi để được hỗ trợ ngay hôm nay!</Typography>
								</AccordionDetails>
							</Accordion>
							<Accordion className={classes.boxAnswer}>
								<AccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />} aria-controls='panel3a-content' id='panel3a-header'>
									<Typography className={classes.txtTilte}>Đơn hàng của tôi có được bảo hành không?</Typography>
								</AccordionSummary>
							</Accordion>
						</div>
					</Grid>
				</Grid>
			</Container >
			{/* </Loading> */}
		</>

	);
};

export default BlogUserPage;
