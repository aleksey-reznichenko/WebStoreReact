import React from 'react';
import {useEffect, useState} from "react";
import {Box, Button, Grid} from "@mui/material";
import {SetCount} from "../../components/SetCount";
import {connect} from "react-redux";
import {actionCardChange} from "../../reducers/CartReducer";

const AddToCart = ({cart, good, addToCart}) => {
    let [count, setCount] = useState(cart[good?._id]?.count || 1)

    useEffect(() => {
        setCount(cart[good?._id]?.count || 1)
    },[cart])

    console.log(count)
    return (
        <Box
            width='100%'
            backgroundColor='#fff'
            padding='30px'
        >
            <Grid
                container
                justifyContent='space-between'
            >
                <Grid xs={5} item>
                    <SetCount
                        defaultValue={count}
                        onCount={value => setCount(value)}
                    />
                </Grid>
                <Grid xs={5} item>
                    <Button
                        sx={{
                            height: '55px',
                            width: '100%',
                            borderRadius: '0',
                            color: '#000',
                            borderColor: '#000',
                            fontSize: '20px',
                            fontWeight: '300'
                        }}
                        variant="outlined"
                        color={"inherit"}
                        onClick={() => addToCart(good, count)}
                    >
                        {good._id in cart ? 'CHANGE CART' : 'ADD TO CART'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}
export const CAddToCart = connect(state=> ({
        cart: state.cart}),
    {
        addToCart: actionCardChange})
(AddToCart)
