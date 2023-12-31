

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
const ConfirmPaymentPage = lazy(() => import("../pages/ConfirmPaymentPage/ConfirmPaymentPage"));
const ForgotPassordPage = lazy(() => import("../pages/ForgotPassordPage/ForgotPassordPage"));
const SendEmailForgotPasswordSuccess = lazy(() => import("../pages/SendEmailForgotPasswordSuccess/SendEmailForgotPasswordSuccess"));
const ChangePassword = lazy(() => import("../pages/ChangePassword/ChangePassword"));
const ResetPasswordPage = lazy(() => import("../pages/ResetPasswordPage/ResetPasswordPage"));
const ResetPasswordDonePage = lazy(() => import("../pages/ResetPasswordDonePage/ResetPasswordDonePage"));
const CategoryProductPage = lazy(() => import("../pages/CategoryProductPage/CategoryProductPage"));

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
		path: "/change-password",
		page: ChangePassword,
		isShowHeader: true,
	},
	{
		path: "/verify/:userId/:code",
		page: VerifyEmailSuccessPage,
	},
	{
		path: "/reset-password/:id/:tokenReset",
		page: ResetPasswordPage,
		isShowHeader: true,
	},
	{
		path: "/reset-password/done",
		page: ResetPasswordDonePage,
		isShowHeader: true,
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
		// isShowHeader: true,
	},
	{
		path: "/payment-ship",
		page: ConfirmPaymentPage,
		// isShowHeader: true,
	},

	{
		path: "/order-success/:id",
		page: OrderSuccess,
		// isShowHeader: true,
	},
	{
		path: "/product/:id?",
		page: ProductsPage,
		isShowHeader: true,
		isShowFooter: true,
	},


	{
		path: "category",
		page: CategoryProductPage,
		isShowHeader: true,
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
		path: "/recover-password",
		page: ForgotPassordPage,
		isShowHeader: true,
		isShowFooter: true,
	},
	{
		path: "/recover-password/sent",
		page: VerifyEmailPage,
		// isShowHeader: true,
		// isShowFooter: true,
	},

	{
		path: "/sign-up",
		page: SignUpPage,
		isShowHeader: true,
		isShowFooter: true,
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
