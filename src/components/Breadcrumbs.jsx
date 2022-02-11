import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from "react-router-dom/es/Link";
import Stack from '@mui/material/Stack';
import {Typography, useMediaQuery} from "@mui/material";
import background from "../img/breadcrumbs/bg-breadcrumbs.png";

const Breadcrumb = ({links=['this page'], title}) => {
    const matches = useMediaQuery('(max-width:899px)');

    let arr = links.map(i => {
        let link = Array.from(i).map(j => j === ' ' ? '-' : j).join('').toLowerCase()
        return  <Link
                    key={i.toString()}
                    style={{
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: "11px"
                    }}
                    to={`/${link}`}> {i.toUpperCase()}
                </Link>
    })
    arr.unshift(
        <Link
            style={{
                color: "#fff",
                textDecoration: "none",
                fontSize: "11px"
            }}
            to="/"
            key={'homeBreadcrumbs'}
        >
            HOME
        </Link>
    )

    return (
        <article
            style={{
                background: `url(${background}) center/contain repeat`,
                padding: "40px 0",
                height: "210px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative"
            }}
        >
            <Typography
                fontWeight={300}
                color="#fff"
                variant={matches ? "h4" : "h3"}
            >
                {title || links[links.length-1].toUpperCase()}
            </Typography>
            <Stack
                spacing={2}
                position="absolute"
                bottom="40px"
            >
                <Breadcrumbs
                    color="#fff"
                    separator="›"
                    aria-label="breadcrumb"
                >
                    {arr}
                </Breadcrumbs>
            </Stack>
        </article>
    );
}
export default Breadcrumb;
