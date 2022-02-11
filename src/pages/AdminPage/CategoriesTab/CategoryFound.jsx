import React from 'react';
import {useState} from "react";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {CCategoryEdit} from "./CategoryEdit";
import {timeCalc} from "../../ProductPage/timeCalc";

export const CategoryFound = ({item}) => {
    let [state, setState] = useState(false)
    let formattedTime = 0;
    if (['createdAt'] in item) {
        formattedTime = timeCalc(+item.createdAt);
    }

    return (
        !state ?
            <Button
                fullWidth
                sx={{
                    display: 'flex',
                    justifyContent:'center',
                    alignItems: 'center',
                    marginBottom: '20px',
                    border: '1px dashed #616161',
                    borderRadius: '20px',
                    padding: '20px'
                }}
                onClick={() => setState(true)}
            >
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
                        {item?.name || 'no name'}
                    </Typography>
                    <Typography
                        letterSpacing='1px'
                        variant='body1'
                        fontWeight='300'
                        color='#616161'
                        margin='10px 0'
                    >
                        { formattedTime
                            ? `Time of creation: ${formattedTime}`
                            : ''
                        }
                    </Typography>
                    <Typography
                        color='#000'
                        letterSpacing='1px'
                        variant='body1'
                        fontWeight='600'
                    >
                        { item?.goods?.length
                            ? `Count of goods: ${item?.goods?.length}`
                            : ''
                        }
                    </Typography>
                    <Typography
                        color='#000'
                        letterSpacing='1px'
                        variant='body1'
                        fontWeight='600'
                    >
                        { item?.subCategories?.length
                            ? `Count of sub categories: ${item?.subCategories?.length}`
                            : ''
                        }
                    </Typography>
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
                <CCategoryEdit entity={{...item}}/>
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
