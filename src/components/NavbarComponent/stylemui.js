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
      color: "#6c7a87",
      fontSize: "15px",
      fontWeight: 400,
      margin: "0px",
      cursor: "pointer",
    },
    BoxTilte: {
      border: "1px solid #d6d6d4",
      margin: "0px",
      background: "#f4f4f2",
      borderTopLeftRadius: "3px",
      borderTopRightRadius: "3px",
      maxHeight: "10px",
    },
    MuiAccordionSummary: {
      margin: "0px",
    },
  };
});
