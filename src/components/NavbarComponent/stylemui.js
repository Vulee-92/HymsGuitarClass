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
		},
		txtTilte: {
			...CStyles.txt_body_item,
			color: "#000",
			fontSize: "1.2rem",
			fontWeight: 600,
			margin: "0px",
			cursor: "pointer",
		},
		BoxTilte: {
			border: "1px solid #d6d6d4",
			margin: "0px",
			background: "#f4f4f2",
			color: "#000",
			borderTopLeftRadius: "3px",
			borderTopRightRadius: "3px",
			minHeight: "0px !important",
		},
		txtTilteItem: {
			...CStyles.txt_body_item,
			color: "#000",
			fontSize: "1rem",
			fontWeight: 400,
			margin: "0px",
			cursor: "pointer",
		},
		MuiAccordionSummary: {
			margin: "0px",
		},
	};
});
