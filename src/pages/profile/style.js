/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets, Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
  return {
    conModal: {
      ...CStyles.shadow,
      top: "50%",
      left: "50%",
      // transform: "translate(-50%, -50%)",
      background: `url(${Assets.bgProfile}) center`,
      backgroundSize: "cover",
      padding: `24px 0px`,
      borderRadius: 16,
      minWidth: 600,
      width: "100%",
      height: "100%",
      marginBottom: "5%",
      marginTop: "5%",
    },
    conHeader: {
      ...CStyles.center,
      ...CStyles.con,
    },
    conAvatar: {
      position: "relative",
      "&:hover": {
        "& $conImgAvatarOverlay": {
          display: "block",
        },
      },
    },
    conImgAvatar: {
      width: 120,
      height: 120,
      borderRadius: "50%",
      border: `1px solid ${Colors.white}`,
      backgroundColor: Colors.white,
      objectFit: "cover",
    },
    conImgAvatarOverlay: {
      ...CStyles.center,
      position: "absolute",
      top: 0,
      left: 0,
      width: 120,
      height: 120,
      borderRadius: "50%",
      backgroundColor: "rgba(0,0,0,.3)",
      display: "none",
      cursor: "pointer",
    },
    conIconPen: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    conContent: {
      marginTop: 32,
      padding: `0px 64px`,
    },
    conInput: {
      ...CStyles.rowAliCen,
      ...CStyles.txt_title_item,
      backgroundColor: Colors.secondary,
      borderRadius: 8,
      marginTop: 8,
      height: 48,
      padding: `0px 16px`,
      boxShadow: `#F8EEC3 0px -2px`,
      caretColor: Colors.text,
      color: "#2E72D6",
      "& input": {
        "&::placeholder": {
          color: "#C79047",
          opacity: 1,
          "-webkit-text-fill-color": "#C79047",
        },
        "-webkit-text-fill-color": "#2E72D6 !important",
      },
      "& $Mui-disabled": {
        opacity: 1,
      },
      "&:before": {
        content: "none",
      },
      "&:after": {
        height: 51,
        border: `1px solid #F1AB1E`,
        borderRadius: 8,
        transition: "none",
      },
    },
    conIconInputRight: {
      paddingLeft: 16,
      cursor: "pointer",
    },
    conFooter: {
      marginTop: 32,
      borderTop: `0.5px solid ${Colors.placeHolder}`,
      paddingTop: 24,
    },
    conBtn: {
      ...CStyles.center,
      borderRadius: 12,
      backgroundColor: "#18B0F4",
      boxShadow: "#2EA4E8 0px 2px",
      width: 150,
      cursor: "pointer",
      "&:active": {
        transform: `scale(0.9)`,
      },
      "&:hover": {
        backgroundColor: "#33C0FF",
        boxShadow: "#3AADEF 0px 2px",
      },
    },

    imgHeaderIcon: {
      width: 28,
      height: 28,
      objectFit: "contain",
      position: "absolute",
      top: 24,
      right: 24,
      cursor: "pointer",
      "&:active": {
        transform: `scale(0.9)`,
      },
    },

    txtStudentName: {
      ...CStyles.txt_header_title,
      textAlign: "center",
      color: Colors.black,
    },
    txtTitleInput: {
      ...CStyles.txt_title_item,
      color: Colors.placeHolder,
    },
    conInputUnfixable: {
      ...CStyles.rowAliCen,
      ...CStyles.txt_title_item,
      backgroundColor: Colors.secondary,
      borderRadius: 8,
      marginTop: 8,
      height: 48,
      padding: `0px 16px`,
      boxShadow: `#F8EEC3 0px -2px`,
      caretColor: Colors.text,
      color: "#C9BF9B",
      "& input": {
        "&::placeholder": {
          color: "#C79047",
          opacity: 1,
          "-webkit-text-fill-color": "#C79047",
        },
        "-webkit-text-fill-color": "#C9BF9B !important",
      },
      "& $Mui-disabled": {
        opacity: 1,
      },
      "&:before": {
        content: "none",
      },
      "&:after": {
        height: 51,
        borderRadius: 8,
        transition: "none",
      },
    },
    txtUserId: {
      ...CStyles.txt_body_item,
      color: Colors.placeHolder,
      textAlign: "right",
      fontWeight: CStyles.fMedium,
    },
    txtBtn: {
      ...CStyles.txt_btn,
      textAlign: "center",
      padding: `4px 16px`,
      fontSize: 20,
    },
    txtMsg: {
      ...CStyles.txt_title_item,
      marginTop: 16,
    },
    uploadFile: {
      "& .ant-upload.ant-upload-select.ant-upload-select-picture-card": {
        width: "60px",
        height: "60px",
        borderRadius: "50%",
      },
      "& .ant-upload-list-item-container": {
        display: "none",
      },
    },
  };
});
