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
    },
    txtTilte: {
      ...CStyles.txt_body_item,
      color: "#000",
      fontSize: "15px",
      fontWeight: 400,
    },
    txtTilteBank: {
      ...CStyles.txt_body_item,
      color: "#000",
      fontSize: "15px",
      fontWeight: 400,
      marginLeft: "15px",
      marginBottom: "20px",
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
  };
});
