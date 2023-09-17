/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets, Configs } from "../../configs";
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
			textAlign: "left",
			marginBottom: "5px"
    },
    txtTilte: {
      ...CStyles.txt_body_item,
      color: "#000",
      fontSize: "13px",
			fontWeight: 400,
			lineHeight: 1.5
		},
		WrapperLeft: {
			  width: '100%'
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
    txtTilteBank: {
      ...CStyles.txt_body_item,
      color: "#000",
      fontSize: "15px",
      fontWeight: 400,
      marginLeft: "15px",
		},
		   txtTilteBankMobile: {
      ...CStyles.txt_body_item,
      color: "#000",
      fontSize: "15px",
				 fontWeight: 400,
			padding: "20px"
    },
    txtOrder: {
      ...CStyles.txt_body_item,
      color: "#245c4f",
      fontSize: "25px",
      fontWeight: 700,
      paddingBottom: "10px",
      borderBottom: "3px solid #245c4f",
      marginLeft: "15px",
      marginRight: "15px",
      marginBottom: "15px",
      textAlign: "center",
		},
			txtValueTotal: {
			...CStyles.txt_body_item,
			color: "rgb(36, 36, 36)",
			fontSize: "14px",
				fontWeight: 500,
			marginBottom: "10px",
			alignItems: "center",
			maxHeight: "40px",
			overflow: "hidden",
		},
		boxTotal: {
				  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
			alignItems: 'center',
	marginBottom:"20px"
			}
  };
});
