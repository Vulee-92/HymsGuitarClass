import { Accordion,AccordionSummary,Box,Container,Grid,Paper,Stack,Typography,styled,AccordionDetails } from "@mui/material";
import React,{ Suspense,useEffect,useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";

import styles from "./style";

import AnswerComponent from "components/AnswerComponent/AnswerComponent";
import CarouselComponent from "components/CarouselComponent/CarouselComponent";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { Link,useNavigate,useParams } from "react-router-dom";
import { Assets } from "configs";



const CategoryProductPage = () => {
	const navigate = useNavigate();
	const classes = styles();
	// const { filter: categoryId } = useParams();
	const categories = [
		{ id: 'acoustic_guitar',name: 'Guitar Acoustic',icon: Assets.guitar },
		{ id: 'accessories',name: 'Phụ kiện',icon: Assets.daydeoguitar },
		{ id: '',name: 'Tất cả',icon: Assets.guitar },
		// Thêm các danh mục khác nếu cần
	];


	// const fetchProductAll = async (context) => {
	// 	const res = await ProductService.getAllProduct(categorie,context.queryKey[1].limit);
	// 	return res;
	// };

	// const { isLoading,data: products,isPreviousData } = useQuery(
	// 	["products",{ limit: 10 }], // Thay đổi giá trị limit tùy theo nhu cầu
	// 	fetchProductAll,
	// 	{
	// 		retry: 3,
	// 		retryDelay: 100,
	// 		keepPreviousData: true,
	// 	}
	// );
	const handleDetailsProduct = (categoryId) => {
		// Chuyển đến trang chi tiết sản phẩm với giá trị danh mục
		navigate(`/product/${categoryId}`);
	};



	return (
		<>
			<Helmet>
				<title> Hymns - Sản phẩm </title>
			</Helmet>
			<CarouselComponent />

			<Container maxWidth="lg" style={{ marginTop: "100px" }} >
				<Typography className={classes.txtTitleBox}>Danh mục</Typography>
				<Grid container spacing={2} item sm={12} md={12} sx={{ marginTop: { xs: "0px",xl: "50px",lg: "50px",md: "0px",sm: "0px" } }}>
					{categories.map((category) => (
						<Grid item xs={12} xl={4} >

							<Box className={classes.conCard} key={category.id}>
								<Box style={{ cursor: "pointer",}} onClick={() => handleDetailsProduct(category.id)}>
									<img src={category.icon} style={{ height: "200px",margin: "0 auto",display: "flex" }} />
									<Typography className={classes.nameProduct} >{category.name}</Typography>
								</Box>
							</Box>

						</Grid>
					))}


				</Grid>
			</Container>
			<Container maxWidth="lg">
				<AnswerComponent />

			</Container>
		</>

	);
};

export default CategoryProductPage;
