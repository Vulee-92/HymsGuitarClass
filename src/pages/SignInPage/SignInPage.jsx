import React, { useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Input,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import InputForm from "../../components/InputForm/InputForm";
// import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
// import { Image } from 'antd'
import imageLogo from "../../assets/images/logo-login.png";
import { useState } from "react";
import { Assets, Configs, Keys } from "../../configs";
import i18n from "../../utils/languages/i18n";
import { Colors } from "../../utils/colors";
import { Helpers } from "../../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faAddressCard,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
// import * as message from '../../components/Message/Message'
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";
/** COMPONENTS */
import CButton from "../../components/CButton";
/** STYLES */
import styles from "./style";
import {
  strengthColor,
  strengthIndicator,
} from "../../utils/password-strength";

const SignInPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = styles();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [lang, setLang] = useState(i18n.language);
  const [errorMsg, setErrorMsg] = useState("");
  const mutation = useMutationHooks((data) => UserService.loginUser(data));

  const { data, isLoading, isSuccess } = mutation;


  useEffect(() => {
    if (isSuccess) {
      if (location?.state) {
        navigate(location?.state)
      } else {
        navigate('/')
      }
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token))
      if (data?.access_token) {
        const decoded = jwt_decode(data?.access_token)
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token)
        }
      }
    }
  }, [isSuccess])

  const handleGetDetailsUser = async (id, token) => {
    const storage = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storage)
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }))
  }
  const handleSignIn = () => {
    mutation.mutate({
      email: form.email.value,
      password: form.password.value,
    });
  };

  const [form, setForm] = useState({
    email: {
      value: "",
      isFocus: false,
      msg: "",
      error: false,
    },
    password: {
      value: "",
      isFocus: false,
      msg: "",
      error: false,
      isShow: false,
    },
  });

  const onChangeInput = (event, field) => {
    setForm({
      ...form,
      [field]: {
        ...form[field],
        value: event.target.value,
      },
    });
  };
  const onBlurFocusInput = (value, field) => {
    setForm({
      ...form,
      [field]: {
        ...form[field],
        isFocus: value,
      },
    });
  };

  /** FUNCTIONS */
  const onChangeLanguage = (lang) => {
    setLang(lang);
    i18n.changeLanguage(lang);
    Helpers.setDataStorage(Keys.lang, lang);
  };

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  const onChangeTypePassword = () => {
    setForm({
      ...form,
      password: {
        ...form.password,
        isShow: !form.password.isShow,
      },
    });
  };

  const onValidate = () => {
    setErrorMsg("");
    setForm({
      ...form,
      email: {
        ...form.email,
        error: false,
      },
      password: {
        ...form.password,
        error: false,
      },
    });

    let isError = false,
      newForm = { ...form };
    if (form.email.value.trim() === "") {
      isError = true;
      form.email.error = true;
      form.email.msg = t("txt_error_name_empty");
    }
    if (form.password.value.trim() === "") {
      isError = true;
      form.password.error = true;
      form.password.msg = "txt_error_access_code_empty";
    }
    if (isError) {
      return setForm(newForm);
    }
    handleSignIn();
  };
  return (
    <Box className={classes.container}>
      <Grid container className={classes.conContent}>
        <Grid item xs={12} sm={6} lg={4} className={classes.conCard}>
          <Box className={classes.conLogin}>
            <Typography className={classes.txtHeaderTitle}>
              {t("sign_in")}
            </Typography>
            <Typography
              onClick={handleNavigateSignUp}
              className={classes.txtDesTitle}
            >
              {t("new_user_create_an_account")}
            </Typography>
            {/* <Box className={classes.imgLogo} component={'img'} src={Assets.logo} alt="logo"/> */}
            <Box className={classes.conForm}>
              <Box className={classes.conItemInput}>
                <Typography className={classes.txtTitleInput}>
                  {t("email")}
                </Typography>
                <Input
                  style={{
                    border:
                      !form.email.isFocus &&
                      `2px solid ${form.email.error
                        ? Colors.secondary
                        : form.email.value.trim() !== ""
                          ? Colors.success
                          : "transparent"
                      }`,
                  }}
                  className={classes.conInput}
                  fullWidth
                  placeholder={t("email")}
                  value={form.email.value}
                  startAdornment={
                    <InputAdornment position="start">
                      <FontAwesomeIcon
                        icon={faAddressCard}
                        fontSize={20}
                        color={
                          form.email.isFocus || form.email.value.trim() !== ""
                            ? Colors.bgLogin
                            : Colors.bgLogin
                        }
                        className={classes.conIconInput}
                      />
                    </InputAdornment>
                  }
                  onChange={(event) => onChangeInput(event, "email")}
                  disabled={loading}
                  onFocus={() => onBlurFocusInput(true, "email")}
                  onBlur={() => onBlurFocusInput(false, "email")}
                />
              </Box>
              <Box className={classes.conItemInput}>
                <Typography className={classes.txtTitleInput}>
                  {t("password")}
                </Typography>
                <Input
                  style={{
                    border:
                      !form.password.isFocus &&
                      `2px solid ${form.password.error
                        ? Colors.secondary
                        : form.password.value.trim() !== ""
                          ? Colors.success
                          : "transparent"
                      }`,
                  }}
                  className={classes.conInput}
                  fullWidth
                  placeholder={t("password")}
                  value={form.password.value}
                  onChange={(event) => onChangeInput(event, "password")}
                  startAdornment={
                    <InputAdornment position="start">
                      <FontAwesomeIcon
                        icon={faLock}
                        fontSize={20}
                        color={
                          form.password.isFocus ||
                            form.password.value.trim() !== ""
                            ? Colors.bgLogin
                            : Colors.placeHolder
                        }
                        className={classes.conIconInput}
                      />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <FontAwesomeIcon
                        icon={form.password.isShow ? faEye : faEyeSlash}
                        fontSize={20}
                        color={Colors.bgLogin}
                        className={classes.conIconInputRight}
                        onClick={onChangeTypePassword}
                      />
                    </InputAdornment>
                  }
                  type={form.password.isShow ? "text" : "password"}
                  onFocus={() => onBlurFocusInput(true, "password")}
                  onBlur={() => onBlurFocusInput(false, "password")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onValidate();
                    }
                  }}
                />
              </Box>
            </Box>
            <Box className={classes.conMsg}>
              <Typography className={classes.txtError}>
                {t(errorMsg)}
              </Typography>
            </Box>
            {data?.status === "ERR" && (
              <span style={{ color: "red" }}>
                {(form.email.msg = t("txt_error_name_empty"))}
              </span>
            )}
            <Loading isLoading={isLoading}>
              <CButton
                title={t("sign_in")}
                onClick={onValidate}
                loading={loading}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onValidate();
                  }
                }}
              />
            </Loading>

            {/* <Box className={classes.conTitleLoginMethod}>
            <Box className={classes.conLine} />
            <Typography className={classes.txtTitleLoginMethod}>{t('txt_login_another')}</Typography>
            <Box className={classes.conLine} />
          </Box>

          <Button fullWidth className={classes.conBtnGoogle} 
            disabled={loading}
            onClick={onClick}
          >
            <Box className={classes.imgLogoGoogle} component={'img'} src={Assets.logoGoogle} />
            <Typography className={classes.txtBtnGoogle}>{t('sign_in_with_google')}</Typography>
          </Button> */}

            {/* <Typography onClick={handleNavigateSignUp} className={classes.txtRegister}>{t('txt_register')}<span className={classes.txtBtnRegister}>{t('register')}</span></Typography> */}

            {/* <Box className={classes.conLanguage}>
              <Box
                className={classes.conLanguageItem}
                component={"img"}
                src={Assets.vnFlag}
                style={{ opacity: lang === Configs.language.vi ? 1 : 0.5 }}
                onClick={() => onChangeLanguage(Configs.language.vi)}
              />
              <Box
                className={classes.conLanguageItem}
                component={"img"}
                src={Assets.usFlag}
                style={{ opacity: lang === Configs.language.en ? 1 : 0.5 }}
                onClick={() => onChangeLanguage(Configs.language.en)}
              />
            </Box> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignInPage;
