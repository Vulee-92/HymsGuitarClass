import { useState } from 'react';
import { Drawer,Typography,Button } from '@mui/material';

function ProductNotification({ countInStock,handleNotificationRequest,handleClose }) {
	const [open,setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<Drawer
			anchor='bottom'
			open={open}
			onClose={handleClose}
		>
			<div style={{ padding: '20px' }}>
				<Typography variant="h6" gutterBottom>
					Thông báo
				</Typography>
				{countInStock ? (
					<Typography paragraph>
						Sản phẩm hiện đang hết hàng. Bấm vào nút bên dưới để nhận thông báo khi sản phẩm có hàng.
					</Typography>
				) : (
					<Typography paragraph>
						Cảm ơn! Chúng tôi sẽ thông báo cho bạn khi sản phẩm có hàng.
					</Typography>
				)}
				{countInStock && (
					<Button variant="contained" color="primary" onClick={handleNotificationRequest}>
						Nhận thông báo khi có hàng
					</Button>
				)}
			</div>
		</Drawer>
	);
}

export default ProductNotification;
