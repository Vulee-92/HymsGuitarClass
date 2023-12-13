/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets,Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
	return {
		container: {
			// maxWidth: " 1140px",
		},
		priceTitle: {
			...CStyles.txt_title_item,
			color: "#45cc8f",
			textAlign: "right",
		},
		nameProduct: {
			...CStyles.txt_title_item,
			color: "#0b2238",
			fontSize: "1.2rem",
			fontWeight: 700,
			marginBottom: 10,
			textTransform: "uppercase",
			borderBottom: "1px solid #e9e6e0",
			width: "100%",
			paddingBottom: "10px",
		},
		footer: {
			paddingTop: "5rem",
			// paddingBottom: '40px'
			// paddingBottom: "4rem",
		},
		txtTilte: {
			...CStyles.txt_body_item,
			color: "#6c7a87",
			marginTop: "1rem",
			fontSize: "1rem",
			fontWeight: 500,
			lineHeight: 1.5,
			marginBottom: "1.45rem",
			cursor: "pointer",
		},
		txtTilteInsider: {
			...CStyles.txt_body_item,
			color: "#6c7a87",
			marginTop: "1rem",
			fontSize: "1rem",
			fontWeight: 400,
			lineHeight: 1.5,
			marginBottom: 0,
		},
		txtTilteConnect: {
			...CStyles.txt_body_item,
			color: "#6c7a87",
			marginTop: ".45rem",
			fontSize: "1rem",
			fontWeight: 600,
			marginBottom: 0,
			cursor: "pointer",
		},
		IconConnect: {
			display: "flex",
			textAlign: "center",
			flexDirection: "column",
			aligncontent: "center",
			alignItems: "center",
			cursor: "pointer !important",
		},
		inputEmail: {
			...CStyles.txt_body_item,
			marginTop: "1.45rem",
			boxShadow: "none",
			padding: 0,
		},
		inputEmailBase: {
			...CStyles.txt_body_item,
			border: "1px solid #6c7a87",
			height: "40px",
			borderRadius: "10px",
			fontSize: "11px",
			margin: 0,
			paddingLeft: "10px",
		},
		txtCopyRight: {
			...CStyles.txt_body_item,
			color: "#6c7a87",
			fontSize: "1rem",
			paddingTop: "4rem",
			paddingBottom: "30px"
		},
		txtCopyRightLink: {
			textDecoration: "none",
			color: "#6c7a87",
		},
		// 		#436E67
		// #179a71
		// #1d7063
		// #3d8d74
		// #4c7c69
		// #155a5b
		customSendEmail: {
			backgroundColor: "#436E67",
			height: "40px",
			width: "40px",
			marginLeft: "10px",
			// marginRight: "10px",
			fontSize: "20px",
			color: "#fff",
			border: "1px solid #6c7a87",
			borderTopRightRadius: "1px",
			borderBottomRightRadius: "1px",
		},

		blockFooterConnect: {
			background: "#fff"
		},
		innerConnect: {
			padding: "55px 0px",
			margin: "0 auto",
			boxSizing: "border-box",
			justifyContent: "center"
		},
		innerInsider: {
			// maxWidth: "1160px",
			padding: "60px 0px",
			margin: "0 auto",
			boxSizing: "border-box"
		},
		txtFooterConnect: {
			...CStyles.txt_header_title,
			paddingBottom: "8px",
			marginBottom: "30px",
			color: "#0b2238",
			fontSize: "1.875rem",
			fontWeight: 600,
			borderBottom: "1px solid #6c7a87"
		},
		txtFooterInsider: {
			...CStyles.txt_header_title,
			paddingBottom: "8px",
			marginBottom: "1.25rem",
			color: "#0b2238",
			fontSize: "1.875rem",
			fontWeight: 600
		},
		borderIconConnect: {
			width: '55px',
			height: '55px',
			border: "1px solid #6c7a87",
			borderRadius: '30%',
			textAlign: 'center',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			cursor: "pointer !important"
		},

		blockHymnsInsider: {
			backgroundColor: "#f7f8fa"
		},
		btnLoginHeader: {
			...CStyles.btn_login,
			// fontWeight: CStyles.fBold,
			marginTop: "0px",

			backgroundColor: Colors.bgLogin,
			cursor: "pointer",
			fontSize: "1rem",
			fontWeight: 400,
			padding: "10px 25px",
			textTransform: "none",
			"&:hover": {
				backgroundColor: "#355852", /* Đổi màu nền khi hover */
				color: "#fff", /* Đổi màu chữ khi hover */
			},
		},
	};
});
