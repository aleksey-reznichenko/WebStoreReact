import React from 'react';
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {CircularProgress, Divider, Pagination} from "@mui/material";
import {connect} from "react-redux";
import {actionUserCount, actionUserFind} from "../../../actions/ActionUserFind";
import {ClientsCart} from "./ClientsCart";

const Clients = ({usersArr, usersCount, getAllClients, getCountUser}) => {
    const itemsPerPage = 100
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(1)

    useEffect(() => {
        if (!usersArr && page === 1) getAllClients()
        if (!usersCount) getCountUser()
        else {
            setCount(Math.ceil(+usersCount?.payload / itemsPerPage))
        }
    }, [usersArr, usersCount])
    const handleChange = (event, value) => {
        setPage(value);
        getAllClients((itemsPerPage * value)-itemsPerPage, itemsPerPage);
    }

    return (
        <>
            <Box
                marginBottom='20px'
                width='100%'
                display='flex'
                justifyContent='space-between'
                alignItems='center'
            >
                {usersCount?.payload &&
                    <Typography
                        variant='h6'
                        letterSpacing='2px'
                    >
                        Total clients: {usersCount.payload}
                    </Typography>
                }
            </Box>
            {!usersArr || !usersArr?.payload ?
                <Box
                    sx={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                >
                    <CircularProgress color="inherit"/>
                </Box>
                :
                Array.isArray(usersArr.payload) && usersArr.payload.map(item => {
                    return(
                        <ClientsCart
                            key={item?._id}
                            _id={item?._id || ''}
                            login={item?.login || 'not found'}
                            nick={item?.nick || ''}
                            createdAt={item?.createdAt || ''}
                            avatar={item?.avatar}
                            acl={item?.acl}
                        />
                    )
                })
            }
            <Box
                width='100%'
                flexGrow='0'
            >
                <Divider sx={{margin: '20px'}}/>
                <Box
                    display='flex'
                    justifyContent='center'
                    width='100%'
                >
                    <Pagination
                        count={count || 1}
                        page={page}
                        onChange={handleChange}
                        defaultPage={1}
                        color="primary"
                        size="large"
                        showFirstButton
                        showLastButton
                    />
                </Box>
            </Box>
        </>
    )
}
export const CClients = connect(state => ({
        usersArr: state.promise['allUsers'],
        usersCount: state.promise['usersCount']}),
    {
        getAllClients: actionUserFind,
        getCountUser: actionUserCount})
(Clients)
