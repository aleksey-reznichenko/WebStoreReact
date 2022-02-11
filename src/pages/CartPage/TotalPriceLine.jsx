import React from 'react';
import {Grid, Typography} from "@mui/material";

export const TotalPriceLine = ({title, subtitle, sizeSubtitle='body2'}) => {
    return (
        <Grid
            container
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            padding='20px'
        >
            <Grid item xs={6}>
                <Typography
                    variant='body2'
                    color='#616161'
                    textAlign='left'
                >
                    { title || 'title' }
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography
                    variant={sizeSubtitle}
                    color='#000'
                    textAlign='right'
                >
                    { subtitle || 'subtitle' }
                </Typography>
            </Grid>
        </Grid>
    )
}
