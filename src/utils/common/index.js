/* LIBRARY */
import { Colors } from "../../utils/colors";

/** COMMON */

const baseProperties = {
  fontFamily: "Public Sans, sans-serif",
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  fontSizeXS: 10.4,
  fontSizeSM: 12,
  fontSizeRegular: 14,
  fontSizeLG: 16,
  fontSizeXL: 18,
};

const CStyles = {
  container: {
    height: '100vh',
    backgroundColor: Colors.bg,
    overflowY: 'auto'
  },
  grow: {
    flexGrow: 1
  },
  row: {
    display: 'flex'
  },
  con: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  },
  center: { display: 'flex',  alignItems: 'center', justifyContent: 'center', },
  col: { display: 'flex', flexDirection: 'column'},
  colAliCen: { display: 'flex', flexDirection: 'column', alignItems: 'center'},
  colAliSta: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start'},
  colAliEnd: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end'},
  colJusCen: { display: 'flex', flexDirection: 'column', justifyContent: 'center'},
  colJusEnd: { display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'},
  colJusSta: { display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'},
  colSpaAro: { display: 'flex', flexDirection: 'column', justifyContent: 'space-around'},
  colSpaBet: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between'},
  colAliCenJusAro: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'},
  colAliCenJusSpa: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'},

  row: { display: 'flex', flexDirection: 'row'},
  rowAliCen: { display: 'flex', flexDirection: 'row', alignItems: 'center'},
  rowAliStart: { display: 'flex', flexDirection: 'row', alignItems: 'flex-start'},
  rowAliEnd: { display: 'flex', flexDirection: 'row', alignItems: 'flex-end'},
  rowJusCen: { display: 'flex', flexDirection: 'row', justifyContent: 'center'},
  rowJusSta: { display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'},
  rowJusEnd: { display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'},
  rowSpaBet: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between'},
  rowSpaAro: { display: 'flex', flexDirection: 'row', justifyContent: 'space-around'},
  rowSpaEv: { display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'},
  rowAliCenJusBet: { display: 'flex', flexDirection: 'row',alignItems: 'center', justifyContent: 'space-between'},
  rowAliCenJusAro: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'},

  shadow: {
    boxShadow: `rgba(0, 0, 0, 0.24) 0px 3px 8px`
  },
  
  fBold: baseProperties.fontWeightBold,
  fMedium: baseProperties.fontWeightMedium,
  fRegular: baseProperties.fontSizeRegular,

  txt_1_line: {
    textAlign: 'left',
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
  },

  txt_title_item: {
    fontSize: baseProperties.fontSizeLG,
    fontFamily: baseProperties.fontFamily,
    fontWeight: baseProperties.fontWeightBold,
    color: Colors.text,
    lineHeight: 1.1
  },
  txt_body_item: {
    fontSize: baseProperties.fontSizeRegular,
    fontFamily: baseProperties.fontFamily,
    fontWeight: baseProperties.fontWeightRegular,
    color: Colors.text,
    lineHeight: 1.1
  },
  txt_meta_item: {
    fontSize: baseProperties.fontSizeSM,
    fontFamily: baseProperties.fontFamily,
    fontWeight: baseProperties.fontWeightRegular,
    color: Colors.placeHolder,
    lineHeight: 1.1
  },
  txt_btn: {
    fontSize: baseProperties.fontSizeLG,
    fontFamily: baseProperties.fontFamily,
    fontWeight: baseProperties.fontWeightBold,
    color: Colors.white,
  },
  txt_header_title: {
    fontSize: baseProperties.fontSizeXL,
    fontFamily: baseProperties.fontFamily,
    fontWeight: baseProperties.fontWeightBold,
    color: Colors.text,
    lineHeight: 1.1
  },
  txt_error: {
    fontSize: baseProperties.fontSizeRegular,
    fontFamily: baseProperties.fontFamily,
    fontWeight: baseProperties.fontWeightBold,
    color: Colors.error,
    lineHeight: 1.1
  },
  txt_success: {
    fontSize: baseProperties.fontSizeRegular,
    fontFamily: baseProperties.fontFamily,
    fontWeight: baseProperties.fontWeightBold,
    color: Colors.success,
    lineHeight: 1.1
  },
  btn_login: {
    fontSize: baseProperties.fontSizeRegular,
    fontFamily: baseProperties.fontFamily,
    fontWeight: baseProperties.fontWeightLight,
    color: Colors.white,
    lineHeight: 1.1
  }
};

export default CStyles;
