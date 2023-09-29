/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets, Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
  return {
    container: {
      maxWidth: " 1140px",
    },
    priceTitle: {
      ...CStyles.txt_title_item,
      color: "#45cc8f",
      textAlign: "right",
    },
    nameProduct: {
			...CStyles.txt_title_item,
			color: "#e9e6e0",
			fontSize: 18,
			fontWeight: 700,
			marginBottom: 10,
			textTransform: "uppercase",
			borderBottom: "1px solid #e9e6e0",
			width: "100%",
			   paddingBottom: "10px",
    },
    footer: {
			paddingTop: "5rem",
			paddingBottom: '40px'
      // paddingBottom: "4rem",
    },
    txtTilte: {
      ...CStyles.txt_body_item,
      color: "#6c7a87",
      marginTop: "1rem",
			fontSize: "14px",
			color: "#e9e6e0",
			fontWeight: 600,
			lineHeight: 1.5,
			marginBottom: "1.45rem",
			cursor: "pointer",
		},
		txtTilteInsider: {
			  ...CStyles.txt_body_item,
      color: "#6c7a87",
      marginTop: "1rem",
			fontSize: "16px",
			color: "#e9e6e0",
			fontWeight: 500,
			lineHeight: 1.5,
			marginBottom: 0,
		},
		txtTilteConnect: {
  ...CStyles.txt_body_item,
      color: "#6c7a87",
			marginTop: ".45rem",
				color: "#e9e6e0",
      fontSize: "13px",
      fontWeight: 600,
			marginBottom: 0,
			cursor: "pointer",
		},
		IconConnect: {
			display: "flex",
  textAlign: "center",
  flexDirection: "column",
  aligncontent: "center",
			alignItems: "center",
			cursor: "pointer !important",
		},
    inputEmail: {
      ...CStyles.txt_body_item,
      marginTop: "1.45rem",
      boxShadow: "none",
      padding: 0,
    },
    inputEmailBase: {
      ...CStyles.txt_body_item,
      border: "1px solid #edeef1",
      height: "40px",
      borderRadius: "10px",
      fontSize: "11px",
      margin: 0,
      paddingLeft: "10px",
    },
    txtCopyRight: {
			...CStyles.txt_body_item,
				color: "#e9e6e0",
      fontSize: "13px",
			paddingTop: "4rem",
			paddingBottom: "30px"
    },
    txtCopyRightLink: {
			textDecoration: "none",
				color: "#e9e6e0",
		},
// 		#245c4f
// #179a71
// #1d7063
// #3d8d74
// #4c7c69
// #155a5b
    customSendEmail: {
      backgroundColor: "#245c4f",
      height: "40px",
      width: "40px",
      marginLeft: "10px",
      // marginRight: "10px",
      fontSize: "20px",
      color: "#fff",
      border: "1px solid #edeef1",
			borderTopRightRadius: "1px",
		  borderBottomRightRadius:"1px",
		},

		blockFooterConnect: {
			background: "#245c4f"
		},
		innerConnect: {
			padding: "55px 0px",
			margin: "0 auto",
			boxSizing: "border-box",
			justifyContent: "center"
		},
		innerInsider: {
				maxWidth: "1160px",
			padding: "60px 30px",
			margin: "0 auto",
			boxSizing: "border-box"
		},
		txtFooterConnect: {
			     ...CStyles.txt_header_title,
			paddingBottom: "8px",
			marginBottom: "30px",
			color: "#e9e6e0",
			fontSize: "35px",
			borderBottom: "1px solid #e9e6e0"
		},
				txtFooterInsider: {
			     ...CStyles.txt_header_title,
			paddingBottom: "8px",
			marginBottom: "1rem",
			color: "#e9e6e0",
			fontSize: "40px",
		},
		borderIconConnect: {
			width: '55px',
  height: '55px',
  border: "1px solid #edeef1",
			borderRadius: '30%',
	  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
			justifyContent: 'center',
		cursor: "pointer !important"
		},
	
	blockHymnsInsider: {
			backgroundColor: "#000"
		},
	   btnLoginHeader: {
      ...CStyles.btn_login,
      // fontWeight: CStyles.fBold,
      marginTop: "0px",
      backgroundColor: Colors.bgLogin,
			 cursor: "pointer",
			 fontSize: "20px",
			 fontWeight: 500,
				 padding: "10px 30px",
      textTransform: "capitalize",
    },
  };
});
