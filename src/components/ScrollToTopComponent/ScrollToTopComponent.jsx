import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTopComponent() {
	const { pathname } = useLocation();

	useEffect(() => {
		if (!(pathname === '/product' || pathname.includes('/product/'))) {
			window.scrollTo(0,0);
		}
	},[pathname]);

	return null;
}

export default ScrollToTopComponent;
