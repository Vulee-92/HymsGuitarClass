/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets, Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
  return {
    text: {
      fontSize: 50,
      backgroundSize: "5em",
      pointerEvents: "none",
      opacity: 1,
      zIndex: 100000,
      textAlign: "center",
      top: 0,
      left: 0,
      display: "flex",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      animation: "loaderAnim 1s linear infinite alternate forwards",
    },
    loading: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    textLoading: {
      ...CStyles.txt_body_item,
      color: "#000",
      fontSize: "40px",
      fontWeight: 300,
      textTransform: "capitalize",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },

    spinner: {
      animation: "$blink-animation 1s infinite",
    },
    "@keyframes blink-animation": {
      "0%": {
        opacity: 1,
      },
      "50%": {
        opacity: 0.5,
      },
      "100%": {
        opacity: 1,
      },
    },
  };
});
