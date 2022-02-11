import React from 'react';
import {Container, useMediaQuery} from "@mui/material";
import Breadcrumbs from "../../components/Breadcrumbs";
import {AccordionsItem} from "./AccordionsItem";

export const FAQPage = () => {
    const matches = useMediaQuery('(max-width:768px)')

    return (
        <>
            <Breadcrumbs links={['faq']}/>
            <main
                style={{
                    backgroundColor: "#f3f3f3",
                    padding: matches ? "20px 0" : "50px 0",
                    minHeight: '300px'
                }}
            >
                <Container maxWidth="lg">
                    <AccordionsItem
                        id={'panel1'}
                        title={'PAYMENT METHODS'}
                        content={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet autem, ' +
                            'blanditiis cupiditate dolore eum facilis fuga magni, molestias mollitia odio placeat, ' +
                            'possimus sit ut vel. Architecto cumque dignissimos distinctio dolorum eos exercitationem' +
                            'fuga molestiae odio optio placeat porro, possimus, repellendus. Accusamus ad ducimus ' +
                            ' labore quos rerum sed suscipit voluptatibus.'}
                    />
                    <AccordionsItem
                        id={'panel2'}
                        title={'INTERNATIONAL SHIPPING'}
                        content={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet autem, ' +
                            'blanditiis cupiditate dolore eum facilis fuga magni, molestias mollitia odio placeat, ' +
                            'possimus sit ut vel. Architecto cumque dignissimos distinctio dolorum eos exercitationem' +
                            ' fuga molestiae odio optio placeat porro, possimus, repellendus. Accusamus ad ducimus ' +
                            'labore quos rerum sed suscipit voluptatibus.'}
                    />
                    <AccordionsItem
                        id={'panel3'}
                        title={'CASHBACK PROGRAM'}
                        content={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet autem, ' +
                            'blanditiis cupiditate dolore eum facilis fuga magni, molestias mollitia odio placeat, ' +
                            'possimus sit ut vel. Architecto cumque dignissimos distinctio dolorum eos exercitationem' +
                            ' fuga molestiae odio optio placeat porro, possimus, repellendus. Accusamus ad ducimus ' +
                            'labore quos rerum sed suscipit voluptatibus.'}
                    />
                    <AccordionsItem
                        id={'panel4'}
                        title={'MONEY BACK WARRANTY'}
                        content={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet autem, ' +
                            'blanditiis cupiditate dolore eum facilis fuga magni, molestias mollitia odio placeat, ' +
                            'possimus sit ut vel. Architecto cumque dignissimos distinctio dolorum eos exercitationem' +
                            ' fuga molestiae odio optio placeat porro, possimus, repellendus. Accusamus ad ducimus ' +
                            'labore quos rerum sed suscipit voluptatibus.'}
                    />
                </Container>
            </main>
        </>
    )
}
