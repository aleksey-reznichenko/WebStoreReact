import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import {Container, Grid, useMediaQuery} from "@mui/material";
import {useState} from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import GoogleMap from "../../components/GoogleMap";
import * as React from "react";
import {AddressItem} from "./AddressItem";

const defaultAddress = {
    'NEW YORK': {
        phones: ['212-371-8500', '212-371-8555'],
        address: '9 East 40th Street, 3rd Floor, New York City',
        email: ['newyork@gmail.com'],
        "social networks": [
            {icon: FacebookIcon, url: 'https://www.facebook.com/'},
            {icon: InstagramIcon, url: 'https://www.instagram.com/'},
            {icon: TwitterIcon, url: 'https://twitter.com/home'},
            {icon: YouTubeIcon, url: 'https://www.youtube.com/'},
        ],
        coordinates: {
            lat: 40.751936,
            lng: -73.981081
        }
    },
    'TOKYO':{
        phones: ['212-371-8500', '212-371-8555'],
        address: 'Япония, 〒162-0044 Tokyo, Shinjuku City, Kikuicho, ２０−110 エヌエフ喜久井町',
        email: ['tokyo@gmail.com'],
        "social networks": [
            {icon: FacebookIcon, url: 'https://www.facebook.com/'},
            {icon: InstagramIcon, url: 'https://www.instagram.com/'},
            {icon: TwitterIcon, url: 'https://twitter.com/home'},
            {icon: YouTubeIcon, url: 'https://www.youtube.com/'},
        ],
        coordinates: {
            lat: 35.704015,
            lng: 139.721445
        }
    },
    'LONDON':{
        phones: ['212-371-8500', '212-371-8555'],
        address: 'Randolph St, London NW1 0TL, Great Britain',
        email: ['london@gmail.com'],
        "social networks": [
            {icon: FacebookIcon, url: 'https://www.facebook.com/'},
            {icon: InstagramIcon, url: 'https://www.instagram.com/'},
            {icon: TwitterIcon, url: 'https://twitter.com/home'},
            {icon: YouTubeIcon, url: 'https://www.youtube.com/'},
        ],
        coordinates: {
            lat: 51.541663,
            lng: -0.136698
        }
    },
    'PARIS':{
        phones: ['212-371-8500', '212-371-8555'],
        address: '22 Pass. Hébrard, 75010 Paris, France',
        email: ['paris@gmail.com'],
        "social networks": [
            {icon: FacebookIcon, url: 'https://www.facebook.com/'},
            {icon: InstagramIcon, url: 'https://www.instagram.com/'},
            {icon: TwitterIcon, url: 'https://twitter.com/home'},
            {icon: YouTubeIcon, url: 'https://www.youtube.com/'},
        ],
        coordinates: {
            lat: 48.873213,
            lng: 2.373185
        }
    },
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const ContactPage = ({address=defaultAddress}) => {
    const matches = useMediaQuery('(max-width:768px)');
    const matches2 = useMediaQuery('(max-width:420px)');
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Breadcrumbs links={['contact']}/>
            <main
                style={{
                    backgroundColor: "#f3f3f3",
                    padding: matches ? "20px 0" : "50px 0",
                    minHeight: '300px'
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ color: "#616161" }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="contact"
                                textColor="inherit"
                                variant={matches2 ? "scrollable" : "standard"}
                                TabIndicatorProps={{style: {background:'#616161', height: '1px'}}}
                                sx={{fontWeight: 300, marginBottom: '30px'}}
                                centered
                            >
                                {Object.keys(address).map((value, index) =>
                                    <Tab
                                        key={index}
                                        sx={{borderBottom: '1px solid #dedede'}}
                                        label={value.toString() || 'value'}
                                        {...a11yProps(index)}
                                    />
                                )}
                            </Tabs>
                        </Box>
                        {Object.entries(address).map((item, index) => {
                            return (
                                <TabPanel
                                    key={index}
                                    value={value}
                                    index={index}
                                >
                                    <Grid
                                        sx={{backgroundColor: '#fff',
                                            padding: '0px 0px',
                                            marginLeft: '-10px'
                                        }}
                                        container
                                        spacing={2}
                                    >
                                        <AddressItem key={index} item={item} />
                                        <Grid
                                            sx={{
                                                padding: '0px 0px !important',
                                                position: 'relative',
                                                height: matches ? '300px': '500px'
                                            }} item xs={12} md={6}
                                        >
                                            <GoogleMap
                                                lat={item[1].coordinates.lat}
                                                lng={item[1].coordinates.lng}
                                                key={index}
                                            />
                                        </Grid>
                                    </Grid>
                                </TabPanel>
                            )
                        })}
                    </Box>
                </Container>
            </main>
        </>
    )
}
