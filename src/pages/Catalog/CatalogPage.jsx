import React from 'react';
import {Container, Grid, useMediaQuery} from "@mui/material";
import {useEffect} from "react";
import Breadcrumb from "../../components/Breadcrumbs";
import {connect} from "react-redux";
import {actionFullRootCats} from "../../actions/ActionCategory";
import {CategoryAside} from "./CategoryAside";
import {Products} from "./Goods";

const CatalogPage = ({category={}, actionRootCat}) => {
    const matches = useMediaQuery('(max-width:899px)')

    useEffect(() => {
        if(category && Object.entries(category).length === 0) actionRootCat()
    }, [category])

    return (
        <>
            <Breadcrumb links={['catalog']}/>
            <main
                style={{
                    backgroundColor: "#f3f3f3",
                    padding: matches ? "20px 0" : "50px 0",
                    minHeight: '300px'
                }}
            >
                <Container maxWidth="lg">
                    <Grid container justifyContent='space-between'>
                        {category &&
                            Object.entries(category).length > 0 &&
                            <CategoryAside category={category}/>
                        }
                        <Products />
                    </Grid>
                </Container>
            </main>
        </>
    )
}
export const CCatalogPage = connect(state => ({
        category: state.category}),
    {
        actionRootCat: actionFullRootCats})
(CatalogPage)
