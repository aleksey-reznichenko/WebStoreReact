import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import Title from "../../components/Title";

export const BlockQualityItem = ({Icon, title, content}) => {
    return (
        <Grid sx={{padding: '0 20px'}} item xs={12} md={4}>
            <Box
                display='flex'
                justifyContent='center'
                marginBottom='20px'
            >
                {Icon && <Icon/>}
            </Box>
            <Title subtitle={title || 'default title'} />
            <Typography
                variant='body1'
                fontWeight='300'
                lineHeight='1.8em'
                color='#616161'
                marginBottom='10px'
                textAlign='center'
            >
                {content || 'default content'}
            </Typography>
        </Grid>
    )
}
