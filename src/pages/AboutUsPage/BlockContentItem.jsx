import React from 'react';
import {Grid, Typography} from "@mui/material";

export const BlockContentItem = ({content}) => {
    return (
        <Grid item xs={12} sm={5}>
            <Typography
                variant='body1'
                fontWeight='300'
                lineHeight='1.8em'
                color='#616161'
                marginBottom='10px'
                textAlign='justify'
            >
                {content || 'default text'}
            </Typography>
        </Grid>
    )
}
