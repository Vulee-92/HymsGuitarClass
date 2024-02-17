/** LIBRARY */
import { makeStyles } from "@mui/styles"
import { Assets,Configs } from "../../configs"
import { Colors } from "../../utils/colors"
import CStyles from "../../utils/common"

export default makeStyles(() => {
	return {
		container: {
			...CStyles.center,
			padding: Configs.pH,
		},
		nameProduct: {
			...CStyles.txt_header_title,
			textAlign: "center",
			fontWeight: 500,
			color: "#231e18",
			fontSize: "1rem",
			width: "80%",
			margin: "0 auto",
			height: "70px",
			overflow: "hidden",
			overflowWrap: "break-word",
			wordWrap: "break-word",
			marginTop: "30px",
			cursor: 'pointers'
		},
		txtPrice: {
			...CStyles.txt_body_item,
			fontSize: "1rem",
			textAlign: "left",
			fontWeight: 500,
			marginBottom: 5,
			color: "#0b2238",
		},
		nameProductInfo: {
			...CStyles.txt_body_item,

			background: "rgba(221,221,221,1)",
			height: "40px",
			padding: "8px 15px",
			marginTop: 10,
			width: "100%",
			textTransform: "none",
			border: "solid 1px rgb(255,255,255,0)",
			borderRadius: "999px",
			color: "#436E67",
			fontSize: "1rem",
			fontWeight: "400",
			transition: "all 0.1s ease- out 0s",
			"&:hover": {
				// boxShadow: "0px 18px 28px rgba(0,0,0,0.15),0px 0px 1px rgba(0,0,0,0.31)",
				// transition: "boxShadow 0.3s ease -in -out 0s"
				background: "rgba(221,221,221,1)",

			},

		},
		boxCard: {
			borderBottom: "0px",
			padding: 15,
			width: "90%",
			height: "100%",
			margin: "0 auto",
			borderTop: "2px solid #454F5B",
			borderRadius: "9px",
			boxShadow: "0px .8px .8px 0px rgba(0,0,0,0.11)",
			"&:hover": {
				boxShadow: "0px 18px 28px rgba(0,0,0,0.15),0px 0px 1px rgba(0,0,0,0.31)",
				transition: "boxShadow 0.3s ease -in -out 0s"
			},

		},
		txtStatusSell: {
			...CStyles.txt_body_item,
			fontSize: "1.125rem",
			textAlign: "right",
			fontWeight: 400,
			marginBottom: 5,
		},
		Image: {
			zIndex: 10,
			right: 0,
			cursor: "pointer",
			top: "12px",
			overflow: "hidden",
			paddingTop: "24px,",
			position: "relative",
			borderRadius: "12px",
			boxShadow:
				"0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px - 4px rgba(145,158, 171, 0.12)",
			color: "#436E67",
			backgroundColor: "#fff",
			transition: "box - shadow 300ms cubic- bezier(0.4, 0, 0.2, 1) 0ms",
			"&:hover": { opacity: 0.72 },
			justifyContent: "flex-start",
		},
		NameCard: {
			...CStyles.txt_header_title,
			fontSize: 15,
			textAlign: "center",
			fontWeight: 600,
			color: "#0b2238",
		},
		boxImg: {
			display: 'block',
			width: '250px !important',
			height: '250px !important',
			objectFit: 'cover',
			position: 'relative',
			top: 10,
			cursor: 'pointer',
			left: "10%",
			"& .swiper-slide img": {
				width: '100% !important',
				height: '100% !important',
			}
		},
		boxPrice: {
			height: '60px'
		}
	};
}
)