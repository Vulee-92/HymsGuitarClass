/** LIBRARY */
import React from 'react';
import { Button,CircularProgress,Typography } from '@mui/material';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/** COMMON */
import { Colors } from '../../utils/colors';
import CStyles from '../../utils/common';
import { LoadingButton } from '@mui/lab'
/** STYLES */
import styles from './style';

const CButton = ({
	loading = false,
	onClick = () => { },
	title = '',
	fullWidth = true,
	classNameButton = '',
	bgColor = Colors.bgLogin,
	icon = null,
	variant = 'contained',
	iconSize = 18
}) => {
	const classes = styles({ bgColor });

	/** RENDER */
	return (
		<LoadingButton fullWidth={fullWidth} className={clsx({
			[classes.conBtn]: true,
			[classNameButton]: true
		})}
			disabled={loading}
			onClick={onClick}
			variant={variant}
		>
			{loading ? (
				<CircularProgress size={34} style={{ color: Colors.white }} />
			) : (
				<>
					{icon && <FontAwesomeIcon icon={icon} fontSize={iconSize} color={Colors.white} />}
					{title !== '' &&
						<Typography sx={CStyles.txt_1_line} style={{ marginLeft: icon ? 8 : 0 }} className={classes.txtBtn}>{title}</Typography>
					}
				</>

			)}
		</LoadingButton>
	)
}

export default CButton;