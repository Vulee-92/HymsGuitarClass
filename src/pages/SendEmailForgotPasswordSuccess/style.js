/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets,Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
	return {
		container: {
			...CStyles.center,
			backgroundImage: `url(${Assets.bgHome})`,

			marginTop: "40px",
			height: "50vh",
			width: "100%",
			// backgroundImage: `url(${Assets.bgHome1})`,
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat",
			padding: Configs.pH,

			maxHeight: "100%",
			'@media (max-width: 767px)': {
				backgroundImage: `url(${Assets.bgHome})`,
				width: "100vw",
			},
			'@media (min-width: 768px) and (max-width: 1509px)': {
				backgroundImage: `url(${Assets.bgHome})`,
				width: "100vw",
			},
			'@media (min-width: 1510px)': {
				backgroundImage: `url(${Assets.bgHome})`,
				width: "100vw",
			},
		},
		conContent: {
			...CStyles.rowJusCen,
			padding: Configs.pH,
		},
		conCard: {
			maxWidth: 600,
			margin: "auto",
			padding: "0px !important",
			backgroundColor: "#fff",
			borderRadius: Configs.br,
			boxShadow: "0px 50px 70px -10px rgba(11, 34, 56, 0.05) !important",
			WebkitBoxShadow: "0px 50px 70px -10px rgba(11, 34, 56, 0.05) !important",
			MozBoxShadow: "0px 50px 70px -10px rgba(11, 34, 56, 0.05) !important",
			OBoxShadow: "0px 50px 70px -10px rgba(11, 34, 56, 0.05) !important",
			MsBoxShadow: "0px 50px 70px -10px rgba(11, 34, 56, 0.05) !important",
		},

		conLogin: {
			padding: 32,
			borderRadius: Configs.br,
			height: "100%",
		},

		conForm: {
			marginBottom: 24,
		},

		conItemInput: {
			marginTop: 20,
		},




		txtHeaderTitle: {
			...CStyles.txt_header_title,
			// color: Colors.da,
			fontSize: 32,
			textAlign: "center",
			fontWeight: 500,
			color: "#0b2238",
		},
		txtDesTitle: {
			...CStyles.txt_title_item,
			textAlign: "center",
			fontWeight: 400,
			lineHeight: 1.5,
			marginTop: Configs.pH,
			color: "#0b2238",
			fontSize: "1.2rem",
		},


	};
});
