import { useEffect,useState } from "react";

function usePageLoader(Page) {
	const [isPageLoaded,setIsPageLoaded] = useState(false);

	useEffect(() => {
		setIsPageLoaded(false);
		const fetchData = async () => {
			await Page.preload();
			setIsPageLoaded(true);
		};
		fetchData();
	},[Page]);

	return isPageLoaded;
}

export default usePageLoader;