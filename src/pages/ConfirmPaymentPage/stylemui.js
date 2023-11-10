/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets,Configs } from "../../configs";
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
			color: "#333333",
			fontSize: "1.3rem",
			fontWeight: 600,
		},
		txtShipping: {
			...CStyles.txt_title_item,
			color: "#333333",
			fontSize: "1.3rem",
			fontWeight: 600,
			marginTop: "2em"
		},
		txtTilte: {
			...CStyles.txt_body_item,
			color: "#000",
			fontSize: "13px",
			fontWeight: 400,
			lineHeight: 1.5
		},
		WrapperLeft: {
			width: '800px',
			backgroundColor: "#fff",
			color: "rgb(33,43,54)",
			transition: "box - shadow 300ms cubic - bezier(0.4,0,0.2,1) 0ms",
			overflow: "hidden",
			// boxShadow: "0px 18px 28px rgba(0,0,0,0.15), 0px 0px 1px rgba(0,0,0,0.31)",
			borderRadius: "16px",
			padding: "0px 24px 40px",

		},
		txtValueTotal: {
			...CStyles.txt_body_item,
			color: "rgb(36, 36, 36)",
			fontSize: "14px",
			fontWeight: 400,
			lineHeight: 1.5,
			marginBottom: "10px",
			alignItems: "center",
			overflow: "hidden",
		},
		btnAddCard: {
			...CStyles.txt_title_item,
			background: "#212B36",
			height: "44px",
			width: "120px",
			border: "none",
			borderRadius: "4px",

			color: "#fff",
			fontSize: "10px",
			fontWeight: "600",
			textTransform: "capitalize",
			"&:hover": {
				background: "#212B36",
			}
		},
		txtTilteBank: {
			...CStyles.txt_body_item,
			color: "#000",
			fontSize: "15px",
			fontWeight: 400,
			marginLeft: "15px",
		},
		txtTilteBankMobile: {
			...CStyles.txt_body_item,
			color: "#000",
			fontSize: "15px",
			fontWeight: 400,
			padding: "20px"
		},
		txtOrder: {
			...CStyles.txt_body_item,
			color: "#212B36",
			fontSize: "18px",
			fontWeight: 700,
			paddingBottom: "10px",
			borderBottom: "3px solid #212B36",
			marginLeft: "15px",
			marginRight: "15px",
			marginBottom: "15px",
			textAlign: "center",
		},
		nameInfoUser: {
			...CStyles.txt_body_item,
			color: "rgb(36, 36, 36)",
			fontSize: "14px",
			fontWeight: 500,
			alignItems: "center",
			// margin: 0px 0px 10px,
			maxHeight: "40px",
			overflow: "hidden",
		},
		boxTotal: {
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			gap: '10px',
			alignItems: 'center',
			marginBottom: "20px"
		},
		txtInfoUser: {
			...CStyles.txt_body_item,
			color: "#737373",
			fontSize: "1rem",
			fontWeight: 500,
			lineHeight: 1.7,
			alignItems: "center",
			overflow: "hidden",
		},
		txtTitleInfoUser: {
			...CStyles.txt_body_item,
			color: "#45cc8f",
			fontSize: "1.1rem",
			fontWeight: 400,
			lineHeight: 1,
			alignItems: "center",
			overflow: "hidden",
		},
		conTextCreate: {
			...CStyles.txt_header_title,
			// color: Colors.da,
			fontSize: ".9rem",
			textAlign: "left",
			fontWeight: 400,
			color: "#000",
		},
		hymnsName: {
			...CStyles.txt_title_item,
			fontSize: "0.7rem",
		},
		customLoadingButton: {
			backgroundColor: '#212B36',
			color: 'white',
			padding: '10px 20px',
			width: '90%',
			border: 'none',
			borderRadius: '5px',
			'&.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-containedSizeLarge': {
				// CSS cho trạng thái loading
				'&.MuiButton-label': {
					visibility: 'hidden',
				},
				'& .MuiCircularProgress-root': {
					position: 'absolute',
					top: '50%',
					left: '50%',
					marginTop: '-12px', // Chỉnh sửa để canh giữa vòng xoay
					marginLeft: '-12px', // Chỉnh sửa để canh giữa vòng xoay
				},
				"&:hover": {
					backgroundColor: '#245c4f'
				}
			},
		}
	};
});