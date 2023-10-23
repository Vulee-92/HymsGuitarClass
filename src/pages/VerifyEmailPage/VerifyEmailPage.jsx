import { Avatar,Box,Button,Container,Link,Typography } from '@mui/material'
import { styled } from '@mui/styles';
import { Assets } from 'configs'
import styles from "./style";
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion,useMotionValue,useTransform } from "framer-motion"
import AnimationComponent from 'components/AnimationComponent/AnimationComponent';
import CButton from 'components/CButton';
const StyledContent = styled('div')(({ theme }) => ({
	maxWidth: 480,
	margin: '0 auto',
	display: 'flex',
	height: "100vh",
	justifyContent: 'center',
	flexDirection: 'column',
	alignItems: "center"
}));
const VerifyEmailPage = () => {
	const classes = styles();
	return (
		<>
			<Helmet>
				<title> Verify Email </title>
			</Helmet>

			<Container>
				<StyledContent>
					<motion.div
						initial={{ y: 0,opacity: 0 }}
						animate={{ y: 10,opacity: 1 }}
						transition={{ duration: 1,delay: 0.5 }}
					>
						<Typography className={classes.txtHeaderTitle}> Kiểm tra Email</Typography>

						<Typography className={classes.txtTilteInfoContact} style={{ fontSize: 18,textAlign: "center" }}>
							Chúng tôi đã gửi cho bạn một liên kết kích hoạt. Đừng quên kiểm tra cả thư mục rác nhé!

						</Typography>
						<Box style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: "center"
						}}>
							<Box sx={{
								display: 'flex',
								justifyContent: 'space-evenly',
								backgroundColor: "rgb(67, 110, 103)",
								padding: "0px 0px 0px 10px",
								borderTopLeftRadius: "10px",
								borderTopRightRadius: "40px",
								borderBottomRightRadius: "5px",
								borderBottomLeftRadius: "5px",
							}}>

								<Box
									component="img"
									src={Assets.logoEmail}
									sx={{ height: 30,my: { xs: 1,sm: 3 } }}
								/>

								<Button sx={{ width: "40%" }} className={classes.conBtn} href="https://mail.google.com/mail/u/0/#search/from%3A(hymnsguitarclass%40gmail.com)+in%3Aanywhere" target="_blank" >
									Open
								</Button>

							</Box>
						</Box>
					</motion.div>

				</StyledContent>
			</Container>
		</>


	)
}

export default VerifyEmailPage