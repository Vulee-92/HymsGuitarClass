import { Accordion,AccordionSummary,Box,Container,Grid,Paper,Stack,Typography,styled,AccordionDetails,Checkbox } from "@mui/material";
import React,{ Suspense,useEffect,useState } from "react";
import { Helmet } from "react-helmet-async";
import { ProductSort,ProductList,ProductCartWidget,ProductFilterSidebar } from '../../sections/@dashboard/products';
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { convertPrice } from "../../utils";

import styles from "./style";
import Loading from "../../components/LoadingComponent/Loading";
import Typical from "react-typical";
// import NavbarComponent from "components/NavbarComponent/NavbarComponent";
import { useDebounce } from "hooks/useDebounce";
import { useSelector } from "react-redux";
import { useLocation,useNavigate,useParams } from "react-router-dom";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimationComponent from "components/AnimationComponent/AnimationComponent";
import AnswerComponent from "components/AnswerComponent/AnswerComponent";
import CarouselComponent from "components/CarouselComponent/CarouselComponent";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import ShopProductSort from "../../sections/@dashboard/products/ProductSort";
import { Assets } from "configs";
const NavbarComponent = React.lazy(() => import('../../components/NavbarComponent/NavbarComponent'));

const ProductsPage = () => {
	const [products,setProducts] = useState(null);
	const [isLoading,setIsLoading] = useState(true);
	const [brands,setBrands] = useState([]);
	const [categories,setCategories] = useState([]);
	const params = useParams();
	const classes = styles();

	const [selectedBrands,setSelectedBrands] = useState([]);
	const [selectedCategories,setSelectedCategories] = useState([]);
	const [collection,setCollection] = useState();
	console.log("collection",collection)
	const navigate = useNavigate();
	console.log("selectedBrands",selectedBrands)
	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);

				const { id,type,vendor } = params;
				console.log("id",type,vendor);
				const res = await ProductService.getAllProduct(id,selectedCategories,selectedBrands);

				setProducts(res.data);
				setBrands(res.brands);
				setCategories(res.categories);
				setCollection(res.collections[0]);
			} catch (error) {
				console.error('Error fetching products:',error);
				// Handle error...
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	},[params]);

	// if (isLoading) {
	// 	return <LoadingSpinner />;
	// }
	const handleCheckboxClick = (value,type) => {
		let updatedSelectedBrands = [...selectedBrands];
		let updatedSelectedCategories = [...selectedCategories];

		if (type === "brand") {
			if (selectedBrands.includes(value)) {
				updatedSelectedBrands = selectedBrands.filter((v) => v !== value);
			} else {
				updatedSelectedBrands.push(value);
			}
		} else if (type === "cate") {
			if (selectedCategories.includes(value)) {
				updatedSelectedCategories = selectedCategories.filter((v) => v !== value);
			} else {
				updatedSelectedCategories.push(value);
			}
		}

		const urlParams = new URLSearchParams();

		if (updatedSelectedBrands.length > 0) {
			urlParams.set("vendor",updatedSelectedBrands.join("%2C"));
		}

		if (updatedSelectedCategories.length > 0) {
			urlParams.set("type",updatedSelectedCategories.join("%2C"));
		}

		setSelectedBrands(updatedSelectedBrands);
		setSelectedCategories(updatedSelectedCategories);

		navigate(window.location.pathname + "?" + urlParams.toString());
	};


	// useEffect(() => {
	// 	// ... other code
	// 	const fetchData = async () => {
	// 		// ...
	// 		const res = await ProductService.getAllProduct(
	// 			id,
	// 			selectedCategories.join(","), // Use joined categories for type
	// 			selectedBrands.join(" ") // Use space-separated brands for vendor
	// 		);
	// 		// ...
	// 	};
	// 	fetchData();
	// },[params,selectedBrands,selectedCategories]);
	// const handleCheckboxClick = (value,type) => {
	// 	if (type === "brand") {
	// 		navigate(`/product/accessories?vendor=${value.normalize('NFD').replace(/[\u0300-\u036f]/g,'')?.replace(/ /g,'_')}`,{ state: value })
	// 	} else if (type === "cate") {
	// 		navigate(`/product/accessories?type=${value.normalize('NFD').replace(/[\u0300-\u036f]/g,'')?.replace(/ /g,'_')}`,{ state: value })

	// 	}
	// };

	return (
		<>
			<Helmet>
				<title> Hymns - Sản phẩm </title>
			</Helmet>

			<Container maxWidth="lg" style={{ marginTop: "100px" }}>
				<Box className={classes.carouselContainer} sx={{ display: { xl: "block",xs: "none" } }}>
					<Grid container spacing={2} >
						<Grid item xl={6} xs={12}>
							<img src={Assets.bgAccessories} className={classes.carouselImage} />
						</Grid>
						<Grid item xl={6} xs={12} style={{ background: "#000",display: "flex",justifyContent: "center",alignItems: "center" }}>
							<Box textAlign="left">
								<Typography className={classes.txtDesTitle} style={{ color: "#fff",textAlign: "left" }}>{collection?.name}</Typography>
								<Typography className={classes.txtDesTitle} style={{ color: "#fff",fontSize: "1rem",textAlign: "left",width: "90%" }}>{collection?.description}</Typography>
							</Box>
						</Grid>

					</Grid>
				</Box>
				<Typography className={classes.txtTitleBox}>{collection?.name}</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} md={3}>
						<Accordion expanded={true} style={{ margin: "0px",boxShadow: "none" }}>
							<AccordionSummary
								style={{ marginTop: "0px" }}
								expandIcon={<FontAwesomeIcon icon={faChevronDown} fontSize={16} color="#000" />}
								aria-controls="panel1a-content"
								id="panel1a-header"
								className={classes.BoxTilte}

							>
								<Typography className={classes.txtTilte} >Thương hiệu</Typography>
							</AccordionSummary>
							<AccordionDetails sx={{ boxShadow: "none",padding: "0px !important" }}>
								<Grid container spacing={1}>
									{brands.map((item) => (
										<Grid item key={item.slug} xs={12} xl={12} style={{ paddingRight: "8px !important" }}>
											<Grid container spacing={2} alignItems="center">
												<Grid item xs={10} sm={10}   >
													<Box className={classes.txtCheckbox}>

														<Checkbox
															sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
															onClick={() => handleCheckboxClick(item.slug,"brand")}
														/>
														{item.brand}
													</Box>
												</Grid>
												<Grid item xs={2} sm={2} sx={{ textAlign: "right" }}>
													<Box className={classes.txtCheckbox}>

														({item.count})
													</Box>


												</Grid>
											</Grid>
										</Grid>
									))}
								</Grid>
							</AccordionDetails>
						</Accordion>

						{/* Accordion Loại sản phẩm */}
						<Accordion expanded={true} style={{ margin: "0px",boxShadow: "none",marginTop: "10px" }} >
							<AccordionSummary
								style={{ marginTop: "0px" }}
								expandIcon={<FontAwesomeIcon icon={faChevronDown} fontSize={18} color="#000" />}
								aria-controls="panel1a-content"
								id="panel1a-header"
								className={classes.BoxTilte}
							>
								<Typography className={classes.txtTilte}  >Loại sản phẩm</Typography>
							</AccordionSummary>
							<AccordionDetails sx={{ boxShadow: "none",padding: "0px !important" }}>
								<Grid container spacing={1}>
									{categories.map((item) => (
										<Grid item key={item.slug} xs={12} xl={12}>
											<Grid container spacing={2} alignItems="center">
												<Grid item xs={10} sm={10} >
													<Box className={classes.txtCheckbox}>
														<Checkbox
															onClick={() => handleCheckboxClick(item.slug,"cate")}

															sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
															data-type={"cate"}
														/>
														{item.category}
													</Box>

												</Grid>
												<Grid item xs={2} sm={2} sx={{ textAlign: "right" }}>
													<Box className={classes.txtCheckbox}>

														({item.count})
													</Box>

												</Grid>
											</Grid>
										</Grid>
									))}
								</Grid>
							</AccordionDetails>
						</Accordion>
					</Grid>
					<Grid item xs={12} md={9}>
						<ProductList products={products} />
					</Grid>
				</Grid>
			</Container>

			<Container maxWidth="lg">
				<AnswerComponent />
			</Container>
		</>
	);
};

export default ProductsPage;
