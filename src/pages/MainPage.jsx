import React from 'react';
import {Redirect} from "react-router-dom";

const MainPage = () => {
    return (
        <>
            <Redirect to={'/catalog'}/>
        </>
    )
}

export default MainPage
