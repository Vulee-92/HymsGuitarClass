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
		},1000); // Thay 1000 bằng thời gian loading của bạn
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
