import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
// import { DEFAULT } from "../../../constants/default";
// import { Logout } from "../../../redux/user/action";
// import SVGIcon from "../../icon";
import "./styles.css";
import { Icon } from "@mui/material";

const SidebarMenu = ({ open, setOpen }) => {
  const user = useSelector((state) => state.user.data);
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();

  // const menu = [
  //   {
  //     path: "/app/student/home",
  //     title: t("navbar_home"),
  //     iconName: "home",
  //     size: 24,
  //   },
  //   {
  //     path: "/app/student/calendar",
  //     title: t("navbar_calendar"),
  //     iconName: "calendar",
  //     size: 24,
  //   },
  //   {
  //     path: "/app/student/game",
  //     title: t("navbar_games"),
  //     iconName: "game-pad",
  //     size: 24,
  //   },
  //   {
  //     path: "/app/student/progress",
  //     title: t("navbar_progress"),
  //     iconName: "star",
  //     size: 24,
  //   }
  // ];
  const Logout = () => {}
  // const renderClassName = (path) => {
  //   return location.pathname === path ? "active" : "";
  // };

  // const renderColor = (path) => {
  //   return location.pathname === path ? '#ffc947' : "#FFF";
  // };

  // const renderMenuItem = () => {
  //   return menu.map((item, index) => (
  //     <Link
  //       to={item.path}
  //       key={index}
  //       className={clsx("navbar-items", renderClassName(item.path))}
  //       onClick={setOpen}
  //     >
  //       <div className="navbar-group">
  //         <Icon
  //           name={item.iconName}
  //           width={item.size}
  //           fill={renderColor(item.path)}
  //         />
  //         <div className={"navbar-title"}>{item.title}</div>
  //       </div>
  //     </Link>
  //   ));
  // };

  return (
    <div className={clsx("sidebar-container", open ? "open-drawer" : "")}>
      <div className="navbar-overlay" onClick={setOpen}></div>
      <div className="sidebar-wrapper">
        <div className="sidebar-header">
          <div className="avatar-sm">
            <img
              className="user-avatar circle"
              src={user}
              alt=""
            />
          </div>
          <div>{user?.camelFirstLastName}</div>
        </div>
        <div className="sidebar-center">
            {/* {renderMenuItem()} */}
        </div>
        <div className="sidebar-footer">
          <div className="sidebar-logout"  onClick={() => dispatch(Logout())}>
            <span>Logout</span>
            <Icon name="logout" width={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
