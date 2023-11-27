import React,{ useState,useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { css } from '@emotion/react';  // Thêm dòng này
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck,faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './style';
const TrackerBox = styled('div')({
	marginTop: '16px',
	display: 'flex',
	flexDirection: 'column',
});

const ValidationItem = styled('div')(({ theme,validated }) => css`  // Sửa dòng này
  display: flex;
  alignItems: center;
  .list-icon {
    margin-right: ${theme.spacing(1)};
  }
`);

const PasswordCheckerComponent = ({ password }) => {
	const [lowerValidated,setLowerValidated] = useState(false);
	const [upperValidated,setUpperValidated] = useState(false);
	const [numberValidated,setNumberValidated] = useState(false);
	const [specialValidated,setSpecialValidated] = useState(false);
	const [lengthValidated,setLengthValidated] = useState(false);
	const classes = styles();
	const handleChange = (value) => {
		const lower = new RegExp('(?=.*[a-z])');
		const upper = new RegExp('(?=.*[A-Z])');
		const number = new RegExp('(?=.*[0-9])');
		const special = new RegExp('(?=.*[!@#\$%\^&\*])');
		const length = new RegExp('(?=.{8,})');

		setLowerValidated(lower.test(value));
		setUpperValidated(upper.test(value));
		setNumberValidated(number.test(value));
		setSpecialValidated(special.test(value));
		setLengthValidated(length.test(value));
	};

	useEffect(() => {
		handleChange(password);
	},[password]);

	return (

		<TrackerBox >
			<ValidationItem validated={lowerValidated}>
				<Typography className={classes.txtStrongPassword} >
					{lowerValidated ? <FontAwesomeIcon icon={faCircleCheck} color='#212B36' style={{ marginRight: 5 }} /> : <FontAwesomeIcon icon={faCircleXmark} color='red' style={{ marginRight: 5 }} />}
				</Typography>
				Ít nhất một chữ thường
			</ValidationItem>
			<ValidationItem validated={upperValidated}>
				<Typography className={classes.txtStrongPassword}>
					{upperValidated ? <FontAwesomeIcon icon={faCircleCheck} color='#212B36' style={{ marginRight: 5 }} /> : <FontAwesomeIcon icon={faCircleXmark} color='red' style={{ marginRight: 5 }} />}
				</Typography>
				Ít nhất một chữ in hoa
			</ValidationItem>
			<ValidationItem validated={numberValidated}>
				<Typography className={classes.txtStrongPassword}>
					{numberValidated ? <FontAwesomeIcon icon={faCircleCheck} color='#212B36' style={{ marginRight: 5 }} /> : <FontAwesomeIcon icon={faCircleXmark} color='red' style={{ marginRight: 5 }} />}
				</Typography>
				Ít nhất một số
			</ValidationItem>
			<ValidationItem validated={specialValidated}>
				<Typography className={classes.txtStrongPassword}>
					{specialValidated ? <FontAwesomeIcon icon={faCircleCheck} color='#212B36' style={{ marginRight: 5 }} /> : <FontAwesomeIcon icon={faCircleXmark} color='red' style={{ marginRight: 5 }} />}
				</Typography>
				Ít nhất một ký tự đặc biệt
			</ValidationItem>
			<ValidationItem validated={lengthValidated}>
				<Typography className={classes.txtStrongPassword}>
					{lengthValidated ? <FontAwesomeIcon icon={faCircleCheck} color='#212B36' style={{ marginRight: 5 }} /> : <FontAwesomeIcon icon={faCircleXmark} color='red' style={{ marginRight: 5 }} />}
				</Typography>
				Ít nhất 8 ký tự
			</ValidationItem>
		</TrackerBox>


	);
};

export default PasswordCheckerComponent;
