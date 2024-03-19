/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets,Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
	return {
		// Class ZoomIn
		ZoomIn: {
			transition: "transform 0.3s ease",
			"&:hover": {
				transform: "scale(1.5)",
			},
		},

		// Class ZoomOut
		ZoomOut: {
			transition: "transform 0.3s ease",
			"&:hover": {
				transform: "scale(0.8)",
			},
		},
	};
});
