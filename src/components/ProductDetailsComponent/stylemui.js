/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets,Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
	return {
		priceTitle: {
			...CStyles.txt_title_item,
			color: "#45cc8f",
			textAlign: "right",
		},
		nameProduct: {
			...CStyles.txt_title_item,
			alignItems: "center",
			display: "flex",
		},
		txtPrice: {
			display: { xs: "flex" },justifyContent: "space-around",flexDirection: { xs: "column-reverse",sm: "column-reverse",md: "column-reverse",xl: "column",lg: "column" }
		},
		boxInfoShipping: {
			display: "flex",padding: "10px 16px",alignItems: "center"
		},
		nameProductInfo: {
			...CStyles.txt_title_item,
			alignItems: "center",
			display: "flex",
			fontSize: "1rem",
			fontWeight: 400,
			lineHeight: 1.7,
		},
		nameProductMobile: {
			...CStyles.txt_title_item,
			alignItems: "left",
			fontSize: "22px",
		},
		txtTilte: {
			...CStyles.txt_body_item,
			color: "#434c55",
			fontSize: "1rem",
			fontWeight: 400,
			lineHeight: 1.7,
			textAlign: "left",
			fontSmooth: "antialiased !important",
			// marginBottom: "30px",
		},
		myGrid: {
			textAlign: "center",
			display: "flex",
			flexDirection: "column-reverse !important",
		},
		sliderWrapper: {
			position: "relative",
		},
		buttontoi: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			position: "absolute",
			top: "50%",
			right: "10px",
			transform: "translateY(-50%)",
			height: "30px",
			width: "30px",
			color: "#fff",
			fontSize: "20px",
			backgroundColor: "#436E67",
			borderRadius: "50%",
			boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
			zIndex: 1000,
			cursor: "pointer",
		},
		samplePrevArrow: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			position: "absolute",
			top: "50%",
			left: "10px",
			color: "#fff",
			fontSize: "20px",
			transform: "translateY(-50%)",
			height: "30px",
			width: "30px",
			backgroundColor: "#436E67",
			borderRadius: "50%",
			boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
			zIndex: 1000,
			cursor: "pointer",
		},
		arrowIcon: {
			color: "#333333",
			fontSize: "20px",
		},
		galleryProduct: {
			width: "50%",
			border: "10px solid #fff",
			margin: " 5px auto",
			height: "100%",

			"@media all and (max-width: 768px)": {
				width: "calc(100% - 0px)",
			},
		},
		txtTitleBox: {
			fontSize: "1.5rem",
			fontWeight: 700,
			lineHeight: "34px",
			position: "relative",
			textAlign: "left",
			zIndex: 10,
			marginTop: "30px",
			marginBottom: "30px",
			margin: 0,
			textTransform: "uppercase",
			pointerEvents: "none",
			"@media (max-width: 550px)": {
				fontSize: "1.5rem",
				marginTop: "30px",
				textAlign: "center",
			},
			// "&::after": {
			// 	content: '""',
			// 	display: 'block',
			// 	position: 'absolute',
			// 	bottom: "-20px",
			// 	// left: '10%',
			// 	marginTop: "10px",
			// 	width: '90px',
			// 	height: '3px',
			// 	backgroundColor: "#436E67", // Màu đỏ của MUI
			// 	"@media (max-width: 550px)": {
			// 		textAlign: "center",
			// 		display: 'none',

			// 	},
			// },
		},
		boxAnswer: {
			margin: "10px 0px",
			boxShadow: "none",
			border: "1px solid #d6d6d4",
			"&:hover": {
				backgroundColor: "#AFC4BF"
			},
		},
		btnBottomShow: {
			background: "#436E67",
			height: "48px",
			border: "none",
			borderRadius: "4px",
			zIndex: 1000000,
			color: "#fff",
			fontSize: "10px",
			fontWeight: "600",
			textTransform: "none",
		},
		SwiperSlide: {
			// width: "130px !important",
			// marginRight: "25px !important",
			paddingBottom: "50px !important",

			"swiper": {
				paddingBottom: "50px !important"
			},
			"swiper-slide": {
				// width: "130px !important",
				// marginRight: "25px !important",
			},
			"swiper-slide-active": {
				// width: "120px !important",
				// marginRight: "25px !important"
			},
			"@media (max-width: 767px)": {
				// marginRight: "25px !important"
			},
			"@media (min-width: 768px)": {
				// marginRight: "70px !important",
				// width: "180px !important",

			},

		},
		// SwiperSlideBlog: {
		// 	width: "320px !important",
		// 	margin: "0 15px",

		// 	"swiper-slide": {
		// 		width: "200px !important",
		// 		marginRight: "30px !important"
		// 	},
		// 	"swiper-slide-active": {
		// 		width: "320px !important",
		// 		margin: "0 15px",
		// 	},
		// 	"@media (max-width: 767px)": {
		// 		width: "320px !important",
		// 		margin: "0 15px",
		// 	},
		// 	"@media (min-width: 768px)": {
		// 		marginRight: "70px !important",
		// 		width: "200px !important",

		// 	},
		// }
	};
});
