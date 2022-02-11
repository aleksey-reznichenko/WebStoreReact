import React from 'react';
import {Box, Container, Grid, Typography, useMediaQuery} from "@mui/material";
import Breadcrumb from "../../components/Breadcrumbs";
import Title from "../../components/Title";
import imageGirl from "../../img/about-us/1.jpg";
import imgNotFound from "../../img/catalog/imgNotFound.png";
import SavingsIcon from "@mui/icons-material/Savings";
import AlarmIcon from "@mui/icons-material/Alarm";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import {BlockContentItem} from "./BlockContentItem";
import {BlockQualityItem} from "./BlockQualityItem";

export const AboutUsPage = () => {
    const matches = useMediaQuery('(max-width:768px)');

    return (
        <>
            <Breadcrumb links={['about-us']} />
            <main
                style={{
                    backgroundColor: "#f3f3f3",
                    padding: matches ? "20px 0" : "50px 0",
                    minHeight:'300px'
                }}
            >
                <Container maxWidth="lg">
                    <Title subtitle={'OUR'} title={'MISSION'} />
                    <Grid sx={{padding: matches ? "20px 0" : "50px 0"}} container justifyContent='space-around'>
                        <BlockContentItem content={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                            'Aliquam aut blanditiis, cum explicabo laudantium maiores nihil non odio, ratione, sit ' +
                            'temporibus totam ullam voluptatibus? Animi at corporis dolore dolorum explicabo harum ' +
                            'laboriosam laborum minima non, odio quidem similique temporibus vel. Architecto illo ' +
                            'illum labore mollitia, recusandae repellendus similique soluta vitae?'}/>
                        <BlockContentItem content={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                            'Aliquam aut blanditiis, cum explicabo laudantium maiores nihil non odio, ratione, sit ' +
                            'temporibus totam ullam voluptatibus? Animi at corporis dolore dolorum explicabo harum ' +
                            'laboriosam laborum minima non, odio quidem similique temporibus vel. Architecto illo ' +
                            'illum labore mollitia, recusandae repellendus similique soluta vitae?'}/>
                    </Grid>
                    <Grid
                        sx={{padding: matches ? "20px 0" : "50px 0", overflow: 'hidden'}}
                        container
                        justifyContent='space-between'
                    >
                        <Grid marginTop='45px' height='100%' item xs={12} lg={6}>
                            <img
                                style={{
                                    width: '100%',
                                    maxHeight: matches ? '300px': '545px',
                                    objectFit: 'cover',
                                    objectPosition: 'center top'
                                }}
                                src={imageGirl || imgNotFound}
                                alt='background'
                            />
                        </Grid>
                        <Grid
                            sx={{
                                backgroundColor: '#fff',
                                padding: matches ? "20px" : "50px 50px 40px 50px",
                                height: '100%'
                            }}
                            item xs={12} lg={6}
                        >
                            <Title subtitle={'HELLO FROM'} title={'CEO'} />
                            <Typography
                                variant='body1'
                                fontWeight='300'
                                lineHeight='1.8em'
                                color='#616161'
                                marginBottom='10px'
                                textAlign='justify'
                            >
                                <span
                                    style={{
                                        display: 'inline-block',
                                        margin: '20px 0'
                                    }}
                                >
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aut commodi dicta
                                    ducimus laboriosam laborum, magnam mollitia nobis non obcaecati quis quisquam,
                                    rem tempore vel voluptas voluptatem voluptatum. Adipisci dignissimos dolorem ex,
                                    magnam minima modi molestias mollitia numquam sint. Assumenda cupiditate dicta
                                    dolorem dolorum eligendi, est eum facere itaque minus nulla pariatur, placeat quasi
                                    repellendus sed sint tempora velit, veritatis?
                                </span>
                                <span>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium asperiores
                                    dolores eius fuga harum hic nulla recusandae reprehenderit sint voluptatum?
                                </span>
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
                <Box sx={{backgroundColor: '#fff', padding: matches ? "20px 0" : "50px 0"}}>
                    <Container maxWidth="lg">
                        <Grid container justifyContent='space-between'>
                            <BlockQualityItem
                                Icon={SavingsIcon}
                                title={'10% CASHBACK'}
                                content={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolore ' +
                                    'doloremque fugiat quaerat quas temporibus.'}
                            />
                            <BlockQualityItem
                                Icon={AlarmIcon}
                                title={'FAST DELIVERY'}
                                content={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolore' +
                                    ' doloremque fugiat quaerat quas temporibus.'}
                            />
                            <BlockQualityItem
                                Icon={AutoGraphIcon}
                                title={'TOP QUALITY'}
                                content={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolore ' +
                                    'doloremque fugiat quaerat quas temporibus.'}
                            />
                        </Grid>
                    </Container>
                </Box>
            </main>
        </>
    )
}
