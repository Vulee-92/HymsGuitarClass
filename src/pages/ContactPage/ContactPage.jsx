import { Box, FormControl, Input, InputAdornment, Typography, Grid } from "@mui/material";
import { useMutationHooks } from "hooks/useMutationHook";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as ContactService from '../../services/ContactService'
import CButton from "../../components/CButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as message from '../../components/Message/Message'
import { Colors } from "utils/colors";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import i18n from "utils/languages/i18n";
/** STYLES */
import styles from "./style";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../components/LoadingComponent/Loading";
import AnimationComponent from "../../components/AnimationComponent/AnimationComponent";
import InputForm from "../../components/InputForm/InputForm";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactmessenger, setContactMessages] = useState("");
  const { t } = useTranslation();
  const classes = styles();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState(i18n.language);
  const [errorMsg, setErrorMsg] = useState("");
  const user = useSelector((state) => state.user);
  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnChangeName = (value) => {
    setName(value)
  }
  const handleOnChangeMessage = (value) => {
    setContactMessages(value)
  }

  const mutation = useMutationHooks(
    data => ContactService.createContacts(data)
  )
  const { data, isLoading, isSuccess, isError } = mutation
  console.log("mutation", data)
  const clearForm = () => {
    setName("");
    setEmail("");
    setContactMessages("");
  };
  useEffect(() => {
    if (isSuccess) {
      message.success()
      clearForm();
    } else if (isError) {
      message.error()
    }
  }, [isSuccess, isError])



  const [form, setForm] = useState({
    name: {
      value: "",
      isFocus: false,
      msg: "",
      error: false,
    },
    email: {
      value: "",
      isFocus: false,
      msg: "",
      error: false,
    },
    contactmessenger: {
      value: "",
      isFocus: false,
      msg: "",
      error: false,
    },
  });



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
  const handleContact = () => {
    mutation.mutate({
      name,
      email,
      contactmessenger
    }
    );
  };


  const onValidate = () => {
    setErrorMsg("");
    setForm({
      ...form,
      name: {
        ...form.name,
        error: false,
      },
      email: {
        ...form.email,
        error: false,
      },
      contactmessenger: {
        ...form.contactmessenger,
        error: false,
      },
    });

    let isError = false;
    let newForm = { ...form };

    if (form.name.value.trim() === "") {
      isError = true;
      newForm.name.error = true;
      newForm.name.msg = t("txt_error_name_empty");
    }

    if (form.email.value.trim() === "") {
      isError = true;
      newForm.email.error = true;
      newForm.email.msg = t("txt_error_name_empty");
    }

    if (form.contactmessenger.value.trim() === "") {
      isError = true;
      newForm.contactmessenger.error = true;
      newForm.contactmessenger.msg = t("txt_error_name_empty");
    }

    if (isError) {
      return setForm(newForm);
    }
    handleContact();
  };

  return (
    <>
      <Loading isLoading={isLoading || loading}>

        <Box className={classes.container}>
          <Typography className={classes.conTextCreate}>  <AnimationComponent type="text" text="Contact" className={classes.conTextCreate} /></Typography>
        </Box>
        <Grid container className={classes.conContent} spacing={5}>

          <Grid item xs={12} sm={12} lg={4} my={30} >
            <Typography className={classes.txtHeaderTitle} style={{ color: "#000" }} >  <AnimationComponent style={{ color: "#000" }} type="text" text={t('get_in_touch')} className={classes.txtHeaderTitle} /></Typography>
            {/* <Typography className={classes.txtDesTitleSignUp}>  <AnimationComponent type="text" text="Already have an account? " className={classes.txtDesTitleSignUp} /><Typography className={classes.txtDesTitleSignUpLight}><AnimationComponent type="text" text="Sign in" className={classes.txtDesTitleSignUpLight} /></Typography></Typography> */}
          </Grid>
          <Grid item xs={12} sm={12} lg={4} my={30} className={classes.conCard}>
            <AnimationComponent type="box">
              <Box className={classes.conLogin}>
                {/* <Typography className={classes.txtHeaderTitle}>{t('sign_up')}</Typography> */}
                <Box className={classes.conForm}>
                  <Box className={classes.conItemInput}>
                    <Typography className={classes.txtTitleInput}>{t('name')}</Typography>
                    <InputForm style={{ border: !form.name.isFocus && `2px solid ${form.name.error ? Colors.secondary : form.name.value.trim() !== '' ? Colors.success : 'transparent'}` }}
                      className={classes.conInput}
                      placeholder={t('name')}
                      fontSize={20}
                      color={Colors.primary}
                      onFocus={() => onBlurFocusInput(true, 'name')}
                      onBlur={() => onBlurFocusInput(false, 'name')}
                      value={name} onChange={handleOnChangeName}
                    />
                  </Box>
                  <Box className={classes.conItemInput}>
                    <Typography className={classes.txtTitleInput}>{t('email')}</Typography>
                    <InputForm style={{ border: !form.email.isFocus && `2px solid ${form.email.error ? Colors.secondary : form.email.value.trim() !== '' ? Colors.success : 'transparent'}` }}
                      className={classes.conInput}
                      placeholder={t('email')}
                      onFocus={() => onBlurFocusInput(true, 'email')}
                      onBlur={() => onBlurFocusInput(false, 'email')}
                      value={email} onChange={handleOnChangeEmail}
                    />
                  </Box>

                  <Box className={classes.conItemInput}>
                    <Typography className={classes.txtTitleInput}>{t('contactmessenger')}</Typography>
                    <InputForm style={{ border: !form.contactmessenger.isFocus && `2px solid ${form.contactmessenger.error ? Colors.secondary : form.contactmessenger.value.trim() !== '' ? Colors.success : 'transparent'}` }}
                      className={classes.conInput}
                      placeholder={t('type_your_message')}
                      fontSize={20}
                      value={contactmessenger}
                      onFocus={() => onBlurFocusInput(true, 'contactmessenger')}
                      onBlur={() => onBlurFocusInput(false, 'contactmessenger')}
                      onChange={handleOnChangeMessage}
                    />
                  </Box>
                </Box>


                {/* <Typography className={classes.txtDesTitle}>{t('txt_agree')}</Typography> */}
                {data?.status === 'ERR' && <span>{data?.message}</span>}
                <Loading isLoading={isLoading}>
                  <CButton style={{ fullWidth: "30%" }}
                    disabled={!name.length || !email.length || !contactmessenger.length}
                    title={t('send_message')}
                    onClick={handleContact}
                  />
                </Loading>
              </Box>
            </AnimationComponent>

          </Grid>
        </Grid>
      </Loading>

    </>

  );
};

export default ContactPage;
