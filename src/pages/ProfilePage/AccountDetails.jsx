import React from 'react';
import {useState} from "react";
import {Avatar, Grid, Typography} from "@mui/material";
import {backURL} from "../../actions/PathDB";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {ItemTabsAccountDefault} from "./ItemTabsAccountDefault";
import {CFormUpload} from "./FormUpload";

export const AccountDetails = ({promise, user, time}) => {
    const [status, setStatus] = useState(false)

    return (
        !status ?
            <Grid
                container
                spacing={2}
                justifyContent='space-between'
                alignItems='center'
                textAlign='center'
            >
                <ItemTabsAccountDefault
                    title={'Login'}
                    content={user?.login}
                />
                <ItemTabsAccountDefault
                    title={'Nick'}
                    content={user?.nick}
                />
                <ItemTabsAccountDefault
                    title={'Status account'}
                    content={user?.acl[2] || user?.acl[1]}
                />
                <ItemTabsAccountDefault
                    title={'Account creation date'}
                    content={time}
                />
                <ItemTabsAccountDefault
                    title={'Avatar'}
                    content={
                        (user?.avatar?.url ?
                                <Avatar
                                    style={{margin: '0 auto'}}
                                    alt="User"
                                    src={backURL + '/' + user?.avatar?.url}
                                />
                                : 'Not installed'
                        )
                    }
                />
                <Grid item xs={12} md={4}>
                    <Typography
                        sx={{cursor: 'pointer'}}
                        color={'#1976d2'}
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        variant='h6'
                        onClick={() => setStatus(true)}
                    >
                        <ManageAccountsIcon style={{marginRight: '10px'}}/>
                        Edit data
                    </Typography>
                </Grid>
                {!promise['setNewLogin']?.payload && promise['setNewLogin']?.status === 'RESOLVED' &&
                    <Typography
                        width='100%'
                        textAlign='center'
                        color='red'
                    >
                        this login already exists
                    </Typography>
                }
            </Grid>
            :
            <CFormUpload
                user={user}
                setStatus={value => setStatus(value)}
            />
    )
}
