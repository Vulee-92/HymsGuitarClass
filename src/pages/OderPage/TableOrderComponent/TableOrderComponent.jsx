import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useLocation,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import * as OrderService from '../../../services/OrderService'
import { useMutationHooks } from 'hooks/useMutationHook';
import moment from 'moment';
import 'moment/locale/vi';
import { LoadingButton } from '@mui/lab';
import styles from "./stylemui";
import { convertPrice } from 'utils';
import { Card,CardContent,CardMedia,Tooltip } from '@mui/material';
function createData(orderId,date,customer,totalAmount,status,items) {
	return {
		orderId,
		date,
		customer,
		totalAmount,
		status,
		items,
	};
}

function OrderRow(props) {
	const { order } = props;
	console.log("order",order)

	const [open,setOpen] = useState(false);
	const formattedTime = moment(order?.createdAt).locale('vi');
	const classes = styles();
	const navigate = useNavigate()
	let timeOfDay;
	const hour = formattedTime.hour();

	if (hour >= 6 && hour < 12) {
		timeOfDay = <Typography>am</Typography>;
	} else if (hour >= 12 && hour < 18) {
		timeOfDay = 'pm';
	} else {
		timeOfDay = 'pm';
	}

	return (
		<>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

				<TableCell className={classes.txtInfoOrder} sx={{ width: "50%" }}>
					<Card sx={{ display: 'flex',marginBottom: 1,boxShadow: "none" }} >
						<CardMedia
							component="img"
							sx={{ width: 130 }}
							image={order?.image[0]}
							alt="Live from space album cover"
						/>
						<Box sx={{ display: 'flex',flexDirection: 'column' }}>
							<CardContent sx={{ flex: '1 0 auto' }}>
								<Tooltip title={order?.name}>
									<Typography className={classes.nameProductCard}
									>

										{order?.name}
									</Typography>

								</Tooltip>

								{/* <Typography className={classes.txtValueTotal}>
									Còn hàng
								</Typography> */}

							</CardContent>
							<Box sx={{ display: 'flex',alignItems: 'center',pl: 1,pb: 1 }}>

							</Box>
						</Box>

					</Card>
				</TableCell>
				<TableCell align="right" className={classes.txtInfoOrder} sx={{ width: "25%" }}>				{convertPrice(order.price)}
				</TableCell>
				<TableCell align="right" className={classes.txtInfoOrder} sx={{ width: "25%" }}>		{convertPrice(order.price * order.amount)}</TableCell>

				{/* <TableCell align="center" className={classes.txtInfoOrder}>
					<PDFDownloadButton order={order} />
				</TableCell> */}
			</TableRow>

		</>
	);
}

OrderRow.propTypes = {
	order: PropTypes.shape({
		orderId: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired,
		customer: PropTypes.string.isRequired,
		totalAmount: PropTypes.number.isRequired,
		status: PropTypes.string.isRequired,
		items: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				quantity: PropTypes.number.isRequired,
				price: PropTypes.number.isRequired,
			}),
		).isRequired,
	}).isRequired,
};


export default function OrderTable(order) {
	const classes = styles();





	return (
		<TableContainer component={Paper} style={{ boxShadow: "none" }}>
			<Table aria-label="order table">
				<TableHead>
					<TableRow className={classes.WrapperRight}>
						<TableCell className={classes.txtForgot}>Sản phẩm</TableCell>
						<TableCell className={classes.txtForgot} align="right">Giá</TableCell>
						<TableCell className={classes.txtForgot} align="right">Tổng tiền</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{order?.order?.orderItemsSlected?.map((orderItem) => (
						< OrderRow order={orderItem} />
					))}

				</TableBody>
			</Table>
		</TableContainer>
	);
}
