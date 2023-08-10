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
      fontSize: "25px",
      fontWeight: 700,
      paddingBottom: "10px",
      borderBottom: "3px solid #245c4f",
      marginLeft: "15px",
      marginRight: "15px",
      marginBottom: "15px",
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
  };
});
