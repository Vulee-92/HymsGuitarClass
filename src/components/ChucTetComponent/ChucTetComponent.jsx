import React,{ useState,useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { Assets } from 'configs';
import { Box,DialogActions,DialogContent,DialogTitle } from '@mui/material';

const ChucTetComponent = () => {
	const [open,setOpen] = useState(false);

	useEffect(() => {
		const isFirstVisit = localStorage.getItem('isFirstVisit');
		if (isFirstVisit !== "true") {
			setOpen(true);
			localStorage.setItem('isFirstVisit','false');
		}
	},[]); // Thêm mảng dependencies trống để chỉ chạy useEffect khi component được mount

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			fullWidth
			maxWidth="sm"

			sx={{ borderRadius: 30 }}
		>

			<img src={Assets.chuctet} alt="Tết Greetings" style={{ height: '100%',width: '100%' }} onClick={handleClose} />
			<Button
				sx={{
					backgroundColor: `rgb(166, 1, 0)`,
					color: "rgb(255, 207, 110)",
					borderTop: "1px solid rgb(255, 207, 110)",
					fontFamily: "Public Sans",
					fontSize: "1rem",
					fontWeight: 600,
					cursor: "pointer",
					"&:hover": {
						backgroundColor: `rgb(255, 207, 110)`,
						color: "rgb(166, 1, 0)",
					}
				}}
				onClick={handleClose}
			>
				Đóng
			</Button>

		</Dialog>
	);
};

export default ChucTetComponent;
