/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets,Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
	return {
		txtTitleBox: {
			fontSize: "2rem",
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
		nameProduct: {
			...CStyles.txt_header_title,
			textAlign: "center",
			fontWeight: 500,
			color: "#231e18",
			fontSize: "1.2rem",
			margin: "0 auto",
			overflow: "hidden",
			overflowWrap: "break-word",
			wordWrap: "break-word",
			paddingBottom: "30px",
			marginTop: "30px",
			cursor: 'pointers'
		},
		conCard: {
			borderBottom: "0px",
			padding: 15,
			width: "80%",
			margin: "0 auto",
			borderTop: "2px solid #454F5B",
			borderRadius: "9px",
			boxShadow: "0px .8px .8px 0px rgba(0,0,0,0.11)",
			"&:hover": {
				boxShadow: "0px 18px 28px rgba(0,0,0,0.15),0px 0px 1px rgba(0,0,0,0.31)",
				transition: "boxShadow 0.3s ease -in -out 0s"
			},

		},

	};
});
