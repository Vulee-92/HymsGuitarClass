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
		conModal: {
			...CStyles.shadow,
			top: "50%",
			left: "50%",
			// transform: "translate(-50%, -50%)",
			background: `url(${Assets.bgProfile}) center`,
			backgroundSize: "cover",
			padding: `24px 0px`,
			borderRadius: 16,
			minWidth: 600,
			width: "100%",
			height: "100%",
			marginBottom: "5%",
			marginTop: "5%",
		},
		conTextCreate: {
			...CStyles.txt_header_title,
			// color: Colors.da,
			fontSize: 60,
			textAlign: "left",
			fontWeight: 600,
			color: "#000",
		},
		conHeader: {
			...CStyles.center,
			...CStyles.con,
		},
		conAvatar: {
			position: "relative",
			"&:hover": {
				"& $conImgAvatarOverlay": {
					display: "block",
				},
			},
		},
		conImgAvatar: {
			width: 120,
			height: 120,
			borderRadius: "50%",
			border: `1px solid ${Colors.white}`,
			backgroundColor: Colors.white,
			objectFit: "cover",
		},
		conImgAvatarOverlay: {
			...CStyles.center,
			position: "absolute",
			top: 0,
			left: 0,
			width: 120,
			height: 120,
			borderRadius: "50%",
			backgroundColor: "rgba(0,0,0,.3)",
			display: "none",
			cursor: "pointer",
		},
		conIconPen: {
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
		},
		conContent: {
			marginTop: 32,
			padding: `0px 64px`,
		},
		conInput: {
			...CStyles.rowAliCen,
			...CStyles.txt_title_item,
			backgroundColor: Colors.secondary,
			borderRadius: 8,
			marginTop: 8,
			height: 48,
			padding: `0px 16px`,
			boxShadow: `#F8EEC3 0px -2px`,
			caretColor: Colors.text,
			color: "#2E72D6",
			"& input": {
				"&::placeholder": {
					color: "#C79047",
					opacity: 1,
					"-webkit-text-fill-color": "#C79047",
				},
				"-webkit-text-fill-color": "#2E72D6 !important",
			},
			"& $Mui-disabled": {
				opacity: 1,
			},
			"&:before": {
				content: "none",
			},
			"&:after": {
				height: 51,
				border: `1px solid #F1AB1E`,
				borderRadius: 8,
				transition: "none",
			},
		},
		conIconInputRight: {
			paddingLeft: 16,
			cursor: "pointer",
		},
		conFooter: {
			marginTop: 32,
			borderTop: `0.5px solid ${Colors.placeHolder}`,
			paddingTop: 24,
		},
		conBtn: {
			...CStyles.center,
			borderRadius: 12,
			backgroundColor: "#18B0F4",
			boxShadow: "#2EA4E8 0px 2px",
			width: 150,
			cursor: "pointer",
			"&:active": {
				transform: `scale(0.9)`,
			},
			"&:hover": {
				backgroundColor: "#33C0FF",
				boxShadow: "#3AADEF 0px 2px",
			},
		},

		imgHeaderIcon: {
			width: 28,
			height: 28,
			objectFit: "contain",
			position: "absolute",
			top: 24,
			right: 24,
			cursor: "pointer",
			"&:active": {
				transform: `scale(0.9)`,
			},
		},

		txtStudentName: {
			...CStyles.txt_header_title,
			textAlign: "center",
			color: Colors.black,
		},
		txtTitleInput: {
			...CStyles.txt_title_item,
			color: Colors.placeHolder,
		},
		conInputUnfixable: {
			...CStyles.rowAliCen,
			...CStyles.txt_title_item,
			backgroundColor: Colors.secondary,
			borderRadius: 8,
			marginTop: 8,
			height: 48,
			padding: `0px 16px`,
			boxShadow: `#F8EEC3 0px -2px`,
			caretColor: Colors.text,
			color: "#C9BF9B",
			"& input": {
				"&::placeholder": {
					color: "#C79047",
					opacity: 1,
					"-webkit-text-fill-color": "#C79047",
				},
				"-webkit-text-fill-color": "#C9BF9B !important",
			},
			"& $Mui-disabled": {
				opacity: 1,
			},
			"&:before": {
				content: "none",
			},
			"&:after": {
				height: 51,
				borderRadius: 8,
				transition: "none",
			},
		},
		txtUserId: {
			...CStyles.txt_body_item,
			color: Colors.placeHolder,
			textAlign: "right",
			fontWeight: CStyles.fMedium,
		},
		txtBtn: {
			...CStyles.txt_btn,
			textAlign: "center",
			padding: `4px 16px`,
			fontSize: 20,
		},
		txtMsg: {
			...CStyles.txt_title_item,
			marginTop: 16,
		},
		uploadFile: {
			"& .ant-upload.ant-upload-select.ant-upload-select-picture-card": {
				width: "60px",
				height: "60px",
				borderRadius: "50%",
			},
			"& .ant-upload-list-item-container": {
				display: "none",
			},
		},
		conContent: {
			...CStyles.rowJusCen,
		},
		conCard: {
			maxWidth: 720,
			margin: "auto",
			padding: "0px !important",
			backgroundColor: Colors.adminMeetingColor,
			borderRadius: Configs.br,
			boxShadow: "rgba(0, 0, 0, .5) 0px 1px 2px",
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
			marginTop: "20px",
			textAlign: "left",
			fontWeight: 600,
			color: "#0b2238",
			paddingBottom: "10px",
			borderBottom: "1px solid #0b2238",
			width: "60px",
		},
		txtDesTitle: {
			...CStyles.txt_body_item,
			textAlign: "center",
			marginTop: Configs.pH,
			color: Colors.bgLogin,
			fontSize: 18,
			cursor: "pointer",
		},
		txtTitleInput: {
			...CStyles.txt_title_item,
		},
		txtError: {
			...CStyles.txt_error,
		},
		txtForgot: {
			...CStyles.txt_body_item,
			color: Colors.primary,
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
		txtTitleBox: {
			...CStyles.txt_title_item,
			fontSize: "35px",
			fontWeight: 700,
			lineHeight: 1.3,
			position: "relative",
			textAlign: "center",
			zIndex: 10,
			marginTop: "100px",
			textTransform: "capitalize",
			margin: 0,
			pointerEvents: "none",
			marginBottom: "30px",

			"@media (max-width: 550px)": {
				fontSize: "1.3rem",
				marginTop: "50px",
				textAlign: "center",
			},
			"&::after": {
				content: '""',
				display: 'block',
				position: 'absolute',
				bottom: "-15px",
				left: '50%',
				marginTop: "10px",
				transform: 'translateX(-50%)',
				width: '90px',
				height: '6px',
				backgroundColor: "#212B36" // Màu đỏ của MUI
			},
		},
		boxAnswer: {
			margin: "10px 0px",
			boxShadow: "none",
			border: "1px solid #d6d6d4",
			"&:hover": {
				backgroundColor: "#d6d6d4"
			},
		},
		txtTilte: {
			...CStyles.txt_body_item,
			color: "#393939",
			fontSize: "16px",
			fontWeight: 700,
			lineHeight: 1.7,
			textAlign: "left",
			fontSmooth: "antialiased !important",
			// marginBottom: "30px",
			"@media (max-width: 550px)": {
				fontSize: ".8rem",
				textAlign: "left",
			},
		},
		txtAnswer: {
			...CStyles.txt_body_item,
			color: "#393939",
			fontSize: "16px",
			fontWeight: 400,
			lineHeight: 1.7,
			textAlign: "left",
			fontSmooth: "antialiased !important",
			// marginBottom: "30px",
			"@media (max-width: 550px)": {
				fontSize: ".8rem",
				textAlign: "left",
			},
		},
	};
});
