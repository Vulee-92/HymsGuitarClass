/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
  return {
    conBox: {
      // ...CStyles.shadow,
      // borderRadius: Configs.br,
      // backgroundColor: Colors.white,
      // padding: Configs.pH
      overflow: "auto",
    },
    conCell: {
      padding: Configs.pH,
      borderBottom: `1px solid rgba(224, 224, 224, 1)`,
      cursor: "pointer !important",
    },
    conCellSticky: {
      position: "sticky",
      left: 0,
      backgroundColor: Colors.white,
    },

    txtHeaderTable: {
      ...CStyles.txt_title_item,
      fontSize: 14,
      textTransform: "uppercase",
    },
    txtRowCell: {
      ...CStyles.txt_body_item,
    },
    confixed: {
      position: "sticky !important",
      left: 0,
      zIndex: 310,
    },
    conPaper: {
      boxShadow: "none",
    },
    tableRow: {
      backgroundColor: Colors.white,
    },
    conRowActive: {
      backgroundColor: `${Colors.secondary50} !important`,
      cursor: "pointer !important",
    },
  };
});
