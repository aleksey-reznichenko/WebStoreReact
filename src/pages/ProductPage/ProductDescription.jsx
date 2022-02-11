import React from 'react';
import {Typography} from "@mui/material";

export const ProductDescription = ({description}) => {
    return (
        <Typography
            fontSize='17px'
            letterSpacing='1px'
            lineHeight='1.7em'
            color='#616161'
            fontWeight='300'
        >
            {description || 'PRODUCT DESCRIPTION'}
        </Typography>
    )
}
