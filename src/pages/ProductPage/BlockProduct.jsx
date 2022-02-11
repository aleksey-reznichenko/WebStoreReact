import React from 'react';
import {useEffect} from "react";
import Breadcrumb from "../../components/Breadcrumbs";
import {Container} from "@mui/material";
import {connect} from "react-redux";
import {actionGoodFindOne} from "../../actions/ActionGoodFind";
import {CGoods} from "./Goods";

const BlockProduct = ({match:{params:{_id}}, getData}) => {
    useEffect(() => {
        getData(_id)
    },[_id, getData])

    return(
        <>
            <main
                style={{
                    backgroundColor: "#f3f3f3",
                    minHeight:'300px'
                }}
            >
                <Breadcrumb links={['good']}/>
                <Container maxWidth="lg">
                    <CGoods key={_id} />
                </Container>
            </main>
        </>
    )
}
export const CBlockProduct = connect(null,
    {getData: actionGoodFindOne})
(BlockProduct)
