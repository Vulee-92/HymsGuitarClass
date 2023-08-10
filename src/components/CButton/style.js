/** LIBRARY */
import { makeStyles } from "@mui/styles"
import { Configs } from "../../configs"
import { Colors } from "../../utils/colors"
import CStyles from "../../utils/common"

export default makeStyles(() => {
  return {
    conBtn: {
      backgroundColor: ({ bgColor }) => bgColor,
      borderRadius: 8,
      marginTop: Configs.pH,
      height: 48,
      paddingLeft: Configs.pH,
      paddingRight: Configs.pH,
      "&:hover": {
        backgroundColor: ({ bgColor }) => bgColor,
        opacity: .9
      }
    },

    txtBtn: {
      ...CStyles.txt_btn,
      textTransform: 'none',
    },
  }
})