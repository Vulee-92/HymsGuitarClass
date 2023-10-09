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
			fontWeight: 600,
			color: "#0b2238",
			fontSize: "24px",
			height: "70px",
			minHeight: "62.4px",
			overflow: "hidden",
			overflowWrap: "break-word",
			paddingBottom: "5px",
			marginTop: "30px",
			cursor: 'pointers'
		},
		txtPrice: {
			...CStyles.txt_body_item,
			fontSize: 16,
			textAlign: "left",
			fontWeight: 600,
			color: "#0b2238",
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
			color: "#212B36",
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
	};
}
)