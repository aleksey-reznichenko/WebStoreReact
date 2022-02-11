import React from 'react';
import {Link, Typography} from "@mui/material";

export const Contact = ({Icon, text, link}) => {
    return (
        <Typography
            color="inherit"
            variant="h6"
            noWrap
            component="div"
        >
            <Link
                className='Footer__Contact'
                display="flex"
                flexDirection="row"
                alignItems="center"
                textAlign="left"
                padding="10px 0"
                component="a"
                variant="body2"
                color="#fff"
                underline="none"
                href={link}
            >
                <Icon />
                {text}
            </Link>
        </Typography>
    )
}
