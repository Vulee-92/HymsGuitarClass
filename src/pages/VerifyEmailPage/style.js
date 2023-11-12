/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets,Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
	return {
		container: {
			...CStyles.center,
			height: "60vh",
			backgroundImage: `url(${Assets.bgHome})`,
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat",
			overflowY: "auto",
			padding: Configs.pH,
		},
		boxCard: {
			maxWidth: "100%",
			margin: '0 auto',
			display: 'flex',
			height: "100vh",
			justifyContent: 'center',
			flexDirection: 'column',
			alignItems: "center",
		},
		conContent: {
			...CStyles.rowJusCen,
		},
		conCard: {
			maxWidth: 900,
			backgroundColor: "rgb(255,255,255)",
			color: "rgb(33,43,54)",
			transition: "box - shadow 300ms cubic - bezier(0.4,0,0.2,1) 0ms",
			overflow: "hidden",
			boxShadow: "0px 18px 28px rgba(0,0,0,0.15), 0px 0px 1px rgba(0,0,0,0.31)",
			borderRadius: "16px",
			padding: "80px 24px 40px",
		},
		conInfo: {
			maxWidth: 720,
			margin: "0 auto",
			padding: "0px !important",
		},
		conLogin: {
			padding: 32,
			borderRadius: Configs.br,
			height: "100%",
		},
		txtTilteInfoContact: {
			...CStyles.txt_body_item,
			color: "#434c55",
			marginTop: "1.45rem",
			fontSize: "1rem",
			fontWeight: 400,
			lineHeight: 2,
			textAlign: "left",
			marginBottom: "30px",
			fontSmooth: "antialiased !important",
		},
		conForm: {
			marginBottom: 24,
		},

		conItemInput: {
			marginTop: 20,
		},
		conInputMessage: {
			...CStyles.txt_body_item,
			display: "flex",
			alignItems: "center",
			fontWeight: `${CStyles.fBold} !important`,
			marginTop: "8px !important",
			backgroundColor: "rgba(210, 210, 210, 0.2) !important",
			borderRadius: "8px !important",
			border: "none",
			height: "120px !important",
			padding: `0px 16px`,
			"& input": {
				flex: 1,
				"&::placeholder": {
					color: Colors.placeHolder,
					opacity: 1,
					"-webkit-text-fill-color": Colors.placeHolder,
				},
				"-webkit-text-fill-color": `${Colors.text} !important`,
			},
			"& $Mui-disabled": {
				opacity: 0,
			},
			"&:before": {
				content: "none",
			},
			"&:after": {
				height: 54,
				border: `2px solid ${Colors.primary}`,
				borderRadius: 8,
				transition: "none",
			},
		},
		conBtn: {
			backgroundColor: "#fff",
			borderRadius: 8,
			marginTop: Configs.pH,
			height: 48,
			width: "30%",
			...CStyles.txt_btn,
			textTransform: 'none',
			paddingLeft: Configs.pH,
			border: "1px solid #f5f5f5",
			color: "#000",
			paddingRight: Configs.pH,
			"&:hover": {
				backgroundColor: "#212B36",
				color: "#fff",
				opacity: .9
			}
		},
		conInput: {
			...CStyles.txt_body_item,
			display: "flex",
			alignItems: "center",
			fontWeight: `${CStyles.fBold} !important`,
			marginTop: "8px !important",
			backgroundColor: "rgba(210, 210, 210, 0.2) !important",
			borderRadius: "8px !important",
			border: "none",
			height: "54px !important",
			padding: `0px 16px`,
			"& input": {
				flex: 1,
				"&::placeholder": {
					color: Colors.placeHolder,
					opacity: 1,
					"-webkit-text-fill-color": Colors.placeHolder,
				},
				"-webkit-text-fill-color": `${Colors.text} !important`,
			},
			"& $Mui-disabled": {
				opacity: 0,
			},
			"&:before": {
				content: "none",
			},
			"&:after": {
				height: 54,
				border: `2px solid ${Colors.primary}`,
				borderRadius: 8,
				transition: "none",
			},
		},
		conIconInput: {
			paddingRight: 8,
		},
		conIconInputRight: {
			paddingLeft: Configs.pH,
			cursor: "pointer",
		},
		conMsg: {
			...CStyles.rowSpaBet,
		},
		conTitleLoginMethod: {
			...CStyles.rowAliCen,
			...CStyles.rowJusCen,
			margin: `32px 0px`,
		},
		conLine: {
			width: 48,
			height: 1,
			backgroundColor: Colors.text,
		},
		conBtnGoogle: {
			...CStyles.center,
			backgroundColor: Colors.white,
			borderRadius: 8,
			marginTop: Configs.pH,
			height: 48,
			border: `1px solid ${Colors.placeHolder}`,
			"&:hover": {
				backgroundColor: Colors.white,
			},
		},
		conLanguage: {
			...CStyles.center,
			marginTop: 8,
		},
		conLanguageItem: {
			width: 40,
			objectFit: "contain",
			margin: `0px 8px`,
			cursor: "pointer",
		},

		imgLogo: {
			...CStyles.center,
			margin: `16px auto`,
			width: "15rem",
		},
		imgLogoGoogle: {
			width: 32,
			height: 32,
			objectFit: "contain",
			marginRight: 16,
		},

		txtBtnGoogle: {
			...CStyles.txt_btn,
			textTransform: "none",
			color: Colors.text,
		},
		conTextCreate: {
			...CStyles.txt_header_title,
			// color: Colors.da,
			fontSize: 60,
			textAlign: "center",
			fontWeight: 600,
			color: "#fff",
		},
		txtHeaderTitle: {
			...CStyles.txt_header_title,
			// color: Colors.da,
			fontSize: "2rem",
			textAlign: "center",
			fontWeight: 600,
			color: "#0b2238",
		},
		txtDesTitle: {
			...CStyles.txt_body_item,
			textAlign: "center",
			marginTop: Configs.pH,
			color: Colors.bgLogin,
			fontSize: 18,
			cursor: "pointer",
		},
		conButton: {
			display: 'flex',
			justifyContent: 'space-evenly',
			backgroundColor: "#fff",
			padding: "0px 0px 0px 10px",
			borderTopLeftRadius: "10px",
			borderTopRightRadius: "10px",
			borderBottomRightRadius: "5px",
			borderBottomLeftRadius: "5px",
			transition: "background-color 0.3s, color 0.3s",
			"&:hover": {
				backgroundColor: "#fff",
				color: "#000",
			}
		}
	};
});
