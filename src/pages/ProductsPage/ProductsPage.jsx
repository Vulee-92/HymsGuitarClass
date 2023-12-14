import { Accordion,AccordionSummary,Box,Container,Grid,Paper,Stack,Typography,styled,AccordionDetails } from "@mui/material";
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
import { useLocation } from "react-router-dom";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimationComponent from "components/AnimationComponent/AnimationComponent";
import AnswerComponent from "components/AnswerComponent/AnswerComponent";
import CarouselComponent from "components/CarouselComponent/CarouselComponent";
const NavbarComponent = React.lazy(() => import('../../components/NavbarComponent/NavbarComponent'));
const PRODUCT_COLOR = [
	"#00AB55",
	"#000000",
	"#FFFFFF",
	"#FFC0CB",
	"#FF4842",
	"#1890FF",
	"#94D82D",
	"#FFC107",
];
const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	boxShadow: "none",
	color: theme.palette.text.secondary,
}));
// const ProductList = React.lazy(() => import('../../sections/@dashboard/products'));

const ProductsPage = () => {
	const [openFilter,setOpenFilter] = useState(false);
	const [typeProducts,setTypeProducts] = useState([])
	const handleOpenFilter = () => {
		setOpenFilter(true);
		// setState(null);
	};
	const classes = styles();
	const handleCloseFilter = () => {
		setOpenFilter(false);
	};
	const searchProduct = useSelector((state) => state?.product?.search);
	const searchDebounce = useDebounce(searchProduct,500);
	// const fetchProductAll = async (page,limit) => {
	// 	setLoading(true);
	// 	let res;
	// 	if (state) {
	// 		res = await ProductService.getProductType(state,page,limit);
	// 	} else {
	// 		res = await ProductService.getAllProduct();
	// 	}
	// 	if (res?.status === "OK") {
	// 		setLoading(false);
	// 		setProducts(res?.data);
	// 		setPanigate({ ...panigate,total: res?.totalPage });
	// 	} else {
	// 		setLoading(false);
	// 	}
	// };
	const fetchProductAll = async (context) => {
		// const limit = context?.queryKey && context?.queryKey[1];
		// const search = context?.queryKey && context?.queryKey[2];
		const res = await ProductService.getAllProduct();

		return res;
	};
	const { state } = useLocation();

	const [productss,setProducts] = useState([]);
	const [loading,setLoading] = useState(false);
	const [panigate,setPanigate] = useState({
		page: 0,
		limit: 10,
		total: 1,
	});
	const fetchProductType = async (type,page,limit) => {
		setLoading(true);
		const res = await ProductService.getProductType(type,page,limit);
		if (res?.status === "OK") {
			setLoading(false);
			setProducts(res?.data);
			setPanigate({ ...panigate,total: res?.totalPage });
		} else {
			setLoading(false);
		}
	};
	const { isLoading,data: products,isPreviousData } = useQuery(
		["products"],
		fetchProductAll,
		{
			retry: 3,
			retryDelay: 100,
			keepPreviousData: true,
		}
	);

	useEffect(() => {
		if (state) {
			fetchProductType(state,panigate.page,panigate.limit);
		}
	},[state,panigate.page,panigate.limit]);
	const productList = products?.data?.map((product,index) => ({
		id: product._id,
		cover: product?.image,
		name: product?.name[index],
		// price: convertPrice(number({ min: 4,max: 99,precision: 0.01 })),
		colors:
			(index === 0 && PRODUCT_COLOR.slice(0,2)) ||
			(index === 1 && PRODUCT_COLOR.slice(1,3)) ||
			(index === 2 && PRODUCT_COLOR.slice(2,4)) ||
			(index === 3 && PRODUCT_COLOR.slice(3,6)) ||
			(index === productss.length - 1 && PRODUCT_COLOR.slice(4,6)) ||
			(index === productss.length - 2 && PRODUCT_COLOR.slice(5,6)) ||
			PRODUCT_COLOR,
		// status: sample(["new", "new", "", ""]),
		...product,
	})).filter(product => state ? product.type === state : true);
	console.log("products",products)
	return (
		<>
			<Helmet>
				<title> Hymns - Sản phẩm </title>
			</Helmet>
			<CarouselComponent />

			<Container maxWidth="lg" style={{ marginTop: "100px" }} >
				<Typography className={classes.txtTitleBox}>Sản phẩm</Typography>
				<Grid container spacing={2} item sm={12} md={12} sx={{ marginTop: { xs: "0px",xl: "50px",lg: "50px",md: "0px",sm: "0px" } }}>
					{/* <Grid item xs={12} sm={12} md={3} xl={3} spacing={2} >
						<NavbarComponent />
					</Grid> */}
					<Grid item xs={12} sm={12} md={12} xl={12}>
						{/* <ProductList products={state ? productList?.filter(product => product?.type === state) : productList} /> */}
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
