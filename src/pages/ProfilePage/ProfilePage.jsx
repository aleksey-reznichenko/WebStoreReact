import React from 'react';
import {Box, Container, Typography, useMediaQuery} from "@mui/material";
import PropTypes from "prop-types";
import {useState} from "react";
import {timeCalc} from "../ProductPage/timeCalc";
import Breadcrumb from "../../components/Breadcrumbs";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {CMainOrders} from "../MyOrdersPage/MainOrders";
import {CMainWishList} from "../WishListPage/MainWishList";
import {connect} from "react-redux";
import {actionAuthLogout} from "../../reducers/AuthReducer";
import {actionUserRemove} from "../../reducers/UserReducer";
import {AccountDetails} from "./AccountDetails";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            style={{width: '100%'}}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3}}>
                    <Box>
                        {children}
                    </Box>
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const ProfilePage = ({user = {}, promise, authLogOut, userLogOut}) => {
    const matches = useMediaQuery('(max-width:899px)')
    const matches2 = useMediaQuery('(max-width:768px)')
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let formattedTime = 0;
    if (Object.keys(user).length !== 0) {
        formattedTime = timeCalc(+user.createdAt);
    }

    const handleLogOut = () => {
        authLogOut();
        userLogOut();
    }
    return (
        Object.keys(user).length > 1 &&
        <>
            <Breadcrumb links={['Profile']}/>
            <main
                style={{
                    backgroundColor: "#f3f3f3",
                    padding: matches ? "20px 0" : "50px 0",
                    minHeight:'300px'
                }}
            >
                <Container maxWidth="lg">
                    <Box>
                        <Typography
                            variant='h5'
                            textAlign='center'
                            fontFamily='sarif'
                            marginBottom={matches ? '20px':'40px'}
                        >
                            LOGGED IN AS
                            <strong>
                                { ` ${user?.login.toUpperCase()}` || 'login' }
                            </strong>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            bgcolor: '#fff',
                            display: 'flex',
                            height: '100%',
                            alignItems: 'center'
                        }}
                        flexDirection={matches2 ? 'column': "row"}
                    >
                        <Tabs
                            orientation={matches2 ? 'horizontal': "vertical"}
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Profile settings"
                            sx={{
                                borderRight: 1,
                                borderColor: 'divider',
                                padding: '50px 0',
                                height: '100%'
                            }}
                        >
                            <Tab
                                sx={{
                                    padding: '0 50px',
                                    textAlign: 'center'
                                }}
                                label={'ACCOUNT DETAILS'}
                                {...a11yProps(0)}
                            />
                            <Tab
                                sx={{
                                    padding: '0 50px',
                                    textAlign: 'center'
                                }}
                                label={'my orders'}
                                {...a11yProps(1)}
                            />
                            <Tab
                                sx={{
                                    padding: '0 50px',
                                    textAlign: 'center'
                                }}
                                label={'wish list'}
                                {...a11yProps(2)}
                            />
                            <Tab
                                sx={{
                                    padding: '0 50px',
                                    textAlign: 'center'
                                }}
                                label={'Logout'}
                                onClick={handleLogOut}
                                {...a11yProps(2)}
                            />
                        </Tabs>
                        <TabPanel
                            value={value}
                            index={0}
                        >
                            <AccountDetails
                                user={user}
                                promise={promise}
                                time={formattedTime}
                            />
                        </TabPanel>
                        <TabPanel
                            value={value}
                            index={1}
                        >
                            <CMainOrders itemsPerPage={5} />
                        </TabPanel>
                        <TabPanel
                            value={value}
                            index={2}
                        >
                            <CMainWishList color={'#fff'}/>
                        </TabPanel>
                    </Box>
                </Container>
            </main>
        </>
    )
}

export const CProfilePage = connect(state => ({
        user: state.user,
        promise: state.promise}),
    {
        authLogOut: actionAuthLogout,
        userLogOut: actionUserRemove})
(ProfilePage)

