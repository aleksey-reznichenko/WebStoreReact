import React from 'react';
import {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import {ItemHeaderLine, LinkProductItem, RemoveFromList} from "../../components/TableLine";
import {SetCount} from "../../components/SetCount";

export const CartGoodLine = ({item, onCartRemove, onCardChange}) => {
    let [count, setCount] = useState(item?.count)
    useEffect(() => {
        onCardChange(item?.good, count)
    }, [count])

    return(
        <Grid
            container
            alignItems='center'
            marginBottom='20px'
        >
            <Grid item xs={6}>
                <LinkProductItem
                    item={[item?.good?._id, item?.good?.name, item?.good?.images]}
                    children={`$${ item?.good?.price }`}
                />
            </Grid>
            <Grid item xs={3}
                  display='flex'
                  justifyContent="center"
            >
                <SetCount
                    height={40}
                    width={40}
                    defaultValue={item?.count}
                    onCount={value => setCount(value)}
                />
            </Grid>
            <Grid item xs={2}>
                <ItemHeaderLine
                    align={'center'}
                    text={(`$${parseFloat(item?.good?.price * count).toFixed(2)}`) || 'NaN'}
                />
            </Grid>
            <Grid item xs={1}>
                <RemoveFromList
                    good={item?.good}
                    onRemove={onCartRemove}
                />
            </Grid>
        </Grid>
    )
}
