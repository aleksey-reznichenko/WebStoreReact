import React from 'react';
import {Box, Button} from "@mui/material";
import {useEffect, useState} from "react";

export const SetCount = ({onCount, defaultValue=1, height=55, width=50}) => {
    let [count, setCount] = useState(defaultValue)

    useEffect(() => {
        onCount(count)
    }, [count, onCount])

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'no-wrap'
            }}
        >
            <Button
                sx={{height: `${height}px`,
                    width: `${width}px`,
                    borderRadius: '0',
                    color: '#000',
                    borderColor: '#000',
                    fontSize: '30px',
                    fontWeight: '300'
                }}
                variant="outlined"
                color={"inherit"}
                onClick={() => setCount(count === 1 ? count : count-1)}
            >
                -
            </Button>
            <input
                disabled
                value={count}
                style={{
                    boxSizing: 'border-box',
                    height: `${height}px`,
                    width: `${width+10}px`,
                    textAlign: 'center',
                    border: '0',
                    backgroundColor: '#eaeaea'
                }}
            />
            <Button
                sx={{
                    height: `${height}px`,
                    width: `${width}px`,
                    borderRadius: '0',
                    color: '#000',
                    borderColor: '#000',
                    fontSize: '30px',
                    fontWeight: '300'
                }}
                variant="outlined"
                color={"inherit"}
                onClick={() => setCount(count === 100 ? count : count+1)}
            >
                +
            </Button>
        </Box>
    )
}
