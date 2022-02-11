import React from 'react';
import {Box, CircularProgress, Divider, Grid, useMediaQuery} from "@mui/material";
import Link from "react-router-dom/es/Link";
import {connect} from "react-redux";
import {CarouselItem} from "./CarouselItem";
import {ImageItem} from "./ImageItem";
import {ProductDescription} from "./ProductDescription";
import {ProductTitle} from "./ProductTitle";
import {ProductPrice} from "./ProductPrice";
import {CAddToCart} from "./AddToCart";
import {CAddToWishList} from "./AddToWishList";
import {ProductTags} from "./ProductTags";
import {timeCalc} from "./timeCalc";

const Goods = ({good}) => {
    const matches = useMediaQuery('(max-width:768px)')

    return (
        good && Object.values(good).length > 0  ?
            <Grid
                container
                justifyContent='space-around'
                padding={matches ? "20px 0" : "50px 0"}
            >
                <Grid xs={12} md={6}
                      item
                      padding='5px 70px 5px 10px'
                >
                    {Array.isArray(good?.images) && good?.images.length > 1 ?
                        <CarouselItem images={good?.images}/>
                        :
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                height: '340px'
                            }}
                        >
                            <ImageItem images={Array.isArray(good?.images) && good?.images[0]}/>
                        </Box>
                    }
                    <Divider sx={{margin: '20px 0'}}/>
                    <ProductDescription description={good?.description}/>
                </Grid>
                <Grid xs={12} md={6}
                      item
                      padding='5px 110px 5px 10px'
                >
                    <ProductTitle title={good?.name}/>
                    <ProductPrice price={good?.price}/>
                    <CAddToCart good={good}/>
                    <CAddToWishList good={good}/>
                    <Box>
                        {good?._id &&
                            <ProductTags
                                key={'SKU'}
                                title={'SKU'}
                                subtitle={good?._id}
                            />
                        }
                        {Array.isArray(good?.categories) &&
                            <ProductTags
                                key={'CATEGORY'}
                                title={'CATEGORY'}
                                subtitle={good?.categories.map(item => {
                                    return (
                                        <Link
                                            key={item?._id}
                                            style={{
                                                color: "#000",
                                                textDecoration: 'none'
                                            }}
                                            to={`/catalog/category/${item?._id}`}
                                        >
                                            {item?.name}
                                        </Link>
                                    )
                                })}
                            />
                        }
                        {good?.createdAt &&
                            <ProductTags
                                key={'TIMEOFCREATION'}
                                title={'TIME OF CREATION'}
                                subtitle={timeCalc(good?.createdAt)}
                            />
                        }
                    </Box>
                </Grid>
            </Grid>:
            <Box
                sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}
            >
                <CircularProgress color="inherit"/>
            </Box>
    )
}
export const CGoods = connect(state => ({good: state.promise['goodFindOne']?.payload}))(Goods)
