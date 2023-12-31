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
import { calculateDiscountedPrice } from 'utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';


function OrderRow(props) {
	const { order } = props;
	const { queryOrder } = props;
	const { user } = props;
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
	const handleDetailsOrder = (id) => {
		navigate(`/order-success/${id}`,{
			user: {
				token: user?.access_token
			}
		})
	}
	return (
		<>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell className={classes.txtInfoOrder}>
					{order.codeOrder}
				</TableCell>
				<TableCell className={classes.txtInfoOrder}>	{formattedTime.format(`DD [/] M, YYYY`)}
				</TableCell>
				<TableCell align="right" className={classes.txtInfoOrder}>{convertPrice(order?.totalPrice)}</TableCell>
				<TableCell>{order.isPaid ? <Typography className={classes.txtForgot}>Đã thanh toán</Typography> : <Typography className={classes.txtError}>Chờ thanh toán</Typography>}</TableCell>
				<TableCell align="center" >		<LoadingButton fullWidth size="large" type="submit" variant="contained" isLoading={queryOrder?.isLoading}
					className={classes.customLoadingButton}
					onClick={() => handleDetailsOrder(order?._id)}
				>Chi tiết</LoadingButton>
				</TableCell>
				{/* <TableCell align="center" className={classes.txtInfoOrder}>
					<PDFDownloadButton order={order} />
				</TableCell> */}
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0,paddingTop: 0 }} colSpan={12}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography className={classes.nameProduct}>
								Tóm tắt
							</Typography>
							<Table size="small" aria-label="order items">
								<TableHead>
									<TableRow>
										<TableCell className={classes.txtForgot}>Sản phẩm</TableCell>
										<TableCell className={classes.txtForgot} align="right">Giá</TableCell>
										<TableCell className={classes.txtForgot} align="right">SLượng</TableCell>
										<TableCell className={classes.txtForgot} align="right">Thành tiền</TableCell>

									</TableRow>
								</TableHead>
								<TableBody>
									{order?.orderItems?.map((item) => (
										<TableRow key={item?.name} sx={{ maxWidth: 20 }}>

											<TableCell className={classes.txtInfoOrder} style={{ display: "flex",alignItems: "center",fontSize: "10px" }}>
												<img
													src={item.image[0]}
													style={{
														width: "50px",
														height: "50px",
														objectFit: "cover",
													}} />
												{item.name.slice(0,10)}</TableCell>

											<TableCell align="right" className={classes.txtInfoOrder} sx={{ width: "20%" }}>			{item?.discount > 0 && (
												<Typography className={classes.txtPrice} style={{ textAlign: 'right',cursor: 'pointers',marginBottom: 5,textDecoration: "line-through",fontSize: ".8rem" }}><FontAwesomeIcon icon={faTags} />{convertPrice(item?.price)}</Typography>
											)}	{calculateDiscountedPrice(item)}
											</TableCell>
											<TableCell className={classes.txtInfoOrder} align="right">{item.amount}</TableCell>
											<TableCell className={classes.txtInfoOrder} align="right" >{calculateDiscountedPrice(item)}</TableCell>

										</TableRow>
									))}
									<TableRow
									>
										<TableCell colSpan={3} className={classes.txtForgot} sx={{ textAlign: { xl: "right",xs: "left",border: 'none' } }}>Tổng</TableCell>
										<TableCell colSpan={3} className={classes.txtForgot} sx={{ textAlign: { xl: "right",xs: "left",border: 'none' } }}>{convertPrice(order.itemsPrice)}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell colSpan={3} className={classes.txtForgot} sx={{ textAlign: { xl: "right",xs: "left",border: 'none' } }}>Vận chuyển</TableCell>
										<TableCell colSpan={3} className={classes.txtForgot} sx={{ textAlign: { xl: "right",xs: "left",border: 'none' } }}>{convertPrice(order.shippingPrice)}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell colSpan={3} className={classes.txtForgot} sx={{ textAlign: { xl: "right",xs: "left",border: 'none' } }}>Tổng tiền</TableCell>
										<TableCell colSpan={3} className={classes.priceTitle} sx={{ textAlign: { xl: "right",xs: "left",border: 'none' } }}>{convertPrice(order.totalPrice)}</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
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




export default function OrderTable() {
	const location = useLocation()
	const { state } = location
	const navigate = useNavigate()
	const user = useSelector((state) => state.user)
	const fetchMyOrder = async () => {
		const res = await OrderService.getOrderByUserId(user?.id,user?.access_token)
		return res.data
	}
	const classes = styles();
	const queryOrder = useQuery({ queryKey: ['orders'],queryFn: fetchMyOrder },{
		enabled: user?.id && user?.access_token
	})
	const { isLoading,data } = queryOrder
	const handleDetailsOrder = (id) => {
		navigate(`/order-success/${id}`,{
			user: {
				token: user?.access_token
			}
		})
	}

	const mutation = useMutationHooks(
		(data) => {
			const { id,token,orderItems,userId } = data
			const res = OrderService.cancelOrder(id,token,orderItems,userId)
			return res
		}
	)

	const handleCanceOrder = (order) => {
		mutation.mutate({ id: order._id,token: state?.token,orderItems: order?.orderItems,userId: user.id },{
			onSuccess: () => {
				queryOrder.refetch()
			},
		})
	}
	const { isLoading: isLoadingCancel,isSuccess: isSuccessCancel,isError: isErrorCancle,data: dataCancel } = mutation

	return (
		<TableContainer component={Paper} style={{ boxShadow: "none" }}>
			<Table aria-label="order table">
				<TableHead>
					<TableRow>
						<TableCell />
						<TableCell className={classes.txtForgot}>Mã đơn hàng</TableCell>
						<TableCell className={classes.txtForgot}>Ngày mua</TableCell>
						<TableCell className={classes.txtForgot} align="right">Tổng tiền</TableCell>
						<TableCell className={classes.txtForgot}>Trạng thái</TableCell>
						<TableCell align="center" className={classes.txtForgot}>Xem</TableCell>
						{/* <TableCell align="center" className={classes.txtForgot}>Download</TableCell> */}
					</TableRow>
				</TableHead>
				<TableBody>
					{data
						?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
						.map((order) => (
							<OrderRow key={order?._id} order={order} queryOrder={queryOrder} user={user} />
						))}

				</TableBody>
			</Table>
		</TableContainer>
	);
}
