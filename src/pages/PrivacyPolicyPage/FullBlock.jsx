import React from 'react';
import {Box, Typography} from "@mui/material";

export const FullBlock = ({title, children, breakpoint}) => {
    return (
        <Box>
            <Typography
                variant={breakpoint ? 'h5': 'h4'}
                textAlign='center'
                fontWeight='300'
                marginBottom='20px'
                letterSpacing='7px'
            >
                {title || 'title'}
            </Typography>
            <Typography
                variant='body1'
                fontWeight='300'
                marginBottom='40px'
                color='#616161'
            >
                {children || 'children'}
            </Typography>
        </Box>
    )
}
