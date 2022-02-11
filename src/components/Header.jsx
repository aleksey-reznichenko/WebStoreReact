import React from 'react';
import {AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Badge} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import Link from "react-router-dom/es/Link";
import {useState} from "react";
import '../scss/Header.scss';
import {actionAuthLogout} from "../reducers/AuthReducer";
import {connect} from "react-redux";
import {actionUserRemove} from "../reducers/UserReducer";
import {backURL} from "../actions/PathDB";
import userDefault from "../img/header/userDefault.png"

const pages = ['catalog', 'about us', 'our team', 'faq', 'contact']
const settingsDefaultUserAuth = ['Profile', 'Dashboard', 'Logout']

const Header = ({user={}}) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const LogoItem = () => {
        return (
            <Link
                to='/'
                className="Header__Logo"
            >
                ABRAXAS
            </Link>
        )
    }
    const LinkItem = ({page, color='white'}) => {
        return (
            <Button
                key={page.toString()}
                onClick={handleCloseNavMenu}
                sx={{
                    my: 2,
                    color: color,
                    display: 'block'
                }}
            >
                <Link
                    to={`/${Array.from(page.toLowerCase()).map(i => i === ' ' ? '-' : i).join('')}`}
                    className="Header__Link"> {page}
                </Link>
            </Button>
        )
    }
    const IconItems = ({cart={}, wishlist={}, size="large", color='default'}) => {
        return (
            <>
                <Link to='/search'>
                    <IconButton
                        key={'search'}
                        size={size}
                        aria-label="search"
                        color={color}
                    >
                        <SearchIcon />
                    </IconButton>
                </Link>
                <Link to='/my-orders'>
                    <IconButton
                        key={'my-orders'}
                        size={size}
                        aria-label="my-orders"
                        color={color}
                    >
                        <ManageSearchIcon />
                    </IconButton>
                </Link>
                <Link to='/wish-list'>
                    <IconButton
                        key={'wish-list'}
                        size={size}
                        aria-label="wish-list"
                        color={color}
                    >
                        <Badge
                            color="success"
                            badgeContent={+Object.entries(wishlist).length}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                        >
                            <FavoriteBorderIcon />
                        </Badge>
                    </IconButton>
                </Link>
                <Link to='/basket'>
                    <IconButton
                        key={'basket'}
                        size={size}
                        aria-label="basket"
                        color={color}
                    >
                        <Badge
                            color="success"
                            badgeContent={+Object.entries(cart).reduce((a, b) => {
                                return a + b[1].count
                            }, 0)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                        >
                            <ShoppingCartIcon/>
                        </Badge>
                    </IconButton>
                </Link>
            </>
        )
    }
    const CIconItems = connect(state => ({cart: state.cart, wishlist: state.wishlist}))(IconItems)

    const ItemAuth = ({link, text}) => {
        return (
            <Link
                style={{
                    textDecoration: 'none',
                    color: '#000'
                }}
                to={`/${link}`}
            >
                <MenuItem
                    key={text}
                    onClick={handleCloseNavMenu}
                >
                    <Typography
                        textAlign="center"
                        color='#fff'
                    >
                        {text}
                    </Typography>
                </MenuItem>
            </Link>
        )
    }

    const UserIcon = ({auth}) => {
        return (
            Object.entries(auth).length === 0 ?
                <Link
                    style={{textDecoration: 'none'}}
                    to={'/my-account'}
                >
                    <IconButton sx={{ p: 0 }}>
                        <Avatar
                            alt="User default"
                            src={userDefault}
                        />
                    </IconButton>
                </Link> :
                <>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            {!auth.avatar && auth.avatar === null ?
                                <Avatar
                                    alt="User"
                                    src={userDefault}/>
                                :
                                <Avatar
                                    alt="User"
                                    src={user?.avatar?.url && backURL + '/' + user?.avatar?.url}
                                />
                            }
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '55px', ml: '90%'}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settingsDefaultUserAuth.map(item => {
                            if (item === 'Logout') {
                                return <CButtonLogOut key={'Logout'}/>
                            }
                            else if(item === 'Dashboard'){
                                if (auth.payload?.sub?.acl[2]){
                                    return (
                                        <ItemAuth
                                            link={'admin'}
                                            text={'Dashboard'}
                                            key={'admin'}
                                        />
                                    )
                                }
                            }
                            else if(item !== 'Dashboard') {
                                return (
                                    <ItemAuth
                                        key={item.toString()}
                                        text={item}
                                        link={Array.from(item.toLowerCase()).map(i => i === ' ' ? '-' : i).join('')}
                                    />
                                )
                            }
                        })}
                    </Menu>
                </>
        )
    }
    const CUserIcon = connect(state => ({auth: state.auth}))(UserIcon)

    const ButtonLogOut = ({actionLogOut, actionUserRemove}) => {
        return (
            <Button
                onClick={() => {
                    actionLogOut();
                    actionUserRemove();
                    handleCloseNavMenu();
                }}
                style={{
                    textDecoration: 'none',
                    textTransform: 'capitalize',
                    fontWeight: '400',
                    color: '#fff',
                    textAlign: "center",
                    width: '100%'
                }}
            >
                Log out
            </Button>
        )
    }
    const CButtonLogOut = connect(null, {actionLogOut: actionAuthLogout,
        actionUserRemove: actionUserRemove})(ButtonLogOut)

    return (
        <AppBar
            sx={{
                padding: '10px 0',
                backgroundColor: 'rgb(131,179,175)'
            }}
            className='Header'
            position="fixed"
            enableColorOnDark={true}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2,
                            display: {
                                xs: 'none',
                                md: 'flex'
                            }
                        }}
                    >
                        <LogoItem/>
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' }
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu className='Header__Burger'
                              id="menu-appbar"
                              anchorEl={anchorElNav}
                              anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'left',
                              }}
                              keepMounted
                              transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'left',
                              }}
                              open={Boolean(anchorElNav)}
                              onClose={handleCloseNavMenu}
                              sx={{
                                  display: { xs: 'block', md: 'none' },
                              }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.toString()}
                                    onClick={handleCloseNavMenu}
                                >
                                    <LinkItem
                                        key={page.toString()}
                                        page={page}
                                        color={'#fff'}
                                    />
                                </MenuItem>
                            ))}
                            <MenuItem onClick={handleCloseNavMenu}>
                                <CIconItems
                                    size={'large'}
                                    color={'inherit'}
                                />
                            </MenuItem>
                        </Menu>
                    </Box>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' }
                        }}
                    >
                        <LogoItem />
                    </Typography>

                    <Box
                        className='Header__Links'
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' }
                        }}
                    >
                        {pages.map((page) => (
                            <LinkItem
                                key={page.toString()}
                                page={page}
                                color={'#fff'}
                            />
                        ))}
                    </Box>

                    <Box
                        className='Header__Icons'
                        sx={{
                            flexGrow: 0,
                            display: { xs: 'none', md: 'flex' }
                        }}
                    >
                        <CIconItems size={'large'} />
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <CUserIcon/>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
const CHeader = connect(state => ({user: state.user}))(Header)
export default CHeader;
