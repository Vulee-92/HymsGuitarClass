// import HomePage from "../pages/HomePage/HomePage";
// import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
// import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
// import ProductsPage from "../pages/ProductsPage/ProductsPage";
// import SignInPage from "../pages/SignInPage/SignInPage";
// import SignUpPage from "../pages/SignUpPage/SignUpPage";
// import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
// import OrderSuccess from "../pages/OderSuccess/OderSuccess";
// import Profile from "../pages/profile";
// import AdminPage from "../pages/AdminPage/AdminPage";
// import Dashboard from "../pages/Dashboard/DashboardAppPage";
// import OrderPage from "../pages/OderPage/OderPage";
// import PaymentPage from "../pages/PaymentPage/PaymentPage";
// import MyOrderPage from "../pages/MyOderPage/MyOderPage";
// import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";
// import ContactPage from "../pages/ContactPage/ContactPage";
// import AboutPage from "../pages/AboutPage/AboutPage";
// export const routes = [
//   {
//     path: "/",
//     page: HomePage,
//     isShowHeader: true,
//     isShowFooter: true,
//   },

//   {
//     path: "/profile",
//     page: Profile,
//     isShowHeader: true,
//   },
//   {
//     path: "/about",
//     page: AboutPage,
//     isShowHeader: true,
//   },
//   {
//     path: "/contact",
//     page: ContactPage,
//     isShowHeader: true,
//   },

//   {
//     path: "/order",
//     page: OrderPage,
//     isShowHeader: true,
//   },
//   {
//     path: "/details-order/:id",
//     page: DetailsOrderPage,
//     isShowHeader: true,
//   },

//   {
//     path: "/my-order",
//     page: MyOrderPage,
//     isShowHeader: true,
//   },
//   {
//     path: "/payment",
//     page: PaymentPage,
//     isShowHeader: true,
//   },
//   {
//     path: "/order-success",
//     page: OrderSuccess,
//     isShowHeader: true,
//   },
//   {
//     path: "/product/:type?",
//     page: ProductsPage,
//     isShowHeader: true,
//     isShowFooter: true,
//   },

//   {
//     path: "product/:type",
//     page: TypeProductPage,
//     isShowHeader: true,
//   },
//   {
//     path: "/login",
//     page: SignInPage,
//     isShowHeader: true,
//     isShowFooter: true,
//   },
//   {
//     path: "/sign-up",
//     page: SignUpPage,
//     isShowHeader: true,
//     isShowFooter: true,
//   },
//   {
//     path: "/system/admin",
//     page: AdminPage,
//     isShowHeader: false,
//     isPrivate: true,
//   },

//   {
//     path: "/system/admin",
//     page: Dashboard,
//     isShowHeader: false,
//     isPrivate: true,
//   },

//   {
//     path: "/product-details/:id",
//     page: ProductDetailsPage,
//     isShowHeader: true,
//     isShowFooter: true,
//   },
//   {
//     path: "*",
//     page: NotFoundPage,
//   },
// ];
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
const AdminPage = lazy(() => import("../pages/AdminPage/AdminPage"));
const Dashboard = lazy(() => import("../pages/Dashboard/DashboardAppPage"));
const OrderPage = lazy(() => import("../pages/OderPage/OderPage"));
const PaymentPage = lazy(() => import("../pages/PaymentPage/PaymentPage"));
const MyOrderPage = lazy(() => import("../pages/MyOderPage/MyOderPage"));
const DetailsOrderPage = lazy(() => import("../pages/DetailsOrderPage/DetailsOrderPage"));
const ContactPage = lazy(() => import("../pages/ContactPage/ContactPage"));
const AboutPage = lazy(() => import("../pages/AboutPage/AboutPage"));

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
    page: AdminPage,
    isShowHeader: false,
    isPrivate: true,
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
    path: "*",
    page: NotFoundPage,
  },
];
