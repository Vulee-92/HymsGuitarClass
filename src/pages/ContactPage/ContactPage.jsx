import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const user = useSelector((state) => state.user);
  console.log('first', user)
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      message,
    };

    dispatch({
      type: "contact",
      data,
    });
  };

  return (
    <Paper sx={{ maxWidth: "500px", margin: "auto" }}>
      <Typography variant="h4" align="center">Contact Us</Typography>
      <TextField
        autoFocus
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Message"
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Submit
      </Button>
    </Paper>
  );
};

export default ContactPage;