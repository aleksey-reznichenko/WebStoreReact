import React from 'react';
import {Button, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {connect} from "react-redux";
import {actionWishListAdd, actionWishListRemove} from "../../reducers/WishListReducer";

const AddToWishList = ({good={}, wishlist ,onAddToWishList, onWishListRemove}) => {
    const flag = good?._id in wishlist

    return (
        <Button
            size="small"
            color="inherit"
            sx={{paddingLeft: '0', margin: '30px 0'}}
            onClick={() => {flag ? onWishListRemove(good) : onAddToWishList(good)}}
        >
            <Typography
                color='#000'
                display='flex'
                alignItems='center'
                fontSize='13px'
                fontWeight='600'
                letterSpacing='2px'
            >
                {flag ?
                    <>
                        <FavoriteIcon sx={{marginRight: '10px'}}/>
                        REMOVE FROM WISHLIST
                    </>
                    :
                    <>
                        <FavoriteBorderIcon sx={{marginRight: '10px'}}/>
                        ADD TO WISHLIST
                    </>
                }
            </Typography>
        </Button>
    )
}

export const CAddToWishList = connect(state => ({
        wishlist: state.wishlist}),
    {
        onAddToWishList: actionWishListAdd,
        onWishListRemove: actionWishListRemove})
(AddToWishList)
