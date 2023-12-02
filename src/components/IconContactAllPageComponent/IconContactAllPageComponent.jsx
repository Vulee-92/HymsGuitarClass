import React,{ useState,useEffect } from 'react';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { blue,green,orange,pink } from '@mui/material/colors';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledBox = styled(Box)({
	backgroundColor: blue[500],
	color: 'white',
	padding: '16px',
	borderRadius: '8px',
});

const OptionBox = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '16px',
	cursor: 'pointer',
	'&:hover': {
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
	},
});

const IconContactAllPageComponent = () => {
	const navigate = useNavigate();
	const [isPopoverOpen,setPopoverOpen] = useState(false);
	const [isPopoverOpenSVG,setPopoverOpenSVG] = useState(false);
	const [isMessengerChatOpen,setMessengerChatOpen] = useState(false);

	const handleIconClick = () => {
		setPopoverOpen(!isPopoverOpen);
	};

	const handleOptionClick = (option) => {
		setPopoverOpen(false);

		if (option === 'messenger') {
			const messengerElement = document.querySelector('.fb_dialog_advanced');
			console.log("messengerElement",messengerElement)
			if (messengerElement) {
				messengerElement.style.display = 'block';
				setMessengerChatOpen(true);
				setPopoverOpenSVG(true);
			} else {
				console.error('Messenger element not found.');
				// Thực hiện xử lý khác nếu cần thiết khi element không được tìm thấy.
			}
		}
	};



	const handleClosePopover = () => {
		setPopoverOpen(false);
	};
	useEffect(() => {
		// Tạo một instance của MutationObserver với một callback
		const mutationObserver = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				// Kiểm tra xem class "fb_dialog_advanced" có được thêm vào không
				if (mutation.target.classList.contains('fb_dialog_advanced') || mutation.target.classList.contains('welcomePageModalSheetContent')) {
					// Ẩn phần tử
					mutation.target.style.display = isMessengerChatOpen ? 'block' : 'none';


				}
			});
		});

		// Chọn phần tử mà bạn muốn theo dõi (có thể là body hoặc một phần tử khác)
		const targetNode = document.body;

		// Cấu hình cho MutationObserver
		const config = { attributes: true,childList: true,subtree: true };

		// Bắt đầu theo dõi sự thay đổi
		mutationObserver.observe(targetNode,config);

		// Hủy theo dõi khi component unmount
		return () => {
			mutationObserver.disconnect();
		};
	},[isMessengerChatOpen]);




	return (
		<div style={{ position: 'fixed',bottom: '20px',right: '20px',zIndex: '1000' }}>
			{!isPopoverOpenSVG && (
				<div
					style={{
						width: '44px',
						height: '44px',
						backgroundColor: '#245C4F',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: '44px',
					}}
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 36 36"
						style={{ cursor: 'pointer',fill: 'white' }}
						onClick={handleIconClick}
					>
						<path d="M34.5 17.2554C34.4986 26.4098 27.5895 33.1113 17.9997 33.1113C16.4018 33.1113 14.8796 32.9689 13.4516 32.6202C12.2642 32.3306 11.0245 32.3602 9.86671 32.755L4.3643 34.4437C3.47806 34.7463 2.61794 33.8851 2.9184 32.9648L4.01091 29.3489C4.42 28.095 4.26117 26.7193 3.57432 25.5988C2.12085 23.2265 1.50069 20.3926 1.5 17.2554V17.254V17.2526C1.50138 8.09894 8.41049 1.50537 17.9997 1.50537C27.5895 1.50537 34.4986 8.09894 34.5 17.2526V17.254V17.2554Z"></path>
					</svg>
				</div>
			)}
			{isMessengerChatOpen && (
				<div>
					<div id="fb-root"></div>
					<div id="fb-customer-chat" className="fb-customerchat"></div>
				</div>
			)}

			<Popover
				open={isPopoverOpen}
				onClose={handleClosePopover}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<StyledBox>
					<Typography variant="h6">Liên Hệ Chúng Tôi</Typography>
					<OptionBox>
						<Typography variant="subtitle1">Gọi cho chúng tôi</Typography>
						<Typography variant="body2">
							Gọi +84 90 904 36 19 từ 11am đến 7pm để được giải đáp mọi thắc mắc.
						</Typography>
					</OptionBox>
					<OptionBox
						style={{ backgroundColor: green[500] }}
						onClick={() => window.location.href = 'tel:0986320932'}
					>
						<Typography variant="subtitle1">Call</Typography>
					</OptionBox>

					<OptionBox style={{ backgroundColor: orange[500] }} onClick={() => handleOptionClick('messenger')}>
						<Typography variant="subtitle1">Messenger</Typography>
					</OptionBox>
					<OptionBox style={{ backgroundColor: pink[500] }}>
						<Typography variant="subtitle1">Zalo</Typography>
					</OptionBox>
					<OptionBox style={{ backgroundColor: pink[500] }} onClick={() => navigate('/contact')}>
						<Typography variant="subtitle1">Email</Typography>
					</OptionBox>
					<Typography variant="subtitle1">Câu Hỏi Thường Gặp</Typography>
				</StyledBox>
			</Popover>
		</div>
	);
};

export default IconContactAllPageComponent;
