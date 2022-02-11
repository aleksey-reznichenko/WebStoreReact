import React from 'react';
import {Typography} from "@mui/material";

export const ProductTags = ({title, subtitle}) => {
    return (
        <Typography
            variant='body2'
            color='#616161'
            fontWeight='300'
            marginBottom='10px'
        >
            {title}: {
                Array.isArray(subtitle) ?
                    subtitle.map((item, index) =>
                        <span
                            key={index}
                        >
                            { item }
                            { subtitle.length-1 !== index && ", " }
                        </span>)
                    : subtitle
            }
        </Typography>
    )
}
