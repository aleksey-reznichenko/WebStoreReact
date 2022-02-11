import React from 'react';
import {useState} from "react";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import {backURL} from "../../../actions/PathDB";
import imgNotFound from "../../../img/catalog/imgNotFound.png";
import Typography from "@mui/material/Typography";
import {CGoodEdit} from "./GoodEdit";

export const ItemFound = ({item:{_id, name, price, images, description, categories}}) => {
    let [state, setState] = useState(false)

    return (
        !state ?
            <Button
                fullWidth
                sx={{
                    display: 'flex',
                    justifyContent:'flex-start'
                }}
                onClick={() => setState(true)}
            >
                <Box
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '30px'
                    }}
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
                            src={images && Array.isArray(images) && images[0]?.url ?
                                backURL + '/' + images[0].url : imgNotFound
                            }
                            alt={name}
                        />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                    }}>
                        <Typography
                            color='#000'
                            letterSpacing='1px'
                            fontFamily='sarif'
                            fontWeight='600'
                            variant='h6'
                        >
                            {name || 'no name'}
                        </Typography>
                        <Typography
                            letterSpacing='1px'
                            variant='body1'
                            fontWeight='300'
                            color='#616161'
                            margin='10px 0'
                            sx={{textTransform: 'capitalize'}}
                        >
                            {description?.length > 60 ?
                                'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
                                :
                                description
                            }
                        </Typography>
                        <Typography
                            color='#000'
                            letterSpacing='1px'
                            variant='body1'
                            fontWeight='600'
                        >
                            ${parseFloat(price).toFixed(2)}
                        </Typography>
                    </Box>
                </Box>
            </Button>
            :
            <Box
                sx={{
                    marginBottom: '30px',
                    border: '1px solid #616161',
                    borderRadius: '10px',
                    padding: '30px 20px'
                }}
            >
                <CGoodEdit
                    entity={{_id, name, price, images, description, categories}}
                />
                <Button
                    variant='outlined'
                    sx={{marginTop: '30px'}}
                    fullWidth
                    onClick={() => setState(false)}
                >
                    Cansel
                </Button>
            </Box>
    )
}
