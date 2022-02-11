import React from 'react';
import {Box, Button, Divider, Typography} from "@mui/material";
import {connect} from "react-redux";
import {TotalPriceLine} from "./TotalPriceLine";

const BlockTotal = ({auth ,cart, rows, onOrderUpsert, onCartClear}) => {
    return (
        <>
            <Typography
                padding='20px'
                variant='h4'
                fontFamily='sarif'
                letterSpacing='2px'
                textAlign='center'
            >
                TOTAL
            </Typography>
            <Divider/>
            <TotalPriceLine
                title={`${rows.length || 1} goods for the amount`}
                subtitle={`$${rows.reduce((a, i) => a + (i.good.price * i.count), 0)}`}
            />
            <TotalPriceLine
                title={'Cost of delivery'}
                subtitle={'according to the carrier\'s tariffs'}
            />
            <Divider/>
            <TotalPriceLine
                title={'To pay'}
                subtitle={`$${rows.reduce((a, i) => a + (i.good.price * i.count), 0)}`} sizeSubtitle={'h6'}
            />
            <Divider sx={{marginBottom: '20px'}}/>
            <Box
                display='flex'
                justifyContent='center'
                flexDirection='column'
                alignItems='center'
            >
                <Button
                    sx={{
                        borderRadius: '0',
                        width:'80%',
                        padding: '10px 20px',
                        marginBottom: '20px'
                    }}
                    color='success'
                    variant="outlined"
                    onClick={() => {onOrderUpsert(cart); onCartClear()}}
                    disabled={Object.entries(auth).length === 0}
                >
                    {
                        Object.entries(auth).length === 0 ?
                            'you need to log in'
                            : 'confirm the order'
                    }
                </Button>
                <Button
                    sx={{
                        borderRadius: '0',
                        width:'80%',
                        padding: '10px 20px'
                    }}
                    color='warning'
                    variant="outlined"
                    onClick={() => onCartClear()}
                >
                    cart clear
                </Button>
            </Box>
        </>
    )
}
export const CBlockTotal = connect(state=>({auth: state.auth}))(BlockTotal)
