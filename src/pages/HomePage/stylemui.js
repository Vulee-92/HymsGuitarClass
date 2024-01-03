/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets,Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
	return {

		sliderWrapper: {
			position: "relative",
		},
		txtTitleHymnsCenter: {
			fontSize: "3.75rem",
			fontWeight: 600,
			lineHeight: "34px",
			position: "relative",
			textAlign: "left",
			zIndex: 10,
			color: "#0b2238",
			marginTop: "30px",
			marginBottom: "30px",
			margin: 0,
			textTransform: "capitalize",
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
		nameProduct: {
			...CStyles.txt_header_title,
			textAlign: "center",
			fontWeight: 500,
			color: "#231e18",
			fontSize: "1rem",
			margin: "0 auto",
			overflow: "hidden",
			overflowWrap: "break-word",
			wordWrap: "break-word",
			paddingBottom: "30px",
			marginTop: "30px",
			cursor: 'pointers'
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



		txtTilte: {
			...CStyles.txt_body_item,
			color: "#6c7a87 !important",
			marginTop: "30px",
			fontSize: "1.125rem",
			fontWeight: 400,
			marginBottom: "25px",
			lineHeight: 2
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

	};
});
