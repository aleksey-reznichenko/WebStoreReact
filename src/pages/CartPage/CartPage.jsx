import React from 'react';
import {Box, Button, Container, Divider, Grid, Typography, useMediaQuery} from "@mui/material";
import {useEffect, useState} from "react";
import Breadcrumb from "../../components/Breadcrumbs";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {TableLine} from "../../components/TableLine";
import {NotFoundBlock} from "../../components/NotFoundBlock";
import imgUrl from "../../img/not-found/3.png";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {connect} from "react-redux";
import {actionCardChange, actionCardClear, actionCardRemove} from "../../reducers/CartReducer";
import {ActionFullOrder} from "../../actions/ActionOrder";
import {actionClearPromise} from "../../reducers/PromiseReducer";
import {CartGoodLine} from "./CartGoodLine";
import {CBlockTotal} from "./BlockTotal";
import {AccordionItem} from "../MyOrdersPage/AccordionItem";
import {actionOrderFindOne} from "../../actions/ActionOrderFind";

const CartPage = ({   order,
                      cart,
                      finalOrder,
                      onCardChange,
                      onCartClear,
                      onCartRemove,
                      onOrderUpsert,
                      actionClearOrder,
                      onOrderFind}) => {

    const matches = useMediaQuery('(max-width:768px)')
    const [showDetails, setShowDetails] = useState(false)

    let rows = []
    for (const key of Object.values(cart)) {
        rows.push(key)
    }

    useEffect(() => {
        if (order && Object.entries(order).length > 0) {
            actionClearOrder('order')
            actionClearOrder('orderFindOne')
        }
    },[cart])

    return (
        <>
            <Breadcrumb links={['cart']}/>
            {cart && Object.values(cart).length > 0 || order ?
                <main
                    style={{
                        backgroundColor: "#f3f3f3",
                        padding: matches ? "20px 0" : "50px 0",
                        minHeight:'300px'
                    }}
                >
                    <Container maxWidth="lg">
                        {order && Object.entries(order).length > 0 ?
                            <Box
                                display='flex'
                                minHeight='500px'
                                height='100%'
                                flexDirection='column'
                                alignItems='center'
                                justifyContent='space-around'
                            >
                                {order.error ?
                                    <Typography
                                        variant='h5'
                                        textAlign='center'
                                        marginBottom='20px'
                                    >
                                        Error, try again
                                    </Typography>
                                    :
                                    <>
                                        <Typography
                                            variant='h5'
                                            textAlign='center'
                                            marginBottom='20px'
                                        >
                                            Order successfully completed
                                        </Typography>
                                        <CheckCircleOutlineIcon/>
                                        <Typography
                                            variant='h4'
                                            textAlign='center'
                                            fontFamily='sarif'
                                            letterSpacing='2px'
                                            marginBottom='20px'
                                            sx={{textTransform: 'uppercase'}}
                                        >
                                            Thanks for your order!
                                        </Typography>
                                        <Typography
                                            variant='body1'
                                            textAlign='center'
                                            color="#616161"
                                            marginBottom='20px'
                                        >
                                            Attention! Shipping is paid separately upon receipt of the goods.
                                        </Typography>
                                        <Typography
                                            variant='body1'
                                            textAlign='center'
                                            color="#616161"
                                            marginBottom='20px'
                                        >
                                            Your order number: {order.payload?._id || 1}
                                        </Typography>
                                        <Typography
                                            variant='body1'
                                            textAlign='center'
                                            color="#616161"
                                            marginBottom='20px'
                                        >
                                            For the amount: ${+order.payload?.total || 0}
                                        </Typography>
                                        <Button
                                            variant='outlined'
                                            onClick={() => {setShowDetails(!showDetails); onOrderFind(order.payload?._id)}}
                                        >
                                            Show Details
                                        </Button>
                                        {showDetails && finalOrder?.payload &&
                                            <Box
                                                marginTop='40px'
                                                marginBottom='40px'
                                                width='100%'
                                            >
                                                <AccordionItem key={finalOrder.payload._id} data={finalOrder.payload}/>
                                            </Box>
                                        }
                                    </>
                                }
                            </Box>
                            :
                            <Grid
                                container
                                justifyContent='space-between'
                            >
                                <Grid item xs={8.5}>
                                    <TableLine
                                        columnName={['PRODUCT', 'QUANTITY', 'REMOVE', 'SUBTOTAL']}
                                        customSizeCol={[6, 3, 2, 1]}
                                    />
                                    <Divider sx={{marginBottom: '20px'}}/>
                                    {rows.map((item, index) =>
                                        <CartGoodLine
                                            key={index}
                                            item={item}
                                            onCartRemove={onCartRemove}
                                            onCardChange={onCardChange}
                                        />)
                                    }
                                    <Divider/>
                                </Grid>
                                <Grid item xs={3}
                                      sx={{backgroundColor: '#fff'}}
                                      height='100%'
                                      paddingBottom='20px'
                                >
                                    <CBlockTotal
                                        cart={cart}
                                        rows={rows}
                                        onCartClear={onCartClear}
                                        onOrderUpsert={onOrderUpsert}
                                    />
                                </Grid>
                            </Grid>
                        }
                    </Container>
                </main>
                :
                <NotFoundBlock
                    img={imgUrl}
                    headerText={'YOUR CART IS CURRENTLY EMPTY'}
                    text={
                        <Box display='flex' alignItems='center'>
                            <Typography component='span'>Click the</Typography>
                            <AddShoppingCartIcon sx={{margin: '0 10px'}}/>
                            <Typography component='span'>icons to add products</Typography>
                        </Box>
                    }
                />
            }
        </>
    )
}

export const CCartPage = connect(state => ({
        cart: state.cart,
        order: state.promise?.order,
        finalOrder: state.promise['orderFindOne']}),
    {
        onCardChange: actionCardChange,
        onCartClear: actionCardClear,
        onCartRemove: actionCardRemove,
        onOrderUpsert: ActionFullOrder,
        actionClearOrder: actionClearPromise,
        onOrderFind: actionOrderFindOne})
(CartPage)
