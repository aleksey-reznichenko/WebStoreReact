import React from 'react';
import Carousel from "react-material-ui-carousel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {Box} from "@mui/material";
import {ImageItem} from "./ImageItem";

export const CarouselItem = ({images}) => {
    return (
        <Carousel
            navButtonsProps={{
                style: {
                    backgroundColor: 'transparent',
                    color: '#000',
                    borderRadius: 0
                }
            }}
            NextIcon={<ArrowForwardIosIcon/>}
            PrevIcon={<ArrowBackIosNewIcon/>}
            fullHeightHover={true}
        >
            {
                images.map((item, index) =>
                    <Box
                        key={index}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            height: '340px'
                        }}
                    >
                        <ImageItem
                            key={item._id}
                            images={item}
                        />
                    </Box>
                )
            }
        </Carousel>
    )
}
