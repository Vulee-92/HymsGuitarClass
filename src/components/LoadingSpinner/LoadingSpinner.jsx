import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingSpinner = () => {
	return (
		<Box style={{ display: 'flex',justifyContent: 'center',alignItems: 'center',height: '100vh' }}>
			<CircularProgress
				color="success"
				fourColor
				variant="indeterminate"
			/>
		</Box>
	);
};

export default LoadingSpinner;
