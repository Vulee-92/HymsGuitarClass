// import React, { Fragment, useEffect, useState } from "react";
// import axios from "axios";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
// } from "react-router-dom";
// import { routes } from "./routes";
// import { CssBaseline, StyledEngineProvider } from "@mui/material";
// import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
// import { useQuery } from "@tanstack/react-query";
// import { isJsonString } from "./utils";
// import jwt_decode from "jwt-decode";
// import * as UserService from "./services/UserService";
// import { useDispatch, useSelector } from "react-redux";
// import { resetUser, updateUser } from "./redux/slides/userSlide";
// import Loading from "./components/LoadingComponent/Loading";
// import { HelmetProvider } from "react-helmet-async";

// function App() {
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(false);
//   const user = useSelector((state) => state.user);
//   // const { user } = useAuth();
//   useEffect(() => {
//     setIsLoading(true);
//     const { storageData, decoded } = handleDecoded();
//     if (decoded?.id) {
//       handleGetDetailsUser(decoded?.id, storageData);
//     }
//     setIsLoading(false);
//   }, []);

//   // const handleDecoded = () => {
//   //   let storageData = localStorage.getItem("access_token");
//   //   let decoded = {};
//   //   if (storageData && isJsonString(storageData)) {
//   //     storageData = JSON.parse(storageData);
//   //     decoded = jwt_decode(storageData);
//   //   }
//   //   return { decoded, storageData };
//   // };
//   const handleDecoded = () => {
//     let storageData =
//       user?.access_token || localStorage.getItem("access_token");
//     let decoded = {};
//     if (storageData && isJsonString(storageData) && !user?.access_token) {
//       storageData = JSON.parse(storageData);
//       decoded = jwt_decode(storageData);
//     }
//     return { decoded, storageData };
//   };
//   // UserService.axiosJWT.interceptors.request.use(
//   //   async (config) => {
//   //     // Do something before request is sent
//   //     const currentTime = new Date();
//   //     const { decoded } = handleDecoded();
//   //     if (decoded?.exp < currentTime.getTime() / 1000) {
//   //       const data = await UserService.refreshToken();
//   //       config.headers["token"] = `Bearer ${data?.access_token}`;
//   //     }
//   //     return config;
//   //   },
//   //   (err) => {
//   //     // Do something with request error
//   //     return Promise.reject(err);
//   //   }
//   // );
//   // UserService.axiosJWT.interceptors.request.use(
//   //   async (config) => {
//   //     // Do something before request is sent
//   //     const currentTime = new Date();
//   //     const { decoded } = handleDecoded();
//   //     let storageRefreshToken = localStorage.getItem("refresh_token");
//   //     const refreshToken = JSON.parse(storageRefreshToken);
//   //     const decodedRefreshToken = jwt_decode(refreshToken);
//   //     if (decoded?.exp < currentTime.getTime() / 1000) {
//   //       if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
//   //         const data = await UserService.refreshToken(refreshToken);
//   //         config.headers["token"] = `Bearer ${data?.access_token}`;
//   //       } else {
//   //         dispatch(resetUser());
//   //       }
//   //     }
//   //     return config;
//   //   },
//   //   (err) => {
//   //     return Promise.reject(err);
//   //   }
//   // );
//   const setAuthorizationHeader = async (config) => {
//     const currentTime = new Date();
//     const { decoded } = handleDecoded();
//     let storageRefreshToken = localStorage.getItem("refresh_token");
//     const refreshToken = JSON.parse(storageRefreshToken);
//     const decodedRefreshToken = jwt_decode(refreshToken);
//     if (decoded?.exp < currentTime.getTime() / 1000) {
//       if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
//         const data = await UserService.refreshToken(refreshToken);
//         config.headers["token"] = `Bearer ${data?.access_token}`;
//       } else {
//         dispatch(resetUser());
//       }
//     }
//     return config;
//   };

//   UserService.axiosJWT.interceptors.request.use(
//     setAuthorizationHeader,
//     (error) => Promise.reject(error)
//   );

//   const handleGetDetailsUser = async (id, token) => {
//     let storageRefreshToken = localStorage.getItem("refresh_token");
//     const refreshToken = JSON.parse(storageRefreshToken);
//     const res = await UserService.getDetailsUser(id, token);
//     dispatch(
//       updateUser({
//         ...res?.data,
//         access_token: token,
//         refreshToken: refreshToken,
//       })
//     );
//   };
//   // Queries

//   // useEffect (() => {
//   //   fetchApi()
//   // })

//   // const fetchApi = async () => {
//   //   const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`)
//   //   // const res = await axios.get(`http://localhost:4000/api/product/get-all`)
//   //   return res.data;
//   // }
//   // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
//   const navigate = useNavigate();
//   const isAuthorizedd = (user, route) => {
//     if (route.isPrivate && !user?.isAdmin) {
//       // Redirect to login page or show unauthorized message
//       navigate("/");
//       return false;
//     }
//     return true;
//   };
//   return (
//     <Loading isLoading={isLoading}>
//       <HelmetProvider>
//         <StyledEngineProvider injectFirst>
//           <CssBaseline />
//           <Router>
//             <Routes>
//               {/* {routes.map((route) => {
//                 const Page = route.page;
//                 // const ischeckAuth = !route.isPrivate || user.isAdmin
//                 const Layout = route.isShowHeader ? DefaultComponent : Fragment;
//                 return (
//                   <Route
//                     key={route.path}
//                     path={route.path}
//                     element={
//                       <Layout>
//                         <Page />
//                       </Layout>
//                     }
//                   />
//                 );
//               })} */}
//               {routes.map((route) => {
//                 const Page = route.page;
//                 const Layout = route.isShowHeader ? DefaultComponent : Fragment;
//                 const isAuthorized = isAuthorizedd(user, route);

//                 return (
//                   <Route
//                     key={route.path}
//                     path={route.path}
//                     element={
//                       isAuthorized ? (
//                         <Layout>
//                           <Page />
//                         </Layout>
//                       ) : (
//                         // Redirect to login page or show unauthorized message
//                         <Layout>
//                           <Page />
//                         </Layout>
//                       )
//                     }
//                   />
//                 );
//               })}
//             </Routes>
//           </Router>
//         </StyledEngineProvider>
//       </HelmetProvider>
//     </Loading>
//   );
// }

// export default App;
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ContextMenuTrigger, MenuItem } from "react-contextmenu";
import { routes } from "./routes";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { useQuery } from "@tanstack/react-query";
import { isJsonString } from "./utils";
import jwt_decode from "jwt-decode";
import * as UserService from "./services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, updateUser } from "./redux/slides/userSlide";
import Loading from "./components/LoadingComponent/Loading";
import { HelmetProvider } from "react-helmet-async";
import { ContextMenu } from "react-contextmenu";
function handleClick(e, data) {
  console.log(data.foo);
}
function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  // const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
    setIsLoading(false);
  }, []);

  const handleDecoded = () => {
    let storageData =
      user?.access_token || localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData) && !user?.access_token) {
      storageData = JSON.parse(storageData);
      decoded = jwt_decode(storageData);
    }
    return { decoded, storageData };
  };

  const setAuthorizationHeader = async (config) => {
    const currentTime = new Date();
    const { decoded } = handleDecoded();
    let storageRefreshToken = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storageRefreshToken);
    const decodedRefreshToken = jwt_decode(refreshToken);
    if (decoded?.exp < currentTime.getTime() / 1000) {
      if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken(refreshToken);
        config.headers["token"] = `Bearer ${data?.access_token}`;
      } else {
        dispatch(resetUser());
      }
    }
    return config;
  };

  UserService.axiosJWT.interceptors.request.use(
    setAuthorizationHeader,
    (error) => Promise.reject(error)
  );

  const handleGetDetailsUser = async (id, token) => {
    let storageRefreshToken = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storageRefreshToken);
    const res = await UserService.getDetailsUser(id, token);
    dispatch(
      updateUser({
        ...res?.data,
        access_token: token,
        refreshToken: refreshToken,
      })
    );
  };

  const isAuthorizedd = (user, route) => {
    if (route.isPrivate && !user?.isAdmin) {
      // navigate("/");
      return false;
    }
    return true;
  };

  return (
    <Loading isLoading={isLoading}>
      <HelmetProvider>
        <StyledEngineProvider injectFirst>
          <CssBaseline />
          <Router>
            <Routes>
              {routes.map((route) => {
                const Page = route.page;
                const Layout = route.isShowHeader ? DefaultComponent : Fragment;
                const isAuthorized = isAuthorizedd(user, route);

                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      isAuthorized ? (
                        <Layout>
                          <Page />
                        </Layout>
                      ) : (
                        <Navigate to="/" replace />
                      )
                    }
                  />
                );
              })}
            </Routes>
          </Router>
        </StyledEngineProvider>
      </HelmetProvider>
    </Loading>
  );
}

export default App;
