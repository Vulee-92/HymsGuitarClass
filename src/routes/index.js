import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import OrderSuccess from "../pages/OderSuccess/OderSuccess";
import Profile from "../pages/profile";
import AdminPage from "../pages/AdminPage/AdminPage";
import Dashboard from "../pages/Dashboard/DashboardAppPage";
import OrderPage from "../pages/OderPage/OderPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import MyOrderPage from "../pages/MyOderPage/MyOderPage";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";

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
    path: "/products",
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
    path: "/sign-in",
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
