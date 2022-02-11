import React from 'react';
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import Page404 from "../404Page";
import {CBlockProduct} from "./BlockProduct";

export const ProductPage = () => {
    return (
        <Switch>
            <Route path="/good/:_id" component={CBlockProduct} />
            <Route path="*" component={Page404} />
        </Switch>
    )
}
