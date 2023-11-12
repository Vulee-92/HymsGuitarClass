//LIBARY
import React from 'react'
import styles from "./style";
import { Assets } from 'configs'
import { styled } from '@mui/styles';
import { motion } from "framer-motion"
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Box,Button,Container,Grid,Link,Typography } from '@mui/material'
//STYLE

const VerifyEmailPage = () => {
	const classes = styles();
	const navigate = useNavigate()
	const backToOrder = () => {
		navigate("/");
	}

	return (
		<>
			<Helmet>
				<title> Verify Email </title>
			</Helmet>
			<Container>
				<Grid container>
					<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
						<Box className={classes.boxCard}>
							<motion.div
								className={classes.conCard}
								initial={{ y: 0,opacity: 0 }}
								animate={{ y: 10,opacity: 1 }}
								transition={{ duration: 1,delay: 0.5 }}>
								<Typography className={classes.txtHeaderTitle}> Kiểm tra Email</Typography>
								<Typography className={classes.txtTilteInfoContact} style={{ fontSize: "1rem",textAlign: "center" }}>
									Chúng tôi đã gửi cho bạn một liên kết kích hoạt. Đừng quên kiểm tra cả thư mục rác nhé!
								</Typography>
								<Box style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: "center"
								}}>
									<Box className={classes.conButton} sx={{ display: 'flex',alignItems: 'center',justifyContent: 'center' }}>
										<a href="https://mail.google.com/mail/u/0/#search/from%3A(hymnsguitarclass%40gmail.com)+in%3Aanywhere" target="_blank" style={{ display: 'flex',alignItems: 'center',textDecoration: 'none' }}>
											<img
												src={Assets.logoEmail}
												alt="Logo Email"
												style={{ height: 30,marginY: { xs: 1,sm: 3 } }}
											/>
											<Button className={classes.txtHeaderTitle} style={{ marginLeft: 1,fontSize: "1rem" }}>
												Open
											</Button>
										</a>
									</Box>


								</Box>

							</motion.div>
							<motion.div
								initial={{ y: 0,opacity: 0 }}
								animate={{ y: 10,opacity: 1 }}
								transition={{ duration: 1,delay: 0.5 }}>
								<Typography className={classes.txtHeaderTitle} style={{ color: '#212B36',fontSize: '1rem',textAlign: "right",cursor: 'pointer',marginTop: "50px" }} onClick={backToOrder}> <FontAwesomeIcon icon={faArrowLeftLong} /> Trang chủ</Typography>
							</motion.div>
						</Box>

					</Grid>
				</Grid>
			</Container >
		</>
	)
}

export default VerifyEmailPage