import React,{ useEffect,useRef,useState } from "react";
import { PlusOutlined,MinusOutlined } from "@ant-design/icons";
import * as ProductService from "../../services/ProductService";
import { addOrderProduct,resetOrder } from "../../redux/slides/orderSlide";
import * as message from "../Message/Message";
import { WrapperPriceProduct,WrapperPriceTextProduct,WrapperInputNumber } from "./style";
import { useQuery } from "@tanstack/react-query";
import { useDispatch,useSelector } from "react-redux";
import { Swiper,SwiperSlide } from 'swiper/react';

// Thêm các styles tùy chọn nếu cần

import { Pagination } from 'swiper/modules';

import { useLocation,useNavigate } from "react-router-dom";
import styles from "./stylemui";
import { Accordion,AccordionDetails,AccordionSummary,useScrollTrigger,Alert,Box,Breadcrumbs,Button,Card,CardContent,CardMedia,Container,Dialog,DialogActions,DialogContent,DialogTitle,Divider,Drawer,Fab,Grid,IconButton,ImageList,ImageListItem,ImageListItemBar,Link,Paper,Rating,Snackbar,Stack,Typography,useMediaQuery } from "@mui/material";
import "react-medium-image-zoom/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox,faChevronDown,faCircleArrowLeft,faPeopleCarryBox,faTags,faTruck,faXmark } from "@fortawesome/free-solid-svg-icons";

import { useDebounce } from "hooks/useDebounce";
import { Helmet } from "react-helmet-async";
import { bottom } from "@popperjs/core";
import * as RecentlyViewed from "../../services/RecentlyViewed";
import * as BlogService from "../../services/BlogService";
import ImageCarouselZoom from "../../components/ImageCarouselZoom/ImageCarouselZoom";
import { LoadingButton } from "@mui/lab";
import BlogPostCardMobile from "../../sections/@dashboard/blog/BlogPostCardMobile";
import YourSwiperComponent from "../../components/YourSwiperComponent/YourSwiperComponent";
import AnswerComponent from "../../components/AnswerComponent/AnswerComponent";
import { convertPrice } from "utils";
import { calculateDiscountedPriceNoConvert } from "utils";
import Loading from "components/LoadingComponent/Loading";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
const { v4: uuidv4 } = require('uuid');


const ProductDetailsComponent = ({ idProduct }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [numProduct,setNumProduct] = useState(1);
	const order = useSelector((state) => state.order);
	const user = useSelector((state) => state.user);
	const classes = styles();
	const [limit,setLimit] = useState(12);
	const [showFab,setShowFab] = useState(false);
	const searchProduct = useSelector((state) => state?.product?.search);
	const searchDebounce = useDebounce(searchProduct,100);
	const [open,setOpen] = React.useState(false);
	const [errorLimitOrder,setErrorLimitOrder] = useState(false);
	const [openDialog,setOpenDialog] = useState(false);
	const [isProcessing,setIsProcessing] = useState(false);
	const [images,setImages] = useState([]);
	const [isCartOpen,setIsCartOpen] = useState(false);
	const [slug,setSlug] = useState("");
	const handleCartClick = () => {
		setIsCartOpen(true);
	};
	const handleCartClose = () => {
		setIsCartOpen(false);
	};
	const onChange = (value) => {
		setNumProduct(Number(value));
	};

	const fetchProductAll = async (context) => {
		const limit = context?.queryKey && context?.queryKey[1];
		const search = context?.queryKey && context?.queryKey[2];
		const res = await ProductService.getAllProduct(search,limit);

		return res;
	};
	const fetchProductAllAccessories = async () => {
		const accessoriesRes = await ProductService.getProductType('Acoustic Guitars',0,10);
		return accessoriesRes;
	};
	const generateUserId = () => {
		return uuidv4();
	};
	// Hàm hỗ trợ loại bỏ dấu \ và "
	const cleanUserId = (userId) => {
		if (userId) {
			return userId.replace(/"/g,'');
		}
	};
	const fetchRecentlyViewed = async (slug) => {
		let userId = user?.id || localStorage.getItem("userId");
		// Kiểm tra xem localStorage đã có userId hay chưa
		if (userId === null || userId === "undefined") {
			// Nếu không có, tạo mới và lưu vào localStorage
			userId = generateUserId();
			localStorage.setItem("userId",userId);
		}
		if (userId !== null && userId !== "undefined") {
			// Thực hiện yêu cầu API
			const res = await RecentlyViewed.postRecentlyViewed(slug,userId);

			// Kiểm tra và xử lý giá trị userId từ response
			const cleanedUserId = cleanUserId(res?.data?.userId);

			if (cleanedUserId) {
				localStorage.setItem("userId",JSON.stringify(cleanedUserId));
			}
			return res.data;
		}


	};

	const fetchGetDetailsProduct = async (context) => {
		const slug = context?.queryKey && context?.queryKey[1];
		setSlug(slug);

		if (slug) {
			const res = await ProductService.getDetailsProduct(slug);
			await fetchRecentlyViewed(slug);
			return res?.data;
		}
	};


	const fetchRecentlyViewedGet = async () => {
		let storageUserID = localStorage.getItem("userId");
		if (storageUserID === "undefined") {
			// const res = await RecentlyViewed.postRecentlyViewed(slug,userId);
			localStorage.removeItem('userId');
			// return res.data;
		}
		let userIdWithQuotes = storageUserID;

		// Sử dụng replace để loại bỏ dấu \ và "
		let userIdWithoutQuotes = userIdWithQuotes.replace(/\\/g,'').replace(/"/g,'');
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
	} = useQuery(["recentlyViewed"],fetchRecentlyViewedGet,{
		retry: 3,
		retryDelay: 100,
		keepPreviousData: true,
	});




	const fetchBlogAll = async (context) => {
		const limit = context?.queryKey && context?.queryKey[1];
		const search = context?.queryKey && context?.queryKey[2];
		const res = await BlogService.getAllBlog(search,limit);

		return res;
	};
	const {
		data: blogs,
	} = useQuery(["blogs",limit,searchDebounce],fetchBlogAll,{
		retry: 3,
		retryDelay: 100,
		keepPreviousData: true,
	});
	useEffect(() => {
		if (order.isSucessOrder) {
			message.success("Đã thêm vào giỏ hàng");
		}
		return () => {
			dispatch(resetOrder());
		};
	},[order.isSucessOrder]);
	const handleChangeCount = (type,limited) => {
		if (type === "increase") {
			if (!limited) {
				setNumProduct(numProduct + 1);
			}
		} else {
			if (!limited) {
				setNumProduct(numProduct - 1);
			}
		}
	};
	const handleAddOrderProduct = () => {
		setIsProcessing(true);

		const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id);

		if (orderRedux?.amount + numProduct <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
			dispatch(
				addOrderProduct({
					orderItem: {
						name: productDetails?.name,
						amount: numProduct,
						type: productDetails?.type,
						fee: productDetails?.fee,
						image: productDetails?.image,
						price: productDetails?.price,
						product: productDetails?._id,
						discount: productDetails?.discount,
						countInstock: productDetails?.countInStock,
					},
				})
			);
		} else {
			setErrorLimitOrder(true);
		}

		// Delay for 1 second before setting isProcessing to false
		setTimeout(() => {
			setIsProcessing(false);
			handleCartClick();
			setOpenDialog(true);
		},1000);


	};




	const handleCloseDialog = () => {
		setOpenDialog(false);
	};
	const { isLoading,data: productDetails } = useQuery(["productDetails",idProduct],fetchGetDetailsProduct,{ enabled: !!idProduct });


	useEffect(() => {
		// Thử chọn phần tử meta
		const ogImageMeta = document.querySelector('meta[property="og:image"]');
		const ogImageMetaUrl = document.querySelector('meta[property="og:image:secure_url"]');
		const ogImageUrl = document.querySelector('meta[property="og:url"]');

		const ogImageMetaTitle = document.querySelector('meta[property="og:title"]');
		if (ogImageUrl) {
			ogImageMeta.setAttribute('content',productDetails?.image);
		}
		// Kiểm tra xem phần tử có tồn tại không trước khi thay đổi thuộc tính
		if (ogImageMeta) {
			ogImageMeta.setAttribute('content',productDetails?.image);
		}

		if (ogImageMetaUrl) {
			ogImageMetaUrl.setAttribute('content',productDetails?.image);
		}

		if (ogImageMetaTitle) {
			ogImageMetaTitle.setAttribute('content',productDetails?.image || "Hymns Center");
		}
	},[productDetails]);


	useEffect(() => {
		const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id);
		if (orderRedux?.amount + numProduct <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
			setErrorLimitOrder(false);
		} else if (productDetails?.countInStock === 0) {
			setErrorLimitOrder(true);
		}
	},[numProduct]);

	const handleClose = () => {
		setOpen(false);
	};

	const {
		isLoadings,
		data: products,
		isPreviousData,
	} = useQuery(["products",limit,searchDebounce],fetchProductAll,{
		retry: 3,
		retryDelay: 100,
		keepPreviousData: true,
	});
	const sortedProducts = products?.data?.sort((a,b) => b.createdAt - a.createdAt);

	// Lấy ra 5 sản phẩm mới nhất
	const latestProducts = sortedProducts?.slice(0,5);
	const acousticProducts = latestProducts?.filter(product => product.type === "Phụ kiện");

	// Then, filter out all products without type "Acoustic Guitars"
	const otherProducts = latestProducts?.filter(product => product.type !== "Phụ kiện");

	// Finally, concatenate the two arrays to get the desired order
	// ?.concat(otherProducts)
	const sortedProductsGuitar = acousticProducts;
	// const filteredProducts = productsNosearch?.data?.filter(product => product.selled > 1);

	const {
		data: productsAccessory,
		isPreviousDatas,
	} = useQuery(["productsAccessory"],fetchProductAllAccessories,{
		retry: 2,
		retryDelay: 100,
		keepPreviousData: true,
	});






	const cartButtonRef = useRef(null);
	const cartButtonRefOut = useRef(null);
	useEffect(() => {
		const handleScroll = () => {
			const cartButtonTop = cartButtonRef.current.getBoundingClientRect().top;
			const cartButtonOut = cartButtonRefOut.current.getBoundingClientRect().top;

			if (cartButtonOut < 0 && cartButtonTop < 0) {
				setIsCartOpen(false);
			}
			if (cartButtonTop < 0 && cartButtonOut > 0) {
				setIsCartOpen(true);
			} else {
				setIsCartOpen(false);
			}
		};
		window.addEventListener("scroll",handleScroll);
		return () => {
			window.removeEventListener("scroll",handleScroll);
		};
	},[]);


	useEffect(() => {
		// Fetch or set your images asynchronously
		const fetchedImages = [
			productDetails?.image
		];

		setImages(fetchedImages);
	},[]);
	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<>

			<Helmet>
				<title>{productDetails?.name}</title>

				<meta property="og:url" content={productDetails.images[0]} />

				<meta property="og:title" content={productDetails?.name} />
				<meta property="og:description" name="description" content={productDetails?.name} />
				<meta property="og:price:amount" content={productDetails?.price} />
				<meta property="og:image" content={productDetails.images[0]} />

				<meta property="og:url" content={`https://www.hymnscenter.com/product-details/${productDetails?.slug}`} />


			</Helmet>



			{products && (
				<div>
					<Drawer
						sx={{
							flexShrink: 0,
							"& .MuiDrawer-paper": {
								boxSizing: "border-box",
								background: "rgb(36, 92, 79,0.1)",
								backdropFilter: "saturate(1) blur(10px) !important",
							},
						}}
						variant='persistent'
						anchor={bottom}
						open={isCartOpen}
						onClose={handleCartClose}
						disableDiscovery
					>
						<Container width={{ md: "xs",xl: "xs",lg: "xs" }} style={{ overflow: "hidden" }}>
							<Box sx={{ display: "flex",flexDirection: "row",justifyContent: { xs: "space-between",md: "end",xl: "end" },zIndex: 999999999999999 }}>
								<Typography className={classes.priceTitle} style={{ alignItems: "center",gap: "12px",padding: "30px",textAlign: "center" }}>
									{convertPrice((calculateDiscountedPriceNoConvert(productDetails)))}

								</Typography>

								<div style={{ alignItems: "center",gap: "12px",padding: "16px",textAlign: "center" }}>
									<div>
										<LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isProcessing}
											className={classes.btnBottomShow}
											sx={{
												width: { xl: "200px",xs: "180px" },
												background: productDetails?.countInStock === 0 ? "#CCCCCC" : "#436E67",color: productDetails?.countInStock === 0 ? "#B22222" : "#fff !important",
											}}
											disabled={productDetails?.countInStock === 0}
											onClick={handleAddOrderProduct}
										>
											<Typography className={classes.nameProductInfo}>
												{productDetails?.countInStock === 0 ? (
													<Typography className={classes.nameProductInfo} style={{ color: "#B22222",fontWeight: "700" }}>
														Hết hàng
													</Typography>
												) : (
													<Typography className={classes.nameProductInfo} style={{ color: "#fff",fontWeight: "700" }}>
														Mua ngay
													</Typography>
												)}
											</Typography>
										</LoadingButton>
										{!errorLimitOrder ? (
											<>
												<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
													<Alert className={classes.nameProductInfo} style={{ border: "1px solid #436E67",fontSize: "13px" }} severity='success' sx={{ width: "100%" }}>
														Đã thêm vào giỏ hàng!
													</Alert>
												</Snackbar>
											</>
										) : (
											<>
												<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
													<Alert className={classes.nameProductInfo} style={{ border: "1px solid red",fontSize: "13px",color: "red" }} severity='error' sx={{ width: "100%" }}>
														Sản phẩm đã hết hàng!
													</Alert>
												</Snackbar>
											</>
										)}
									</div>
								</div>
							</Box>
						</Container>
					</Drawer>
				</div>
			)}
			{products && (

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
							{/* xs, extra-small: 0px
          sm, small: 600px
          md, medium: 900px
          lg, large: 1200px
          xl, extra-large: 1536px */}
							<Grid sx={{ display: { xs: "none",xl: "flex",lg: "flex",md: "none",sm: "none" },flexDirection: { xl: "column-reverse",lg: "column-reverse" } }} item sm={12} md={12} lg={12} xl={12} style={{ height: "fit-content",margin: "16px",padding: "0px" }}>
								<Paper sx={{ boxShadow: "0px 50px 70px -10px rgba(11, 34, 56, 0.05) !important",}}>
									<div
										style={{
											display: "flex",
											float: "right",
											aliggItems: "center",
											gap: "12px",
											alignItems: "center",
											justifyContent: " space-between",
											width: "fit-content",
										}}
									>
										<Box style={{ alignItems: "flex-end !important" }}>
											<Typography className={classes.priceTitle}>									{convertPrice((calculateDiscountedPriceNoConvert(productDetails)))}</Typography>
											<Typography className={classes.txtTilte}> Hỗ trợ vận chuyển cho mọi đơn hàng!</Typography>
										</Box>
										<LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isProcessing}
											className={classes.nameProductInfo}
											style={{
												background: productDetails?.countInStock === 0 ? "#CCCCCC" : "#436E67",color: productDetails?.countInStock === 0 ? "#B22222" : "#fff !important",
												height: "48px",
												width: "200px",
												textTransform: "none",
												border: "none",
												borderRadius: "4px",

												fontSize: "15px",
												fontWeight: "700",
											}}
											onClick={handleAddOrderProduct}
											disabled={productDetails?.countInStock === 0}
										>
											<Typography className={classes.nameProductInfo}>
												{productDetails?.countInStock === 0 ? (
													<Typography className={classes.nameProductInfo} style={{ color: "#B22222",fontWeight: "700" }}>
														Hết hàng
													</Typography>
												) : (
													<Typography className={classes.nameProductInfo} style={{ color: "#fff",fontWeight: "700" }}>
														Mua ngay
													</Typography>
												)}
											</Typography>
										</LoadingButton>
										{!errorLimitOrder ? (
											<>
												<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
													<Alert style={{ border: "1px solid #436E67",fontSize: "13px" }} severity='success' sx={{ width: "100%" }}>
														Đã thêm vào giỏ hàng!
													</Alert>
												</Snackbar>
											</>
										) : (
											<>
												<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
													<Alert style={{ border: "1px solid red",fontSize: "13px",color: "red" }} severity='error' sx={{ width: "100%" }}>
														Sản phẩm đã hết hàng!
													</Alert>
												</Snackbar>
											</>
										)}

										{/* {errorLimitOrder && <div style={{ color: 'red' }}>San pham het hang</div>} */}
									</div>
								</Paper>
							</Grid>
						</Grid>
					</Container>
				</Box>
			)}
			{products && (
				<Container width={{ md: "xs",xl: "xs",lg: "xs" }} style={{ overflow: "hidden" }}>

					{/* <Divider variant="middle" style={{ display: { xs: "none", xl: "flex", lg: "flex", md: "none", sm: "none" } }} /> */}

					{/* <Divider variant='fullWidth' style={{ display: { xs: "none",xl: "flex",lg: "flex",md: "none",sm: "none" } }} /> */}
					<Grid
						container
						spacing={2}
						sx={
							{
								textAlign: '-webkit-center',marginTop: '0px',
								borderBottom: { xl: "1px solid #d6d6d4",xs: "none" },
								display: "flex",justifyContent: "center"
							}
						}
					>
						<Grid item sm={12} md={12} lg={12} xl={12} sx={{ display: { xs: "none",xl: "flex",lg: "flex",md: "none",sm: "none" },paddingTop: "10px !important",paddingBottom: "10px" }}>
							<Grid item xs={12}>
								<div role='presentation'>
									<Breadcrumbs aria-label='breadcrumb' separator='›' sx={{ fontSize: "13px" }}>
										<Typography className={classes.txtTilte} underline='hover' color='inherit' href='/' style={{}}>
											Trang chủ
										</Typography>
										<Typography className={classes.txtTilte} style={{}} underline='hover' color='inherit' href='/product'>
											sản phẩm
										</Typography>
										<Typography sx={{ fontSize: "13px !important" }} className={classes.nameProduct}>
											{productDetails?.name}
										</Typography>
									</Breadcrumbs>
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Typography sx={{ display: { xs: "flex",xl: "flex",lg: "flex",md: "flex",sm: "flex" },borderBottom: { xs: "2px solid #d6d6d4",xl: "none" },paddingBottom: { xs: "10px" },marginTop: { xs: 0,xl: "16px",lg: "16px",md: "16px" },}} style={{ marginBottom: "16px",textAlign: "left" }} className={classes.nameProductMobile}>
						{productDetails?.name}
					</Typography>

					<Grid
						container
						spacing={2}
						style={{
							textAlign: "-webkit-center",
							marginTop: "0px",
						}}
						sx={{ display: "flex",justifyContent: "center" }}
					>


						<Box className={classes.galleryProduct}>
							{/* <ImageZoom key={productDetails?.image} src={images?.map(image => ({ src: image }))} alt='A image to apply the ImageZoom plugin' zoom='200' /> */}
							<ImageCarouselZoom data={productDetails?.image} />


						</Box>
					</Grid>

					{/* xs, extra-small: 0px
          sm, small: 600px
          md, medium: 900px
          lg, large: 1200px
          xl, extra-large: 1536px */}

					<Grid container spacing={2} sx={{ display: { xs: "flex" },marginLeft: "0px",width: "100%",justifyContent: "space-around",flexDirection: { xs: "column-reverse",sm: "column-reverse",md: "column-reverse",xl: "row",lg: "row" } }}>
						<Grid item xs={12} sm={12} md={12} lg={8} xl={8} style={{ padding: "10px" }}>
							<Paper style={{ boxShadow: "none",paddingRight: "10px" }}>
								<Typography sx={{ margin: "0 !important",textAlign: { xs: "left" } }} className={classes.txtTitleBox}>
									Mô tả sản phẩm
								</Typography>
								<Typography
									className={classes.txtTilte}
									dangerouslySetInnerHTML={{
										__html: productDetails?.description,
									}}
								></Typography>
							</Paper>
							<hr style={{ marginBottom: "60px" }} />


						</Grid>

						<Grid container spacing={2} sx={{ width: "100%",justifyContent: { xs: "center" },marginLeft: { xs: "0px",xl: "-16px",md: "-16px",sm: "-16px" },marginTop: { xs: "0px",xl: "40px" },paddingLeft: { xs: "0px !important",xl: "0px" } }} item xs={12} sm={12} md={12} lg={4} xl={4} style={{ height: "fit-content" }}>
							<Paper style={{
								background: "rgb(36, 92, 79,0.1)",padding: "5px",borderBottom: "0px",
								borderTop: "2px solid #454F5B",
								borderRadius: "9px",
								boxShadow: "0px .8px .8px 0px rgba(0,0,0,0.11)",
								"&:hover": {
									boxShadow: "0px 18px 28px rgba(0,0,0,0.15),0px 0px 1px rgba(0,0,0,0.31)",
									transition: "boxShadow 0.3s ease -in -out 0s"
								},
							}}>
								<Box className={classes.txtPrice} >
									<WrapperPriceProduct style={{ padding: "10px 16px ",background: "rgb(36, 92, 79,0.01)" }}>
										{productDetails?.discount > 0 && (
											<Typography className={classes.txtPrice} style={{ textAlign: 'left',marginBottom: 5,textDecoration: "line-through",fontSize: "1rem",color: "#45cc8f" }}><FontAwesomeIcon icon={faTags} />{convertPrice(productDetails?.price)}</Typography>
										)}

										<Typography className={classes.nameProduct} style={{ textAlign: "left",fontSize: "32px" }}>
											{convertPrice((calculateDiscountedPriceNoConvert(productDetails)))}
										</Typography>


									</WrapperPriceProduct>
								</Box>
								<Box style={{ padding: "10px 16px ",display: "flex" }}>
									<Typography className={classes.nameProduct}>Số lượng:</Typography>

									<Box>
										<button
											style={{
												border: "none",
												background: "transparent",
												cursor: "pointer",
											}}
											onClick={() => handleChangeCount("decrease",numProduct === 1 || productDetails?.countInStock === 0)}
											disabled={numProduct === 1 || productDetails?.countInStock === 0}
										>
											<MinusOutlined style={{ color: "#000",fontSize: "20px" }} />
										</button>
										<WrapperInputNumber
											onChange={onChange}
											defaultValue={1}
											max={productDetails?.countInStock}
											min={1}
											value={numProduct}
											size="small"
										/>
										<button
											style={{
												border: "none",
												background: "transparent",
												cursor: "pointer",
											}}
											onClick={() =>
												handleChangeCount("increase",numProduct === productDetails?.countInStock || productDetails?.countInStock === 0)
											}
											disabled={numProduct === productDetails?.countInStock || productDetails?.countInStock === 0}
										>
											<PlusOutlined style={{ color: "#000",fontSize: "20px" }} />
										</button>
									</Box>
								</Box>

								<Box style={{ alignItems: "center",gap: "12px",padding: "10px 16px",textAlign: "center" }}>
									<LoadingButton
										fullWidth
										size="large"
										type="submit"
										variant="contained"
										loading={isProcessing}
										className={classes.nameProductInfo}
										ref={cartButtonRef}
										color="primary"
										aria-label="Mua hàng"
										style={{
											background: productDetails?.countInStock === 0 ? "#CCCCCC" : "#436E67",
											height: "48px",
											width: "100%",
											textTransform: "none",
											borderRadius: "4px",
											color: productDetails?.countInStock === 0 ? "#B22222" : "#fff !important",
											fontSize: "15px",
											fontWeight: "700",
											border: "none",
										}}
										onClick={handleAddOrderProduct}
										disabled={productDetails?.countInStock === 0}
									>
										<Typography className={classes.nameProductInfo}>
											{productDetails?.countInStock === 0 ? (
												<Typography className={classes.nameProductInfo} style={{ color: "#B22222",fontWeight: "700" }}>
													Hết hàng
												</Typography>
											) : (
												<Typography className={classes.nameProductInfo} style={{ color: "#fff",fontWeight: "700" }}>
													Mua ngay
												</Typography>
											)}
										</Typography>
									</LoadingButton>
								</Box>
								{(!errorLimitOrder
									&&
									<Box className={classes.boxInfoShipping}>
										<FontAwesomeIcon icon={faBox} style={{ color: "#436E67",marginRight: "15px",fontSize: "16px" }} />
										{productDetails?.type === 'piano-electric' ? (
											<Typography className={classes.nameProductInfo}>{productDetails?.countInStock === 0 ? <Typography style={{ color: "#B22222" }}> Hết hàng</Typography> : "Còn hàng - khu vực TP. HCM"}</Typography>

										) : (
											<Typography className={classes.nameProductInfo}>{productDetails?.countInStock === 0 ? <Typography style={{ color: "#B22222" }}> Hết hàng</Typography> : "Còn hàng"}</Typography>
										)}

									</Box>
								)}

								<Box className={classes.boxInfoShipping} >
									<FontAwesomeIcon icon={faPeopleCarryBox} style={{ color: "#436E67",marginRight: "10px",fontSize: "16px" }} />
									{productDetails?.type === 'piano-electric' ? (
										<Typography className={classes.nameProductInfo}>Miễn phí vận chuyển nội thành TP. HCM</Typography>

									) : (
										<Typography className={classes.nameProductInfo}>Miễn phí vận chuyển nội thành TP. Tam Kỳ</Typography>
									)}

								</Box>
								<Box className={classes.boxInfoShipping}>
									<FontAwesomeIcon icon={faTruck} style={{ color: "#436E67",marginRight: "10px",fontSize: "16px" }} />
									<Typography className={classes.nameProductInfo}>Hỗ trợ vận chuyển toàn quốc</Typography>
								</Box>
							</Paper>
						</Grid>
					</Grid>


					{showFab && (
						<Fab
							sx={{
								position: "fixed",
								display: "flex",
							}}
							color='primary'
							onClick={handleAddOrderProduct}
						>
							<div style={{ alignItems: "center",gap: "12px",padding: "10px 16px",textAlign: "center" }}>
								<div>
									<LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isProcessing}
										className={classes.nameProductInfo}
										style={{
											background: productDetails?.countInStock === 0 ? "#CCCCCC" : "#436E67",color: productDetails?.countInStock === 0 ? "#B22222" : "#fff !important",
											height: "48px",
											width: "100%",
											border: "none",
											borderRadius: "4px",
											textTransform: "none",

											fontSize: "15px",
											fontWeight: "700",
										}}
										onClick={handleAddOrderProduct}
										disabled={productDetails?.countInStock === 0}
									>
										<Typography className={classes.nameProductInfo}>
											{productDetails?.countInStock === 0 ? (
												<Typography className={classes.nameProductInfo} style={{ color: "#B22222",fontWeight: "700" }}>
													Hết hàng
												</Typography>
											) : (
												<Typography className={classes.nameProductInfo} style={{ color: "#fff",fontWeight: "700" }}>
													Mua ngay
												</Typography>
											)}
										</Typography>
									</LoadingButton>
									{errorLimitOrder && <Typography className={classes.nameProductInfo} style={{ color: "red" }}>Sản phẩm hết hàng</Typography>}
								</div>
							</div>
						</Fab>
					)}
					<Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
						<DialogTitle style={{ background: "rgb(36, 92, 79,0.1)" }}>
							<Grid container spacing={2} style={{ alignItems: "center" }} >
								<Grid item xs={10} sm={10} xl={11}>
									<Typography className={classes.nameProduct}>Đã thêm vào giỏ hàng</Typography>
								</Grid>
								<Grid item xs={2} sm={2} xl={1}>
									<IconButton edge="end" color="inherit" onClick={handleCloseDialog} aria-label="close">
										<FontAwesomeIcon icon={faXmark} fade />
									</IconButton>
								</Grid>
							</Grid>
						</DialogTitle>
						<DialogContent style={{ marginTop: "20px" }}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={4} xl={4}>

									<CardMedia component='img' sx={{ width: "100%",height: "100%" }} image={productDetails?.image[0]} alt={productDetails?.name} />
								</Grid>
								<Grid item xs={12} sm={8} xl={8}>
									<Typography className={classes.nameProduct} style={{ fontSize: "1.2rem",fontWeight: 600,marginBottom: "10px" }}>{productDetails?.name}</Typography>
									{productDetails?.discount > 0 && (
										<Typography className={classes.txtPrice} style={{ textAlign: 'left',marginBottom: 5,textDecoration: "line-through",fontSize: "1rem",color: "#45cc8f" }}><FontAwesomeIcon icon={faTags} />{convertPrice(productDetails?.price)}</Typography>
									)}

									<Typography className={classes.nameProduct} style={{ fontSize: "1.2rem",textAlign: "left",fontWeight: 500 }}>

										{convertPrice((calculateDiscountedPriceNoConvert(productDetails)))}

									</Typography>
									<Box style={{ display: "flex",gap: '10px',justifyContent: "space-between" }}>
										<Typography className={classes.nameProduct} style={{ fontSize: "1rem",fontWeight: 400,lineHeight: 1.5 }}>Slượng:</Typography>
										<Typography className={classes.priceTitle} style={{ textAlign: "center",fontSize: "1rem",fontWeight: 500,lineHeight: 1.5 }} >
											{" "}{numProduct}
										</Typography>
									</Box>
									<Box style={{ display: "flex",gap: '10px',justifyContent: "space-between" }}>
										<Typography className={classes.nameProduct} style={{ fontSize: "1rem",fontWeight: 400 }}>Tạm tính:</Typography>


										<Typography className={classes.priceTitle} style={{ fontSize: "1rem",textAlign: "left",fontWeight: 500 }} >

											{convertPrice((calculateDiscountedPriceNoConvert(productDetails)) * numProduct)}

										</Typography>

									</Box>
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions style={{ background: "rgb(36, 92, 79,0.1)",padding: "22px" }}>
							<Button onClick={handleCloseDialog} className={classes.nameProductInfo}
								variant='contained'
								style={{
									background: "#436E67",
									height: "48px",
									width: "100%",
									border: "none",
									borderRadius: "4px",
									color: "#fff",
									fontSize: "1rem",
									textTransform: "none",
									fontWeight: "600",
								}}>
								Mua sắm
							</Button>
							<Button
								className={classes.nameProductInfo}
								variant='contained'
								style={{
									background: "#436E67",
									height: "48px",
									width: "100%",
									border: "none",
									borderRadius: "4px",
									color: "#fff",
									fontSize: "1rem",
									textTransform: "none",
									fontWeight: "600",
								}}
								onClick={() => navigate('/order')}
							>
								Giỏ hàng
							</Button>
						</DialogActions>
					</Dialog>
					<Container maxWidth="xl" sx={{ paddingLeft: "0px !important",paddingRight: "0px !important",}}>
						<AnswerComponent />

					</Container>
					<Container maxWidth='lg'
						ref={cartButtonRefOut}
					>

						<Typography className={classes.txtTitleBox}>Có thể bạn quan tâm</Typography>

						{/* <div className={classes.sliderWrapper}> */}
						<YourSwiperComponent latestProducts={sortedProductsGuitar} classes={classes} />


						{/* </div> */}
					</Container>
					<Container maxWidth='lg' style={{ width: "95%" }}>

						<Typography className={classes.txtTitleBox}>Trích từ Blog</Typography>
						<div className={classes.sliderWrapper}>
							<Grid container spacing={2} sx={{ display: { xl: "block",xs: "block" } }}>

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
											<SwiperSlide className={classes.SwiperSlideBlog} key={post._id} >
												<BlogPostCardMobile id={post?._id} key={post?._id} blog={post} index={index} responsive={12} />
											</SwiperSlide>
										);
									})}
								</Swiper>
							</Grid>
						</div>
					</Container>

					{(recentlyViewed?.products && (
						<Container maxWidth='lg'>
							<Typography className={classes.txtTitleBox}>Xem gần đây</Typography>
							<YourSwiperComponent latestProducts={recentlyViewed?.products} classes={classes} />
						</Container>
					))}
				</Container >
			)}

		</>
	);
};

export default ProductDetailsComponent;
