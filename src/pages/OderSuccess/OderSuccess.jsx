import React from 'react'
import { Lable,WrapperInfo,WrapperTotal,WrapperValue,WrapperCountOrder,WrapperItemOrder,WrapperItemOrderInfo } from './style';
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';
import { Container,Box,Typography,Grid } from '@mui/material';
import styles from "./stylemui";


const OrderSucess = () => {
	const location = useLocation()
	const { state } = location
	const classes = styles();
	return (
		// <Container>
		// 	<Box sx={{
		// 		width: '100%',
		// 		height: '100vh',
		// 		marginTop: '3rem',
		// 		display: 'flex',
		// 		justifyContent: 'center',
		// 		alignItems: 'center'
		// 	}}>
		// 		<Loading isLoading={false}>
		// 			<Box style={{ height: '100%',width: '1270px',margin: '0 auto' }}>
		// 				<h3>Đơn hàng đặt thành công</h3>
		// 				<div sx={{
		// 					height: '100%',
		// 					width: '100%',
		// 					maxWidth: '1270px',
		// 					mx: 'auto',
		// 					textAlign: 'center'
		// 				}}>
		// 					<WrapperContainer>
		// 						<WrapperInfo>
		// 							<div>
		// 								<Lable>Phương thức giao hàng</Lable>
		// 								<WrapperValue>
		// 									<span style={{ color: '#ea8500',fontWeight: 'bold' }}>{orderContant.delivery[state?.delivery]}</span> Giao hàng tiết kiệm
		// 								</WrapperValue>
		// 							</div>
		// 						</WrapperInfo>
		// 						<WrapperInfo>
		// 							<div>
		// 								<Lable>Phương thức thanh toán</Lable>

		// 								<WrapperValue>
		// 									{orderContant.payment[state?.payment]}
		// 								</WrapperValue>
		// 							</div>
		// 						</WrapperInfo>
		// 						<WrapperItemOrderInfo>
		// 							{state.orders?.map((order) => {
		// 								return (
		// 									<WrapperItemOrder key={order?.name}>
		// 										<div style={{ width: '500px',display: 'flex',alignItems: 'center',gap: 4 }}>
		// 											<img src={order.image} style={{ width: '77px',height: '79px',objectFit: 'cover' }} />
		// 											<div style={{
		// 												width: 260,
		// 												overflow: 'hidden',
		// 												textOverflow: 'ellipsis',
		// 												whiteSpace: 'nowrap'
		// 											}}>{order?.name}</div>
		// 										</div>
		// 										<div style={{ flex: 1,display: 'flex',alignItems: 'center',gap: '10px' }}>
		// 											<span>
		// 												<span style={{ fontSize: '13px',color: '#242424' }}>Giá tiền: {convertPrice(order?.price)}</span>
		// 											</span>
		// 											<span>
		// 												<span style={{ fontSize: '13px',color: '#242424' }}>Số lượng: {order?.amount}</span>
		// 											</span>
		// 										</div>
		// 									</WrapperItemOrder>
		// 								)
		// 							})}
		// 						</WrapperItemOrderInfo>
		// 						<div>
		// 							<span style={{ fontSize: '16px',color: 'red' }}>Tổng tiền: {convertPrice(state?.totalPriceMemo)}</span>
		// 						</div>
		// 					</WrapperContainer>
		// 				</div>
		// 			</Box>
		// 		</Loading>
		// 	</Box>
		// </Container>
		<Box style={{ with: '100%',height: '100vh',marginTop: '3rem',textAlign: 'center' }}>
			<Typography className={classes.txtOrder}>Đặt hàng thành công</Typography>

			<Grid spacing={2} sx={{ display: { xs: "flex" },justifyContent: "space-around",flexDirection: { xs: "column",sm: "column-reverse",md: "column-reverse",xl: "row",lg: "row" } }}>
				<Grid item xs={12} sm={12} md={12} lg={8} xl={8} sx={{ padding: "0px",marginLeft: { xs: "0px",xl: "-16px",md: "-16px",sm: "-16px" },margin: { xs: "0px",xl: "40px" } }}>
					<Box className={classes.WrapperLeft}>
						<WrapperInfo>
							<div>
								<Lable><Typography className={classes.nameProduct}>Chọn phương thức giao hàng</Typography></Lable>
								<WrapperValue>
									<Typography className={classes.txtValueTotal} style={{ color: '#ea8500',fontWeight: 'bold',display: 'flex',paddingBottom: "5px" }}>{orderContant.delivery[state?.delivery]}</Typography>
									<Typography className={classes.txtValueTotal}>Giao hàng tiết kiệm</Typography>

								</WrapperValue>
							</div>
						</WrapperInfo>
						<WrapperInfo>
							<div>
								<Lable>   <Typography className={classes.nameProduct}>Chọn phương thức thanh toán</Typography></Lable>
								<WrapperValue>
									<Typography className={classes.txtValueTotal}>	{orderContant.payment[state?.payment]}</Typography>

								</WrapperValue>
							</div>
						</WrapperInfo>
					</Box>
				</Grid>
				<div>
					{state.orders?.map((order,index) => (
						<div key={index}>
							<div style={{ display: 'flex',alignItems: 'center',gap: '4px',borderBottom: '1px solid #f5f5f5' }}>
								<img src={order.image} alt={order.name} style={{ width: '77px',height: '79px',objectFit: 'cover',borderRight: '1px solid #f5f5f5' }} />
								<Typography className={classes.txtValueTotal}>		{order?.name}</Typography>

							</div>
							<WrapperInfo>
								<div style={{ display: 'flex',alignItems: 'center',justifyContent: 'space-between' }}>
									<Typography className={classes.txtValueTotal}>
										Giá tiền
									</Typography>
									<Typography className={classes.txtValueTotal} style={{ color: '#000',fontSize: '14px',fontWeight: 'bold' }}>{convertPrice(order?.price)}</Typography>
								</div>
								<div style={{ display: 'flex',alignItems: 'center',justifyContent: 'space-between' }}>
									<Typography className={classes.txtValueTotal}>
										Số lượng
									</Typography>
									<Typography className={classes.txtValueTotal} style={{ color: '#000',fontSize: '14px',fontWeight: 'bold' }}> {order?.amount}</Typography>
								</div>
							</WrapperInfo>

						</div>
					))}
				</div>
				<WrapperTotal>
					<Typography className={classes.txtValueTotal}>Tổng tiền</Typography>
					<span style={{ display: 'flex',flexDirection: 'column' }}>
						<Typography className={classes.txtValueTotal} style={{ color: '#245c4f',fontSize: '24px',fontWeight: 'bold',textAlign: "end" }}>{convertPrice(state?.totalPriceMemo)}</Typography>
						<Typography className={classes.txtValueTotal}>(Đã bao gồm VAT nếu có)</Typography>
					</span>
				</WrapperTotal>

			</Grid>
		</Box>

	)
}

export default OrderSucess