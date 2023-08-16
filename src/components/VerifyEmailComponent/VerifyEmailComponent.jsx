import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const VerifyEmailComponent = ({ email, onSubmit }) => {
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(email, verificationCode);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nhập mã xác minh"
        variant="outlined"
        value={verificationCode}
        onChange={handleVerificationCodeChange}
      />
      <Button type="submit" variant="contained">
        Xác minh
      </Button>
    </form>
  );
};

export default VerifyEmailComponent;