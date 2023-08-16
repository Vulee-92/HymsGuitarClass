import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as UserService from '../../services/UserService';
import * as message from '../../components/Message/Message';
import VerifyEmailForm from '../../components/VerifyEmailComponent/VerifyEmailComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
// import * as message from '../../components/Message/Message'
import { updateUser } from "../../redux/slides/userSlide";
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
const VerifyEmailPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const mutation = useMutationHooks((data) => UserService.loginUser(data));
  const { data, isLoading, isSuccess } = mutation;
  const location = useLocation();
  const dispatch = useDispatch();
  console.log('data', data)
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
  useEffect(() => {
    const fetchUserData = async (id, token) => {
      setLoading(true);
      try {
        // const storage = localStorage.getItem('refresh_token')
        // const refreshToken = JSON.parse(storage)
        const response = await UserService.getDetailsUser(id, token)
        console.log("response", response)
        if (response && response.status === 200) {
          setEmail(response.data.email);
        }
      } catch (error) {
        message.error(t('verifyEmail.error'));
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }))
  const handleVerifyEmail = async (email, verificationCode) => {
    setLoading(true);
    try {
      const response = await UserService.getDetailsUser(email, verificationCode);
      if (response && response.status === 200) {
        message.success(t('verifyEmail.success'));
        navigate('/');
      } else {
        message.error(t('verifyEmail.error'));
      }
    } catch (error) {
      message.error(t('verifyEmail.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <VerifyEmailForm email={email} onSubmit={handleVerifyEmail} />
      )}
    </div>
  );
};

export default VerifyEmailPage;