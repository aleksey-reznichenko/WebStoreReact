import React from 'react';
import {
    BottomNavigationAction,
    Container,
    useMediaQuery
} from "@mui/material";
import Breadcrumb from "../../components/Breadcrumbs";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {useEffect, useState} from "react";
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BottomNavigation from '@mui/material/BottomNavigation';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import {CClients} from "./ClientsTab/ClientsTab";
import {CGoodEdit} from "./GoodsTab/GoodEdit";
import {CFindGoodEdit} from "./GoodsTab/FindGoodEdit";
import {CCategoryEdit} from "./CategoriesTab/CategoryEdit";
import {actionClearPromise} from "../../reducers/PromiseReducer";
import {connect} from "react-redux";
import {CFindCategoryEdit} from "./CategoriesTab/FindCategoryEdit";

const defaultTabs = [
    {icon: PersonIcon, text: 'clients'},
    {icon: CategoryIcon, text: 'categories'},
    {icon: AutoAwesomeIcon, text: 'products'}
]

const IconHeader = ({Icon}) => {
    return <Icon style={{marginRight: '10px'}} />
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Box>{children}</Box>
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
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const SelectBlock = ({Block, FindBlock, actionClear}) => {
    const [value, setValue] = useState('create');
    useEffect(()=>{
        actionClear('uploadFile')
    }, [value])
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    display:'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}
            >
                <BottomNavigation
                    showLabels
                    sx={{width: '100%'}}
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction
                        value={'create'}
                        label="Create"
                        icon={<AddCircleOutlineIcon />}
                    />
                    <BottomNavigationAction
                        value={'edit'}
                        label="Edit"
                        icon={<EditIcon />}
                    />
                </BottomNavigation>
            </Box>
            {value === 'create' ?
                <Block/> : <FindBlock/>
            }
        </>
    )
}
const CSelectBlock = connect(null, {
    actionClear: actionClearPromise})
(SelectBlock)

const FullWidthTabs = () => {
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Box
            sx={{
                bgcolor: '#fff',
                width: '100%',
                borderRadius: '20px',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                overflow: 'hidden'
            }}
        >
            <AppBar
                position="static"
                sx={{boxShadow: 'none'}}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    TabIndicatorProps={{style: {background:'#616161', height: '1px'}}}
                    textColor="inherit"
                    sx={{backgroundColor:'#fff', color: '#000'}}
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    {defaultTabs.map((item, index) =>
                        <Tab
                            key={index}
                            icon={<IconHeader Icon={item.icon}/>}
                            iconPosition="start"
                            label={item.text}
                            sx={{borderBottom: '1px solid #dedede'}}
                            {...a11yProps(index)}
                        />
                    )}
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <CClients/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <CSelectBlock Block={CCategoryEdit} FindBlock={CFindCategoryEdit}/>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <CSelectBlock Block={CGoodEdit} FindBlock={CFindGoodEdit}/>
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
}

const AdminPage = () => {
    const matches = useMediaQuery('(max-width:768px)')

    return(
        <>
            <Breadcrumb links={['admin']} title={'Dashboard'}/>
            <main
                style={{
                    backgroundColor: "#f3f3f3",
                    padding: matches ? "20px 0" : "50px 0",
                    minHeight:'300px'
                }}
            >
                <Container maxWidth="lg">
                    <FullWidthTabs/>
                </Container>
            </main>
        </>
    )
}

export default AdminPage
