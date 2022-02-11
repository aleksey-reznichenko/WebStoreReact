import React from 'react';
import {Typography} from "@mui/material";

export const ProductPrice = ({price}) => {
    return (
        <Typography
            variant='h5'
            margin='30px 0'
        >
            ${ price ? parseFloat(price).toFixed(2) : 0 }
        </Typography>
    )
}
