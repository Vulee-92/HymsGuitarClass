/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets,Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
	return {
		conSearch: {
			...CStyles.rowAliCenJusBet,
			borderRadius: 20,
			border: `1px solid ${Colors.placeHolder}`,
			borderRadius: '8px !important',
			margin: 10,
			overflowY: "hidden"
			// height: 40,
			// minWidth: 300
		},
		conInput: {
			...CStyles.txt_body_item,
			flex: 1,
			display: 'flex',
			width: "100%",
			alignItems: 'center',
			paddingLeft: 5,
			border: `1px solid ${Colors.placeHolder}`,
			fontWeight: `${CStyles.fBold} !important`,
			borderRadius: '8px !important',
			border: 'none',
			// padding: `0px 12px`,
			"& input": {
				flex: 1,
				"&::placeholder": { color: Colors.placeHolder,opacity: 1,'-webkit-text-fill-color': Colors.placeHolder },
				'-webkit-text-fill-color': `${Colors.text} !important`,
			},
			"& $Mui-disabled": {
				opacity: 0
			},
			"&:before": {
				content: 'none'
			},
			"&:after": {
				content: 'none'
			},
			"& $MuiFilledInput-underline": {
				backgroundColor: "#fff !important",
				borderBottom: "none"
			}
		},
	};
});
