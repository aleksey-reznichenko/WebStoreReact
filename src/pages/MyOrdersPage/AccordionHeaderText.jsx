import React from 'react';
import {Box, Typography} from "@mui/material";

export const AccordionHeaderText = ({columnText, content}) => {
    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
        >
            <Typography
                variant='body2'
                color='#616161'
                marginBottom='20px'
            >
                {columnText || 'columnText'}
            </Typography>
            <Typography
                variant='body1'
            >
                {content || 'content'}
            </Typography>
        </Box>
    )
}
