import React, { useState } from 'react'
import { getItem } from '../../utils';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import HeaderComponent from '../../components/HeaderComponents/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import DashboardAppPage from '../Dashboard/DashboardAppPage';
import BlogPage from '../AdminBlog/BlogPage';
import SvgColor from "../../components/svg-color";
import { StyledNavItem, StyledNavItemIcon } from '../../components/nav-section/styles';
import { ListItemText } from '@mui/material';
import { NavLink as RouterLink } from "react-router-dom";
import OrderAdmin from '../../components/OrderAdmin/OrderAdmin';
const AdminPage = () => {

  const renderPage = (key) => {
    switch (key) {
      case "dashboard":
        return <DashboardAppPage />;
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      case 'orders':
        return (
          <OrderAdmin />
        )
      default:
        return <></>;
    }
  }

  // ----------------------------------------------------------------------

  const items = [
    getItem(
      "dashboard",
      "dashboard",
      <SvgColor
        src={`/assets/icons/navbar/ic_analytics.svg`}
        sx={{ height: 0.9 }}
      />
    ),
    getItem(
      "Người dùng",
      "user",
      <SvgColor src={`/assets/icons/navbar/ic_user.svg`} sx={{ height: 0.9 }} />
    ),
    getItem(
      "sản phẩm",
      "product",
      <SvgColor src={`/assets/icons/navbar/ic_cart.svg`} sx={{ height: 0.9 }} />
    ),
    getItem(
      "blog",
      "blog",
      <SvgColor src={`/assets/icons/navbar/ic_blog.svg`} sx={{ height: 0.9 }} />
    ),
    getItem(
      "đơn hàng",
      "orders",
      <SvgColor src={`/assets/icons/navbar/ic_blog.svg`} sx={{ height: 0.9 }} />
    ),
  ];
  const { title, path, icon, info } = items;

  // const renderPage = (key) => {
  //   switch (key) {
  //     case 'users':
  //       return (
  //         <AdminUser />
  //       )
  //     case 'products':
  //       return (
  //         <AdminProduct />
  //       )
  //     case 'orders':
  //       return (
  //         <OrderAdmin />
  //       )
  //     default:
  //       return <></>
  //   }
  // }
  const [keySelected, setKeySelected] = useState('');



  const handleOnCLick = ({ key }) => {
    setKeySelected(key)
  }

  return (
    <>
      <HeaderComponent />
      <div
        style={{
          display: "flex",
          overflowX: "hidden",
          padding: "60px 0 15px 15px",
        }}
      >
        <Menu
          mode="inline"
          onClick={handleOnCLick}
          style={{
            width: 256,
            height: 48,
            position: "relative",
            textTransform: "capitalize",
            boxShadow: "1px 1px 2px #ccc",
            height: "100vh",
            "&.active": {
              color: "text.primary",
              bgcolor: "action.selected",
              fontWeight: "fontWeightBold",
            },
          }}
          items={items}
        />
        {/* <StyledNavItem
          onClick={handleOnCLick}
          component={RouterLink}
          to={path}
          sx={{
            "&.active": {
              color: "text.primary",
              bgcolor: "action.selected",
              fontWeight: "fontWeightBold",
            },
          }}
          items={items}
        > */}
        {/* <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon> */}

        {/* <ListItemText disableTypography primary={title} /> */}

        {/* {info && info} */}
        {/* </StyledNavItem> */}
        <div style={{ flex: 1, padding: "60px 0 15px 15px" }}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  );
}

export default AdminPage