import React from 'react';
import {useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import SendAndArchiveIcon from "@mui/icons-material/SendAndArchive";
import CancelIcon from "@mui/icons-material/Cancel";
import {connect} from "react-redux";
import {
    actionSetAvatar,
    actionSetUserUpsert
} from "../../actions/ActionUploadFile";
import {actionFullUserFindOne} from "../../actions/ActionUserFind";
import {MyDropzone} from "./MyDropzone";

const FormUpload = ({user, setStatus, setUserUpsert, setImage}) => {
    const [loginValue, setLoginValue] = useState(user?.login || '')
    const [nickValue, setNickValue] = useState(user?.nick || '')
    const [passwordValue, setPasswordValue] = useState('')
    const [fileValue, setFileValue] = useState('')
    return (
        <Grid
            container
            spacing={2}
            justifyContent='center'
            textAlign='center'
            flexDirection='column'
        >
            <Grid
                item xs={12}
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                marginBottom='30px'
            >
                <TextField
                    sx={{color: '#000'}}
                    label={'Login'}
                    variant="outlined"
                    placeholder={user?.login || ''}
                    onChange={e => setLoginValue(e.target.value)}
                />
                <TextField
                    sx={{color: '#000'}}
                    label={'Nick'}
                    variant="outlined"
                    placeholder={user?.nick || ''}
                    onChange={e => setNickValue(e.target.value)}
                />
                <TextField
                    sx={{color: '#000'}}
                    label={'Password'}
                    type='password'
                    variant="outlined"
                    onChange={e => setPasswordValue(e.target.value)}
                />
            </Grid>
            <Grid
                item xs={12}
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                marginBottom='30px'
            >
                <MyDropzone onLoad={value => setFileValue(value)}/>
            </Grid>
            <Grid
                item xs={12}
                display='flex'
                justifyContent='center'
                alignItems='center'
            >
                <Button
                    style={{ color: '#1976d2'}}
                    fullWidth
                    type='submit'
                    onClick={() => {
                        let obj = {}
                        if (loginValue !== user?.login) {
                            obj.login = loginValue
                        }
                        if (nickValue !== user?.nick) {
                            obj.nick = nickValue
                        }
                        if (passwordValue){
                            obj.password = passwordValue
                        }
                        if (Array.isArray(fileValue) && fileValue[0]) {
                            setImage(fileValue[0]);
                            setStatus(false)
                        }
                        if (Object.values(obj).length > 0){
                            setUserUpsert(obj)
                            setStatus(false)
                        }
                    }}
                >
                    <SendAndArchiveIcon style={{marginRight: '5px'}}/>
                    Save
                </Button>
                <Button
                    style={{ color: '#1976d2'}}
                    fullWidth
                    onClick={() => setStatus(false)}
                >
                    <CancelIcon style={{marginRight: '5px'}}/>
                    Cancel
                </Button>
            </Grid>
        </Grid>
    )
}
export const CFormUpload = connect(null,
    {
        setUserUpsert: actionSetUserUpsert,
        setImage: actionSetAvatar,
        userUpdate: actionFullUserFindOne})
(FormUpload)
