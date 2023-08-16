/** LIBRARY */
import { makeStyles } from "@mui/styles";
// import { Assets, Configs } from "../configs";
import { Assets, Configs } from "../../../configs";
import { Colors } from "../../../utils/colors";
import CStyles from "../../../utils/common";

export default makeStyles(() => {
  return {
    container: {
      ...CStyles.center,
      height: "70vh",
      backgroundImage: `url(${Assets.bgHome})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      padding: Configs.pH,
      display: "fixed",
    },
    txtHeaderTitle: {
      ...CStyles.txt_header_title,
      fontSize: 18,
      textAlign: "left",
      fontWeight: 600,
      color: "#0b2238",
    },
    txtPrice: {
      ...CStyles.txt_body_item,
      fontSize: 16,
      textAlign: "right",
      fontWeight: 600,
      color: "#0b2238",
    },
  };
});
