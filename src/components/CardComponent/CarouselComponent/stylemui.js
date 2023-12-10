/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets,Configs } from "../../../configs";
import { Colors } from "../../../utils/colors";
import CStyles from "../../../utils/common";

export default makeStyles(() => {
	return {

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

	};
});
