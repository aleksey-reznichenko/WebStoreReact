import React from 'react';
import {useState} from "react";
import {CircularProgress, Container, IconButton, InputAdornment, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import SearchIcon from "@material-ui/icons/Search";
import {NotFound} from "../GoodsTab/NotFound";
import {connect} from "react-redux";
import {actionSearchRemove} from "../../../reducers/SearchReducer";
import {actionFullSearchCategory} from "../../../actions/ActionCategory";
import {CategoryFound} from "./CategoryFound";

const FindCategoryEdit = ({searchResult, onSearch, onSearchRemove}) => {
    const [value, setValue] = useState('')
    const [click, setClick] = useState(false)

    return (
        <>
            <Container maxWidth="md">
                <Typography
                    variant='h5'
                    fontFamily='sarif'
                    letterSpacing='3px'
                    marginBottom='30px'
                    marginTop='30px'
                    textAlign='center'
                >
                    WHICH ITEM TO EDIT?
                </Typography>
                <TextField
                    color={'primary'}
                    fullWidth
                    variant="standard"
                    value={value}
                    placeholder="Start typing..."
                    onChange={(event) => {
                        setClick(false);
                        setValue(event.target.value);
                        onSearchRemove()
                    }}
                    InputProps={{
                        sx: {
                            padding: '10px',
                            outline:'none',
                            color: '#616161',
                            fontWeight: '300',
                            letterSpacing: '1px',
                            marginBottom: '50px'
                        },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => {
                                        setClick(true);
                                        onSearchRemove();
                                        onSearch(value)
                                    }}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                {(value !== '' && click) && (searchResult?.searchResult ?
                        Object.values(searchResult.searchResult).length > 0  ?
                            Object.values(searchResult.searchResult)
                                .map(item =>
                                    <CategoryFound
                                        key={item?._id}
                                        item={item}
                                    />
                                )
                            :
                            <NotFound/>
                        :
                        <CircularProgress color="inherit"/>
                )}
            </Container>
        </>
    )
}
export const CFindCategoryEdit = connect(state=> ({
        searchResult: state.search}),
    {
        onSearch: actionFullSearchCategory,
        onSearchRemove: actionSearchRemove})
(FindCategoryEdit)
