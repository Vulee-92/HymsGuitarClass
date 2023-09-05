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
      alignItems: "center",
      display: "flex",
    },
    txtTilte: {
      ...CStyles.txt_body_item,
      color: "#434c55",
      fontSize: "17px",
      fontWeight: 400,
      lineHeight: 1.7,
      textAlign: "left",
      fontSmooth: "antialiased !important",
      // marginBottom: "30px",
    },
    myGrid: {
      textAlign: "center",
      display: "flex",
      flexDirection: "column-reverse !important",
    },
    sliderWrapper: {
      position: "relative",
    },
    buttontoi: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: "50%",
      right: "10px",
      transform: "translateY(-50%)",
      height: "50px",
      width: "50px",
      color: "#fff",
      fontSize: "20px",
      backgroundColor: "#245c4f",
      borderRadius: "50%",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
      zIndex: 100000,
      cursor: "pointer",
    },
    samplePrevArrow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: "50%",
      left: "10px",
      color: "#fff",
      fontSize: "20px",
      transform: "translateY(-50%)",
      height: "50px",
      width: "50px",
      backgroundColor: "#245c4f",
      borderRadius: "50%",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
      zIndex: 100000,
      cursor: "pointer",
    },
    arrowIcon: {
      color: "#333333",
      fontSize: "20px",
    },
    txtTitleBox: {
      ...CStyles.txt_title_item,
      fontSize: "22px",
      fontWeight: 700,
      lineHeight: 1.3,
      position: "relative",
      textAlign: "left",
      zIndex: 10,
      marginTop: "100px",
      textTransform: "uppercase",
      margin: 0,
      pointerEvents: "none",

      "@media (max-width: 550px)": {
        fontSize: ".9rem",
        marginTop: "50px",
        textAlign: "center",
      },
    },
  };
});
