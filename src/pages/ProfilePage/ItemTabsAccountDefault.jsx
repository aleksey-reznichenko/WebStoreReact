import React from 'react';
import {Box, Grid, Typography, useMediaQuery} from "@mui/material";

export const ItemTabsAccountDefault = ({title, content}) => {
    const matches = useMediaQuery('(max-width:899px)')

    return(
        <Grid
            item xs={6} sm={4}
            marginBottom='20px'
        >
            <Typography
                color='#616161'
                fontWeight='300'
                marginBottom='5px'
                fontSize={matches ? '13px' : '16px'}
            >
                {title || 'title'}
            </Typography>
            {typeof content === "string" ?
                <Typography
                    color='#000'
                    fontWeight='400'
                    fontSize={matches ? '16px' : '22px'}
                >
                    {content || 'content'}
                </Typography>
                :
                <Box>
                    {content}
                </Box>
            }
        </Grid>
    )
}
