/** LIBRARY */
import { makeStyles } from "@mui/styles";
// import { Assets, Configs } from "../configs";
import { Assets,Configs } from "../../../configs";
import { Colors } from "../../../utils/colors";
import CStyles from "../../../utils/common";

export default makeStyles(() => {
	return {
		container: {
			...CStyles.center,
			height: "70vh",
			backgroundImage: `url(${Assets.bgHome})`,
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat",
			padding: Configs.pH,
			display: "fixed",
		},
		txtHeaderTitle: {
			...CStyles.txt_header_title,
			// fontSize: 18,
			textAlign: "left",
			fontWeight: 600,
			color: "#0b2238",
			display: "vertical",
			fontSize: "16px",
			// fontWeight: 400,
			height: "70px",
			minHeight: "62.4px",
			overflow: "hidden",
			overflowWrap: "break-word",
		},
		txtPrice: {
			...CStyles.txt_body_item,
			fontSize: 16,
			textAlign: "left",
			fontWeight: 600,
			color: "#0b2238",
		},
		boxCard: {
			borderBottom: "0px",
			borderTop: "2px solid #454F5B",
			borderRadius: "9px",
			boxShadow: "0px .8px .8px 0px rgba(0,0,0,0.11)",
			"&:hover": {
				boxShadow: "0px 18px 28px rgba(0,0,0,0.15),0px 0px 1px rgba(0,0,0,0.31)",
				transition: "boxShadow 0.3s ease -in -out 0s"
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
		boxBorderCard: {
			boxShadow: "0px 1px 1px 0px rgba(0,0,0,0.14)",
		},
		txtStockingOut: {
			...CStyles.txt_body_item,
			color: "red",
			textAlign: "right",
		},
		txtStocking: {
			...CStyles.txt_body_item,
			color: "#45cc8f",
			textAlign: "right",
		},
	};
});
