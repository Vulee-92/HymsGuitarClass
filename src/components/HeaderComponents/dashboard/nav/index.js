import PropTypes from 'prop-types';
import { useEffect,useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';

// @mui
import { styled,alpha } from '@mui/material/styles';
import { Box,Link,Button,Drawer,Typography,Avatar,Stack } from '@mui/material';
// mock
import * as UserService from "../../../../services/UserService";
import { resetUser } from "../../../../redux/slides/userSlide";

// hooks
import useResponsive from '../../../../hooksResponsive/useResponsive';
// components
import Scrollbar from '../../../../components/scrollbar';
import NavSection from '../../../../components/nav-section';
//
import navConfig from './config';
import styles from "./stylemui";
import { Assets } from 'configs';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(2,2.5),
	borderRadius: Number(theme.shape.borderRadius) * 1.5,
	backgroundColor: alpha(theme.palette.grey[500],0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
	openNav: PropTypes.bool,
	onCloseNav: PropTypes.func,
};

export default function Nav({ openNav,onCloseNav }) {
	const { pathname } = useLocation();
	const user = useSelector((state) => state.user);
	const [userName,setUserName] = useState("");
	const navigate = useNavigate();
	const classes = styles();
	const [userAvatar,setUserAvatar] = useState("");
	const [isAdmin,setIsAdmin] = useState(false);
	const isDesktop = useResponsive('up','lg');
	const [loading,setLoading] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		setUserName(user?.name);
		setUserAvatar(user?.avatar);
		setIsAdmin(user?.isAdmin);
	},[user?.name,user?.avatar,user?.isAdmin]);
	useEffect(() => {
		if (openNav) {
			onCloseNav();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[pathname]);
	const handleNavigateLogin = () => {
		navigate("/login");
	};
	const handleNavigateSignin = () => {
		navigate("/sign-up");
	};
	const handleClickNavigate = (type) => {
		if (type === 'profile') {
			navigate('/profile')
		} else {
			handleNavigateLogout()
		}
	}
	const handleNavigateLogout = async () => {
		setLoading(true);
		await UserService.logoutUser();
		dispatch(resetUser());
		// Xoá cookie
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('access_token');
		document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		setLoading(false);
	};
	const renderContent = (
		<Scrollbar
			sx={{
				height: 1,
				'& .simplebar-content': { height: 1,display: 'flex',flexDirection: 'column' },
			}}
		>
			<Box sx={{ px: 2.5,py: 3,display: 'inline-flex' }}>
				<Typography className={classes.hymnsName}>
					HYMNS - CENTER
				</Typography>
			</Box>

			<Box sx={{ mb: 5,mx: 2.5 }}>
				{user?.access_token ? (
					<>
						<Link underline="none">
							<StyledAccount>
								<Avatar src={Assets.ic_user.default} alt={userAvatar} sx={{ width: .1,height: .1 }} />
								<Box sx={{ ml: 2 }}>
									<Typography className={classes.txtTilte} onClick={() => handleClickNavigate(`profile`)} >
										{userName?.length ? userName : user?.email}
									</Typography>
								</Box>
							</StyledAccount>
							<StyledAccount>
								<Avatar src={Assets.ic_cart.default} alt={userAvatar} sx={{ width: .1,height: .1 }} />

								<Box sx={{ ml: 2 }}>

									<Typography className={classes.txtTilte} onClick={() => handleClickNavigate(`profile`)} >
										Đơn hàng
									</Typography>
								</Box>
							</StyledAccount>

							<StyledAccount>
								<Avatar src={Assets.ic_lock.default} alt={userAvatar} sx={{ width: .1,height: .1 }} />

								<Box sx={{ ml: 2 }}>

									<Typography className={classes.txtTilte} onClick={() => handleClickNavigate()} >
										Đăng xuất
									</Typography>
								</Box>
							</StyledAccount>
							{!user?.access_token ? (

								<StyledAccount>
									<Avatar src={Assets.ic_user.default} alt={userAvatar} sx={{ width: .1,height: .1 }} />

									<Box sx={{ ml: 2 }}>
										<Typography className={classes.txtTilte} onClick={handleNavigateSignin} >
											Đăng ký
										</Typography>
									</Box>
								</StyledAccount>
							) : (<></>)}
						</Link>

					</>
				) : (
					<>
						<Link underline="none" style={{ marginBottom: "10px" }}>
							<StyledAccount>
								<Avatar src={Assets.ic_user.default} alt={userAvatar} sx={{ width: .1,height: .1 }} />

								<Box sx={{ ml: 2 }}>

									<Typography className={classes.txtTilte} onClick={handleNavigateLogin} >
										Đăng nhập
									</Typography>
								</Box>
							</StyledAccount>
						</Link>
						<Link underline="none">
							<StyledAccount>
								<Avatar src={Assets.ic_user.default} alt={userAvatar} sx={{ width: .1,height: .1 }} />

								<Box sx={{ ml: 2 }}>
									<Typography className={classes.txtTilte} onClick={handleNavigateSignin} >
										Đăng ký
									</Typography>
								</Box>
							</StyledAccount>
						</Link>
					</>
				)}
			</Box>
			{/* <Box sx={{ px: 2.5,display: 'inline-flex' }}>
				<Typography className={classes.pageName}>
					TRANG
				</Typography>
			</Box> */}
			<NavSection data={navConfig} />

			<Box sx={{ flexGrow: 1 }} />


		</Scrollbar>
	);

	return (
		<Box
			component="nav"
			sx={{
				flexShrink: { lg: 0 },
				width: { lg: NAV_WIDTH },
			}}
		>
			{isDesktop ? (
				<Drawer
					open
					variant="permanent"
					PaperProps={{
						sx: {
							width: NAV_WIDTH,
							bgcolor: 'background.default',
							borderRightStyle: 'dashed',
						},
					}}
				>
					{renderContent}
				</Drawer>
			) : (
				<Drawer
					open={openNav}
					onClose={onCloseNav}
					ModalProps={{
						keepMounted: true,
					}}
					PaperProps={{
						sx: { width: NAV_WIDTH },
					}}
				>
					{renderContent}
				</Drawer>
			)}
		</Box>
	);
}
