// IconContactAllPageComponent.js
import React,{ useState } from 'react';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { styled } from '@mui/system';
import { blue,green,orange,pink } from '@mui/material/colors';
import { Typography } from '@mui/material';
import MessengerChatFacebookComponent from 'components/MessengerChatFacebookComponent/MessengerChatFacebookComponent';
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
	const [isPopoverOpen,setPopoverOpen] = useState(false);
	const [anchorEl,setAnchorEl] = useState(null);
	const [isMessengerChatOpen,setMessengerChatOpen] = useState(false);
	const [selectedOption,setSelectedOption] = useState(null);
	const handleIconClick = (event) => {
		setAnchorEl(event.currentTarget);
		setPopoverOpen(!isPopoverOpen);
	};



	const handleOptionClick = (option) => {
		setPopoverOpen(false);

		if (option === 'messenger') {
			// Người dùng chọn Messenger, hiển thị MessengerChatFacebookComponent và ẩn popover và icon FontAwesome
			setMessengerChatOpen(true);
			// setIconVisible(false);
		}
	};


	const handleClosePopover = () => {
		setPopoverOpen(false);
	};
	return (
		<div style={{ position: 'fixed',bottom: '20px',right: '20px',zIndex: '1000' }}>
			<FontAwesomeIcon icon={faMessage} onClick={handleIconClick} style={{ cursor: 'pointer',marginRight: '10px' }} />


			<Popover
				open={isPopoverOpen}
				anchorEl={anchorEl}
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
						<Typography variant="body2">+84 90 904 36 19 từ 11am đến 7pm để được giải đáp mọi thắc mắc.</Typography>
					</OptionBox>
					<OptionBox style={{ backgroundColor: green[500] }} >
						<Typography variant="subtitle1">Chat</Typography>
					</OptionBox>
					<OptionBox style={{ backgroundColor: orange[500] }} onClick={() => handleOptionClick('messenger')}>
						<Typography variant="subtitle1">Messenger</Typography>
					</OptionBox>
					<OptionBox style={{ backgroundColor: pink[500] }} >
						<Typography variant="subtitle1">Email</Typography>
					</OptionBox>
					<Typography variant="subtitle1">Câu Hỏi Thường Gặp</Typography>
				</StyledBox>
			</Popover>
			{isMessengerChatOpen && <MessengerChatFacebookComponent />}
		</div>
	);
};

export default IconContactAllPageComponent;
