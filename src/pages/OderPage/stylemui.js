/** LIBRARY */
import {makeStyles} from "@mui/styles";
import {Assets, Configs} from "../../configs";
import {Colors} from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
	return {
		container: {
			maxWidth: " 1140px",
		},
		    nameProduct: {
					...CStyles.txt_title_item,
							marginTop: "10px",
    },
		priceTitle: {
			...CStyles.txt_title_item,
			color: "#45cc8f",
			textAlign: "right",
		},
			txtValueTotal: {
			...CStyles.txt_body_item,
			color: "rgb(36, 36, 36)",
			fontSize: "14px",
				fontWeight: 400,
							lineHeight: 1.5,
			marginBottom: "10px",
			alignItems: "center",
			overflow: "hidden",
		},
		footer: {
			paddingTop: "10rem",
			paddingBottom: "4rem",
		},
		txtTilte: {
			...CStyles.txt_body_item,
			color: "#6c7a87",
			marginTop: "1.45rem",
			fontSize: "13px",
			fontWeight: 400,
			marginBottom: 0,
		},
		  txtOrder: {
      ...CStyles.txt_body_item,
      color: "#245c4f",
      fontSize: "18px",
      fontWeight: 700,
      paddingBottom: "10px",
      borderBottom: "3px solid #245c4f",
      marginLeft: "15px",
      marginRight: "15px",
      marginBottom: "15px",
      textAlign: "center",
		},
		nameProduct: {
			...CStyles.txt_title_item,
			alignItems: "center",
			display: "flex",
					marginTop: "10px",
		},
		updateInfo: {
		...CStyles.txt_title_item,
						lineHeight: 1.3,
				fontSize: "13px",
						fontWeight: 400,
		},
			nameProductCard: {
			...CStyles.txt_title_item,
			alignItems: "center",
				display: "flex",
						lineHeight: 1.5,
				overflow: "hidden",
				alignItems: " flex-start",
				textOverflow: "ellipsis",
				whiteSpace: "break-spaces",
				fontSize: "13px",
				marginBottom: "10px",
						fontWeight: 500,
		},
		btnAddCard: {
			...CStyles.txt_title_item,
				background: "#245c4f",
											height: "44px",
								width: "120px",
											border: "none",
											borderRadius: "4px",

											color: "#fff",
											fontSize: "10px",
											fontWeight: "600",
			textTransform: "capitalize",
												"&:hover": {
							background: "#245c4f",
											}
			},
		InfoHomeUser: {
					...CStyles.txt_title_item,
						lineHeight: 1.6,
				overflow: "hidden",
				alignItems: " flex-start",
				textOverflow: "ellipsis",
				whiteSpace: "break-spaces",
				fontSize: "13px",
				marginBottom: "7px",
						fontWeight: 400,
			},
		nameAllProduct: {
					alignItems: "center",
			display: "flex",
			marginLeft: "10px",
					...CStyles.txt_body_item,
			color: "rgb(36, 36, 36)",
			fontSize: "14px",
				fontWeight: 500,
							lineHeight: 1.5,
			alignItems: "center",
			overflow: "hidden",
		},
		BoxnameAllProduct: {
	display: "flex",
			textAlign: "center",

		},
	
		customSendEmail: {
			backgroundColor: "#245c4f",
			height: "40px",
			width: "40px",
			marginLeft: "10px",
			fontSize: "20px",
			color: "#fff",
			border: "1px solid #edeef1",
			borderRadius: "10px",
		},
		nameInfoUser: {
			...CStyles.txt_body_item,
			color: "rgb(36, 36, 36)",
			fontSize: "14px",
			fontWeight: 500,
			alignItems: "center",
			// margin: 0px 0px 10px,
			maxHeight: "40px",
			overflow: "hidden",
		},
		InfoUserForDesktop: {
			background: "#fff",
			borderTopRightRadius: "6px",
			borderTopLeftRadius: "6px",
			width: "100%",
			padding: "11px 16px",
		},
		txtNameTable: {
			color: 'rgb(36, 36, 36)',
  fontWeight: 400,
			fontSize: '13px',
			marginBottom: "10px",
		}
	};
});
