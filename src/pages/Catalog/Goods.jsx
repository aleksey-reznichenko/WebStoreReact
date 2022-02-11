import React from 'react';
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia, Divider,
    FormControl,
    Grid, MenuItem, Pagination, Select,
    Typography
} from "@mui/material";
import Link from "react-router-dom/es/Link";
import {backURL} from "../../actions/PathDB";
import imgNotFound from "../../img/catalog/imgNotFound.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {connect} from "react-redux";
import {actionCardRemove, actionCartAdd} from "../../reducers/CartReducer";
import {actionWishListAdd, actionWishListRemove} from "../../reducers/WishListReducer";
import {useEffect, useState} from "react";
import {NotFoundBlock} from "../../components/NotFoundBlock";
import {actionFullCatById} from "../../actions/ActionCategory";
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";

const GoodCard = ({good:{_id, name, description, price, images}={},
                      wishlist={},
                      cart={},
                      onCartAdd,
                      onWishListAdd,
                      onCartRemove,
                      onWishListRemove}) => {
    return (
        <Grid xs={12} lg={4} item margin='20px 0'>
            <Card
                sx={{
                    maxWidth: 345,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    margin: 'auto 20px'
                }}
            >
                <CardActionArea
                    sx={{
                        padding: '0',
                        flexGrow: '1',
                        position: 'relative'
                    }}
                >
                    <Link
                        to={`/good/${_id}`}
                        style={{position: 'relative', textDecoration: 'none'}}
                    >
                        <CardMedia
                            sx={{marginBottom: '20px', marginTop: '20px'}}
                            component="img"
                            height="230"
                            image={images && images[0]?.url ? `${backURL}/${images[0]?.url}` : imgNotFound}
                            alt="Good title image"
                        />
                        <CardContent
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '200px',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography
                                textAlign='center'
                                fontFamily='sarif'
                                letterSpacing='2px'
                                marginBottom='20px'
                                fontSize='19px'
                                sx={{textTransform: 'uppercase', flexGrow: '1'}}
                                color='#000'
                            >
                                {name.length > 30 ? name.split(' ').splice(0, 6).join(' ') : name}
                            </Typography>
                            <Typography
                                textAlign='center'
                                variant="body2"
                                color='#616161'
                                marginBottom='20px'
                                sx={{ flexGrow: '0'}}
                            >
                                {description && description.length > 60 ?
                                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' :
                                    description
                                }
                            </Typography>
                            <Typography
                                textAlign='center'
                                variant="h5"
                                color="#000"
                                sx={{ flexGrow: '0'}}>
                                $ {parseFloat(price || 0).toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Link>
                </CardActionArea>
                <CardActions sx={{flexGrow: '0', justifyContent: 'space-between'}}>
                    <Button
                        onClick={() => {
                            _id in cart ?
                                onCartRemove({_id, name, price, images})
                                : onCartAdd({_id, name, price, images})}
                        }
                        size="small"
                        color="primary"
                    >
                        {_id in cart ?
                            <ShoppingCartIcon/>
                            : <AddShoppingCartIcon />
                        }
                    </Button>
                    <Button
                        onClick={() => {
                            _id in wishlist ?
                                onWishListRemove({_id, name, price, images})
                                : onWishListAdd({_id, name, price, images})}
                        }
                        size="small"
                        color="primary"
                    >
                        {_id in wishlist ?
                            <FavoriteIcon/>
                            : <FavoriteBorderIcon />
                        }
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

const CGoodCard = connect(state => ({
        wishlist: state.wishlist,
        cart: state.cart}),
    {
        onCartAdd: actionCartAdd,
        onWishListAdd: actionWishListAdd,
        onCartRemove: actionCardRemove,
        onWishListRemove: actionWishListRemove})
(GoodCard)

const Goods = ({_id, category={}}) => {
    const itemsPerPage = 9
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(1)
    const [goods, setGoods] = useState([])
    const [sort, setSort] = useState(0)

    const sortDefault = () => {
        setGoods([goods[0].sort((a, b) => a['name'] > b['name'] ? 1 : -1)])
    }
    const sortLatest = () => {
        setGoods([goods[0].sort((a, b) => b['createdAt'] > a['createdAt'] ? 1 : -1)])
    }
    const sortLowToHigh = () => {
        setGoods([goods[0].sort((a, b) => a['price'] > b['price'] ? 1 : -1)])
    }
    const sortHighToLow = () => {
        setGoods([goods[0].sort((a, b) => b['price'] > a['price'] ? 1 : -1)])
    }

    const handleChange = (event, value) => {
        setPage(value);
    }
    const handleChangeSelect = (event) => {
        setSort(event.target.value);
        if (event.target.value === 0) sortDefault()
        else if (event.target.value === 1) sortLatest()
        else if (event.target.value === 2) sortLowToHigh()
        else if (event.target.value === 3) sortHighToLow()
    }

    useEffect(() => {
        let arr = (Object.values(category) || []).map(item => {
            if (item['_id'] === _id) {
                if (Array.isArray(item?.goods) && item?.goods.length > 0) {
                    setCount(Math.ceil(item.goods.length / itemsPerPage))
                    return item.goods
                }
            }
            else if(Array.isArray(item['subCategories'])) {
                let arr = item['subCategories'].map(subItem => {
                    if (subItem['_id'] === _id) {
                        if (Array.isArray(subItem?.goods) && subItem?.goods.length > 0) {
                            setCount(Math.ceil(subItem.goods.length / itemsPerPage))
                            return subItem.goods
                        }
                    }
                    else if(Array.isArray(subItem['subCategories'])) {
                        let arr = subItem['subCategories'].map(subSubItem => {
                            if (subSubItem['_id'] === _id) {
                                if (Array.isArray(subSubItem?.goods) && subSubItem?.goods.length > 0) {
                                    setCount(Math.ceil(subSubItem.goods.length / itemsPerPage))
                                    console.log(subSubItem.goods)
                                    return subSubItem.goods
                                }
                            }
                            else {
                                return 0
                            }
                        }).filter(item => item)
                        return arr.length > 0 ? [...arr[0]] : 0
                    }
                    else {
                        return 0
                    }
                }).filter(item => item)
                return arr.length > 0 ? [...arr[0]] : 0
            }
            else {
                return 0
            }
        }).filter(item => item)
        setGoods(arr)
    }, [_id, category])

    return (
        <>
            {(goods.length > 0 && goods[0] !== undefined ?
                <Box
                    sx={{height:'100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                >
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                        padding='0 20px'
                    >
                        <Typography
                            variant='body1'
                            color='#616161'
                            letterSpacing='1px'
                        >
                            SHOWING {goods[0].length > itemsPerPage ? `${((page-1) * itemsPerPage)+1} -
                            ${page * itemsPerPage > goods[0].length ? goods[0].length : page * itemsPerPage}` :
                            goods[0].length} OF {goods[0].length} RESULTS
                        </Typography>
                        <FormControl
                            variant="standard"
                        >
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sort}
                                label="Sort"
                                onChange={handleChangeSelect}
                                sx={{textTransform: 'uppercase', color: '#616161'}}
                            >
                                <MenuItem value={0}>Default sorting</MenuItem>
                                <MenuItem value={1}>Sort by latest</MenuItem>
                                <MenuItem value={2}>Sort by price: low to high</MenuItem>
                                <MenuItem value={3}>Sort by price: high to low</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box
                        flexGrow='1'
                    >
                        <Grid
                            container
                            justifyContent='space-between'
                        >
                            {[...goods[0]].slice((page - 1) * itemsPerPage, page * itemsPerPage)
                                .map(good => <CGoodCard key={good['_id']} good={good}/>)
                            }
                        </Grid>
                    </Box>
                    <Box width='100%' flexGrow='0'>
                        <Divider sx={{margin: '20px'}}/>
                        <Box
                            display='flex'
                            justifyContent='center'
                            width='100%'
                        >
                            <Pagination
                                count={count}
                                page={page}
                                onChange={handleChange}
                                defaultPage={1}
                                color="primary"
                                size="large"
                                showFirstButton
                                showLastButton
                            />
                        </Box>
                    </Box>
                </Box>
                : <NotFoundBlock marginTop={'-50px'}/>)
            }
        </>
    )
}
const CGoods = connect(state => ({category: state.category}))(Goods)

const BlockGood = ({match:{params:{_id}}, getData}) => {
    useEffect(() => {
        getData(_id)
    },[_id, getData])
    return(
        <CGoods key={_id} _id={_id} />
    )
}
const CBlockGood= connect(null, {getData: actionFullCatById})(BlockGood)

export const Products = () => {
    return (
        <Grid xs={12} lg={9} item>
            <Switch>
                <Route path="/catalog/category/:_id" component={CBlockGood} />
                <Route path="*" component={NotFoundBlock} />
            </Switch>
        </Grid>
    )
}
