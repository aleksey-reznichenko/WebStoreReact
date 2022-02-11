import React from 'react';
import {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import {sortableContainer, sortableElement} from "react-sortable-hoc";
import Box from "@mui/material/Box";
import {backURL} from "../../../actions/PathDB";
import {Button, CircularProgress, Grid, TextField} from "@mui/material";
import {arrayMoveImmutable} from "array-move";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {actionAllCategory} from "../../../actions/ActionCategory";
import {actionGoodUpsert} from "../../../actions/ActionCreateGood";
import {actionGoodCount} from "../../../actions/ActionGoodFind";
import {actionUploadFiles} from "../../../actions/ActionUploadFile";
import {actionClearPromise} from "../../../reducers/PromiseReducer";

const GoodEdit = ({entity={images: [], categories: []},
                      onSave,
                      onFileDrop,
                      fileStatus,
                      categoryState,
                      actionRootCat,
                      goodCount,
                      goods,
                      actionClear,
                      result}) => {
    const [state, setState] = useState(entity)

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: 'image/*', onDrop: acceptedFiles => {
            // acceptedFiles.forEach(async file => {
            //     await onFileDrop(file)
            // })
            onFileDrop(acceptedFiles)
        }})
    const SortableItem = sortableElement(({value}) => {
        return (
            <Box
                key={value?._id}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: 2,
                    border: '1px solid #eaeaea',
                    marginBottom: 2,
                    width: 200,
                    height: 200,
                    padding: '5px',
                    boxSizing: 'border-box'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        minWidth: 0,
                        overflow: 'hidden',
                        position: 'relative'
                    }}
                >
                    {value?.url ?
                        <>
                            <img
                                src={backURL+ '/' + value.url}
                                style={{
                                    display: 'block',
                                    width: 'auto',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center center'
                                }}
                                alt={value.name}
                            />
                        </> :
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    }
                </Box>
            </Box>
        )
    });
    const SortableContainer = sortableContainer(({children}) => {
        return (
            <aside
                style={{
                    display:'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap'
                }}
            >
                {children}
            </aside>
        )
    })
    const onSortEnd = ({oldIndex, newIndex}) => {
        setState(({images}) => ({
            ...state,
            images: arrayMoveImmutable(images, oldIndex, newIndex),
        }));
    }

    const handleClear = () => {
        setState(entity)
    }
    const handleOnSave = () => {

        let query = {...state}
        state.images?.length > 0 ?
            query.images = state.images.map(item => {return {'_id': item['_id']}})
            :
            delete query.images
        state.categories?.length > 0 ?
            query.categories = state.categories.map(item => {return {'_id': item['_id'], 'name': item['name']}})
            :
            delete query.categories
        onSave(query)
        goodCount()
    }
    const handleFullClear = () => {
        goodCount()
        setState(entity)
        actionClear('goodUpsert')
        actionClear('uploadFile')
    }

    useEffect(() => {
        if(!categoryState) actionRootCat()
        if(!goods) goodCount()
        if(fileStatus?.status === 'RESOLVED'){
            state.images?.length > 0 ?
                setState({...state, images: [...state.images, fileStatus?.payload]})
                :
                setState({...state, images: [fileStatus?.payload]})
        }
    },[categoryState, goods, fileStatus])

    return (
        <>
            {!result ?
                <>
                    <Typography
                        variant='h6'
                        letterSpacing='2px'
                        marginBottom='20px'
                    >
                        Total products: {goods?.payload || 0}
                    </Typography>
                    <Box
                        style={{
                            minHeight: "200px",
                            border: '1px dashed #616161',
                            borderRadius: '20px',
                            padding: '20px'
                        }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        {isDragActive ?
                            <Typography
                                variant='body1'
                                textAlign='center'
                                color='#616161'
                            >
                                Drop the file here ...
                            </Typography>
                            :
                            <Typography
                                variant='body1'
                                textAlign='center'
                                color='#616161'
                                marginBottom='20px'
                            >
                                Drag 'n' drop image files here, or click to select file
                            </Typography>
                        }
                        <SortableContainer
                            axis="xy"
                            onSortEnd={onSortEnd}
                        >
                            {state.images?.length > 0 && state.images.map((value, index) => (
                                <SortableItem
                                    key={`item-${value?._id || index}`}
                                    index={index}
                                    value={value}
                                />
                            ))}
                        </SortableContainer>
                    </Box>
                    <Grid
                        container
                        justifyContent='space-between'
                        alignItems='flex-end'
                        marginTop='30px'
                    >
                        <Grid item xs={5.5}>
                            <TextField
                                fullWidth
                                id="filled-basic"
                                label="Title product"
                                variant="standard"
                                value={state?.name || ''}
                                onChange={e => setState({...state, name: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={5.5}>
                            {categoryState && categoryState?.payload && categoryState.payload?.length > 0 &&
                                <>
                                    {state.categories?.length > 0 ?
                                        <Autocomplete
                                            multiple
                                            id="tags-standard"
                                            options={Object.values(categoryState.payload)}
                                            defaultValue={state.categories}
                                            onChange={(event, newValue) => {
                                                setState({...state, categories: [...newValue]})
                                            }}
                                            getOptionLabel={(option) => option?.name || 'no name'}
                                            key={option => option?.id}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="standard"
                                                    label="Select categories"
                                                    placeholder="categories"
                                                />
                                            )}
                                        /> :
                                        <Autocomplete
                                            multiple
                                            id="tags-standard"
                                            options={Object.values(categoryState.payload)}
                                            onChange={(event, newValue) => {
                                                setState({...state, categories: [...newValue]})
                                            }}
                                            getOptionLabel={(option) => option?.name || 'no name'}
                                            key={option => option?.id}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="standard"
                                                    label="Select categories"
                                                    placeholder="categories"
                                                />
                                            )}
                                        />
                                    }
                                </>
                            }
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justifyContent='space-between'
                        alignItems='flex-end'
                        marginTop='30px'
                    >
                        <Grid item xs={5.5}>
                            <TextField fullWidth
                                       id='Price'
                                       type='number'
                                       label='Price'
                                       variant='standard'
                                       value={state?.price || ''}
                                       onChange={e => setState({...state,
                                           price: parseFloat(e.target.value < 0 ? 0 : e.target.value)})
                                       }
                            />
                        </Grid>
                        <Grid item xs={5.5}>
                            <TextField fullWidth
                                       id='filled-basic'
                                       label='Description product'
                                       variant='standard'
                                       multiline
                                       value={state?.description || ''}
                                       onChange={e => setState({...state, description: e.target.value})}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justifyContent='space-between'
                        marginTop='30px'
                    >
                        <Grid
                            item xs={5.5}
                            display='flex'
                            justifyContent='center'
                        >
                            <Button
                                fullWidth
                                onClick={handleClear}
                                variant="outlined"
                                color='warning'
                            >
                                Clear
                            </Button>
                        </Grid>
                        <Grid
                            item xs={5.5}
                            display='flex'
                            justifyContent='center'
                        >
                            <Button
                                fullWidth
                                variant="outlined"
                                color='primary'
                                onClick={handleOnSave}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </> :
                result?.payload?._id ?
                    <>
                        <Box
                            display='flex'
                            alignItems='center'
                            flexDirection='column'
                        >
                            <Typography
                                variant='h5'
                                letterSpacing='2px'
                                textAlign='center'
                                color='#616161'
                                marginBottom='20px'
                            >
                                Product successfully created!
                            </Typography>
                            <CheckCircleOutlineIcon sx={{marginBottom: '20px'}}/>
                            <Link
                                to={`/good/${result.payload._id}`}
                                style={{
                                    color:'#616161',
                                    marginBottom:'20px'
                                }}
                            >
                                <Typography
                                    variant='h5'
                                    letterSpacing='2px'
                                    textAlign='center'
                                    color='#616161'
                                >
                                    View results
                                </Typography>
                            </Link>
                            <Button
                                variant='outlined'
                                onClick={handleFullClear}
                            >
                                Add more
                            </Button>
                        </Box>
                    </> :
                    result?.error ?
                        <Box
                            display='flex'
                            alignItems='center'
                            flexDirection='column'
                        >
                            <Typography
                                variant='h5'
                                letterSpacing='2px'
                                textAlign='center'
                                color='#f00'
                                marginBottom='20px'
                            >
                                Fatal error, try again!
                            </Typography>
                            <Button
                                variant='outlined'
                                onClick={handleFullClear}
                            >
                                Add more
                            </Button>
                        </Box>
                        :
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
            }
        </>
    )
}

export const CGoodEdit = connect(state => ({
        fileStatus: state.promise['uploadFile'],
        categoryState: state.promise['allCategory'],
        goods: state.promise['goodCount'],
        result: state.promise['goodUpsert']}),
    {
        actionRootCat: actionAllCategory,
        onSave: actionGoodUpsert,
        goodCount:  actionGoodCount,
        onFileDrop: actionUploadFiles,
        actionClear: actionClearPromise})
(GoodEdit)
