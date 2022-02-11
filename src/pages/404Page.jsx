import React from 'react';
import Breadcrumbs from "../components/Breadcrumbs";
import {NotFoundBlock} from "../components/NotFoundBlock";

const Page404 = () => {
    return (
        <>
            <Breadcrumbs links={['404 page']} title={'PAGE NOT FOUND'} />
            <NotFoundBlock/>
        </>
    )
}

export default Page404
