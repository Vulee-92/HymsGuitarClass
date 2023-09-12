// import { Spin } from 'antd';
// import React,{ useState,useEffect } from 'react';
// import electric from '../../assets/loading/electric-guitar.gif';
// import styles from "./stylemui";
// import Typical from 'react-typical';
// import { Assets } from 'configs';
// import { Box } from '@mui/material';
// const Loading = ({ children,isLoading,deday = 10 }) => {
// 	const classes = styles();
// 	const [typicalVisible,setTypicalVisible] = useState(true);

// 	// useEffect(() => {
// 	// 	if (!isLoading) {
// 	// 		setTypicalVisible(false);
// 	// 		document.body.classList.remove('loading');
// 	// 	} else {
// 	// 		document.body.classList.add('loading');
// 	// 	}
// 	// },[isLoading]);
// 	const antIcon = <div style={{
// 		fontSize: 24,
// 		background: `url(${electric}) no-repeat 50% 50%`,
// 		backgroundSize: '5em',
// 		pointerEvents: 'none',
// 		opacity: 0.4,
// 		position: 'fixed',
// 		zIndex: 100000,
// 		top: 0,
// 		left: 0,
// 		right: 0,
// 		height: "100%",
// 		width: "100%"
// 	}
// 	}></div >;
// 	return (
// 		<>
// 			{/* <Typical
// 							className={classes.textLoading}
// 							steps={['Hymns...',2000,'Please wait...',1000]}
// 							loop={Infinity}
// 							wrapper="p"
// 							delay={1000}
// 						/> */}
// 			<Spin
// 				className={classes.spinner}
// 				indicator={
// 					antIcon
// 				}
// 				spinning={isLoading}
// 				delay={deday}
// 			>
// 				{children}
// 			</Spin>
// 		</>
// 	);
// }

// export default Loading;



import React,{ useState,useEffect } from 'react';
import { Spin } from 'antd';
import electric1 from '../../assets/loading/guitarloadingmini1.png';
import electric2 from '../../assets/loading/guitarloadingmini2.png';
import electric3 from '../../assets/loading/guitarloadingmini3.png';
import electric4 from '../../assets/loading/guitarloadingmini4.png';
import electric5 from '../../assets/loading/guitarloadingmini5.png';
import electric6 from '../../assets/loading/guitarloadingmini6.png';
import electric7 from '../../assets/loading/guitarloadingmini7.png';
import electric8 from '../../assets/loading/guitarloadingmini8.png';
import electric9 from '../../assets/loading/guitarloadingmini9.png';
import styles from './stylemui';

const Loading = ({ children,isLoading,delay = 10 }) => {
	const classes = styles();
	const [spinIndex,setSpinIndex] = useState(0);
	const [loadedImages,setLoadedImages] = useState([]);

	useEffect(() => {
		const loadImages = async () => {
			const images = [electric1,electric2,electric3,electric4,electric5,electric6,electric7,electric8,electric9];
			const promises = images.map((image) => {
				return new Promise((resolve) => {
					const img = new Image();
					img.onload = () => {
						resolve(image);
					};
					img.src = image;
				});
			});
			const loadedImages = await Promise.all(promises);
			setLoadedImages(loadedImages);
		};
		loadImages();
	},[]);

	useEffect(() => {
		if (loadedImages.length > 0) {
			const interval = setInterval(() => {
				setSpinIndex((spinIndex) => (spinIndex + 1) % loadedImages.length);
			},200); // Thời gian chờ giữa các lần cập nhật chỉ số là 200ms

			return () => clearInterval(interval);
		}
	},[loadedImages]);

	const antIcon = <div style={{
		background: `url(${loadedImages[spinIndex]}) no-repeat center center`,
		backgroundSize: '100px 100px',
		width: '100%',
		height: '100%',
		pointerEvents: 'none',
		position: 'fixed',
		zIndex: 100000,
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	}}></div>;

	return (
		<Spin indicator={antIcon} spinning={isLoading} delay={delay}>
			{children}
		</Spin>
	);
};

export default Loading;
