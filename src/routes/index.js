
import { lazy } from "react";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const ProductDetailsPage = lazy(() => import("../pages/ProductDetailsPage/ProductDetailsPage"));
const ProductsPage = lazy(() => import("../pages/ProductsPage/ProductsPage"));
const SignInPage = lazy(() => import("../pages/SignInPage/SignInPage"));
const SignUpPage = lazy(() => import("../pages/SignUpPage/SignUpPage"));
const TypeProductPage = lazy(() => import("../pages/TypeProductPage/TypeProductPage"));
const OrderSuccess = lazy(() => import("../pages/OderSuccess/OderSuccess"));
const Profile = lazy(() => import("../pages/profile"));

const Dashboard = lazy(() => import("../pages/Dashboard/DashboardAppPage"));
const OrderPage = lazy(() => import("../pages/OderPage/OderPage"));
const PaymentPage = lazy(() => import("../pages/PaymentPage/PaymentPage"));
const MyOrderPage = lazy(() => import("../pages/MyOderPage/MyOderPage"));
const DetailsOrderPage = lazy(() => import("../pages/DetailsOrderPage/DetailsOrderPage"));
const ContactPage = lazy(() => import("../pages/ContactPage/ContactPage"));
const AboutPage = lazy(() => import("../pages/AboutPage/AboutPage"));
const BlogUserPage = lazy(() => import("../pages/BlogUserPage/BlogUserPage"));
const BlogDetailsPage = lazy(() => import("../pages/BlogDetailPage/BlogDetailPage"));
const VerifyEmailPage = lazy(() => import("../pages/VerifyEmailPage/VerifyEmailPage"));
const VerifyEmailSuccessPage = lazy(() => import("../pages/VerifyEmailSuccessPage/VerifyEmailSuccessPage"));
export const routes = [
	{
		path: "/",
		page: HomePage,
		isShowHeader: true,
		isShowFooter: true,
	},

	{
		path: "/profile",
		page: Profile,
		isShowHeader: true,
	},
	{
		path: "/verify/:userId/:code",
		page: VerifyEmailSuccessPage,
	},
	{
		path: "/verify",
		page: VerifyEmailPage,
	},
	{
		path: "/blog",
		page: BlogUserPage,
		isShowHeader: true,
	},
	{
		path: "/about",
		page: AboutPage,
		isShowHeader: true,
	},
	{
		path: "/contact",
		page: ContactPage,
		isShowHeader: true,
	},

	{
		path: "/order",
		page: OrderPage,
		isShowHeader: true,
	},
	{
		path: "/details-order/:id",
		page: DetailsOrderPage,
		isShowHeader: true,
	},

	{
		path: "/my-order",
		page: MyOrderPage,
		isShowHeader: true,
	},
	{
		path: "/payment",
		page: PaymentPage,
		isShowHeader: true,
	},
	{
		path: "/order-success",
		page: OrderSuccess,
		isShowHeader: true,
	},
	{
		path: "/product/:type?",
		page: ProductsPage,
		isShowHeader: true,
		isShowFooter: true,
	},

	{
		path: "product/:type",
		page: TypeProductPage,
		isShowHeader: true,
	},
	{
		path: "/login",
		page: SignInPage,
		isShowHeader: true,
		isShowFooter: true,
	},
	{
		path: "/sign-up",
		page: SignUpPage,
		isShowHeader: true,
		isShowFooter: true,
	},

	{
		path: "/system/admin",
		page: Dashboard,
		isShowHeader: false,
		isPrivate: true,
	},

	{
		path: "/product-details/:id",
		page: ProductDetailsPage,
		isShowHeader: true,
		isShowFooter: true,
	},
	{
		path: "/blog-details/:id",
		page: BlogDetailsPage,
		isShowHeader: true,
		isShowFooter: true,
	},
	{
		path: "*",
		page: NotFoundPage,
	},
];
