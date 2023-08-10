/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets, Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
  return {
    container: {
      ...CStyles.center,
      height: "100vh",
      backgroundImage: `url(${Assets.bgLogin})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      overflowY: "auto",
      padding: Configs.pH,
    },
    conContent: {
      ...CStyles.rowJusCen,
    },

    conLogin: {
      padding: 32,
      borderRadius: Configs.br,
      height: "100%",
    },

    conForm: {
      marginBottom: 24,
    },

    conItemInput: {
      marginTop: 20,
    },

    conInput: {
      ...CStyles.txt_body_item,
      display: "flex",
      alignItems: "center",
      fontWeight: `${CStyles.fBold} !important`,
      marginTop: "8px !important",
      backgroundColor: "rgba(210, 210, 210, 0.2) !important",
      borderRadius: "8px !important",
      border: "none",
      height: "54px !important",
      padding: `0px 16px`,
      "& input": {
        flex: 1,
        "&::placeholder": {
          color: Colors.placeHolder,
          opacity: 1,
          "-webkit-text-fill-color": Colors.placeHolder,
        },
        "-webkit-text-fill-color": `${Colors.text} !important`,
      },
      "& $Mui-disabled": {
        opacity: 0,
      },
      "&:before": {
        content: "none",
      },
      "&:after": {
        height: 54,
        border: `2px solid ${Colors.primary}`,
        borderRadius: 8,
        transition: "none",
      },
    },
    conIconInput: {
      paddingRight: 8,
    },
    conIconInputRight: {
      paddingLeft: Configs.pH,
      cursor: "pointer",
    },
    conMsg: {
      ...CStyles.rowSpaBet,
    },
    conTitleLoginMethod: {
      ...CStyles.rowAliCen,
      ...CStyles.rowJusCen,
      margin: `32px 0px`,
    },
    conLine: {
      width: 48,
      height: 1,
      backgroundColor: Colors.text,
    },
    conBtnGoogle: {
      ...CStyles.center,
      backgroundColor: Colors.white,
      borderRadius: 8,
      marginTop: Configs.pH,
      height: 48,
      border: `1px solid ${Colors.placeHolder}`,
      "&:hover": {
        backgroundColor: Colors.white,
      },
    },
    conLanguage: {
      ...CStyles.center,
      marginTop: 8,
    },
    conLanguageItem: {
      width: 40,
      objectFit: "contain",
      margin: `0px 8px`,
      cursor: "pointer",
    },

    imgLogo: {
      ...CStyles.center,
      margin: `16px auto`,
      width: "15rem",
    },
    imgLogoGoogle: {
      width: 32,
      height: 32,
      objectFit: "contain",
      marginRight: 16,
    },

    txtBtnGoogle: {
      ...CStyles.txt_btn,
      textTransform: "none",
      color: Colors.text,
    },
    txtHeaderTitle: {
      ...CStyles.txt_header_title,
      color: Colors.primary,
      fontSize: 32,
      textAlign: "center",
    },
    txtDesTitle: {
      ...CStyles.txt_body_item,
      textAlign: "center",
      marginTop: Configs.pH,
    },
    txtTitleInput: {
      ...CStyles.txt_title_item,
    },
    txtError: {
      ...CStyles.txt_error,
    },
    txtForgot: {
      ...CStyles.txt_body_item,
      color: Colors.primary,
      cursor: "pointer",
    },
    txtTitleLoginMethod: {
      ...CStyles.txt_body_item,
      margin: `0px ${Configs.pH}px`,
    },
    txtRegister: {
      ...CStyles.txt_body_item,
      textAlign: "center",
      marginTop: 48,
    },
    txtBtnRegister: {
      ...CStyles.txt_body_item,
      fontWeight: CStyles.fBold,
      cursor: "pointer",
    },
    btnLoginHeader: {
      ...CStyles.btn_login,
      // fontWeight: CStyles.fBold,
      marginTop: "0px",
      backgroundColor: Colors.bgLogin,
      cursor: "pointer",
      textTransform: "capitalize",
    },
    btnLoginSuccess: {
      ...CStyles.btn_login,
      // fontWeight: CStyles.fBold,
      marginTop: "0px",
      backgroundColor: "none",
      cursor: "pointer",
      textTransform: "capitalize",
      margin: "3px",
    },
    imgAvatar: {
      height: "25x",
      width: "25px",
      maxHeight: "30px",
      borderRadius: "50%",
      margin: "3px",
    },
    headerContainer: {
      background: "rgba(255, 255, 255, 0.8)",
    },
    containerMaxWidth: {
      maxWidth: "960px",
    },

    colorChangeDark: {
      // background: "#000",
      // backdropFilter: "saturate(1) blur(20px) !important",
      // borderBottom: "1px solid #edeef1",
      // width: "100%",
      // zIndex: 1000,
      // transition: " all .5s ease-in-out",
      display: "fixed",
      background: "rgba(255, 255, 255, 0.8)",
      height: "80px",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1rem",
      position: "fixed",
      backdropFilter: "saturate(1) blur(20px) !important",
      color: "#000",
      transition: "height 2s,",
      top: 0,

      // @media screen and (max-width: 960px) {
      //   transition: 0.8s all ease,
      // }
    },
    txtLight: {
      color: "#fff",
      textTransform: "capitalize",
      paddingRight: 0,
      marginRight: "0",
      display: { xs: "none", md: "flex" },
      fontFamily: "monospace",
      fontWeight: 700,
      letterSpacing: ".3rem",
      textDecoration: "none",
      fontSize: "1rem",
    },
    txtDark: {
      color: "#000",
      textTransform: "capitalize",
      paddingRight: 0,
      marginRight: "0",
      display: { xs: "none", md: "flex" },
      fontFamily: "monospace",
      fontWeight: 700,
      letterSpacing: ".3rem",
      textDecoration: "none",
      fontSize: "1rem",
    },
    btnShopping: {
      content: "",
      display: "block",
      height: "20px",
      position: "absolute",
      left: "-12px",
      border: "1px solid rgb(235, 235, 240)",
    },
    colorChangeLight: {
      // background: "rgba(255, 255, 255, 0.8)",
      // backdropFilter: "saturate(1) blur(20px) !important",
      // borderBottom: "1px solid #edeef1",
      // width: "100%",
      // backgroundColor: "transparent",
      // zIndex: 1000,
      // transition: " all .5s ease-in-out",
      // position: "relative",
      // display: "fixed",
      height: "80px",
      display: "fixed",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      background: "#000",
      fontSize: "1rem",
      position: "fixed",
      transition: "height 2s",
      top: 0,
    },
    hymnsName: {
      ...CStyles.txt_title_item,
      fontSize: "2rem",
    },
    txtTilteLight: {
      ...CStyles.txt_body_item,
      color: "#fff",
      fontSize: "16px",
      fontWeight: 400,
      marginBottom: 0,
    },
    txtTilteDark: {
      ...CStyles.txt_body_item,
      color: "#000",
      fontSize: "16px",
      fontWeight: 400,
      marginBottom: 0,
    },
    txtInfoUser: {
      ...CStyles.txt_body_item,
      color: "#000",
      fontSize: "13px",
      fontWeight: 700,
      paddingBottom: "10px",
      borderBottom: "1px solid #000",
      marginLeft: "15px",
      marginRight: "15px",
      marginBottom: "15px",
      textAlign: "center",
    },
    txtTilteInfo: {
      ...CStyles.txt_title_item,
      color: "#000",
      fontSize: "13px",
      fontWeight: 400,
      marginBottom: 0,
    },
  };
});
