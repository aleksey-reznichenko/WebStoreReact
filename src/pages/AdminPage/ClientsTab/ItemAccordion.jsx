import React from 'react';
import Typography from "@mui/material/Typography";

export const ItemAccordion = ({text, size='h6'}) => {
    return (
        <Typography
            variant={size}
            color='#616161'
            letterSpacing='1px'
        >
            {text}
        </Typography>
    )
}
