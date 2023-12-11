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
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { useLocation,useNavigate } from "react-router-dom";
import styles from "./stylemui";
import { Accordion,AccordionDetails,AccordionSummary,useScrollTrigger,Alert,Box,Breadcrumbs,Button,Card,CardContent,CardMedia,Container,Dialog,DialogActions,DialogContent,DialogTitle,Divider,Drawer,Fab,Grid,IconButton,ImageList,ImageListItem,ImageListItemBar,Link,Paper,Rating,Snackbar,Stack,Typography,useMediaQuery } from "@mui/material";
import "react-medium-image-zoom/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox,faChevronDown,faCircleArrowLeft,faPeopleCarryBox,faTruck,faXmark } from "@fortawesome/free-solid-svg-icons";
import AnimationComponent from "../../components/AnimationComponent/AnimationComponent";
import Slider from "react-slick";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useDebounce } from "hooks/useDebounce";
import { Helmet } from "react-helmet-async";
import { bottom } from "@popperjs/core";
import * as RecentlyViewed from "../../services/RecentlyViewed";
import * as BlogService from "../../services/BlogService";
import ImageCarouselZoom from "../../components/ImageCarouselZoom/ImageCarouselZoom";
import { LoadingButton } from "@mui/lab";
import BlogPostCardMobile from "../../sections/@dashboard/blog/BlogPostCardMobile";
import YourSwiperComponent from "components/YourSwiperComponent/YourSwiperComponent";
const { v4: uuidv4 } = require('uuid');


const ProductDetailsComponent = ({ idProduct }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [numProduct,setNumProduct] = useState(1);
	const order = useSelector((state) => state.order);
	const user = useSelector((state) => state.user);
	console.log("user",user)
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
			console.log("generateUserId",userId)
			localStorage.setItem("userId",userId);
		}
		if (userId !== null && userId !== "undefined") {
			// Thực hiện yêu cầu API
			console.log("userID",userId)
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
			const productData = res.data;
			await fetchRecentlyViewed(slug);
			return productData;
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
		setIsProcessing(false);

		// }
		handleCartClick();
		setOpenDialog(true);
	};
	const handleCloseDialog = () => {
		setOpenDialog(false);
	};
	const { isLoading,data: productDetails } = useQuery(["product-details",idProduct],fetchGetDetailsProduct,{ enabled: !!idProduct });


	console.log("productDetails,",productDetails)
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


	const {
		data: productsAccessory,
		isPreviousDatas,
	} = useQuery(["productsAccessory"],fetchProductAllAccessories,{
		retry: 2,
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






	const cartButtonRef = useRef(null);

	useEffect(() => {
		const handleScroll = () => {
			const cartButtonTop = cartButtonRef.current.getBoundingClientRect().top;
			if (cartButtonTop < 0) {
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
	return (
		<>

			{/* <Loading isLoading={isLoading}> */}
			< Helmet >
				<title>{productDetails?.name}</title>
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
									{productDetails?.price?.toLocaleString()}₫
								</Typography>
								<div style={{ alignItems: "center",gap: "12px",padding: "16px",textAlign: "center" }}>
									<div>
										<LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isProcessing}
											className={classes.btnBottomShow}
											sx={{
												width: { xl: "200px",xs: "180px" },
											}}
											onClick={handleAddOrderProduct}
										>
											Thêm vào giỏ hàng
										</LoadingButton>
										{!errorLimitOrder ? (
											<>
												<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
													<Alert className={classes.nameProductInfo} style={{ border: "1px solid #212B36",fontSize: "13px" }} severity='success' sx={{ width: "100%" }}>
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
											<Typography className={classes.priceTitle}>{productDetails?.price?.toLocaleString()}₫</Typography>
											<Typography className={classes.txtTilte}> Hỗ trợ vận chuyển cho mọi đơn hàng!</Typography>
										</Box>
										<LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isProcessing}
											className={classes.nameProductInfo}
											style={{
												background: "#212B36",
												height: "48px",
												width: "200px",
												textTransform: "none",
												border: "none",
												borderRadius: "4px",
												color: "#fff",
												fontSize: "15px",
												fontWeight: "700",
											}}
											onClick={handleAddOrderProduct}
										>
											Thêm vào giỏ hàng
										</LoadingButton>
										{!errorLimitOrder ? (
											<>
												<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
													<Alert style={{ border: "1px solid #212B36",fontSize: "13px" }} severity='success' sx={{ width: "100%" }}>
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
					<Typography sx={{ display: { xs: "flex",xl: "flex",lg: "none",md: "none",sm: "none" },borderBottom: { xs: "2px solid #d6d6d4",xl: "none" },paddingBottom: { xs: "10px" },marginTop: { xs: 0,xl: "16px",lg: "16px",md: "16px" },}} style={{ marginBottom: "16px",textAlign: "left" }} className={classes.nameProductMobile}>
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

							<div>
								<Typography className={classes.txtTitleBox}>Các câu hỏi thường gặp</Typography>

								<Accordion className={classes.boxAnswer} >
									<AccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />} aria-controls='panel1a-content' id='panel1a-header'>
										<Typography className={classes.txtTilte}>Tôi có được kiểm tra sản phẩm trước khi mua?</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Typography className={classes.txtTilte}>Nếu bạn muốn kiểm tra sản phẩm trước khi mua online, vui lòng gọi cho Hymns trước khi đến cửa hàng, nhân viên của chúng tôi luôn nhiệt tình hỗ trợ!</Typography>
									</AccordionDetails>
								</Accordion>
								<Accordion className={classes.boxAnswer}>
									<AccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />} aria-controls='panel2a-content' id='panel2a-header'>
										<Typography className={classes.txtTilte}>Đơn hàng của tôi có phụ kiện đi kèm không?</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Typography className={classes.txtTilte}>Sản phẩm không có phụ kiện đi kèm, trừ trường hợp những phụ kiện đó được nêu rõ trong phần mô tả sản phẩm. Bạn có thể tìm trên cửa hàng trực tuyến hoặc hỏi Đội Ngũ Kinh Doanh & Chăm Sóc Khách Hàng nhiệt tình của chúng tôi để được hỗ trợ ngay hôm nay!</Typography>
									</AccordionDetails>
								</Accordion>
								<Accordion className={classes.boxAnswer}>
									<AccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />} aria-controls='panel3a-content' id='panel3a-header'>
										<Typography className={classes.txtTilte}>Đơn hàng của tôi có được bảo hành không?</Typography>
									</AccordionSummary>
								</Accordion>
							</div>
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
										<Typography className={classes.nameProduct} style={{ textAlign: "left",fontSize: "32px" }}>
											{productDetails?.price?.toLocaleString()}₫
										</Typography>
									</WrapperPriceProduct>
								</Box>

								<Box style={{ padding: "10px 16px ",display: "flex" }}>
									<Typography className={classes.nameProduct}>Slượng:</Typography>

									<Box>
										<button
											style={{
												border: "none",
												background: "transparent",
												cursor: "pointer",
											}}
											onClick={() => handleChangeCount("decrease",numProduct === 1)}
										>
											<MinusOutlined style={{ color: "#000",fontSize: "20px" }} />
										</button>
										<WrapperInputNumber onChange={onChange} defaultValue={1} max={productDetails?.countInStock} min={1} value={numProduct} size='small' />
										<button
											style={{
												border: "none",
												background: "transparent",
												cursor: "pointer",
											}}
											onClick={() => handleChangeCount("increase",numProduct === productDetails?.countInStock)}
										>
											<PlusOutlined style={{ color: "#000",fontSize: "20px" }} />
										</button>
									</Box>
								</Box>

								<Box style={{ alignItems: "center",gap: "12px",padding: "10px 16px",textAlign: "center" }}>
									<LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isProcessing}
										className={classes.nameProductInfo}

										ref={cartButtonRef}
										color='primary'
										aria-label='Mua hàng'
										style={{
											background: errorLimitOrder ? "#CCCCCC" : "#212B36",
											height: "48px",
											width: "100%",
											textTransform: "none",
											border: "none",
											borderRadius: "4px",
											color: errorLimitOrder ? "#B22222" : "#fff !important",
											fontSize: "15px",
											fontWeight: "700",
										}}
										onClick={handleAddOrderProduct}
										disabled={errorLimitOrder}
									>
										<Typography className={classes.nameProductInfo}>{!errorLimitOrder ? <Typography className={classes.nameProductInfo} style={{ color: "#fff",fontWeight: "700",}}> Thêm vào giỏ hàng</Typography> : <Typography className={classes.nameProductInfo} style={{ color: "#B22222",fontWeight: "700" }}> Hết hàng</Typography>}</Typography>
									</LoadingButton>
								</Box>
								{(!errorLimitOrder
									&&
									<Box className={classes.boxInfoShipping}>
										<FontAwesomeIcon icon={faBox} style={{ color: "#212B36",marginRight: "15px",fontSize: "16px" }} />
										<Typography className={classes.nameProductInfo}>{!errorLimitOrder ? "Còn hàng" : <Typography style={{ color: "#B22222" }}> Hết hàng</Typography>}</Typography>
									</Box>
								)}

								<Box className={classes.boxInfoShipping} >
									<FontAwesomeIcon icon={faPeopleCarryBox} style={{ color: "#212B36",marginRight: "10px",fontSize: "16px" }} />
									<Typography className={classes.nameProductInfo}>Miễn phí vận chuyển nội thành TP. Tam Kỳ</Typography>
								</Box>
								<Box className={classes.boxInfoShipping}>
									<FontAwesomeIcon icon={faTruck} style={{ color: "#212B36",marginRight: "10px",fontSize: "16px" }} />
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
											background: "#212B36",
											height: "48px",
											width: "100%",
											border: "none",
											borderRadius: "4px",
											textTransform: "none",
											color: "#fff",
											fontSize: "15px",
											fontWeight: "700",
										}}
										onClick={handleAddOrderProduct}
									>
										Thêm vào giỏ hàng
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
									<Typography className={classes.priceTitle} style={{ fontSize: "1.2rem",textAlign: "left",fontWeight: 500 }}>	{(productDetails?.price)?.toLocaleString()}₫</Typography>
									<Box style={{ display: "flex",gap: '10px',justifyContent: "space-between" }}>
										<Typography className={classes.nameProduct} style={{ fontSize: "1rem",fontWeight: 400,lineHeight: 1.5 }}>Slượng:</Typography>
										<Typography className={classes.priceTitle} style={{ textAlign: "center",fontSize: "1rem",fontWeight: 500,lineHeight: 1.5 }} >
											{" "}{numProduct}
										</Typography>
									</Box>
									<Box style={{ display: "flex",gap: '10px',justifyContent: "space-between" }}>
										<Typography className={classes.nameProduct} style={{ fontSize: "1rem",fontWeight: 400 }}>Tạm tính:</Typography>
										<Typography className={classes.priceTitle} style={{ fontSize: "1rem",textAlign: "left",fontWeight: 500 }} >
											{(productDetails?.price * numProduct)?.toLocaleString()}₫
										</Typography>
									</Box>
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions style={{ background: "rgb(36, 92, 79,0.1)",padding: "22px" }}>
							<Button onClick={handleCloseDialog} className={classes.nameProductInfo}
								variant='contained'
								style={{
									background: "#212B36",
									height: "48px",
									width: "100%",
									border: "none",
									borderRadius: "4px",
									color: "#fff",
									fontSize: "1rem",
									textTransform: "none",
									fontWeight: "600",
								}}>
								Tiếp tục mua sắm
							</Button>
							<Button
								className={classes.nameProductInfo}
								variant='contained'
								style={{
									background: "#212B36",
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
					<hr style={{ margin: "60px 0" }} />
					<Box style={{ margin: "60px 0" }}>
						<Typography className={classes.txtTitleBox}>Có thể bạn quan tâm</Typography>

						{/* <AnimationComponent type='text' text='Có thể bạn quan tâm' className={classes.txtTitleBox} /> */}
						<div className={classes.sliderWrapper}>
							<YourSwiperComponent latestProducts={products?.data} classes={classes} />


						</div>
					</Box>
					<Box style={{ margin: "60px 0" }}>
						{/* <AnimationComponent type='text' text='Trích từ Blog' className={classes.txtTitleBox} /> */}
						<Typography className={classes.txtTitleBox}>Trích từ Blog</Typography>

						<div className={classes.sliderWrapper}>

							<Grid container spacing={2} sx={{ display: { xl: "block",xs: "block" } }}>
								{/* <Slider {...settingsBlog} >
							{blogs?.data?.map((post,index) => (
								<BlogPostCardMobile id={post?._id} key={post?._id} blog={post} index={index} />
							))}
						</Slider> */}
								<Swiper
									spaceBetween={10}

									grabCursor={true}
									// navigation={true}
									style={{ paddingLeft: '0px',paddingRight: '0px' }}
									modules={[Pagination]}
									className="mySwiper"
									breakpoints={{
										320: { slidesPerView: 2 },
										396: { slidesPerView: 2 },
										480: { slidesPerView: 2 },
										768: { slidesPerView: 2 },
										1024: { slidesPerView: 4 },
										1200: { slidesPerView: 5 },
									}}
								>
									{blogs?.data?.map((post,index) => {


										return (
											<SwiperSlide className={classes.SwiperSlideBlog} key={post._id} style={{ marginLeft: '40px',marginRight: '10px' }}>
												<BlogPostCardMobile id={post?._id} key={post?._id} blog={post} index={index} responsive={12} />
											</SwiperSlide>
										);
									})}
								</Swiper>
							</Grid>
						</div>

					</Box>
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
