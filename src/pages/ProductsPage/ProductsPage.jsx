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
const NavbarComponent = React.lazy(() => import('components/NavbarComponent/NavbarComponent'));
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
	// const fetchProductAll = async () => {
	//   const res = await ProductService.getAllProduct();
	//   return res;
	// };
	const fetchAllTypeProduct = async () => {
		const res = await ProductService.getProductType()
		if (res?.status === 'OK') {
			setTypeProducts(res?.data)
		}
	}
	const fetchProductAll = async (page,limit) => {
		setLoading(true);
		let res;
		if (state) {
			res = await ProductService.getProductType(state,page,limit);
		} else {
			res = await ProductService.getAllProduct();
		}
		if (res?.status === "OK") {
			setLoading(false);
			setProducts(res?.data);
			setPanigate({ ...panigate,total: res?.totalPage });
		} else {
			setLoading(false);
		}
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
	console.log("productsproductsproducts",products)

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
	console.log("productList",products)
	return (
		<>
			<Helmet>
				<title> Hymns - Sản phẩm </title>
			</Helmet>
			{/* <Loading isLoading={isLoading} > */}

			<Helmet>
				<title> Product </title>
			</Helmet>
			< Box className={classes.container}>

				<Typography className={classes.conTextCreate}>
					<Typical
						steps={['Guitar',2000,'Ukulele',2000,'Tuner',2000,'Pick',2000,'Capo',2000]}
						loop={Infinity}
						wrapper="p"
						className={classes.conTextCreate}
					/>
				</Typography>

			</Box>
			{/* <Box>
              {typeProducts.map((item) => {
                return (
                  <TypeProduct name={item} key={item} />
                )
              })}
            </Box> */}
			<Container maxWidth="lg">
				<Grid container spacing={2} item sm={12} md={12} sx={{ marginTop: { xs: "0px",xl: "50px",lg: "50px",md: "0px",sm: "0px" } }}>
					<Grid item xs={12} sm={3} md={3} spacing={2} >
						<Item >
							<NavbarComponent />
						</Item>
					</Grid>
					<Grid item xs={12} sm={9} md={9}>
						<Item>

							<ProductList products={state ? productList?.filter(product => product?.type === state) : productList} />
							{/* 
                    <AnimationComponent type="text" text="Product" className={classes.txtHeaderTitle} />
                    <Grid container spacing={2}>
                      {searchDebounce === ""
                        ? productList?.map((products) => (
                          <Grid sx={{ mt: "20px" }} item xs={12} sm={6} md={6} key={products.id} style={{ maxWidth: "100%" }}>
                            <ProductList products={[products]} />
                          </Grid>
                        ))
                        : productList
                          ?.filter((pro) =>
                            pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())
                          )
                        .map((products) => (
                          <Grid sx={{ m: "20px" }} item xs={12} sm={6} md={6} key={products.id} style={{ maxWidth: "100%" }}>
                            <ProductList products={[products]} />
                          </Grid>
                        ))
                      }
                    </Grid>
                    <Stack
                      direction="row"
                      flexWrap="wrap-reverse"
                      alignItems="center"
                      justifyContent="flex-end"
                      sx={{ mb: 5 }}
                    >
                      <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                        <ProductFilterSidebar
                          openFilter={openFilter}
                          onOpenFilter={handleOpenFilter}
                          onCloseFilter={handleCloseFilter}
                        />
                        <ProductSort />
                      </Stack>
                    </Stack>
                    <ProductCartWidget /> */}

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

export default ProductsPage;
