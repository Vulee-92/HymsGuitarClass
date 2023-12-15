export const isJsonString = (data) => {
	try {
		JSON.parse(data);
	} catch (error) {
		return false;
	}
	return true;
};
export const getBase64 = (file) =>
	new Promise((resolve,reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

export function getItem(label,key,icon,children,type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	};
}
export const renderOptions = (arr) => {
	let results = [];
	if (arr) {
		results = arr?.map((opt) => {
			return {
				value: opt,
				label: opt,
			};
		});
	}
	results.push({
		label: "Thêm type",
		value: "add_type",
	});
	return results;
};

export const convertPrice = (price) => {
	try {
		const result = price?.toLocaleString().replaceAll(",",".");
		return `${result} ₫`;
	} catch (error) {
		return null;
	}
};
export const calculateDiscountedPrice = (product) => {
	if (!product || typeof product.price !== 'number' || typeof product.discount !== 'number') {
		console.error('Invalid product information');
		return null;
	}

	const { price,discount } = product;
	if (discount === 0) {
		return convertPrice(price);
	}

	const discountAmount = (price * discount) / 100;
	const discountedPrice = price - discountAmount;

	return convertPrice(discountedPrice);
};

export const calculateDiscountedPriceNoConvert = (product) => {
	if (!product || typeof product.price !== 'number' || typeof product.discount !== 'number') {
		console.error('Invalid product information');
		return null;
	}

	const { price,discount } = product;
	if (discount === 0) {
		return price;
	}

	const discountAmount = (price * discount) / 100;
	const discountedPrice = price - discountAmount;

	return discountedPrice;

};