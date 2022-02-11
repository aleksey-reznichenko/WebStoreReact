import React from 'react';
import {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import {Box, Typography} from "@mui/material";

export const MyDropzone = ({onLoad}) => {
    const [files, setFiles] = useState([]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: 'image/*', onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }})

    const thumbs = files.map(file => (
        <Box
            key={ file.name }
            style={{
                display: 'inline-flex',
                borderRadius: 2,
                border: '1px solid #eaeaea',
                marginBottom: 8,
                marginRight: 8,
                width: 500,
                height: 500,
                padding: 4,
                boxSizing: 'border-box'
            }}
        >
            <Box
                style={{
                    display: 'flex',
                    minWidth: 0,
                    overflow: 'hidden'
                }}
            >
                <img
                    src={file.preview}
                    style={{
                        display: 'block',
                        width: 'auto',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center center'
                    }}
                    alt={file.name}
                />
            </Box>
        </Box>
    ));

    useEffect(() => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
        onLoad(files)
    }, [files]);

    return (
        <section
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                width:"100%",
                borderRadius: '20px',
                padding: '20px'
            }}
        >
            <Box
                style={{
                    width:"100%",
                    height: "100%",
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
                        color='#616161'
                    >
                        Drop the file here ...
                    </Typography>
                    :
                    <Typography
                        variant='body1'
                        color='#616161'
                    >
                        Drag 'n' drop image files here, or click to select file
                    </Typography>
                }
                <aside>
                    {thumbs}
                </aside>
            </Box>
        </section>
    )
}
