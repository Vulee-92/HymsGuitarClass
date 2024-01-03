import React,{ useEffect,useRef,useState } from "react";
import * as BlogService from "../../services/BlogService";

import { useQuery } from "@tanstack/react-query";
import { useDispatch,useSelector } from "react-redux";

import styles from "./stylemui";
import { Box,Container,Grid,ImageList,Paper,Typography } from "@mui/material";
import "react-medium-image-zoom/dist/styles.css";


import { useDebounce } from "hooks/useDebounce";

import { Helmet } from "react-helmet-async";
import { Swiper,SwiperSlide } from 'swiper/react';

import { Autoplay,Pagination,Navigation } from 'swiper/modules';

import BlogPostCardMobile from "sections/@dashboard/blog/BlogPostCardMobile";

const BlogDetailPage = ({ idBlog }) => {

	const classes = styles();
	const [limit,setLimit] = useState(6);
	const searchBlog = useSelector((state) => state?.blog?.search);
	const searchDebounce = useDebounce(searchBlog,100);





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

	const { isLoading,data: blogDetails } = useQuery(
		["blogs",idBlog],
		fetchGetDetailsBlog
	);





	const {
		isLoadings,
		data: blogs,
		isPreviousData,
	} = useQuery(["blogs",limit,searchDebounce],fetchBlogAll,{
		retry: 3,
		retryDelay: 100,
		keepPreviousData: true,
	});
	return (
		<>

			<Helmet>
				<title>{blogDetails?.name}</title>
			</Helmet>

			<Box sx={
				{
					textAlign: '-webkit-center',marginTop: '0px',
					display: "flex",justifyContent: "center",
				}
			} >

			</Box>
			<Container width={{ md: "xs",xl: "xs",lg: "xs" }} style={{ overflow: "hidden" }}>




				<Grid container spacing={2} sx={{ display: { xs: "flex" },marginLeft: "0px",width: "100%",justifyContent: "space-around",flexDirection: { xs: "column-reverse",sm: "column-reverse",md: "column-reverse",xl: "row",lg: "row" } }}>
					<Grid item xs={12} sm={12} md={12} lg={8} xl={8} style={{ padding: "10px" }}>
						<Typography className={classes.nameProduct}>
							{blogDetails?.title}
						</Typography>
						<Paper style={{ boxShadow: "none",maxWidth: "100%" }}>
							<Typography
								className={classes.txtTilte}
								dangerouslySetInnerHTML={{
									__html: blogDetails?.description,
								}}
							></Typography>
						</Paper>
					</Grid>
				</Grid>


			</Container >
			<Container maxWidth='lg' style={{ width: "95%" }}>
				<Box>
					<Typography className={classes.txtTitleBox}>Trích từ Blog</Typography>
					<Grid container spacing={2} >

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
							border: `1px solid ${blogs?.total === blogs?.data?.length ? "#f5f5f5" : "#436E67"}`,
							color: `${blogs?.total === blogs?.data?.length ? "#000" : "#436E67"}`,
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
		</>
	);
};

export default BlogDetailPage;
