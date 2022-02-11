import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {Button, Grid, Switch, TextField} from "@mui/material";
import {connect} from "react-redux";
import {actionCategoryCount, actionCategoryUpsert, actionFullRootCats} from "../../../actions/ActionCategory";
import {actionAllGoodFind} from "../../../actions/ActionGoodFind";
import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

const AddSubCategory = ({goods, onCreate}) => {
    const [subCategory, setSubCategory] = useState({});

    useEffect(() => {
        onCreate({...subCategory})
    }, [subCategory])

    return (
        <>
            <AddRootCategory goods={goods} onCreate={value => {setSubCategory({...value})}}/>
        </>
    )
}
const AddRootCategory = ({goods, onCreate}) => {
    const [name, setName] = useState('');
    const [products, setProducts] = useState([]);
    const [addSub, setAddSub] = useState(false);
    const [subCategory, setSubCategory] = useState({});

    useEffect(() => {
        let obj = {}
        if (Object.entries(subCategory).length > 0) {
            obj['subCategories'] = [{...subCategory}]
        }
        if (products.length > 0){
            obj["goods"] = [...products]
        }
        if (name) {
            obj["name"] = name
            onCreate(obj)
        }
    }, [name, products, subCategory])

    return (
        <>
            <Grid
                container
                border='1px dashed #616161'
                borderRadius='20px'
                padding='20px'
            >
                <Grid
                    container
                    justifyContent='space-between'
                    alignItems='flex-end'
                >
                    <Grid item xs={5}>
                        <TextField
                            fullWidth
                            id="filled-basic"
                            label="Title category"
                            variant="standard"
                            value={name}
                            onChange={e => {
                                setName(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        {goods?.payload &&
                            <Autocomplete
                                multiple
                                id="tags-standard"
                                options={goods.payload}
                                onChange={(event, newValue) => {
                                    setProducts([...newValue]);
                                }}
                                getOptionLabel={(option) => option?.name || 'no name'}
                                key={option => option?.id}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="Select goods"
                                        placeholder="goods"
                                    />
                                )}
                            />
                        }
                    </Grid>
                </Grid>
                <Grid
                    container
                    justifyContent='space-between'
                    marginTop='30px'
                    marginBottom='10px'
                >
                    <Grid item xs={5}>
                        <Box
                            display='flex'
                            alignItems='center'
                        >
                            <Typography color='#616161'>Add subcategories</Typography>
                            <Switch onChange={() =>
                                setAddSub(!addSub)
                            }/>
                        </Box>
                    </Grid>
                </Grid>
                {addSub &&
                    <Grid
                        container
                        justifyContent='space-between'
                        marginTop='30px'
                        marginBottom='10px'
                    >
                        <AddSubCategory goods={goods} onCreate={value => setSubCategory({...value})}/>
                    </Grid>
                }
            </Grid>
        </>
    )
}

const CategoryEdit = ({   category,
                          categoryCount,
                          goods,
                          actionRootCat,
                          onCountCategory,
                          onGoodFind,
                          onCreateCategory,
                          categoryUpsert}) => {
    const [newCategory, setNewCategory] = useState({})
    const [result, setResult] = useState(false)

    useEffect(() => {
        if(!goods) onGoodFind()
        if(!category) actionRootCat()
        if(!categoryCount) onCountCategory()
        if(categoryUpsert) setResult(true)
    }, [category, categoryCount, goods, categoryUpsert])

    const handlerOnSave = () => {
        onCreateCategory(newCategory)
        onCountCategory()
        actionRootCat()
    }

    return(
        <>
            <Typography
                variant='h6'
                letterSpacing='2px'
                marginBottom='20px'
            >
                Total category: {categoryCount?.payload || 0}
            </Typography>
            {!result ?
                <>
                    {goods &&
                        <AddRootCategory
                            goods={goods}
                            onCreate={value => setNewCategory({...value})}
                        />
                    }
                    <Grid
                        container
                        justifyContent='center'
                        marginTop='30px'
                    >
                        <Grid item xs={4}>
                            <Button
                                disabled={Object.entries(newCategory).length === 0}
                                fullWidth
                                variant="outlined"
                                onClick={handlerOnSave}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </>
                :
                <>
                    <Typography
                        variant='h5'
                        textAlign='center'
                        marginBottom='20px'
                    >
                        Category added successfully!!!
                    </Typography>
                </>
            }
        </>
    )
}

export const CCategoryEdit = connect(state => ({
        category: state.category,
        categoryCount: state.promise['categoryCount'],
        goods: state.promise['goodAllFind'],
        categoryUpsert: state.promise['categoryUpsert']}),
    {
        actionRootCat: actionFullRootCats,
        onCountCategory: actionCategoryCount,
        onGoodFind: actionAllGoodFind,
        onCreateCategory: actionCategoryUpsert})
(CategoryEdit)
