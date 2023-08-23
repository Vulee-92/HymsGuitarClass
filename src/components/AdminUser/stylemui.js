/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
  return {
    container: {
      padding: `24px`,
      ...CStyles.container,
    },
    conBox: {
      ...CStyles.shadow,
      backgroundColor: Colors.white,
      borderRadius: Configs.br,
      padding: Configs.pH,
    },
    con: {
      ...CStyles.con,
      ...CStyles.center,
      padding: `0px 24px`,
    },
    conContainer: {
      ...CStyles.col,
      height: 500,
    },
    conDetail: {
      marginTop: 8,
    },
    conDetailRow: {
      ...CStyles.rowAliCenJusBet,
      marginTop: 16,
    },
    conDetailItem: {
      ...CStyles.col,
      ...CStyles.cen,
      ...CStyles.con,
    },
    conAddUser: {
      ...CStyles.rowSpaBet,
    },
    conButtonOnlineClass: {
      marginTop: `0px !important`,
      backgroundColor: Colors.white,
      borderRadius: 24,
      marginRight: 10,
      height: `40px !important`,
      padding: `22px 15px`,
      border: `1px solid ${Colors.primary}`,
      "&:hover": {
        borderColor: Colors.primary,
        backgroundColor: Colors.primary,
        "& p": {
          color: Colors.white,
        },
        "& svg": {
          color: Colors.white,
        },
      },
    },
    conButtonSearch: {
      marginTop: `10px !important`,
      borderRadius: 24,
      margin: `10px 10px`,
      height: `40px !important`,
      border: `1px solid ${Colors.placeHolder} !important`,
      boxShadow: `none`,
    },
    conCellActivity: {
      ...CStyles.row,
      ...CStyles.center,
      minWidth: "150px",
      "&:last-child tr": {
        cursor: "pointer !important",
        "&:active": {
          backgroundColor: Colors.primary,
        },
      },
    },
    conItemStudentOverview: {
      ...CStyles.rowAliCenJusBet,
      borderBottom: `.5px solid ${Colors.placeHolder}`,
      padding: `16px 0px`,
    },
    txtTitleDetail: {
      ...CStyles.txt_title_item,
      textAlign: "left",
      fontSize: 16,
      paddingTop: 10,
      paddingLeft: 3,
    },
    txtTitleBlock: {
      ...CStyles.txt_header_title,
      fontSize: 28,
      padding: `${Configs.pH}px 0px`,
      marginLeft: 14,
    },
    conInput: {
      boxShadow: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px`,
      ...CStyles.txt_body_item,
      display: "flex",
      alignItems: "center",
      width: "100%",
      fontWeight: `${CStyles.fBold} !important`,
      marginTop: "8px !important",
      backgroundColor: "rgba(210, 210, 210, 0.2) !important",
      borderRadius: "8px !important",
      border: "none",
      height: "5vh !important",
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
        height: "5.3vh",
        border: `2px solid ${Colors.primary}`,
        borderRadius: 8,
        transition: "none",
      },
      "@media (max-width: 740px)": {
        height: "40px !important",
        "&:after": {
          height: "40px !important",
          border: `2px solid ${Colors.primary}`,
          borderRadius: 8,
          transition: "none",
        },
      },
      "@media (max-height: 690px)": {
        height: "40px !important",
        "&:after": {
          height: "40px !important",
          border: `2px solid ${Colors.primary}`,
          borderRadius: 8,
          transition: "none",
        },
      },
    },
    conInputDisabled: {
      boxShadow: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px`,
      ...CStyles.txt_body_item,
      display: "flex",
      alignItems: "center",
      color: "#C9BF9B",
      width: "100%",
      fontWeight: `${CStyles.fBold} !important`,
      marginTop: "8px !important",
      backgroundColor: "rgba(210, 210, 210, 0.2) !important",
      borderRadius: "8px !important",
      border: "none",
      height: "5vh !important",
      padding: `0px 16px`,
      pointerEvents: "none",
      "&:before": {
        content: "none",
      },
      "@media (max-width: 740px)": {
        height: "40px !important",
      },
      "@media (max-height: 690px)": {
        height: "40px !important",
        "&:after": {
          height: "40px !important",
          border: `2px solid ${Colors.primary}`,
          borderRadius: 8,
          transition: "none",
        },
      },
    },
    conAvatar: {
      ...CStyles.colJusCen,
      alignItems: "center",
    },
    iconAvatar: {
      height: 200,
      width: 200,
      borderRadius: "50%",
      backgroundColor: Colors.primary,
    },
    imageAvatar: {
      position: "relative",
      "&:hover": {
        "& $conImgAvatarOverlay": {
          display: "block",
        },
      },
      "@media (max-width: 550px)": {
        width: "25vh",
        height: "25vh",
      },
    },
    conImgAvatar: {
      width: "15vw",
      height: "15vw",
      borderRadius: "50%",
      border: `2px solid rgb(255, 211, 64)`,
      backgroundColor: Colors.white,
      objectFit: "cover",
      "@media (max-width: 550px)": {
        width: "25vh",
        height: "25vh",
      },
    },
    txtBtnAdd: {
      ...CStyles.txt_btn,
      textTransform: "none",
      color: Colors.primary,
      marginLeft: Configs.pH,
    },
    conImgAvatarOverlay: {
      ...CStyles.center,
      position: "absolute",
      top: 0,
      left: 0,
      width: "15vw",
      height: "15vw",
      borderRadius: "50%",
      backgroundColor: "rgba(0,0,0,.3)",
      display: "none",
      cursor: "pointer",
      "@media (max-width: 550px)": {
        width: "25vh",
        height: "25vh",
      },
    },
    conIconPen: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    iconAvatarThumnail: {
      height: 40,
      width: 40,
      borderRadius: "50%",
      backgroundColor: Colors.primary,
    },
    txtNameTeacher: {
      ...CStyles.txt_title_item,
      cursor: "pointer",
      minWidth: "150px",
    },
    iconAvatarThumnailTable: {
      height: 40,
      width: 40,
      borderRadius: "50%",
      backgroundColor: Colors.primary,
      marginRight: 10,
      cursor: "pointer",
    },
    txtDetailTeacher: {
      ...CStyles.txt_header_title,
      fontSize: 28,
      padding: `${Configs.pH}px 0px`,
    },
    txtDetailTeacherNumberId: {
      ...CStyles.txt_meta_item,
      fontSize: 18,
      padding: `${Configs.pH}px 0px`,
    },
    conFooterSelectedResource: {
      ...CStyles.rowAliCen,
      ...CStyles.rowJusEnd,
    },
    conCopySuccess: {
      ...CStyles.rowAliCen,
      ...CStyles.rowJusEnd,
      marginRight: Configs.pH,
      marginTop: Configs.pH,
      flex: 1,
    },
    conBtnSave: {
      height: "5vh !important",
      backgroundColor: " rgb(247, 163, 30)",
      marginTop: "16px",
      paddingLeft: "16px",
      borderRadius: "8px",
      paddingRight: "16px",
      "@media (max-width: 740px)": {
        height: "40px !important",
      },
    },
    txtSuccess: {
      ...CStyles.txt_success,
      marginLeft: -8,
    },
    dataTable: {
      "&:last-child tr": {
        cursor: "pointer !important",
      },
    },
  };
});
