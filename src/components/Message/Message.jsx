import * as React from 'react';
import { Alert, Button, Snackbar, Stack } from "@mui/material";
import { message } from "antd";

const SuccessMessage = ({ mes }) => {
    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar autoHideDuration={6000}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    {mes}
                </Alert>
            </Snackbar>
        </Stack>
    );
};

const success = (mes = 'Success') => {
    // message.success(mes);
    return <SuccessMessage mes={mes} />;
};

const error = (mes = 'Error') => {
    message.error(mes);
};

const warning = (mes = 'Warning') => {
    message.warning(mes);
};

export { success, error, warning };
