/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets,Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
	return {
		container: {
			...CStyles.center,
			backgroundImage: `url(${Assets.bgHymnsCenterChristmas})`,

			marginTop: "40px",
			height: "100vh",
			display: "block",
			width: "100%",
			margin: "0 auto",
			backgroundRepeat: "no-repeat",
			// padding: Configs.pH,


			'@media (max-width: 767px)': {
				backgroundImage: `url(${Assets.bgHomeMobile})`,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				width: "100%",
				height: "60vh", /* Đảm bảo tỷ lệ chiều rộng/chiều cao không bị biến đổi */
				display: "block"
			},
			'@media (min-width: 768px) and (max-width: 1509px)': {
				backgroundImage: `url(${Assets.bgHymnsCenterChristmas})`,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				height: "20vh",

				width: "100vw",
				display: "block"
			},
			'@media (min-width: 1510px)': {
				backgroundImage: `url(${Assets.bgHymnsCenterChristmas})`,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				height: "500px",

				width: "100%",
				display: "block"


			},
		},
		conContent: {
			...CStyles.rowJusCen,
			padding: Configs.pH,
		},
		conCard: {
			maxWidth: 600,
			margin: "auto",
			padding: "0px !important",
			backgroundColor: "#fff",
			borderRadius: Configs.br,
			boxShadow: "0px 50px 70px -10px rgba(11, 34, 56, 0.05) !important",
			WebkitBoxShadow: "0px 50px 70px -10px rgba(11, 34, 56, 0.05) !important",
			MozBoxShadow: "0px 50px 70px -10px rgba(11, 34, 56, 0.05) !important",
			OBoxShadow: "0px 50px 70px -10px rgba(11, 34, 56, 0.05) !important",
			MsBoxShadow: "0px 50px 70px -10px rgba(11, 34, 56, 0.05) !important",
		},

		conLogin: {
			padding: 32,
			borderRadius: Configs.br,
			height: "100%",
		},

		conForm: {
			marginBottom: 24,
		},

		conItemInput: {
			marginTop: 20,
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
		txtHeaderTitle: {
			...CStyles.txt_header_title,
			// color: Colors.da,
			fontSize: 32,
			textAlign: "center",
			fontWeight: 500,
			color: "#0b2238",
		},
		txtDesTitle: {
			...CStyles.txt_title_item,
			textAlign: "center",
			fontWeight: 400,
			marginTop: Configs.pH,
			color: Colors.bgLogin,
			fontSize: 20,
			cursor: "pointer",
		},
		txtTitleInput: {
			...CStyles.txt_title_item,
			fontWeight: 500,
		},
		txtError: {
			...CStyles.txt_error,
		},
		txtForgot: {
			...CStyles.txt_body_item,
			color: "#0b2238",
			cursor: "pointer",
		},
		txtTitleLoginMethod: {
			...CStyles.txt_body_item,
			margin: `0px ${Configs.pH}px`,
		},
		txtRegister: {
			...CStyles.txt_body_item,
			textAlign: "center",
			marginTop: 48,
		},
		txtBtnRegister: {
			...CStyles.txt_body_item,
			fontWeight: CStyles.fBold,
			cursor: "pointer",
		},
		customLoadingButton: {
			...CStyles.txt_body_item,
			backgroundColor: '#436E67',
			color: 'white',
			padding: '10px 20px',
			width: '100%',
			marginTop: 10,
			border: 'none',
			borderRadius: '5px',
			textTransform: "capitalize",
			'&.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-containedSizeLarge': {
				// CSS cho trạng thái loading
				'&.MuiButton-label': {
					visibility: 'hidden',
				},
				'& .MuiCircularProgress-root': {
					position: 'absolute',
					top: '50%',
					left: '50%',
					marginTop: '-12px', // Chỉnh sửa để canh giữa vòng xoay
					marginLeft: '-12px', // Chỉnh sửa để canh giữa vòng xoay
				},
				"&:hover": {
					backgroundColor: '#245c4f'
				}
			},
		},
	};
});
