import React from 'react';
import {backURL} from "../../actions/PathDB";
import imgNotFound from "../../img/catalog/imgNotFound.png";

export const ImageItem = ({images}) => {
    return (
        <img
            src={images && images.url ? backURL + '/' + images.url : imgNotFound}
            alt={images['originalFileName'] ? images['originalFileName'].split('.')[0] : 'image'}
        />
    )
}
