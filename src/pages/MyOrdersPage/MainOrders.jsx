import React from 'react';
import {useEffect, useState} from "react";
import {Box, CircularProgress, Divider, Pagination, Typography} from "@mui/material";
import {NotFoundBlock} from "../../components/NotFoundBlock";
import {connect} from "react-redux";
import {actionFullOrderFind, actionOrderCount} from "../../actions/ActionOrderFind";
import {actionMyOrderClear} from "../../reducers/MyOrdersReducer";
import {AccordionItem} from "./AccordionItem";

const MainOrders = ({itemsPerPage=100,
                        orders,
                        ordersPreload,
                        orderCount,
                        onFindOrders,
                        onOrdersClear,
                        onGetCountOrder}) => {
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(1)
    const handleChange = (event, value) => {
        onOrdersClear()
        setPage(value);
        onFindOrders((itemsPerPage * value)-itemsPerPage, itemsPerPage);
    }

    useEffect(() => {
        if (Object.entries(orders).length === 0 && page === 1) onFindOrders(null, itemsPerPage)
        if (!orderCount) onGetCountOrder()
        else {
            setCount(Math.ceil(+orderCount?.payload / itemsPerPage))
        }
    }, [orders, orderCount])


    return (
        <>
            {ordersPreload?.status === "PENDING" || Object.entries(orders).length === 0 ?
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
                Object.entries(orders?.orderResult).length > 0 ?
                    <Box>
                        {orderCount?.payload &&
                            <Typography
                                variant='h5'
                                marginBottom='30px'
                                letterSpacing='3px'
                            >
                                Total orders: {orderCount.payload || 0}
                            </Typography>
                        }
                        {Object.values(orders.orderResult)
                            .map(item => <AccordionItem key={item._id} data={item}/>)
                        }
                        <Divider sx={{margin: '20px'}}/>
                        <Box
                            display='flex'
                            justifyContent='center'
                            width='100%'
                        >
                            <Pagination
                                count={count}
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
                    :
                    <NotFoundBlock
                        headerText={'OOPS! ORDERS CAN’T BE FOUND'}
                        text={'No order has been made yet.'}
                    />
            }
        </>
    )
}

export const CMainOrders = connect(state => ({
        orders: state.myorders,
        ordersPreload: state.promise['orderFind'],
        orderCount: state.promise['orderCount']}),
    {
        onFindOrders: actionFullOrderFind,
        onOrdersClear: actionMyOrderClear,
        onGetCountOrder: actionOrderCount})
(MainOrders)
