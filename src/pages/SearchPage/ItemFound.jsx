import React from 'react';
import Link from "react-router-dom/es/Link";
import {Box, Typography} from "@mui/material";
import {backURL} from "../../actions/PathDB";
import imgNotFound from "../../img/catalog/imgNotFound.png";

export const ItemFound = ({item:{_id, name, price, images, description}}) => {
    return (
        <Link
            style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '30px'
            }}
            to={`/good/${_id}`}
        >
            <Box
                width='60px'
                height='60px'
                borderRadius='10px'
                overflow='hidden'
                marginRight='60px'
                position='relative'
            >
                <img
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                    src={Array.isArray(images) && images[0]?.url ? backURL + '/' + images[0]?.url : imgNotFound}
                    alt={name}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent: 'space-between',
                    alignItems:'flex-start'
                }}
            >
                <Typography
                    color='#000'
                    letterSpacing='1px'
                    fontFamily='sarif'
                    fontWeight='600'
                    variant='h6'
                >
                    {name || 'name'}
                </Typography>
                <Typography
                    letterSpacing='1px'
                    variant='body1'
                    fontWeight='300'
                    color='#616161'
                    margin='10px 0'
                >
                    {
                        description && description.length > 60 ?
                            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
                            : description
                    }
                </Typography>
                <Typography
                    color='#000'
                    letterSpacing='1px'
                    variant='body1'
                    fontWeight='600'
                >
                    ${parseFloat(price || 0).toFixed(2)}
                </Typography>
            </Box>
        </Link>
    )
}
