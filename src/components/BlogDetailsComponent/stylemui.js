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
			textAlign: "center",
			display: "flex",
			justifyContent: "center",
			fontSize: "3rem"
		},
		nameProductInfo: {
			...CStyles.txt_title_item,
			alignItems: "center",
			display: "flex",
			fontWeight: 400,
			lineHeight: 1.7,
		},
		nameProductMobile: {
			...CStyles.txt_title_item,
			alignItems: "left",
			fontSize: "22px",
		},
		// Thêm quy tắc mới cho thẻ <img> trong txtTilte
		txtTilte: {
			...CStyles.txt_body_item,
			color: "#434c55",
			fontSize: "1rem",
			fontWeight: 400,
			lineHeight: 1.7,
			textAlign: "left",
			fontSmooth: "antialiased !important",
			"p": {
				marginBottom: "30px",
			},
			"& img": {
				width: "100%",
				height: "auto",
				maxWidth: "100%", // Chiều rộng không vượt quá 100%
				borderRadius: "5%",
				boxShadow: "0px 18px 28px rgba(0,0,0,0.15), 0px 0px 1px rgba(0,0,0,0.31)",
			},

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
			width: "100%",
			border: "10px solid #fff",
			margin: " 5px auto",
			height: "50%",

			"@media all and (min-width: 768px)": {
				width: "calc(30% - 10px)",
			},
		},
		txtTitleBox: {
			fontSize: "1.5rem",
			fontWeight: 600,
			lineHeight: "34px",
			position: "relative",
			textAlign: "left",
			zIndex: 10,
			color: "#0b2238",
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
			// 	marginTop: "5px",
			// 	width: '90px',
			// 	height: '3px',
			// 	borderTop: "2px solid #454F5B",
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
		}
	};
});
