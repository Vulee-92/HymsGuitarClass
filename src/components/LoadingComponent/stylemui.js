/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets, Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
  return {
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
