import React from 'react';
import {useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {backURL} from "../../actions/PathDB";
import imgNotFound from "../../img/catalog/imgNotFound.png";
import Link from "react-router-dom/es/Link";
import {AccordionHeaderText} from "./AccordionHeaderText";
import {timeCalc} from "../ProductPage/timeCalc";

export const AccordionItem = ({data}) => {
    const time = timeCalc(+data['createdAt'])
    const [status, setStatus] = useState(false);

    return (
        <Accordion onChange={() => setStatus(!status)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                        backgroundColor: data['total'] ? '#7cd545': '#ad2222',
                        width:'5px',
                        borderRadius: '3px',
                        boxShadow: 'none'
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        padding: '10px 20px'
                    }}
                >
                    <AccordionHeaderText
                        columnText={`№ ${data['_id']} from ${time}`}
                        content={data['total'] ? 'Completed' : 'Canceled'}
                    />
                    {!status &&
                        <AccordionHeaderText
                            columnText={'Order price'}
                            content={data['total'] ? `$${data['total']}` : 'null'}
                        />
                    }
                    {!status &&
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '200px'
                            }}
                        >
                            {data['orderGoods'] && data['orderGoods'].map((item, index, array) => {
                                if (index < 2) {
                                    return (
                                        <Box
                                            key={index}
                                            maxWidth='60px'
                                            height='60px'
                                            borderRadius='10px'
                                            overflow='hidden'
                                            marginRight='20px'
                                        >
                                            <img style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                                 src={item?.good?.images && item.good.images[0].url ?
                                                     backURL + '/' + item.good.images[0].url : imgNotFound}
                                                 alt={'image'}/>
                                        </Box>
                                    )
                                }
                                else if (index === 2) {
                                    return (
                                        <Box
                                            key={index}
                                            sx={{
                                                width:'60px',
                                                height:'60px',
                                                border:'1px solid #616161',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: '#616161',
                                                borderRadius: '10px'}}
                                        >
                                            +{array.length - 2}
                                        </Box>
                                    )
                                }})
                            }
                        </Box>}
                </Box>
            </AccordionSummary>
            <AccordionDetails sx={{padding: '20px'}}>
                {data['orderGoods'] && data['orderGoods'].length > 0 ?
                    <>
                        <Grid container>
                            <Grid item md={7}>
                                <Typography
                                    color='#616161'
                                    variant='body1'
                                    letterSpacing='1px'
                                    textAlign='left'
                                >
                                    Product
                                </Typography>
                            </Grid>
                            <Grid item md={2}>
                                <Typography
                                    color='#616161'
                                    variant='body1'
                                    letterSpacing='1px'
                                    textAlign='center'
                                >
                                    Price
                                </Typography>
                            </Grid>
                            <Grid item md={1}>
                                <Typography
                                    color='#616161'
                                    variant='body1'
                                    letterSpacing='1px'
                                    textAlign='center'
                                >
                                    Count
                                </Typography>
                            </Grid>
                            <Grid item md={2}>
                                <Typography
                                    color='#616161'
                                    variant='body1'
                                    letterSpacing='1px'
                                    textAlign='right'
                                >
                                    Sum
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider sx={{margin: '10px 0'}}/>
                        {data['orderGoods'].map((item, index) => {
                            return (
                                <Grid
                                    key={index}
                                    container
                                    alignItems='center'
                                    marginBottom='20px'
                                >
                                    <Grid item md={7}>
                                        <Link
                                            style={{
                                                textDecoration: 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                color: '#616161'
                                            }}
                                            to={`/good/${item?.good?._id}`}
                                        >
                                            <Box
                                                minWidth='60px'
                                                maxWidth='60px'
                                                height='60px'
                                                borderRadius='10px'
                                                overflow='hidden'
                                                marginRight='20px'
                                            >
                                                <img style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                                     src={item?.good?.images && item.good.images[0].url ?
                                                         backURL + '/' + item.good.images[0].url : imgNotFound}
                                                     alt={'image'}/>
                                            </Box>
                                            <Typography
                                                variant='body1'
                                            >
                                                {item.good?.name || 'product name'}
                                            </Typography>
                                        </Link>
                                    </Grid>
                                    <Grid item md={2}>
                                        <Typography
                                            color='#616161'
                                            variant='body1'
                                            letterSpacing='1px'
                                            textAlign='center'
                                        >
                                            {item?.price ? '$' + parseFloat(item.price).toFixed(2) : 'NaN'}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={1}>
                                        <Typography
                                            color='#616161'
                                            variant='body1'
                                            letterSpacing='1px'
                                            textAlign='center'
                                        >
                                            {item?.count || '1'}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={2}>
                                        <Typography
                                            color='#616161'
                                            variant='body1'
                                            letterSpacing='1px'
                                            textAlign='right'
                                        >
                                            {item?.price && item?.count ? '$'+parseFloat(item.price * item.count)
                                                .toFixed(2) : 'NaN'
                                            }
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )
                        })}
                        <Divider sx={{margin: '-10px 0 10px 0'}}/>
                        <Box
                            display='flex'
                            justifyContent='space-between'
                        >
                            <Typography
                                variant='body1'
                                color='#616161'
                            >
                                Total
                            </Typography>
                            <Typography
                                variant='body1'
                                color='#616161'
                            >
                                {data?.total ? '$'+parseFloat(data.total).toFixed(2) : 'NaN'}
                            </Typography>
                        </Box>
                    </> :
                    <Typography>Error</Typography>
                }
            </AccordionDetails>
        </Accordion>
    )
}
