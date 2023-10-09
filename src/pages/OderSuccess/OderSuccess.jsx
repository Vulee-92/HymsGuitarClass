import React from 'react'
import { Lable,WrapperInfo,WrapperTotal,WrapperValue,WrapperCountOrder,WrapperItemOrder,WrapperItemOrderInfo } from './style';
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';
import { Container,Box,Typography,Grid,Card } from '@mui/material';
import styles from "./stylemui";


const OrderSucess = () => {
	const location = useLocation()
	const { state } = location
	const classes = styles();
	return (
		<Container maxWidth="xl">
			<Box style={{ marginTop: '3rem',textAlign: 'center' }}>
				<Typography className={classes.txtOrder}>Đặt hàng thành công</Typography>

				<Grid container spacing={2} sx={{ display: { xs: "flex" },justifyContent: "space-around",flexDirection: { xs: "column",sm: "column-reverse",md: "column-reverse",xl: "row",lg: "row" } }}>
					<Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
						<Card>
							{state.orders?.map((order,index) => (
								<div key={index} style={{ borderBottom: "2px solid #d6d6d4",marginTop: 20 }}>
									<div style={{ display: 'flex',alignItems: 'center',gap: '4px' }}>
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
						</Card>

					</Grid>
					<Grid item xs={12} sm={12} md={12} lg={4} xl={4} sx={{ padding: "0px",marginLeft: { xs: "0px",md: "-16px",sm: "-16px" },margin: { xs: "0px" } }}>
						<Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ padding: "0px",marginLeft: { xs: "0px",md: "-16px",sm: "-16px" },margin: { xs: "0px" } }}>
							<Card style={{ paddingTop: 30 }}>

								<WrapperInfo>
									<div>
										<Lable><Typography className={classes.nameProduct}>Phương thức giao hàng</Typography></Lable>
										<WrapperValue>
											<Typography className={classes.txtValueTotal} style={{ color: '#ea8500',fontWeight: 'bold',display: 'flex',paddingBottom: "5px" }}>{orderContant.delivery[state?.delivery]}</Typography>
											<Typography className={classes.txtValueTotal}>Giao hàng tiết kiệm</Typography>

										</WrapperValue>
									</div>
								</WrapperInfo>
								<WrapperInfo>
									<div>
										<Lable>   <Typography className={classes.nameProduct}>Phương thức thanh toán</Typography></Lable>
										<WrapperValue>
											<Typography className={classes.txtValueTotal}>	{orderContant.payment[state?.payment]}</Typography>

										</WrapperValue>
									</div>
								</WrapperInfo>
							</Card>
						</Grid>
						<Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ padding: "0px",marginLeft: { xs: "0px",md: "-16px",sm: "-16px" },margin: { xs: "0px" } }} style={{ borderBottom: "2px solid #d6d6d4",marginTop: 20 }}>
							<Card style={{ padding: 30 }}>
								<Grid style={{ display: "flex",justifyContent: "space-between" }}>
									<Typography className={classes.txtValueTotal}>Tổng tiền</Typography>
									<span style={{ display: 'flex',flexDirection: 'column' }}>
										<Typography className={classes.numValueTotal} style={{ color: '#245c4f',fontSize: '24px',fontWeight: 'bold',textAlign: "end" }}>{convertPrice(state?.totalPriceMemo)}</Typography>
										<Typography className={classes.numValueTotal}>(Đã bao gồm VAT nếu có)</Typography>
									</span>
								</Grid>

							</Card>

						</Grid>
					</Grid>
				</Grid>
			</Box>
		</Container>


	)
}

export default OrderSucess