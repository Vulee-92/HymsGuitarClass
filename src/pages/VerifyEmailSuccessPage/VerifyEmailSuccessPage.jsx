import React,{ useEffect,useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { motion,useMotionValue,useTransform } from "framer-motion"
import * as UserService from "../../services/UserService";
import { Helmet } from 'react-helmet-async';
import { Box,Button,Container,Typography } from '@mui/material';
import { CircularProgress } from 'components/CircularProgress/CircularProgress';
import { styled } from '@mui/styles';
import styles from "./style";
import CButton from 'components/CButton';
import Typical from 'react-typical';
import confetti from 'canvas-confetti';
const StyledContent = styled('div')(({ theme }) => ({
	maxWidth: 480,
	margin: '0 auto',
	display: 'flex',
	height: "70vh",
	justifyContent: 'center',
	flexDirection: 'column',
	alignItems: "center"
}));
const VerifyEmailSuccessPage = () => {
	const classes = styles();
	const [countdown,setCountdown] = useState(9);
	const [showLoader,setShowLoader] = useState(true);
	const [showTransition,setShowTransition] = useState(false);


	const navigate = useNavigate();
	let { userId,code } = useParams();
	useEffect(() => {
		let isMounted = true;
		setTimeout(() => {
			setShowLoader(false);
		},3000);

		UserService.verifyUser(userId,code)
			.then(response => {
				if (isMounted && response) {
					setShowButton(true);

					const countdownInterval = setInterval(() => {

						setCountdown(prev => prev - 1);

					},1000);

					setTimeout(() => {

						navigate('/');
					},countdown * 1000);

					return () => {
						clearInterval(countdownInterval);
						isMounted = false;
					};
				}
			})
			.catch(error => {
				console.error(error);
			});
	},[userId,code,navigate]);
	let progress = useMotionValue(180)
	const [showButton,setShowButton] = useState(false);

	return (
		<>
			<Helmet>
				<title> Verify Email </title>
			</Helmet>
			{/* {showLoader && ( */}
			<Container >
				{showLoader && (
					<Box className={classes.boxVerify}>
						<Typical
							steps={['Đang xác minh...',2000]}
							loop={Infinity}
							wrapper="p"
							className={classes.conTextCreate}
						/>
					</Box>
					// <Typography className={classes.conTextCreate}>

					// </Typography>
				)}
				<StyledContent>

					{!showLoader && (
						<motion.div
							initial={{ y: 0 }} // Sử dụng y thay vì x
							animate={{ y: showButton ? 100 : 0 }} // Di chuyển lên trên
							style={{ y: progress }} // Bạn có thể giữ nguyên yếu tố tiến trình
							transition={{ duration: 1 }}
						>
							<CircularProgress progress={progress} />
						</motion.div>
					)}
					{!showLoader && showButton && (
						<motion.div
							initial={{ y: 0,opacity: 0 }}
							animate={{ y: 100,opacity: 1 }}
							transition={{ duration: 0.5,delay: 1 }}
							onAnimationComplete={() => {
								// Thêm hiệu ứng pháo bông khi animation hoàn thành
								confetti({
									particleCount: 300,
									spread: 100,
									decay: 0.9,
									gravity: 3,
									ticks: 1000,
									scalar: 1,
									origin: { x: 0.5,y: 0.5 }, // Điều chỉnh giá trị x để đặt vị trí bắn ở góc màn hình trái
								});

							}}
						>
							<Box textAlign="center">
								<Typography className={classes.txtTilteInfoContact}  >
									Tài khoản của bạn đã được xác minh!
								</Typography>
								<CButton style={{ fullWidth: "30%" }}
									title={`Trang chủ (${countdown}s)`}
									onClick={() => navigate('/')}
									className={classes.hoverbutton}
								/>
							</Box>
						</motion.div>
					)}
					{showTransition && (
						<motion.div
							initial={{ opacity: 0,y: '100%' }}
							animate={{ opacity: 1,y: 0 }}
							exit={{ opacity: 0,y: '100%' }}
							transition={{ duration: 1 }}
							style={{
								position: 'fixed',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: 'blue', // Màu nền của hiệu ứng
							}}
						>
							{/* Nội dung hiển thị */}
							<Typography variant="h4">Welcome to the Homepage</Typography>
						</motion.div>
					)}
				</StyledContent>
			</Container>

			{/* )} */}
		</>
	);
};

export default VerifyEmailSuccessPage;


