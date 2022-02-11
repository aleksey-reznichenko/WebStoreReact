import React from 'react';
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {Box, Container, Grid, Typography, useMediaQuery} from "@mui/material";
import background from "../../img/footer/bg-footer.png";
import LinkRouter from "react-router-dom/es/Link";
import Social from "../SocialLink";
import {Contact} from "./Contact";
import '../../scss/Footer.scss';

const contactDefault = [
    {'icon': LocalPhoneIcon, 'text': '+123 488 9652', 'url': '#'},
    {'icon': LocationOnIcon, 'text': '25 West 21th Street, Miami FL, USA', 'url': '#'},
    {'icon': EmailIcon, 'text': 'info@abraxas.com', 'url': '#'},
    {'icon': WatchLaterIcon, 'text': 'Mon-Fri: 10:00 - 18:00', 'url': '#'}
]
const linksSocialDefault = [
    {'icon': FacebookIcon, 'url': 'https://www.facebook.com/'},
    {'icon': InstagramIcon, 'url': 'https://www.instagram.com/'},
    {'icon': TwitterIcon, 'url': 'https://twitter.com/home'},
    {'icon': YouTubeIcon, 'url': 'https://www.youtube.com/'},
]


export const Footer = ({contact=contactDefault, linksSocial=linksSocialDefault}) => {
    const matches = useMediaQuery('(max-width:899px)');
    const matches2 = useMediaQuery('(max-width:450px)');
    return (
        <footer
            className="Footer"
            style={{
                background: `url(${background}) center repeat`,
                padding: "40px 0"
            }}
        >
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 1, sm: 8, md: 12 }}
                >
                    <Grid
                        item
                        sm={12} md={4}
                        width={matches ? "100%" : "auto"}
                    >
                        {(contact || []).map((item, index) =>
                            <Contact
                                key={index}
                                Icon={item.icon}
                                text={item.text}
                                link={item.url}
                            />
                        )}
                    </Grid>
                    <Grid
                        item
                        sm={12} md={4}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        width={matches ? "100%" : "auto"}
                    >
                        <Typography
                            variant="h4"
                            textAlign="center"
                            marginBottom="20px"
                        >
                            <LinkRouter
                                to='/'
                                className="Footer__Logo"
                            >
                                ABRAXAS
                            </LinkRouter>
                        </Typography>
                        <Box>
                            {(linksSocial || []).map((item, index) =>
                                <Social
                                    key={index}
                                    Icon={item.icon}
                                    link={item.url}
                                />
                            )}
                        </Box>
                    </Grid>
                    <Grid
                        item
                        sm={12} md={4}
                        display="flex"
                        justifyContent={matches ? "center" : "end"}
                        width={matches ? "100%" : "auto"}
                    >
                        <Typography
                            variant="body1"
                            textAlign={matches ? "center" : "right"}
                            color="#969696"
                            fontSize="14px"
                            maxWidth="275px"
                            lineHeight="1.7em"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, animi consectetur, dicta
                            dolore doloremque eum exercitationem illum incidunt inventore ipsam itaque, modi odio odit
                            quo sed sint suscipit vitae voluptates.
                        </Typography>
                    </Grid>
                </Grid>
                <Box
                    display="flex"
                    flexDirection={matches2 ? "column-reverse" : "row"}
                    alignItems="center"
                    justifyContent="space-between"
                    marginTop="30px"
                >
                    <Typography
                        variant="body2"
                        color="#969696"
                        fontSize="13px"
                    >
                        © 2022 ABRAXAS. All rights reserved.
                    </Typography>
                    <Typography
                        variant="body2"
                        marginBottom={matches2 ? "10px" : "0"}
                    >
                        <LinkRouter
                            to='/privacy-policy'
                            className="Footer__Bottom-link"
                        >
                            PRIVACY POLICY
                        </LinkRouter>
                        <LinkRouter
                            to='/faq'
                            className="Footer__Bottom-link"
                        >
                            FAQ
                        </LinkRouter>
                    </Typography>
                </Box>
            </Container>
        </footer>
    )
}
