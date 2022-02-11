import React from 'react';
import {Box, Typography} from "@mui/material";

export const BlockPolicy = ({title, children, breakpoint}) => {
    return (
        <Box marginTop='30px'>
            <Typography
                variant={breakpoint ? 'h6':'h5'}
                fontWeight='500'
                letterSpacing='5px'
                textAlign='left'
                marginBottom={breakpoint ? '10px':'25px'}
            >
                {title || 'title'}
            </Typography>
            <Typography
                variant='body1'
                fontWeight='300'
                marginBottom='40px'
                color='#616161'
                textAlign='left'
                lineHeight='1.7em'
            >
                {children || 'children'}
            </Typography>
        </Box>
    )
}
