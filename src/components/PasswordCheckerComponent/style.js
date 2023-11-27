/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets,Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
	return {
		txtStrongPassword: {
			...CStyles.txt_body_item,
			textAlign: "left",
			fontWeight: 400,
			marginBottom: 10
		},

	};
});
