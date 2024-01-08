import React from 'react';
import { Helmet } from 'react-helmet-async';

function MetaTags({ productDetails }) {
	const isProductDetailPage = !!productDetails;

	return (
		<Helmet>
			<title>{isProductDetailPage ? productDetails.name : "Hymns Center"}</title>
			<meta
				name="description"
				content={isProductDetailPage ? productDetails.name : "Trải Nghiệm Mua Sắm Nhạc Cụ Và Phụ Kiện Nhanh Chóng, Dễ Dàng Với Hymns"}
			/>
			{isProductDetailPage ? (
				<>
					<meta property="og:image:alt" content={productDetails.name} />
					<meta property="og:title" content={productDetails.name} />
					<meta property="og:image:width" content="450" />
					<meta property="og:image:height" content="298" />
					<meta property="og:description" content={productDetails.name} />
					<meta property="og:image" content={productDetails.image[0]} />
					<meta property="og:image:alt" content={productDetails.name} />
					<meta property="og:url" content={`https://www.hymnscenter.com/product-details/${productDetails.slug}`} />
					<meta property="og:type" content="product" />
				</>
			) : (
				<>
					<meta property="og:image:width" content="450" />
					<meta property="og:image:height" content="298" />
					<meta property="og:description" content="Trải Nghiệm Mua Sắm Nhạc Cụ Và Phụ Kiện Nhanh Chóng, Dễ Dàng Với Hymns" />
					<meta property="og:image" content="https://www.hymnscenter.com/static/media/hymnsFacebook.26775ee55ed78a50abc2.webp" />
					<meta property="og:image:alt" content="Hymns Center - Trung tâm dạy đàn và mua sắm nhạc cụ" />
					<meta property="og:url" content="https://www.hymnscenter.com" />
					<meta property="og:type" content="article" />
				</>
			)}
		</Helmet>
	);
}

export default MetaTags;
