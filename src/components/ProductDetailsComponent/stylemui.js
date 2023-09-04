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
      marginTop: "0.4rem",
      fontSize: "15px",
      fontWeight: 400,
      // marginBottom: "30px",
    },
  };
});
