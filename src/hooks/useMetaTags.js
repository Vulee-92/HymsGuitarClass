import { useEffect } from 'react';

const useMetaTags = (title,description,image,url) => {
	useEffect(() => {
		const ogTitle = document.querySelector('meta[property="og:title"]');
		const ogDescription = document.querySelector('meta[property="og:description"]');
		const ogImage = document.querySelector('meta[property="og:image"]');
		const ogUrl = document.querySelector('meta[property="og:url"]');

		const metaDescription = document.querySelector('meta[name="description"]');
		const titleTag = document.querySelector('title');

		if (ogTitle) {
			ogTitle.setAttribute('content',title);
		}

		if (ogDescription) {
			ogDescription.setAttribute('content',description);
		}

		if (ogImage) {
			ogImage.setAttribute('content',image);
		}

		if (ogUrl) {
			ogUrl.setAttribute('content',url);
		}

		if (metaDescription) {
			metaDescription.setAttribute('content',description);
		}

		if (titleTag) {
			titleTag.innerText = title;
		}
	},[title,description,image,url]);
};

export default useMetaTags;
