import React from 'react';
import Breadcrumb from "../../components/Breadcrumbs";
import {CMainWishList} from "./MainWishList";

export const WishListPage = () => {
    return (
        <>
            <Breadcrumb links={['wish list']}/>
            <CMainWishList/>
        </>
    )
}
