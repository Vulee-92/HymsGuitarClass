// component
import SvgColor from '../../../../components/svg-color';
import { Assets } from 'configs';


// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={Assets[name]?.default} sx={{ width: 1,height: 1 }} />;

const navConfig = [
	{
		title: 'Trang chủ',
		path: '/',
		icon: icon('ic_analytics'),
	},
	{
		title: 'Giới thiệu',
		path: '/about',
		icon: icon('ic_user'),
	},
	{
		title: 'Sản phẩm',
		path: '/category',
		icon: icon('ic_cart'),
		// children: [
		// 	{
		// 		title: 'Tất cả',
		// 		path: 'product',
		// 		icon: icon('ic_cart'), // Thay icon tùy thích
		// 	},
		// 	{
		// 		title: 'Phụ kiện',
		// 		path: '/product/Phu_kien',
		// 		icon: icon('ic_cart'), // Thay icon tùy thích
		// 	},
		// 	{
		// 		title: 'Acoustic Guitars',
		// 		path: '/product/Acoustic_Guitars',
		// 		icon: icon('ic_cart'), // Thay icon tùy thích
		// 	}

		// ]
	},
	{
		title: 'Blog',
		path: '/blog',
		icon: icon('ic_blog'),
		// children: [
		// 	{
		// 		title: 'List',
		// 		path: '/dashboard/blog',
		// 		icon: icon('ic_cart'), // Thay icon tùy thích
		// 	},
		// 	{
		// 		title: 'Table',
		// 		path: '/dashboard/blogs-table',
		// 		icon: icon('ic_cart'), // Thay icon tùy thích
		// 	},
		// 	{
		// 		title: 'Create',
		// 		path: '/dashboard/blog-create',
		// 		icon: icon('ic_cart'), // Thay icon tùy thích
		// 	}

		// ]
	},
	{
		title: 'Liên hệ',
		path: '/contact',
		icon: icon('ic_blog'),
	},


];

export default navConfig;
