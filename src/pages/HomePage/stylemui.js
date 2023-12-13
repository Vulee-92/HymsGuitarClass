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
			backgroundColor: "#212B36",
			borderRadius: "50%",
			boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
			zIndex: 100000,
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
			backgroundColor: "#212B36",
			borderRadius: "50%",
			boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
			zIndex: 100000,
			cursor: "pointer",
		},
		arrowIcon: {
			color: "#333333",
			fontSize: "20px",
		},
		conContent: {
			...CStyles.rowJusCen,
		},
		conCard: {
			maxWidth: 300,
			margin: "auto",
			padding: "0px !important",
			backgroundColor: Colors.white,
			borderRadius: Configs.br,
			boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 4px",
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
				fontSize: "1.125rem",
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
		txtTitleRecentlyViewed: {
			fontSize: "1.375em",
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
				fontSize: "1.125rem",
				marginTop: "30px",
				textAlign: "center",
			},

		},
		ProductItem: {
			width: "200px"
		},
		conTextCreate: {
			maxWidth: 720,
			margin: "auto",
			padding: "0px !important",
			boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 4px",
			color: Colors.white,
			fontSize: 32,
			textAlign: "center",
			fontWeight: 600,
		},
		conLogin: {
			padding: 32,
			borderRadius: Configs.br,
			height: "80%",
		},

		conForm: {
			marginBottom: 24,
		},

		conItemInput: {
			marginTop: 20,
		},
		txtTilte: {
			...CStyles.txt_body_item,
			color: "#393939",
			marginTop: "30px",
			fontSize: "1.125rem",
			fontWeight: 500,
			marginBottom: "30px",
			lineHeight: 2.2
		},
		txtTilteLoading: {
			...CStyles.txt_body_item,
			color: "#393939",
			marginTop: "30px",
			fontSize: "18px",
			textAlign: "center",
			fontWeight: 500,
			marginBottom: "30px",
			lineHeight: 2
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
			height: "50px !important",
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
			fontSize: 32,
			marginTop: 90,
			textAlign: "center",
			fontWeight: 600,
			color: "#0b2238",
		},
		txtDesTitle: {
			...CStyles.txt_body_item,
			textAlign: "center",
			marginTop: Configs.pH,
		},
		txtDesTitleSignUp: {
			color: "#6c7a87",
			fontSize: "1rem",
			fontWeight: "400",
			marginTop: 10,
			marginBottom: "1.25rem",
			maxWidth: 720,
			margin: "auto",
			padding: "0px !important",
			boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 4px",
			textAlign: "center",
		},
		txtDesTitleSignUpLight: {
			color: " #ffffff !important",
			fontSize: "1rem",
			fontWeight: "400",
			marginBottom: "1.25rem",
			maxWidth: 720,
			margin: "auto",
			padding: "0px !important",
			boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 4px",
			textAlign: "center",
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
		ButtonAllPost: {
			"&:hover": {
				backgroundColor: "#ffffff",
				boxShadow: "none",
			},
			"&:active": {
				boxShadow: "none",
				backgroundColor: "#3c52b2",
			},
			"&:before": {
				content: "",
				position: "absolute",
				zIndex: "-1",
				top: "0",
				left: "0",
				right: "0",
				bottom: "0",
				background: "#0b2238",
				transform: "scaleY(0)",
				transformOrigin: "50% 100%",
				transitionProperty: "transform",
				transitionDuration: "0.25s",
				transitionTimingFunction: "cubic-bezier(0.65, 0.05, 0.36, 1)",
			},
			crypto_section: {
				borderBottom: "0px",
				borderTop: "2px solid #000000",
				borderRadius: "9px",
			},
			bg_section: {
				background: "#fff",
				border: "rgb(224, 223, 219)",
			},
			"slick-prev": {
				fontSize: 0,
				lineHeight: 0,
				position: "absolute",
				top: "50%",
				display: "block",
				width: "20px",
				height: "20px",
				padding: 0,
				transform: "translate(0, -50%)",
				cursor: "pointer",
				color: "transparent",
				border: "none",
				outline: "none",
				background: "none",
			},
			"slick-next": {
				fontSize: 0,
				lineHeight: 0,
				position: "absolute",
				top: "50%",
				display: "block",
				width: "20px",
				height: "20px",
				padding: 0,
				transform: "translate(0, -50%)",
				cursor: "pointer",
				color: "transparent",
				border: "none",
				outline: "none",
				background: "none",
			},
			"slick-prev:hover, .slick-prev:focus, .slick-next:hover, .slick-next:focus":
			{
				color: "transparent",
				outline: "none",
				background: "none",
			},
			"slick-prev:hover:before, .slick-prev:focus:before, .slick-next:hover:before, .slick-next:focus:before":
			{
				opacity: 1,
			},
			"slick-prev.slick-disabled:before, .slick-next.slick-disabled:before": {
				opacity: 0.25,
			},
			"slick-prev:before, .slick-next:before": {
				fontFamily: '"Font Awesome 5 Free"',
				fontSize: "20px",
				lineHeight: 1,
				opacity: 0.75,
				color: "#fff",
				WebkitFontSmoothing: "antialiased",
				MozOsxFontSmoothing: "grayscale",
			},
			"slick-prev": {
				left: "-25px",
			},
			"[dir='rtl'] .slick-prev": {
				right: "-25px",
				left: "auto",
			},
			".slick-prev:before": {
				content: "'\\f104'",
			},
			".slick-next": {
				right: "-25px",
			},
			"[dir='rtl'] .slick-next": {
				right: "auto",
				left: "-25px",
			},
			".slick-next:before": {
				content: "'\\f105'",
			},
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
				marginRight: "25px !important"
			},
			"swiper-slide-active": {
				// width: "120px !important",
				marginRight: "25px !important"
			},
			"@media (max-width: 767px)": {
				marginRight: "25px !important"
			},
			"@media (min-width: 768px)": {
				// marginRight: "70px !important",
				// width: "180px !important",

			},

		},
		SwiperSlideBlog: {
			width: "320px !important",
			margin: "0 15px",

			"swiper-slide": {
				width: "200px !important",
				marginRight: "30px !important"
			},
			"swiper-slide-active": {
				width: "320px !important",
				margin: "0 15px",
			},
			"@media (max-width: 767px)": {
				width: "320px !important",
				margin: "0 15px",
			},
			"@media (min-width: 768px)": {
				marginRight: "70px !important",
				width: "200px !important",

			},
		}
	};
});
