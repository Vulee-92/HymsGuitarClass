import { Accordion,AccordionSummary,Box,Container,Grid,Paper,Stack,Typography,styled,AccordionDetails,Checkbox,IconButton,Drawer,useMediaQuery,Breadcrumbs,Chip,emphasize } from "@mui/material";
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
import { faChevronDown,faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimationComponent from "components/AnimationComponent/AnimationComponent";
import AnswerComponent from "components/AnswerComponent/AnswerComponent";
import CarouselComponent from "components/CarouselComponent/CarouselComponent";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { Assets } from "configs";
import { FilterList } from "@mui/icons-material";
import TuneIcon from '@mui/icons-material/Tune';
import Slider from "react-slick";


const StyledBreadcrumb = styled(Chip)(({ theme }) => {
	const backgroundColor =
		theme.palette.mode === 'light'
			? theme.palette.grey[100]
			: theme.palette.grey[800];
	return {
		backgroundColor,
		height: theme.spacing(3),
		color: theme.palette.text.primary,
		fontWeight: theme.typography.fontWeightRegular,
		'&:hover, &:focus': {
			backgroundColor: emphasize(backgroundColor,0.06),
		},
		'&:active': {
			boxShadow: theme.shadows[1],
			backgroundColor: emphasize(backgroundColor,0.12),
		},
	};
}); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591


const ProductsPage = () => {
	const [products,setProducts] = useState(null);
	const [isLoading,setIsLoading] = useState(true);
	const [brands,setBrands] = useState([]);
	const [categories,setCategories] = useState([]);
	const [brandsAndCategories,setBrandsAndCategories] = useState({ brands: [],categories: [] });
	console.log("brandsAndCategories",brandsAndCategories)
	const params = useParams();
	const classes = styles();
	const [open,setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	const [selectedBrands,setSelectedBrands] = useState([]);
	const [selectedCategories,setSelectedCategories] = useState([]);
	const [collection,setCollection] = useState();
	const navigate = useNavigate(); const isDesktop = useMediaQuery('(min-width: 600px)'); // Kiểm tra nếu đây là desktop
	const [expanded,setExpanded] = React.useState(isDesktop);
	// const [expanded,setExpanded] = useState(false); // State để kiểm soát việc mở rộng của Accordion

	const handleExpandIconClick = () => {
		setExpanded(!expanded); // Khi bấm vào expandIcon, đảo ngược giá trị của expanded
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);

				const { id,type,vendor } = params;
				const res = await ProductService.getAllProduct(id,selectedCategories,selectedBrands);

				setProducts(res.data);
				setBrands(res.brands);
				setCategories(res.categories);
				setBrandsAndCategories({ brands: res.brands,categories: res.categories });
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
	const removeAllSelectedItems = () => {
		setSelectedBrands([]);
		setSelectedCategories([]);

		// Xóa các tham số vendor và type khỏi URLParams
		const urlParams = new URLSearchParams();
		urlParams.delete("vendor");
		urlParams.delete("type");

		// Thay đổi URL với các tham số mới
		navigate(window.location.pathname + "?" + urlParams.toString());
	};


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
		console.log(urlParams)
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

	const handleSliderBoxClick = (slug) => {
		// Kiểm tra xem slug có trong danh sách đã chọn hay không
		const isSelected = selectedCategories.includes(slug);
		let updatedSelectedCategories;

		// Nếu đã chọn, loại bỏ slug khỏi danh sách
		if (isSelected) {
			updatedSelectedCategories = selectedCategories.filter((category) => category !== slug);
		} else {
			// Nếu chưa chọn, thêm slug vào danh sách
			updatedSelectedCategories = [...selectedCategories,slug];
		}

		// Cập nhật biến state
		setSelectedCategories(updatedSelectedCategories);
	};

	const filter = () => {
		return (
			<>
				<Accordion expanded={expanded} // expanded là một object, không phải là một array
					style={{ margin: "0px",boxShadow: "none" }}
				>
					<AccordionSummary
						style={{ marginTop: "0px" }}
						expandIcon={<FontAwesomeIcon icon={faChevronDown} fontSize={16} color="#000" />}
						aria-controls="panel1-content"
						id="panel1-header"
						className={classes.BoxTilte}
						onClick={handleExpandIconClick}

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
				<Accordion expanded={expanded}// expanded là một object, không phải là một array
					style={{ margin: "0px",boxShadow: "none" }}
				>
					<AccordionSummary
						style={{ marginTop: "0px" }}
						expandIcon={<FontAwesomeIcon icon={faChevronDown} fontSize={18} color="#000" />}
						aria-controls="panel1a-content"
						id="panel1a-header"
						className={classes.BoxTilte}
						onClick={handleExpandIconClick}

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


			</>
		)
	}
	const drawerHeight = () => {
		// Thay thế bằng logic tính toán chiều cao dựa trên nội dung thực tế của bạn
		return "90%"; // Ví dụ: chiều cao là 200px
	};
	const maxSlidesToShow = 3; // Số lượng slide tối đa để hiển thị

	// Tạo đối tượng settings cho slider
	const settings = {
		speed: 500,
		marginRight: 30,
		slidesToShow: Math.min(categories.length,maxSlidesToShow), // Số lượng slide để hiển thị không vượt quá maxSlidesToShow
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: Math.min(categories.length,maxSlidesToShow), // Số lượng slide để hiển thị không vượt quá maxSlidesToShow
					slidesToScroll: 3,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: Math.min(categories.length,maxSlidesToShow), // Số lượng slide để hiển thị không vượt quá maxSlidesToShow
					slidesToScroll: 2,
					initialSlide: 2
				}
			},
			{
				breakpoint: 390,
				settings: {
					slidesToShow: Math.min(categories.length,maxSlidesToShow), // Số lượng slide để hiển thị không vượt quá maxSlidesToShow
					slidesToScroll: 1
				}
			}
		]
	};


	// Sử dụng hàm setupSlider với một mảng categories nhất định

	return (
		<>
			<Helmet>
				<title> Hymns - Sản phẩm </title>
			</Helmet>
			<Container maxWidth="lg" style={{ marginTop: "100px" }}>

				<Box className={classes.carouselContainer} sx={{ display: { xl: "block",xs: "block" },height: { xs: "auto",xl: "200px" } }}>
					<div role="presentation" style={{ marginBottom: "10px" }}>
						<Breadcrumbs aria-label="breadcrumb">
							<StyledBreadcrumb
								component="a"
								href="#"
								label="Trang chủ"
							/>
							<StyledBreadcrumb
								label={collection?.name}
							/>
						</Breadcrumbs>
					</div>
					<Grid container spacing={2} >
						<Grid item xl={6} xs={12}>
							<img src={Assets.bgAccessories} className={classes.carouselImage} />
						</Grid>
						<Grid item xl={6} xs={12} sx={{ background: { xl: "#000",xs: "#fff" },display: "flex",justifyContent: "center",alignItems: "center" }}>
							<Box >
								<Typography className={classes.txtDesTitle} sx={{ color: { xs: "#000",xl: "#fff !important" },display: { xl: "flex",xs: "none" },textAlign: "left" }}>{collection?.name}</Typography>
								<Typography className={classes.txtDesTitle} sx={{ color: { xs: "#000 !important",xl: "#fff !important" },textAlign: "left",fontSize: "1.115rem !important",marginTop: { xl: "16px",xs: "2px" } }}>{collection?.description}</Typography>
							</Box>
						</Grid>

					</Grid>
				</Box>
				<br />
				{/* <Typography className={classes.txtTitleBox}>{collection?.name}</Typography> */}
				<Box

				>
					{/* {(selectedCategories.length || selectedBrands.length) && ( */}
					<Box>

						<Typography className={classes.txtFilterChoose}>
							{selectedCategories.length + selectedBrands.length} bộ lọc đang sử dụng
						</Typography>
						<Typography className={classes.txtFilterRemove} onClick={removeAllSelectedItems}>Xoá bộ lọc</Typography>

						{/* )} */}

					</Box>

				</Box>

				<Grid container spacing={2}
					direction="row"
					justifyContent="flex-start"
					sx={{ display: { xl: "none",xs: "flex" } }}
					alignItems="center"
				>
					<Grid item xs={3}
					>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="end"
							onClick={handleDrawerOpen}
						>
							<Box className={classes.boxFilter} >

								<TuneIcon fontSize="13px" /> <Typography className={classes.txtFilter} >Filter</Typography>
							</Box>

						</IconButton>
					</Grid>
					<Grid item xs={9}>
						<Slider {...settings} style={{
							marginRight: "30px !important"

						}}>
							{brandsAndCategories?.categories?.map((item) => (
								<Box className={`${classes.boxFilterItem} ${selectedCategories.includes(item.slug) ? classes.selectedBox : ''}`}
									onClick={() => handleCheckboxClick(item.slug,"cate")}
									data-type={"cate"}
									style={{ display: 'inline-block',marginRight: '10px',marginBottom: '10px' }} // Thiết lập display inline-block và margin

								>

									<Typography className={classes.txtFilter} style={{ fontSize: "13px" }} >	{item?.category}</Typography>
									{selectedCategories.includes(item.slug) && ( // Kiểm tra xem mục được chọn hay không
										<FontAwesomeIcon icon={faCircleXmark} />
									)}
								</Box>

							))}
							{brandsAndCategories?.brands?.map((item) => (
								<Box className={`${classes.boxFilterItem} ${selectedBrands.includes(item.slug) ? classes.selectedBox : ''}`}
									onClick={() => handleCheckboxClick(item.slug,"brand")}
									data-type={"brand"}
									style={{ display: 'inline-block',marginRight: '10px',marginBottom: '10px' }} // Thiết lập display inline-block và margin

								>

									<Typography className={classes.txtFilter} style={{ fontSize: "13px" }} >	{item?.brand}</Typography>
									{selectedBrands.includes(item.slug) && ( // Kiểm tra xem mục được chọn hay không
										<FontAwesomeIcon icon={faCircleXmark} />
									)}
								</Box>

							))}
						</Slider>
					</Grid>

				</Grid>






				<Drawer
					anchor="bottom"
					open={open}
					onClose={handleDrawerClose}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					PaperProps={{
						style: {
							height: drawerHeight(),
						},
					}}
				>
					{filter()}


				</Drawer>
				<Grid container spacing={2}>
					<Grid item xs={12} md={3} sx={{ display: { xs: "none",xl: "block" } }}>

						{filter()}
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
