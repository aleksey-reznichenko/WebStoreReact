import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Social from "../../components/SocialLink";
import * as React from "react";

export const AddressItem = ({item}) => {
    return (
        <>
            <Grid padding='50px 40px !important' item xs={12} md={6}>
                <Typography
                    variant="h5"
                    letterSpacing="2px"
                    marginBottom='40px'
                >
                    {item[0].toString() || 'no name'}
                </Typography>
                <Grid color="#616161" container spacing={2}>
                    <Grid marginBottom='30px' item xs={12} sm={6}>
                        <Typography
                            fontSize='13px'
                            fontWeight='300'
                            marginBottom='15px'
                        >
                            PHONES
                        </Typography>
                        {Array.isArray(item) && item.length > 0 && item[1]?.phones.map((i, index) =>
                            <Typography
                                key={index}
                                lineHeight='1.7em'
                                fontWeight='400'
                                variant="body1"
                            >
                                {i.toString() || 'phones'}
                            </Typography>
                        )}
                    </Grid>
                    <Grid marginBottom='30px' item xs={12} sm={6}>
                        <Typography
                            fontSize='13px'
                            fontWeight='300'
                            marginBottom='15px'
                        >
                            ADDRESS
                        </Typography>
                        <Typography
                            lineHeight='1.7em'
                            fontWeight='400'
                            variant='body1'
                        >
                            {Array.isArray(item) && item.length > 0 ? item[1]?.address : 'address'}
                        </Typography>
                    </Grid>
                    <Grid marginBottom='30px' item xs={12} sm={6}>
                        <Typography
                            fontSize='13px'
                            fontWeight='300'
                            marginBottom='15px'
                        >
                            EMAIL
                        </Typography>
                        {Array.isArray(item) && item.length > 0  &&item[1]?.email.map(i =>
                            <Typography
                                key={i.toString()}
                                lineHeight='1.7em'
                                fontWeight='400'
                                variant="body1"
                            >
                                { i.toString() || 'email' }
                            </Typography>)
                        }
                    </Grid>
                    <Grid marginBottom='30px' item xs={12} sm={6}>
                        <Typography
                            fontSize='13px'
                            fontWeight='300'
                            marginBottom='15px'
                        >
                            SOCIAL NETWORKS
                        </Typography>
                        {(item[1]["social networks"] || []).map(item =>
                            <Social key={item.url} Icon={item.icon} link={item.url}/>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
