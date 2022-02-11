import React from 'react';
import {Box, Container, Typography, useMediaQuery} from "@mui/material";
import imgUrl from "../img/not-found/1.png";

export const NotFoundBlock = ({img=imgUrl,
                                  headerText='OOPS! THAT PAGE CAN’T BE FOUND',
                                  text='The page you are trying to reach is not available.',
                                  marginTop='0px'}) => {

    const matches = useMediaQuery('(max-width:899px)');
    const matches2 = useMediaQuery('(max-width:450px)');

    return (
        <main
            style={{
                backgroundColor: "#f3f3f3",
                padding: matches ? "20px 0" : "50px 0",
                marginTop: marginTop
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{
                    backgroundColor: "#fff",
                    height: matches2 ? "250px" : "350px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <img
                        style={{
                            maxWidth: matches2 ? "100px" : "150px"
                        }}
                        src={ img }
                        alt={ headerText }
                    />
                    <Typography
                        variant={matches2 ? "h6" : "h5"}
                        fontFamily="sarif"
                        fontWeight="300"
                        marginBottom="20px"
                        marginTop="20px"
                        textAlign="center"
                        sx={{textTransform: 'uppercase'}}
                    >
                        { headerText }
                    </Typography>
                    <Typography
                        variant={matches2 ? "body1" : "h7"}
                        textAlign="center"
                        fontWeight="300"
                    >
                        { text }
                    </Typography>
                </Box>
            </Container>
        </main>
    )
}
