import React from 'react';
import {Box, Container, Divider, Typography, useMediaQuery} from "@mui/material";
import {TableLine} from "../../components/TableLine";
import {NotFoundBlock} from "../../components/NotFoundBlock";
import imgUrl from "../../img/not-found/2.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {connect} from "react-redux";
import {actionCardChange} from "../../reducers/CartReducer";
import {actionWishListRemove} from "../../reducers/WishListReducer";

const MainWishList = ({wishlist, addToCart, onWishListRemove, color='#f3f3f3'}) => {
    const matches = useMediaQuery('(max-width:899px)')
    let rows = []
    for (const key of Object.values(wishlist)) {
        for (const item in key) {
            rows.push(key[item])
        }
    }

    return (
        <>
            {Object.values(wishlist).length > 0 ?
                <main
                    style={{
                        backgroundColor: {color},
                        padding: matches ? "20px 0" : "50px 0",
                        minHeight:'300px'
                    }}
                >
                    <Container maxWidth="lg">
                        <TableLine columnName={['PRODUCT', 'PRICE', 'REMOVE', 'ADD TO CART']}/>
                        <Divider sx={{marginBottom: '20px'}}/>
                        {rows.map(item =>
                            <TableLine
                                key={item?._id}
                                columnName={[[item?._id, item?.name, item?.images], item?.price,
                                    onWishListRemove, addToCart]}
                                role={'item'}
                            />)
                        }
                        <Divider/>
                    </Container>
                </main>
                :
                <NotFoundBlock
                    img={imgUrl}
                    headerText={'YOUR WISHLIST IS CURRENTLY EMPTY'}
                    text={
                        <Box
                            display='flex'
                            alignItems='center'
                        >
                            <Typography
                                component='span'
                            >
                                Click the
                            </Typography>
                            <FavoriteBorderIcon sx={{margin: '0 10px'}}/>
                            <Typography
                                component='span'
                            >
                                icons to add products
                            </Typography>
                        </Box>
                    }
                />
            }
        </>
    )
}

export const CMainWishList = connect(state => ({
        wishlist: state.wishlist}),
    {
        addToCart: actionCardChange,
        onWishListRemove: actionWishListRemove})
(MainWishList)
