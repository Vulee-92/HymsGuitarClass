/** LIBRARY */
import { makeStyles } from "@mui/styles";
import { Assets,Configs } from "../../configs";
import { Colors } from "../../utils/colors";
import CStyles from "../../utils/common";

export default makeStyles(() => {
	return {
		container: {
			maxWidth: " 1140px",
		},
		nameProduct: {
			...CStyles.txt_title_item,
			marginTop: "10px",
		},
		nameProductTotal: {
			...CStyles.txt_title_item,
			display: "flex",alignItems: "center",

		},
		txtNumberPrice: {
			...CStyles.txt_title_item,
			color: "#242424",
			fontSize: "1rem",
			fontWeight: 400,

		},
		ConWrapperLeft: {
			backgroundColor: "rgb(255,255,255)",
			color: "rgb(33,43,54)",
			transition: "box - shadow 300ms cubic - bezier(0.4,0,0.2,1) 0ms",
			overflow: "hidden",
			boxShadow: "0px 18px 28px rgba(0,0,0,0.15),0px 0px 1px rgba(0,0,0,0.31)",
			borderRadius: "16px",
		},
		priceTitle: {
			...CStyles.txt_title_item,
			color: "#45cc8f",
			textAlign: "right",
		},
		txtValueTotal: {
			...CStyles.txt_body_item,
			color: "rgb(36, 36, 36)",
			fontSize: "14px",
			fontWeight: 400,
			lineHeight: 1.5,
			alignItems: "center",
			overflow: "hidden",
		},
		footer: {
			paddingTop: "10rem",
			paddingBottom: "4rem",
		},
		txtTilte: {
			...CStyles.txt_body_item,
			color: "#6c7a87",
			marginTop: "1.45rem",
			fontSize: "13px",
			fontWeight: 400,
			marginBottom: 0,
		},
		txtOrder: {
			...CStyles.txt_body_item,
			color: "#436E67",
			fontSize: "2rem",
			fontWeight: 700,
			paddingBottom: "10px",
			borderBottom: "3px solid #436E67",
			marginLeft: "15px",
			marginRight: "15px",
			marginBottom: "15px",
			textAlign: "center",
		},
		nameProduct: {
			...CStyles.txt_title_item,
			alignItems: "center",
			display: "flex",
			marginTop: "10px",
		},
		nameOrder: {
			...CStyles.txt_title_item,
			alignItems: "center",
			display: "flex",
		},
		updateInfo: {
			...CStyles.txt_title_item,
			lineHeight: 1.3,
			fontSize: "13px",
			fontWeight: 400,
		},
		nameProductCard: {
			...CStyles.txt_title_item,
			alignItems: "center",
			display: "flex",
			lineHeight: 1.5,
			overflow: "hidden",
			alignItems: " flex-start",
			textOverflow: "ellipsis",
			whiteSpace: "break-spaces",
			fontSize: "13px",
			marginBottom: "10px",
			fontWeight: 500,
		},
		btnAddCard: {
			...CStyles.txt_title_item,
			background: "#436E67",
			height: "44px",
			width: "120px",
			border: "none",
			borderRadius: "4px",
			textTransform: "none",

			color: "#fff",
			fontSize: "10px",
			fontWeight: "600",
			"&:hover": {
				background: "#436E67",
			}
		},
		InfoHomeUser: {
			...CStyles.txt_title_item,
			lineHeight: 1.6,
			overflow: "hidden",
			alignItems: " flex-start",
			textOverflow: "ellipsis",
			whiteSpace: "break-spaces",
			fontSize: "13px",
			marginBottom: "7px",
			fontWeight: 400,
		},
		nameAllProduct: {
			alignItems: "center",
			display: "flex",
			marginLeft: "10px",
			...CStyles.txt_body_item,
			color: "rgb(36, 36, 36)",
			fontSize: "14px",
			fontWeight: 500,
			lineHeight: 1.5,
			alignItems: "center",
			overflow: "hidden",
		},
		BoxnameAllProduct: {
			display: "flex",
			textAlign: "center",

		},

		customSendEmail: {
			backgroundColor: "#436E67",
			height: "40px",
			width: "40px",
			marginLeft: "10px",
			fontSize: "20px",
			color: "#fff",
			border: "1px solid #edeef1",
			borderRadius: "10px",
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
		InfoUserForDesktop: {
			background: "#fff",
			borderTopRightRadius: "6px",
			borderTopLeftRadius: "6px",
			width: "100%",
			padding: "11px 16px",
		},
		txtNameTable: {
			color: 'rgb(36, 36, 36)',
			fontWeight: 400,
			fontSize: '13px',
			marginBottom: "10px",
		},
		customLoadingButton: {
			backgroundColor: '#436E67',
			color: 'white',
			padding: '10px 20px',
			width: '130%',
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
		},
		boxCard: {

			marginTop: "10px",
			margin: "0 auto",
			borderTop: "1px solid #454F5B",
			borderRadius: "9px",
			boxShadow: "0px .8px .8px 0px rgba(0,0,0,0.11)",
			"&:hover": {
				boxShadow: "0px 18px 28px rgba(0,0,0,0.15),0px 0px 1px rgba(0,0,0,0.31)",
				transition: "boxShadow 0.3s ease -in -out 0s"
			},

		},
		hymnsName: {
			...CStyles.txt_title_item,
			fontSize: "0.7rem",
		},
		WrapperLeft: {
			width: '800px',
			backgroundColor: "#fff",
			color: "rgb(33,43,54)",
			transition: "box - shadow 300ms cubic - bezier(0.4,0,0.2,1) 0ms",
			overflow: "hidden",
			borderRadius: "16px",
			padding: "0px 0px 40px",

		},
		nameProductInfo: {
			...CStyles.txt_body_item,

			background: "rgba(221,221,221,1)",
			height: "40px",
			padding: "8px 15px",
			marginTop: 10,
			width: "100%",
			textTransform: "none",
			border: "solid 1px rgb(255,255,255,0)",
			borderRadius: "999px",
			color: "#436E67",
			fontSize: "1rem",
			fontWeight: "500",
			transition: "all 0.1s ease- out 0s",
			"&:hover": {
				// boxShadow: "0px 18px 28px rgba(0,0,0,0.15),0px 0px 1px rgba(0,0,0,0.31)",
				// transition: "boxShadow 0.3s ease -in -out 0s"
				background: "rgba(221,221,221,1)",

			},

		},
		WrapperRight: {
			width: '100%', // Đặt chiều rộng là 100% mặc định

			// Media Query để thay đổi chiều rộng tùy thuộc vào kích thước màn hình
			// '@media (min-width: 600px)': {
			// 	width: '600px', // Đối với màn hình rộng hơn hoặc bằng 600px
			// },

			color: "rgb(33,43,54)",
			transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
			overflow: "hidden",
			borderRadius: "16px",
			padding: "30px 24px 0px",
			backgroundColor: "rgb(247, 248, 250)"
		},

	};
});
