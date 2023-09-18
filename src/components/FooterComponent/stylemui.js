/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets, Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
  return {
    container: {
      maxWidth: " 1140px",
    },
    priceTitle: {
      ...CStyles.txt_title_item,
      color: "#45cc8f",
      textAlign: "right",
    },
    nameProduct: {
      ...CStyles.txt_title_item,
    },
    footer: {
      paddingTop: "5rem",
      paddingBottom: "4rem",
    },
    txtTilte: {
      ...CStyles.txt_body_item,
      color: "#6c7a87",
      marginTop: "1.45rem",
      fontSize: "13px",
      fontWeight: 400,
			marginBottom: 0,
			cursor: "pointer",
    },
    inputEmail: {
      ...CStyles.txt_body_item,
      marginTop: "1.45rem",
      boxShadow: "none",
      padding: 0,
    },
    inputEmailBase: {
      ...CStyles.txt_body_item,
      border: "1px solid #edeef1",
      height: "40px",
      borderRadius: "10px",
      fontSize: "11px",
      margin: 0,
      paddingLeft: "10px",
    },
    txtCopyRight: {
      ...CStyles.txt_body_item,
      fontSize: "13px",
      paddingTop: "4rem",
      color: "#6c7a87",
    },
    txtCopyRightLink: {
      textDecoration: "none",
    },
    customSendEmail: {
      backgroundColor: "#245c4f",
      height: "40px",
      width: "40px",
      marginLeft: "10px",
      marginRight: "10px",
      fontSize: "20px",
      color: "#fff",
      border: "1px solid #edeef1",
      borderRadius: "10px",
    },
  };
});
