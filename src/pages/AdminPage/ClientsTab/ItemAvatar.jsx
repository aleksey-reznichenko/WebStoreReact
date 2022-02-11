import React from 'react';
import {Avatar} from "@mui/material";
import {backURL} from "../../../actions/PathDB";
import userDefault from "../../../img/header/userDefault.png";

export const ItemAvatar = ({avatar}) => {
    return (
        avatar ?
            <Avatar
                alt="User"
                src={avatar?.url && backURL + '/' + avatar.url}
            />
            :
            <Avatar
                alt="User"
                src={userDefault}
            />
    )
}
