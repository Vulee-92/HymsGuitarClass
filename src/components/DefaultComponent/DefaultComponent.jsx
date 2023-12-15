import React,{ useState,useEffect } from 'react'
import HeaderComponent from '../HeaderComponents/HeaderComponent'
import FooterComponent from '../FooterComponent/FooterComponent'
import Loading from 'components/LoadingComponent/Loading'

const DefaultComponent = ({ children }) => {
	const [isLoading,setIsLoading] = useState(true);
	const [isLoaded,setIsLoaded] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
			setIsLoading(false);
		},2000); // Thay 1000 bằng thời gian loading của bạn
	},[]);

	return (
		<div>
			{isLoading ? (
				<Loading isLoading={isLoading} />
			) : (
				<>
					{isLoaded && <HeaderComponent />}
					{children}
					{isLoaded && <FooterComponent />}
				</>
			)}
		</div>
	)
}

export default DefaultComponent
// import React,{ useState,useEffect } from 'react';
// import HeaderComponent from '../HeaderComponents/HeaderComponent';
// import FooterComponent from '../FooterComponent/FooterComponent';
// import Loading from 'components/LoadingComponent/Loading';
// import audios from '../../assets/audio/audiowellcome.mp3'
// const DefaultComponent = ({ children }) => {
// 	const [isLoading,setIsLoading] = useState(true);
// 	const [isLoaded,setIsLoaded] = useState(false);

// 	useEffect(() => {
// 		const audio = new Audio(audios);
// 		// Hàm để phát âm thanh và cập nhật trạng thái
// 		const playSoundAndSetLoaded = () => {
// 			audio.play();
// 			setIsLoaded(true);
// 			setIsLoading(false);
// 		};

// 		// Lắng nghe sự kiện click hoặc một sự kiện tương tác khác
// 		const handleUserInteraction = () => {
// 			playSoundAndSetLoaded();
// 			// Gỡ bỏ lắng nghe sự kiện để tránh chạy nhiều lần
// 			window.removeEventListener('click',handleUserInteraction);
// 		};

// 		// Thêm lắng nghe sự kiện click vào window
// 		window.addEventListener('click',handleUserInteraction);

// 		return () => {
// 			// Gỡ bỏ lắng nghe sự kiện khi component unmount
// 			window.removeEventListener('click',handleUserInteraction);
// 		};
// 	},[]);

// 	return (
// 		<div>
// 			{isLoading ? (
// 				<Loading isLoading={isLoading} />
// 			) : (
// 				<>
// 					{isLoaded && <HeaderComponent />}
// 					{children}
// 					{isLoaded && <FooterComponent />}
// 				</>
// 			)}
// 		</div>
// 	);
// };

// export default DefaultComponent;
