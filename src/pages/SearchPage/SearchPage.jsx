import React from 'react';
import {
    CircularProgress,
    Container,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    useMediaQuery
} from "@mui/material";
import {useState} from "react";
import SearchIcon from "@material-ui/icons/Search";
import {connect} from "react-redux";
import {actionFullGoodFind} from "../../actions/ActionGoodFind";
import {actionSearchRemove} from "../../reducers/SearchReducer";
import {ItemFound} from "./ItemFound";
import {NotFound} from "./NotFound";

const SearchPage = ({searchResult, onSearch, onSearchRemove}) => {
    const matches = useMediaQuery('(max-width:899px)')
    const [value, setValue] = useState('')
    const [click, setClick] = useState(false)

    return(
        <>
            <main
                style={{
                    backgroundColor: "#f3f3f3",
                    marginTop: '85px',
                    padding: matches ? "20px 0" : "50px 0",
                    minHeight: 'calc(100vh - (185px + 290px))'
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        variant='h5'
                        fontFamily='sarif'
                        letterSpacing='3px'
                        marginBottom='30px'
                    >
                        WHAT YOU ARE LOOKING FOR?
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
                            onSearchRemove()}
                        }
                        InputProps={{
                            sx: {
                                padding: '10px',
                                outline:'none',
                                color: '#616161',
                                fontWeight: '300',
                                letterSpacing: '1px',
                                marginBottom: '50px'},
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => {
                                        setClick(true);
                                        onSearchRemove();
                                        onSearch(value)}
                                    }>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    {(value !== '' && click) && (searchResult?.searchResult ?
                            Object.values(searchResult.searchResult).length > 0  ?
                                Object.values(searchResult.searchResult).map((item, index) =>
                                    <ItemFound key={index} item={item}/>
                                )
                                : <NotFound/>
                            : <CircularProgress color="inherit"/>
                    )}
                </Container>
            </main>
        </>
    )
}
const CSearchPage = connect(state => ({
        searchResult: state.search}),
    {
        onSearch: actionFullGoodFind,
        onSearchRemove: actionSearchRemove})
(SearchPage)

export default CSearchPage
