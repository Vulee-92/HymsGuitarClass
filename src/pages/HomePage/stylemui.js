/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets, Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

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
    conContent: {
      ...CStyles.rowJusCen,
    },
    conCard: {
      maxWidth: 300,
      margin: "auto",
      padding: "0px !important",
      backgroundColor: Colors.white,
      borderRadius: Configs.br,
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 4px",
    },
    conTextCreate: {
      maxWidth: 720,
      margin: "auto",
      padding: "0px !important",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 4px",
      color: Colors.white,
      fontSize: 32,
      textAlign: "center",
      fontWeight: 600,
    },
    conLogin: {
      padding: 32,
      borderRadius: Configs.br,
      height: "80%",
    },

    conForm: {
      marginBottom: 24,
    },

    conItemInput: {
      marginTop: 20,
    },
    txtTilte: {
      ...CStyles.txt_body_item,
      color: "#6c7a87",
      marginTop: "1.45rem",
      fontSize: "15px",
      fontWeight: 400,
      marginBottom: "30px",
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
      height: "50px !important",
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
      fontSize: 32,
      marginTop: 90,
      textAlign: "center",
      fontWeight: 600,
      color: "#0b2238",
    },
    txtDesTitle: {
      ...CStyles.txt_body_item,
      textAlign: "center",
      marginTop: Configs.pH,
    },
    txtDesTitleSignUp: {
      color: "#6c7a87",
      fontSize: "1rem",
      fontWeight: "400",
      marginTop: 10,
      marginBottom: "1.25rem",
      maxWidth: 720,
      margin: "auto",
      padding: "0px !important",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 4px",
      textAlign: "center",
    },
    txtDesTitleSignUpLight: {
      color: " #ffffff !important",
      fontSize: "1rem",
      fontWeight: "400",
      marginBottom: "1.25rem",
      maxWidth: 720,
      margin: "auto",
      padding: "0px !important",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 4px",
      textAlign: "center",
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
    ButtonAllPost: {
      "&:hover": {
        backgroundColor: "#ffffff",
        boxShadow: "none",
      },
      "&:active": {
        boxShadow: "none",
        backgroundColor: "#3c52b2",
      },
      "&:before": {
        content: "",
        position: "absolute",
        zIndex: "-1",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        background: "#0b2238",
        transform: "scaleY(0)",
        transformOrigin: "50% 100%",
        transitionProperty: "transform",
        transitionDuration: "0.25s",
        transitionTimingFunction: "cubic-bezier(0.65, 0.05, 0.36, 1)",
      },
      crypto_section: {
        borderBottom: "0px",
        borderTop: "2px solid #000000",
        borderRadius: "9px",
      },
      bg_section: {
        background: "#fff",
        border: "rgb(224, 223, 219)",
      },
    },
  };
});
