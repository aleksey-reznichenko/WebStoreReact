import React from 'react';
import {Container, useMediaQuery} from "@mui/material";
import Breadcrumb from "../../components/Breadcrumbs";
import {CMainOrders} from "./MainOrders";

export const MyOrdersPage = () => {
    const matches = useMediaQuery('(max-width:768px)')
    return (
        <>
            <Breadcrumb links={['My orders']} />
            <main
                style={{
                    backgroundColor: "#f3f3f3",
                    padding: matches ? "20px 0" : "50px 0",
                    minHeight: '300px'
                }}
            >
                <Container
                    maxWidth="lg"
                    sx={{position:'relative'}}
                >
                    <CMainOrders />
                </Container>
            </main>
        </>
    )
}
