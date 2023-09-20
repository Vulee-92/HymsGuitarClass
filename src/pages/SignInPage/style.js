/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets, Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
  return {
    container: {
      ...CStyles.center,
      height: "800px",
      backgroundImage: `url(${Assets.bgLogin})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      overflowY: "auto",
      padding: Configs.pH,
    },
    conContent: {
			...CStyles.rowJusCen,
			 padding: Configs.pH,
    },
    conCard: {
      maxWidth: 720,
      margin: "auto",
      padding: "0px !important",
      backgroundColor: Colors.adminMeetingColor,
      borderRadius: Configs.br,
      boxShadow: "rgba(0, 0, 0, .5) 0px 1px 2px",
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
      // color: Colors.da,
      fontSize: 32,
      textAlign: "center",
      fontWeight: 600,
      color: "#0b2238",
    },
    txtDesTitle: {
      ...CStyles.txt_title_item,
			textAlign: "center",
			fontWeight: 500,
      marginTop: Configs.pH,
      color: Colors.bgLogin,
      fontSize: 18,
      cursor: "pointer",
    },
    txtTitleInput: {
			...CStyles.txt_title_item,
				fontWeight: 500,
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
  };
});
