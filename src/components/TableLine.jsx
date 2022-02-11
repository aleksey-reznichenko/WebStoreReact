import React from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import Link from "react-router-dom/es/Link";
import {backURL} from "../actions/PathDB";
import imgNotFound from "../img/catalog/imgNotFound.png";
import CloseIcon from "@mui/icons-material/Close";

export const ItemHeaderLine = ({text, align='left'}) => {
    return (
        <Typography
            color='#616161'
            variant='body1'
            letterSpacing='1px'
            textAlign={align}
        >
            {text || ''}
        </Typography>
    )
}
export const LinkProductItem = ({item: [_id, name, images], children=''}) => {
    return (
        <Link
            style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center'
            }}
            to={`/good/${_id}`}
        >
            <Box
                minWidth='60px'
                maxWidth='60px'
                height='60px'
                borderRadius='10px'
                overflow='hidden'
                marginRight='20px'
            >
                <img
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                    src={
                        Array.isArray(images) && images[0]?.url ?
                            backURL + '/' + images[0]?.url
                            :
                            imgNotFound
                    }
                    alt={name}
                />
            </Box>
            {children ?
                <Box
                    display='flex'
                    flexDirection='column'
                    height='50px'
                    justifyContent='space-around'
                >
                    <ItemHeaderLine text={name}/>
                    <ItemHeaderLine text={children}/>
                </Box>
                :
                <ItemHeaderLine text={name}/>
            }
        </Link>
    )
}

const AddToCart = ({good, addToCart}) => {
    return (
        <Button
            sx={{
                height: '40px',
                width: '70%',
                borderRadius: '0',
                color: '#000',
                borderColor: '#000',
                fontSize: '16px',
                fontWeight: '300'
            }}
            variant="outlined"
            color={"inherit"}
            onClick={() => addToCart(good)}
        >
            ADD TO CART
        </Button>
    )
}

export const RemoveFromList = ({good, onRemove}) => {
    return (
        <Button
            size="small"
            color="inherit"
            onClick={() => onRemove(good)}
        >
            <CloseIcon/>
        </Button>
    )
}
export const TableLine = ({columnName, role='header', customSizeCol}) => {
    const good = {
        '_id': columnName[0][0],
        'name': columnName[0][1],
        'images': columnName[0][2],
        'price': columnName[1]
    }

    return (
        <Grid
            container
            justifyContent='space-between'
            marginBottom='20px'
            alignItems='center'
        >
            <Grid
                item xs={3}
                md={customSizeCol ? customSizeCol[0] : 5}
            >
                {
                    role === 'header' ?
                        <ItemHeaderLine text={columnName[0]}/>
                        :
                        <LinkProductItem item={columnName[0]}/>
                }
            </Grid>
            <Grid
                item xs={3}
                md={customSizeCol ? customSizeCol[1] : 2}
            >
                <ItemHeaderLine
                    text={role === 'header' ? columnName[1] : '$'+columnName[1]}
                    align={'center'}
                />
            </Grid>
            <Grid
                item xs={3}
                md={customSizeCol ? customSizeCol[2] : 3}
                display='flex'
                justifyContent='center'
            >
                {
                    role === 'header' ?
                        <ItemHeaderLine text={columnName[3]} align={'center'}/>
                        :
                        <AddToCart good={good} addToCart={columnName[3]}/>
                }
            </Grid>
            <Grid
                item xs={3}
                md={customSizeCol ? customSizeCol[3] : 1}
                display='flex'
                justifyContent='center'
            >
                {
                    role === 'header' ?
                        <ItemHeaderLine text={columnName[2]} align={'center'}/>
                        :
                        <RemoveFromList good={good} onRemove={columnName[2]}/>
                }
            </Grid>
        </Grid>
    )
}
