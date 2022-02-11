import React from 'react';
import {Box, Button, TextField, Typography, useMediaQuery} from "@mui/material";
import {useState} from "react";
import UnstyledButtonCustom from "../../components/MainButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const Form = ({title, target, onClickEvent, children, setStatus}) => {
    const matches2 = useMediaQuery('(max-width:450px)')

    const [valueLogin, setValueLogin] = useState('')
    const [valuePassword, setValuePassword] = useState('')
    const [flagLogin, setFlagLog] = useState(false)
    const [flagPassword, setFlagPass] = useState(false)

    return (
        <Box
            sx={{
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: matches2 ? "30px 20px" : "40px 60px"
            }}
        >
            <Typography
                variant='h4'
                letterSpacing='10px'
                marginBottom='30px'
            >
                { title || 'title' }
            </Typography>
            <TextField
                id="login"
                label="Login"
                variant="standard"
                type="text"
                required
                fullWidth
                value={valueLogin}
                onChange={e => {
                    setValueLogin(e.target.value);
                    setFlagLog(true)
                }}
                error={flagLogin && (valueLogin.length < 3 || valueLogin.length > 20)}
                sx={{marginBottom: '20px'}}
            />
            <TextField
                id="password"
                label="Password"
                variant="standard"
                type="password"
                required
                fullWidth
                value={valuePassword}
                onChange={e => {
                    setValuePassword(e.target.value);
                    setFlagPass(true)
                }}
                error={flagPassword && (valuePassword.length < 3 || valuePassword.length > 20)}
                sx={{marginBottom: '30px'}}
            />
            {children}
            <UnstyledButtonCustom
                onClick={() => {
                    if(valuePassword.length >= 3 && valuePassword.length <= 20 &&
                        valueLogin.length >= 3 && valueLogin.length <= 20) {
                        onClickEvent(valueLogin, valuePassword)
                    }
                }}
                text={title || 'title'}
            />
            <Box
                width='100%'
                display='flex'
                justifyContent='flex-end'
                marginTop='20px'
            >
                <Button
                    onClick={() => setStatus(target)}
                >
                    { target }
                    <ArrowForwardIosIcon/>
                </Button>
            </Box>
        </Box>
    )
}
