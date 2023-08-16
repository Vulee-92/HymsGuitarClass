/** LIBRARY */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Input,
  InputAdornment,
  Modal,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faAddressCard,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
/** COMMON */
// import { useDispatch, useSelector } from 'react-redux'
import * as UserService from "../../services/UserService";
import * as message from "../../components/Message/Message";

import CStyles from "../../utils/common/index";
import { Assets, Configs } from "../../configs";
/** STYLES */
import styles from "./style";
// import { faPen } from '@fortawesome/free-light-svg-icons';
import { Colors } from "../../utils/colors";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";
import { getBase64 } from "../../utils";
import { UploadOutlined } from "@ant-design/icons";
import { FloatButton, Upload } from "antd";
import Loading from "../../components/LoadingComponent/Loading";
import CButton from "../../components/CButton";

const ProfileScreen = () => {
  const classes = styles();
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.data);
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });

  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError } = mutation;
  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangeName = (value) => {
    setName(value);
  };
  const handleOnchangePhone = (value) => {
    setPhone(value);
  };
  const handleOnchangeAddress = (value) => {
    setAddress(value);
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await file.originFileObj;
    }
    setAvatar(file.preview);
  };
  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      name,
      phone,
      address,
      avatar,
      access_token: user?.access_token,
    });
  };
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [tmpPassword, setTmpPassword] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [checkError, setCheckError] = useState({
    value: false,
    msg: "",
  });
  const [trialUser, setTrialUser] = useState(false);

  /** FUNCTIONS */
  // const getPassword = () => {
  //   let params = {
  //     password: user.password
  //   }
  //   dispatch({
  //     type: USER_DECODE_PASSWORD_ACTION,
  //     payload: { params, callback: (res) => {
  //       setFirstName(user.firstName);
  //       setLastName(user.lastName);
  //       setPassword(res || '');
  //       setTmpPassword(res || '');
  //       setUserImage(user.avatar)
  //     }}
  //   })
  // }

  // const onValidate = () => {
  //   if (!loading) {
  //     setCheckError({ value: false, msg: "" });
  //     if (
  //       firstName.trim() === "" ||
  //       lastName.trim() === "" ||
  //       password.trim() === ""
  //     ) {
  //       setCheckError({ value: true, msg: "err_required_fields" });
  //     } else {
  //       setLoading(true);
  //       handleUpdate();
  //     }
  //   }
  // };

  const onPressSave = () => {
    let params = {
      firstName,
      lastName,
    };
  };

  const onPressAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setFileUpload(file);
    // reader.addEventListener(
    //   "load",
    //   () => {
    //     setUserImage(reader.result);
    //     dispatch({
    //       type: USER_UPLOAD_AVATAR_ACTION,
    //       payload: { params: { file: file }}
    //     })
    //   },
    //   false
    // );
    if (file) {
      reader.readAsDataURL(file);
    }
  };
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
  // const onChangeLanguage = (lang) => {
  //   setLang(lang);
  //   i18n.changeLanguage(lang);
  //   Helpers.setDataStorage(Keys.lang, lang);
  // };



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
  /** LIFE CYCLE */

  /** RENDER */
  return (
    // <Modal
    //   open={open}
    //   onClose={onClose}
    //   onBackdropClick={onClose}
    //   disableAutoFocus={true}
    // >
    <Box>


      <Box className={classes.container}>
      </Box>
      <Grid container className={classes.conContent}>
        <Grid item xs={12} sm={6} lg={4} className={classes.conCard}>
          <Box className={classes.conLogin}>
            <Typography className={classes.txtHeaderTitle}>
              {t("sign_in")}
            </Typography>
            {/* <Typography
              onClick={handleNavigateSignUp}
              className={classes.txtDesTitle}
            >
              {t("new_user_create_an_account")}
            </Typography> */}
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
      <Box>
        <div style={{ height: '100%', margin: '0 auto' }}>

          <Container className={classes.conModal}>
            <Box>
              <Box className={classes.conHeader}>
                <Box>
                  {/* <Box className={classes.conImgAvatar} component={'img'} src={userImage || Assets.iconDefaultAvatar} /> */}
                  <label htmlFor="contained-button-file">
                    <Box htmlFor="avatar">Avatar</Box>
                    <Upload
                      className={classes.uploadFile}
                      onChange={handleOnchangeAvatar}
                      maxCount={1}
                    >
                      <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                    {avatar && (
                      <img
                        src={avatar}
                        style={{
                          height: "60px",
                          width: "60px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                        alt="avatar"
                      />
                    )}
                    <Box className={classes.conImgAvatarOverlay}>
                      <FontAwesomeIcon
                        className={classes.conIconPen}
                        color={Colors.white}
                        fontSize={24}
                      />
                    </Box>
                  </label>
                </Box>
                <Typography
                  className={classes.txtStudentName}
                >{`${firstName} ${lastName}`}</Typography>
                {/* <Typography
              className={classes.txtUserId}
              sx={{ ...CStyles.txt_1_line }}
            >{`${t("student_id")}: `}</Typography> */}
              </Box>
              <Box className={classes.conContent}>
                <Grid container spacing={2}>
                  {/* <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography className={classes.txtTitleInput}>{t('first_name')}</Typography>
                    <Input className={classes.conInput} fullWidth
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      disabled={loading}
                    />
                  </Box>
                </Grid> */}
                  {/* <Grid item xs={12}>
                  <Box>
                    <Typography className={classes.txtTitleInput}>{t('u')}</Typography>
                    <Input className={classes.conInput} fullWidth
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      disabled={loading}
                    />
                  </Box>
                </Grid> */}
                  <Grid item xs={12}>
                    <Box>
                      <Typography className={classes.txtTitleInput}>
                        {t("user_name")}
                      </Typography>
                      <Input
                        className={classes.conInputUnfixable}
                        fullWidth
                        onChange={(event) => handleOnchangeName(event.target.value)}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <Typography className={classes.txtTitleInput}>
                        {t("email")}
                      </Typography>
                      <Input
                        className={classes.conInputUnfixable}
                        fullWidth
                        value={email}
                      />
                    </Box>
                  </Grid>
                  {/* {!trialUser &&
                  <Grid item xs={12}>
                    <Box>
                      <Typography className={classes.txtTitleInput}>{t('password')}</Typography>
                      <Input className={classes.conInput} fullWidth
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        endAdornment={
                          <InputAdornment position='end'>
                            <FontAwesomeIcon icon={isShow ? faEye : faEyeSlash} fontSize={20} color={'#F89030'} className={classes.conIconInputRight} 
                              onClick={() => setIsShow(!isShow)}
                            />
                          </InputAdornment>
                        }
                        type={isShow ? 'email' : 'password'}
                        disabled={loading}
                      />
                    </Box>
                  </Grid>
                } */}
                </Grid>
              </Box>

              <Typography
                className={classes.txtMsg}
                style={{ color: checkError.value ? "#DC2121" : "#0F9757" }}
              >
                {t(checkError.msg)}
              </Typography>

              <Box className={classes.conFooter}>
                <Grid container spacing={2}>
                  <Grid item xs={12} style={CStyles.center}>
                    <Box className={classes.conBtn} onClick={handleUpdate}>
                      {loading ? (
                        <CircularProgress size={34} style={{ color: Colors.white }} />
                      ) : (
                        <Typography className={classes.txtBtn}>
                          {t("save")}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            {/* <Box className={classes.imgHeaderIcon} component="img" src={Assets.iconCloseProfile} 
          onClick={onClose}
        /> */}
          </Container>
        </div >
      </Box>
    </Box>
    // </Modal>
  );
};

export default ProfileScreen;
