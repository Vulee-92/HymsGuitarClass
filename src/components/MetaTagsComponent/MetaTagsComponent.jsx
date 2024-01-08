import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const MetaTagsComponent = ({ productDetails }) => {
	const isProductDetailPage = !!productDetails;

	useEffect(() => {
		Helmet.addMetaTags([
			<title key="title">{isProductDetailPage ? productDetails.name : "Hymns Center"}</title>,
			<meta
				key="description"
				name="description"
				content={
					isProductDetailPage
						? productDetails.name
						: "Trải Nghiệm Mua Sắm Nhạc Cụ Và Phụ Kiện Nhanh Chóng, Dễ Dàng Với Hymns"
				}
			/>,
			isProductDetailPage ? (
				<>
					<meta key="og:image:alt" property="og:image:alt" content={productDetails.name} />
					<meta key="og:title" property="og:title" content={productDetails.name} />
					<meta key="og:image:width" property="og:image:width" content="450" />
					<meta key="og:image:height" property="og:image:height" content="298" />
					<meta key="og:description" property="og:description" content={productDetails.name} />
					<meta key="og:image" property="og:image" content={productDetails.image[0]} />
					<meta
						key="og:url"
						property="og:url"
						content={`https://www.hymnscenter.com/product-details/${productDetails.slug}`}
					/>
					<meta key="og:type" property="og:type" content="product" />
				</>
			) : (
				<>
					<meta key="og:image:width" property="og:image:width" content="450" />
					<meta key="og:image:height" property="og:image:height" content="298" />
					<meta
						key="og:description"
						property="og:description"
						content="Trải Nghiệm Mua Sắm Nhạc Cụ Và Phụ Kiện Nhanh Chóng, Dễ Dàng Với Hymns"
					/>
					<meta
						key="og:image"
						property="og:image"
						content="https://www.hymnscenter.com/static/media/hymnsFacebook.26775ee55ed78a50abc2.webp"
					/>
					<meta
						key="og:image:alt"
						property="og:image:alt"
						content="Hymns Center - Trung tâm dạy đàn và mua sắm nhạc cụ"
					/>
					<meta key="og:url" property="og:url" content="https://www.hymnscenter.com" />
					<meta key="og:type" property="og:type" content="article" />
				</>
			),
		]);
	},[isProductDetailPage,productDetails]);
};

export default MetaTagsComponent;
