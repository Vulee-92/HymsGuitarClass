
import React, { Fragment, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { routes } from "./routes";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { isJsonString } from "./utils";
import jwt_decode from "jwt-decode";
import * as UserService from "./services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, updateUser } from "./redux/slides/userSlide";
import Loading from "./components/LoadingComponent/Loading";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from './components/ScrollToTopComponent/ScrollToTopComponent';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    setIsLoading(true);
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
    setIsLoading(false);
  }, []);

  // const handleDecoded = () => {
  //   let storageData =
  //     user?.access_token || localStorage.getItem("access_token");
  //   let decoded = {};
  //   if (storageData && isJsonString(storageData) && !user?.access_token) {
  //     storageData = JSON.parse(storageData);
  //     decoded = jwt_decode(storageData);
  //   }
  //   return { decoded, storageData };
	// };
	const handleDecoded = () => {
  let storageData = user?.access_token || localStorage.getItem("access_token");
  let decoded = {};
  if (storageData) {
    if (isJsonString(storageData) && !user?.access_token) {
      storageData = JSON.parse(storageData);
    }
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
						<ScrollToTop />
            <Routes>
              {routes.map((route) => {
                const LazyPage = route.page;
                const Layout = route.isShowHeader ? DefaultComponent : Fragment;
                const isAuthorized = isAuthorizedd(user, route);

                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <Suspense fallback={<div></div>}>
                        {isAuthorized ? (
                          <Layout>
                            <LazyPage />
                          </Layout>
                        ) : (
                          <Navigate to="/" replace />
                        )}
                      </Suspense>
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
