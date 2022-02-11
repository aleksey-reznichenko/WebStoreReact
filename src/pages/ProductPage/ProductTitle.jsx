import React from 'react';
import {Typography} from "@mui/material";

export const ProductTitle = ({title}) => {
    return (
        <Typography
            variant='h4'
            fontFamily='sarif'
            letterSpacing='4px'
        >
            {title || 'PRODUCT TITLE'}
        </Typography>
    )
}
