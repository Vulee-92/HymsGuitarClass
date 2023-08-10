// import React, { useState } from "react";
// import SVGIcon from "../icon";
// import "./styles.css";
// import Badge from "../badge";
// import { Logout } from "../../redux/user/action";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { COLORS } from "../../constants/colors";
// import clsx from "clsx";
// import SidebarMenu from "./sidebar-menu";
// import { DEFAULT } from "../../constants/default";

// const LogoutButton = () => {
//   const dispatch = useDispatch();
//   return (
//     <div
//       style={{
//         background: "#FFC947",
//         width: 40,
//         height: 40,
//         display: "grid",
//         placeContent: "center",
//         borderRadius: "50%",
//       }}
//       onClick={() => dispatch(Logout())}
//     >
//       <SVGIcon name="logout" width={24} fill={"#FFF"} />
//     </div>
//   );
// };

// const UserAvatar = () => {
//   const user = useSelector((state) => state.user.data);
//   return (
//     <div style={{ display: "flex", alignItems: "center" }}>
//       <span style={{ width: "max-content", marginRight: 15 }}>
//         {user?.camelFirstLastName}
//       </span>
//       <div className="avatar-sm">
//         <img
//           className="user-avatar circle"
//           src={user ? user.avatar : DEFAULT.AVATAR}
//           alt=""
//         />
//       </div>
//     </div>
//   );
// };

// const StudentNavbar = () => {
//   const { t } = useTranslation();
//   const location = useLocation();
//   const activeColor = COLORS.primary1;
//   const [drawer, setDrawer] = useState(false);
//   const menu = [
//     {
//       path: "/app/student/home",
//       title: t("navbar_home"),
//       iconName: "home",
//       size: 24,
//     },
//     {
//       path: "/app/student/calendar",
//       title: t("navbar_calendar"),
//       iconName: "calendar",
//       size: 24,
//     },
//     {
//       path: "/app/student/game",
//       title: t("navbar_games"),
//       iconName: "game-pad",
//       size: 24,
//     },
//     {
//       path: "/app/student/progress",
//       title: t("navbar_progress"),
//       iconName: "star",
//       size: 24,
//     },
//   ];

//   const renderClassName = (path) => {
//     return location.pathname === path ? "active" : "";
//   };

//   const renderColor = (path) => {
//     return location.pathname === path ? activeColor : "#FFF";
//   };

//   const renderMenuItem = () => {
//     return menu.map((item, index) => (
//       <Link
//         to={item.path}
//         key={index}
//         className={clsx("navbar-items", renderClassName(item.path))}
//       >
//         <div className="navbar-group">
//           <SVGIcon
//             name={item.iconName}
//             width={item.size}
//             fill={renderColor(item.path)}
//           />
//           <div className={"navbar-title"}>{item.title}</div>
//         </div>
//       </Link>
//     ));
//   };

//   return (
//     <>
//       <div className="navbar-container">
//         <div className="container navbar-container">
//           <div className="navbar-center">{renderMenuItem()}</div>
//           <div className="navbar-right">
//             {/* <NotificationButton /> */}
//             <UserAvatar />
//             <LogoutButton />
//           </div>
//           <div className="navbar-logo-sm">
//             <img className="image-logo circle" src={DEFAULT.LOGO} alt="" />
//           </div>
//           <div className="menu-icon" onClick={() => setDrawer(true)}>
//             <SVGIcon name="menu-hamburger" width={24} fill={"#FFF"} />
//           </div>
//         </div>
//       </div>
//       <SidebarMenu open={drawer} setOpen={() => setDrawer(false)} />
//     </>
//   );
// };

// export default StudentNavbar;
