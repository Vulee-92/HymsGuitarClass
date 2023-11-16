import React from 'react';
import { Document,Page,Text,View,StyleSheet,PDFViewer,PDFDownloadLink,Image,Font } from '@react-pdf/renderer';
import { Box } from '@mui/material';
import icon from '../../assets/icons/printer.png'
import moment from 'moment';
import 'moment/locale/vi';
Font.register({ family: 'Public Sans, sans-serif' });
const styles = StyleSheet.create({
	title: {
		fontFamily: 'Public Sans, sans-serif',
		fontSize: 14,
		fontWeight: 'bold',
		marginBottom: 10,
	},

	page: {
		flexDirection: 'row',
		backgroundColor: '#E4E4E4',
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1,
		fontSize: 14,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	table: {
		display: 'table',
		width: 'auto',
		borderStyle: 'solid',
		borderColor: '#bfbfbf',
		borderWidth: 1,
		borderRightWidth: 0,
		borderBottomWidth: 0,
	},
	tableRow: {
		flexDirection: 'row',
	},
	tableColHeader: {
		width: '16.66%', // 100% / 6
		borderStyle: 'solid',
		borderColor: '#bfbfbf',
		borderBottomColor: '#bfbfbf',
		borderWidth: 1,
		borderBottomWidth: 2,
		backgroundColor: '#f2f2f2',
		textAlign: 'center',
		fontWeight: 'bold',
	},
	tableCol: {
		width: '16.66%',
		borderStyle: 'solid',
		borderColor: '#bfbfbf',
		borderWidth: 1,
		textAlign: 'center',
	},
	image: {
		width: 50,
		height: 50,
	},
});

const MyDocument = ({ order }) => (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
				<Text style={styles.title}>Hymns Center</Text>
				<Text style={styles.title}>03/31 đường Nguyễn Hoàng, Phương Hoà Đông,</Text>
				<Text >Phường Hoà Thuận, TP. Tam Kỳ, Quảng Nam</Text>
				<Text >(+84) 986 32 09 32</Text>
				<Text>Hóa đơn</Text>
				<Text>Ngày ghi: {moment(order?.createdAt).locale('vi').format(`DD [/] M, YYYY`)}</Text>
				<Text>Hóa đơn cho</Text>
				<Text>Tên</Text>
				<Text>Tên công ty</Text>
				<Text>Địa chỉ đường phố</Text>
				<Text>Quận/Huyện, Tỉnh/Thành phố</Text>
				<Text>Mô tả</Text>
				<View style={styles.table}>
					<View style={styles.tableRow}>
						<View style={styles.tableColHeader}>
							<Text>ID Code</Text>
						</View>
						<View style={styles.tableColHeader}>
							<Text>Image</Text>
						</View>
						<View style={styles.tableColHeader}>
							<Text>Name</Text>
						</View>
						<View style={styles.tableColHeader}>
							<Text>Date</Text>
						</View>
						<View style={styles.tableColHeader}>
							<Text>Total</Text>
						</View>
						<View style={styles.tableColHeader}>
							<Text>Status</Text>
						</View>
					</View>
					{order.orderItems.map((item) => (
						<View style={styles.tableRow} key={item.id}>
							<View style={styles.tableCol}>
								<Text>{item.id}</Text>
							</View>
							<View style={styles.tableCol}>
								<Image style={styles.image} src={item.image} />
							</View>
							<View style={styles.tableCol}>
								<Text>{item.name}</Text>
							</View>
							<View style={styles.tableCol}>
								<Text>{item.date}</Text>
							</View>
							<View style={styles.tableCol}>
								<Text>{item.total}</Text>
							</View>
							<View style={styles.tableCol}>
								<Text>{item.status}</Text>
							</View>
						</View>
					))}
				</View>
			</View>
		</Page>
	</Document>
);

const PDFDownloadButton = ({ order }) => (
	< PDFDownloadLink document={< MyDocument order={order} />} fileName="sample.pdf" >
		{({ blob,url,loading,error }) =>
			loading ? 'Loading document...' : <Box component="img" src={icon} style={{ width: "23px",height: "23px" }} />
		}
	</PDFDownloadLink >
);

export default PDFDownloadButton;
