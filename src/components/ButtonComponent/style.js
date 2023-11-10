/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets,Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
	return {
		conBtn: {
			...CStyles.center,
			borderRadius: 12,
			width: 150,
			cursor: "pointer",
			"&:active": {
				transform: `scale(0.9)`,
			},
		},
		txtBtn: {
			...CStyles.txt_btn,
			textAlign: "center",
			padding: `4px 16px`,
			fontSize: "1.2rem",
			textTransform: "inherit",
			fontWeight: "500",
		},
	};
});
