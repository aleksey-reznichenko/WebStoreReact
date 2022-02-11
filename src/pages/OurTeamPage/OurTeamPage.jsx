import React from 'react';
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import one from "../../img/our-team/1.jpg";
import two from "../../img/our-team/2.jpg";
import three from "../../img/our-team/3.jpg";
import four from "../../img/our-team/4.jpg";
import {Container, Grid, useMediaQuery} from "@mui/material";
import Breadcrumb from "../../components/Breadcrumbs";
import {ItemTeam} from "./ItemTeam";

let defaultTeam = [
    {
        img: one,
        name: 'MARIA CULHANE',
        spec: 'online seller',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus blanditiis distinctio eum ' +
            'mollitia nisi nostrum nulla omnis quia, veniam!',
        links: [
            {icon: FacebookIcon, url: 'https://www.facebook.com/'},
            {icon: InstagramIcon, url: 'https://www.instagram.com/'},
            {icon: TwitterIcon, url: 'https://twitter.com/home'},
            {icon: YouTubeIcon, url: 'https://www.youtube.com/'},
        ],
        phone: '+123 456 77 88',
        email: 'chmoleg@gmail.com'
    },
    {
        img: two,
        name: 'EMERY HERWITZ',
        spec: 'online seller',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus blanditiis distinctio eum ' +
            'mollitia nisi nostrum nulla omnis quia, veniam!',
        links: [
            {icon: FacebookIcon, url: 'https://www.facebook.com/'},
            {icon: InstagramIcon, url: 'https://www.instagram.com/'},
            {icon: TwitterIcon, url: 'https://twitter.com/home'},
            {icon: YouTubeIcon, url: 'https://www.youtube.com/'},
        ],
        phone: '+123 456 77 88',
        email: 'info@gmail.com'
    },
    {
        img: three,
        name: 'ALLISON WORKMAN',
        spec: 'online seller',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus blanditiis distinctio eum ' +
            'mollitia nisi nostrum nulla omnis quia, veniam!',
        links: [
            {icon: FacebookIcon, url: 'https://www.facebook.com/'},
            {icon: InstagramIcon, url: 'https://www.instagram.com/'},
            {icon: TwitterIcon, url: 'https://twitter.com/home'},
            {icon: YouTubeIcon, url: 'https://www.youtube.com/'},
        ],
        phone: '+123 456 77 88',
        email: 'info@gmail.com'
    },
    {
        img: four,
        name: 'MADELYN BATOR',
        spec: 'online seller',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus blanditiis distinctio eum ' +
            'mollitia nisi nostrum nulla omnis quia, veniam!',
        links: [
            {icon: FacebookIcon, url: 'https://www.facebook.com/'},
            {icon: InstagramIcon, url: 'https://www.instagram.com/'},
            {icon: TwitterIcon, url: 'https://twitter.com/home'},
            {icon: YouTubeIcon, url: 'https://www.youtube.com/'},
        ],
        phone: '+123 456 77 88',
        email: 'info@gmail.com'
    }
]

export const OurTeamPage = ({specialist=defaultTeam}) => {
    const matches = useMediaQuery('(max-width:768px)')

    return (
        <>
            <Breadcrumb links={['our-team']}/>
            <main
                style={{
                    backgroundColor: "#f3f3f3",
                    padding: matches ? "20px 0" : "50px 0",
                    minHeight: '300px'
                }}
            >
                <Container maxWidth="lg">
                    <Grid
                        sx={{padding: '0px 0px'}}
                        container
                        justifyContent='space-between'
                    >
                        {
                            (specialist || []).map((item, index) => <ItemTeam key={item?.name || index} item={item || index} breakpoint={matches}/>)
                        }
                    </Grid>
                </Container>
            </main>
        </>
    )
}
