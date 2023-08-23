/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets, Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
  return {
    container: {
      ...CStyles.center,
      height: "40vh",
      backgroundImage: `url(${Assets.bgSheet})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      padding: Configs.pH,
      display: "fixed",
    },
    txtHeaderTitle: {
      ...CStyles.txt_header_title,
      // color: Colors.da,
      fontSize: 32,
      marginTop: "20px",
      textAlign: "left",
      fontWeight: 600,
      color: "#0b2238",
      paddingBottom: "10px",
      borderBottom: "1px solid #0b2238",
      width: "60px",
    },
    txtHeaderTitleContact: {
      ...CStyles.txt_header_title,
      position: "absolute",
      fontSize: 50,
      fontWeight: 600,
      color: "#fff",
      top: "50%",
      left: "33.3%",
      transform: "translate(-50%, -50%)",
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
    },
  };
});
