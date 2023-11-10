import { Typography } from '@mui/material'
import { Button } from 'antd'
import React from 'react'
import styles from './style';
const ButtonComponent = ({ size,styleButton,styleTextButton,textbutton,disabled,...rests }) => {
	const classes = styles();
	return (
		<Button
			className={classes.conBtn}
			style={{
				color: '#000',
				...styleButton,
				background: disabled ? '#ccc' : styleButton.background
			}}
			size={size}
			{...rests}
		>
			<Typography className={classes.txtBtn} style={styleTextButton}>{textbutton}</Typography>
		</Button>
	)
}

export default ButtonComponent