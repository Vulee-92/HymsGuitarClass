/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets,Configs } from "../../../../configs";
import { Colors } from "../../../../utils/colors";
import CStyles from "../../../../utils/common";

export default makeStyles(() => {
	return {

		txtTilte: {
			...CStyles.txt_title_item,
			color: "#434c55",
			fontSize: "1.125rem",
			fontWeight: 500,
			lineHeight: 1,
			textAlign: "left",
			justifyContent: "start",
			textTransform: "None",
			fontSmooth: "antialiased !important",
			// marginBottom: "30px",
		},

		hymnsName: {
			...CStyles.txt_title_item,
			fontSize: "2rem",
			letterSpacing: "5px",
			lineHeight: 1,
			// marginLeft: 20
		},
		pageName: {
			...CStyles.txt_title_item,
			fontSize: "1rem",
			letterSpacing: "5px",
			lineHeight: 1,
			// marginLeft: 20
		}
	};
});
