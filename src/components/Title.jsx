import React from 'react';
import {Box, Typography} from "@mui/material";
import rom from "../img/our-team/romb.png";

const Title = ({subtitle, title}) => {
    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
        >
            <Typography
                fontFamily='sarif'
                variant='h5'
                color='#000'
                letterSpacing='5px'
                textAlign='center'
                marginLeft='5px'
                marginBottom='10px'
            >
                {subtitle}
            </Typography>
            <img
                style={{
                    width: '7px',
                    maxHeight: '7px',
                }}
                src={rom}
                alt='item'
            />
            <Typography
                variant='h4'
                color='#000'
                letterSpacing='5px'
                textAlign='center'
                marginLeft='5px'
                marginTop='10px'
            >
                {title}
            </Typography>
        </Box>
    )
}
export default Title
