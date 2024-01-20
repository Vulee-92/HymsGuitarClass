// CategoryList.js

import React from 'react';
import { Helmet } from 'react-helmet';

const CategoryList = () => {
	// Dữ liệu Schema.org JSON-LD cho danh sách danh mục

	const categories = [
		{
			name: 'Trang chủ',
			url: 'https://www.hymnscenter.com/',
			description: 'Khám phá thế giới âm nhạc với Hymns Center - Trải nghiệm mua sắm nhạc cụ và phụ kiện nhanh chóng, dễ dàng cùng chất lượng đỉnh cao.'
		},
		{
			name: 'Sản phẩm',
			url: 'https://www.hymnscenter.com/product/',
			description: 'Duyệt qua danh sách sản phẩm đa dạng tại Hymns Center - Chất lượng và độ chính xác cho người chơi âm nhạc từ người chơi âm nhạc.'
		},
		{
			name: 'Tin tức',
			url: 'https://www.hymnscenter.com/blog',
			description: 'Cập nhật tin tức mới nhất về thế giới âm nhạc và cộng đồng Hymns Center - Nơi chia sẻ kiến thức và đam mê âm nhạc.'
		},
		{
			name: 'Liên hệ',
			url: 'https://www.hymnscenter.com/contact',
			description: 'Liên hệ với chúng tôi để được hỗ trợ và tư vấn - Hymns Center sẵn lòng đồng hành cùng bạn trên hành trình âm nhạc.'
		},
		// Thêm các danh mục khác vào đây
	];


	const schemaData = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		"itemListElement": categories.map((category,index) => ({
			"@type": "ListItem",
			"position": index + 1,
			"name": category.name,
			"url": category.url,
			"description": category.description
			// Thêm các thuộc tính khác tùy thuộc vào loại dữ liệu
		}))
	};

	return (
		<div>
			{/* Hiển thị danh sách danh mục */}
			<ul>
				{categories.map((category,index) => (
					<li key={index}>{category.name}</li>
				))}
			</ul>

			{/* Thêm dữ liệu Schema.org vào thẻ head */}
			<Helmet>
				<script type="application/ld+json">
					{JSON.stringify(schemaData)}
				</script>
			</Helmet>
		</div>
	);
};

export default CategoryList;
