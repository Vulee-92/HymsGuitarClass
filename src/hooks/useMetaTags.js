import { useEffect } from 'react';

const useMetaTags = (title,description,image) => {
	useEffect(() => {
		const ogTitle = document.querySelector('meta[property="og:title"]');
		const ogDescription = document.querySelector('meta[property="og:description"]');
		const ogImage = document.querySelector('meta[property="og:image"]');

		if (ogTitle) {
			ogTitle.setAttribute('content',title);
		}

		if (ogDescription) {
			ogDescription.setAttribute('content',description);
		}

		if (ogImage) {
			ogImage.setAttribute('content',image);
		}
	},[title,description,image]);
};

export default useMetaTags;
