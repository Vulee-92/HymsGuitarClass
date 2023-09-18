import React,{ useEffect,useRef,useState } from "react";
import { PlusOutlined,MinusOutlined } from "@ant-design/icons";
import * as ProductService from "../../services/ProductService";
import { addOrderProduct,resetOrder } from "../../redux/slides/orderSlide";
import * as message from "../Message/Message";
import { WrapperPriceProduct,WrapperPriceTextProduct,WrapperInputNumber } from "./style";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import { useDispatch,useSelector } from "react-redux";
import { useLocation,useNavigate } from "react-router-dom";
import styles from "./stylemui";
import { Accordion,AccordionDetails,AccordionSummary,useScrollTrigger,Alert,Box,Breadcrumbs,Button,Card,CardContent,CardMedia,Container,Dialog,DialogActions,DialogContent,DialogTitle,Divider,Drawer,Fab,Grid,IconButton,ImageList,ImageListItem,ImageListItemBar,Link,Paper,Rating,Snackbar,Stack,Typography,useMediaQuery } from "@mui/material";
import "react-medium-image-zoom/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox,faChevronDown,faCircleArrowLeft,faPeopleCarryBox,faTruck } from "@fortawesome/free-solid-svg-icons";
import AnimationComponent from "components/AnimationComponent/AnimationComponent";
import Slider from "react-slick";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useDebounce } from "hooks/useDebounce";
import { convertPrice } from "utils";
import { ShoppingCart } from "@mui/icons-material";
import ImageZoom from "react-image-zooom";
import { Helmet } from "react-helmet-async";

const ProductDetailsComponent = ({ idProduct }) => {
	// const classess = useStyles({ isMobile });
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const [numProduct,setNumProduct] = useState(1);
	const user = useSelector((state) => state.user);
	const order = useSelector((state) => state.order);
	const classes = styles();
	const [limit,setLimit] = useState(6);
	const [showFab,setShowFab] = useState(false);
	const searchProduct = useSelector((state) => state?.product?.search);
	const searchDebounce = useDebounce(searchProduct,100);
	const [open,setOpen] = React.useState(false);
	const [errorLimitOrder,setErrorLimitOrder] = useState(false);
	const [openDialog,setOpenDialog] = useState(false);
	const [isZoomed,setIsZoomed] = useState(false);
	const [zoomPosition,setZoomPosition] = useState({ x: 0,y: 0 });



	const [isCartOpen,setIsCartOpen] = useState(false);



	const handleCartClick = () => {
		setIsCartOpen(true);
	};

	const handleCartClose = () => {
		setIsCartOpen(false);
	};
	const [open1,setOpen1] = useState(false);
	const onChange = (value) => {
		setNumProduct(Number(value));
	};

	const fetchProductAll = async (context) => {
		const limit = context?.queryKey && context?.queryKey[1];
		const search = context?.queryKey && context?.queryKey[2];
		const res = await ProductService.getAllProduct(search,limit);

		return res;
	};
	const fetchGetDetailsProduct = async (context) => {
		const id = context?.queryKey && context?.queryKey[1];
		if (id) {
			const res = await ProductService.getDetailsProduct(id);
			return res.data;
		}
	};
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
		if (!user?.id) {
			navigate("/login",{ state: location?.pathname });
		} else {
			setOpen(true);
			const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id);
			if (orderRedux?.amount + numProduct <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
				dispatch(
					addOrderProduct({
						orderItem: {
							name: productDetails?.name,
							amount: numProduct,
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
		}
		handleCartClick();
		setOpenDialog(true);
	};
	const handleCloseDialog = () => {
		setOpenDialog(false);
	};
	const { isLoading,data: productDetails } = useQuery(["product-details",idProduct],fetchGetDetailsProduct,{ enabled: !!idProduct });
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

	const handleToggleDrawer = () => {
		setOpen1(!open1);
	};
	const cartButtonRef = useRef(null);

	// useEffect(() => {
	//   const handleScroll = () => {
	//     if (cartButtonRef.current) {
	//       const cartButtonTop = cartButtonRef.current.getBoundingClientRect().top;
	//       if (cartButtonTop < 0) {
	//         setIsCartOpen(true);
	//       } else {
	//         setIsCartOpen(false);
	//       }
	//     }
	//   };
	//   window.addEventListener('scroll', handleScroll);
	//   return () => {
	//     window.removeEventListener('scroll', handleScroll);
	//   };
	// }, []);
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


	return (
		<>

			<Loading isLoading={isLoading}>
				<Helmet>
					<title>{productDetails?.name}</title>
				</Helmet>
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
						anchor='bottom'
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
										<Button
											variant='contained'
											style={{
												background: "#245c4f",
												height: "48px",
												width: "160px",
												border: "none",
												borderRadius: "4px",

												color: "#fff",
												fontSize: "10px",
												fontWeight: "600",
												textTransform: "capitalize",
											}}
											onClick={handleAddOrderProduct}
										>
											Thêm vào giỏ hàng
										</Button>
										{!errorLimitOrder ? (
											<>
												<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
													<Alert style={{ border: "1px solid #245c4f",fontSize: "13px" }} severity='success' sx={{ width: "100%" }}>
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
									</div>
								</div>
							</Box>
						</Container>
					</Drawer>
				</div>
				<Box sx={
					{
						textAlign: '-webkit-center',marginTop: '0px',
						borderBottom: { xl: "1px solid #d6d6d4",xs: "none" },
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
											<Typography className={classes.txtTilte}>Bao gồm thuế. Miễn phí vận chuyển cho mọi đơn hàng!</Typography>
										</Box>
										<Button
											variant='contained'
											style={{
												background: "#245c4f",
												height: "48px",
												width: "200px",
												textTransform: "capitalize",
												border: "none",
												borderRadius: "4px",
												color: "#fff",
												fontSize: "15px",
												fontWeight: "700",
											}}
											onClick={handleAddOrderProduct}
										>
											Thêm vào giỏ hàng
										</Button>
										{!errorLimitOrder ? (
											<>
												<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
													<Alert style={{ border: "1px solid #245c4f",fontSize: "13px" }} severity='success' sx={{ width: "100%" }}>
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
										<Link underline='hover' color='inherit' href='/' style={{}}>
											Trang chủ
										</Link>
										<Link style={{}} underline='hover' color='inherit' href='/product'>
											sản phẩm
										</Link>
										<Link sx={{ fontSize: "13px !important" }} className={classes.nameProduct}>
											{productDetails?.name}
										</Link>
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
							<ImageZoom key={productDetails?.image} src={productDetails?.image} alt='A image to apply the ImageZoom plugin' zoom='200' />
						</Box>
					</Grid>

					{/* xs, extra-small: 0px
          sm, small: 600px
          md, medium: 900px
          lg, large: 1200px
          xl, extra-large: 1536px */}

					<Grid container spacing={2} sx={{ display: { xs: "flex" },marginLeft: "0px",width: "100%",justifyContent: "space-around",flexDirection: { xs: "column-reverse",sm: "column-reverse",md: "column-reverse",xl: "row",lg: "row" } }}>
						<Grid item xs={12} sm={12} md={12} lg={8} xl={8} style={{ padding: "10px" }}>
							<Paper style={{ boxShadow: "none" }}>
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
							<Paper style={{ background: "rgb(36, 92, 79,0.1)",boxShadow: "none",margin: "0.425rem",padding: "5px" }}>
								<Box sx={{ display: { xs: "flex" },justifyContent: "space-around",flexDirection: { xs: "column-reverse",sm: "column-reverse",md: "column-reverse",xl: "column",lg: "column" } }}>
									<WrapperPriceProduct style={{ padding: "10px 16px ",background: "rgb(36, 92, 79,0.01)" }}>
										<Typography className={classes.nameProduct} style={{ textAlign: "left",fontSize: "32px" }}>
											{productDetails?.price?.toLocaleString()}₫
										</Typography>
									</WrapperPriceProduct>
									{/* <Typography className={classes.nameProduct} style={{ padding: '10px 16px ' }}>
                    {productDetails?.name} */}
									{/* // <Stack spacing={1}>
                  //   <Rating name="size-small" defaultValue={productDetails?.rating} size="small" />
                  // </Stack> */}

									{/* Da ban {productDetails?.countInStock}+ */}
									{/* </Typography> */}
									{/* <Rate
                  allowHalf
                  defaultValue={productDetails?.rating}
                  value={productDetails?.rating}

                /> */}

									{/* <Box style={{ padding: '10px 16px ' }}>
                <Typography className={classes.nameProduct}>Giao đến </Typography>
                <Typography className="address">{user?.address}</Typography>
                <Typography className={classes.nameProduct}>Đổi địa chỉ</Typography>
              </Box> */}
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

								<div style={{ alignItems: "center",gap: "12px",padding: "16px",textAlign: "center" }}>
									<div>
										<Fab
											variant='contained'
											ref={cartButtonRef}
											color='primary'
											aria-label='Mua hàng'
											style={{
												background: "#245c4f",
												height: "48px",
												width: "100%",
												textTransform: "capitalize",
												border: "none",
												borderRadius: "4px",
												color: "#fff",
												fontSize: "15px",
												fontWeight: "700",
											}}
											onClick={handleAddOrderProduct}
										>
											Thêm vào giỏ hàng
										</Fab>
										{errorLimitOrder && <div style={{ color: "red" }}>San pham het hang</div>}
									</div>
								</div>
								<Box sx={{ display: "flex",paddingLeft: "16px" }}>
									<FontAwesomeIcon icon={faBox} style={{ color: "#245c4f",marginRight: "15px",fontSize: "16px" }} />
									<Typography className={classes.nameProductInfo}>Còn hàng</Typography>
								</Box>
								<Box sx={{ display: "flex",paddingTop: "5px",paddingLeft: "16px" }}>
									<FontAwesomeIcon icon={faPeopleCarryBox} style={{ color: "#245c4f",marginRight: "10px",fontSize: "16px" }} />
									<Typography className={classes.nameProductInfo}>Miễn phí vận chuyển cho mọi đơn hàng trong khu vực nội thành TP. Tam Kỳ</Typography>
								</Box>
								<Box sx={{ display: "flex",paddingTop: "5px",paddingLeft: "16px" }}>
									<FontAwesomeIcon icon={faTruck} style={{ color: "#245c4f",marginRight: "10px",fontSize: "16px" }} />
									<Typography className={classes.nameProductInfo}>Hỗ trợ vận chuyển toàn quốc</Typography>
								</Box>
							</Paper>
						</Grid>
					</Grid>

					<Dialog open={openDialog} onClose={handleCloseDialog}>
						<Box sx={{ display: "flex",flexDirection: "row",justifyContent: "space-between" }} style={{ background: "rgb(36, 92, 79,0.1)" }}>
							<DialogTitle className={classes.nameProduct}>Xem giỏ hàng!</DialogTitle>
							<DialogActions>
								<Button onClick={handleCloseDialog} style={{ color: "#245c4f" }} sx={{ paddingRight: { xs: "-40px",xl: "0px",md: "0px" } }} autoFocus>
									X
								</Button>
							</DialogActions>
						</Box>
						<DialogContent style={{ padding: "0px",boxShadow: "none" }}>
							<Card style={{ padding: "none",boxShadow: "none" }} sx={{ display: "flex" }}>
								<CardMedia component='img' sx={{ width: 70,height: 70 }} image={productDetails?.image} alt='Live from space album cover' />
								<Box sx={{ display: "flex",flexDirection: "column" }}>
									<CardContent sx={{ flex: "1 0 auto" }}>
										<Typography className={classes.nameProduct} style={{ fontSize: "14px" }} component='div' variant='h5'>
											{productDetails?.name}
										</Typography>
										<Typography className={classes.priceTitle} style={{ textAlign: "left",marginTop: "10px" }} variant='subtitle1' color='text.secondary' component='div'>
											{productDetails?.price?.toLocaleString()}₫
										</Typography>
									</CardContent>
									<Box sx={{ display: "flex",alignItems: "center",pl: 1,pb: 1 }}></Box>
								</Box>
							</Card>
							<div style={{ alignItems: "center",gap: "12px",padding: "16px",textAlign: "center",background: "rgb(36, 92, 79,0.1)" }}>
								<div>
									<Button
										variant='contained'
										style={{
											background: "#245c4f",
											height: "48px",
											width: "100%",
											border: "none",
											borderRadius: "4px",
											color: "#fff",
											fontSize: "15px",
											textTransform: "capitalize",
											fontWeight: "700",
										}}
										href='/order'
									>
										Xem giỏ hàng
									</Button>
									{errorLimitOrder && (
										<Typography className={classes.nameProduct} style={{ color: "red",textAlign: "center",fontWeight: 300,marginTop: "10px" }}>
											Sản phẩm hiện đang hết hàng
										</Typography>
									)}
								</div>
							</div>
						</DialogContent>
					</Dialog>
					{showFab && (
						<Fab
							sx={{
								position: "fixed",
								display: "flex",
							}}
							color='primary'
							onClick={handleAddOrderProduct}
						>
							<div style={{ alignItems: "center",gap: "12px",padding: "16px",textAlign: "center" }}>
								<div>
									<Button
										variant='contained'
										style={{
											background: "#245c4f",
											height: "48px",
											width: "100%",
											border: "none",
											borderRadius: "4px",
											color: "#fff",
											fontSize: "15px",
											fontWeight: "700",
										}}
										onClick={handleAddOrderProduct}
									>
										Thêm vào giỏ hàng
									</Button>
									{errorLimitOrder && <div style={{ color: "red" }}>San pham het hang</div>}
								</div>
							</div>
						</Fab>
					)}
					<hr style={{ margin: "60px 0" }} />
					<Box style={{ margin: "60px 0" }}>
						{/* <Typography className={classes.txtTitleBox}>Latest Releases</Typography> */}
						<AnimationComponent type='text' text='Có thể bạn quan tâm' className={classes.txtTitleBox} />
						<div className={classes.sliderWrapper}>
							<ImageList variant='masonry' cols={1} gap={8}>
								{/* <Slider {...settings} style={{ overflow: 'hidden' }}> */}
								<Slider {...settings} style={{ overflow: "hidden" }}>
									{products?.data?.map((product,post,index) => {
										return (
											<div>
												<ImageListItem key={product.image} style={{ cursor: "pointers" }}>
													<CardComponent post={post} index={index} key={product._id} countInStock={product.countInStock} description={product.description} image={product.image} name={product.name} price={product.price} rating={product.rating} type={product.type} discount={product.discount} selled={product.selled} id={product._id} createdAt={product.createdAt} style={{ cursor: "pointers" }} />
												</ImageListItem>
											</div>
										);
									})}
								</Slider>
							</ImageList>
						</div>
					</Box>
				</Container>
			</Loading >
		</>
	);
};

export default ProductDetailsComponent;
