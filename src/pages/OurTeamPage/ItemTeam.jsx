import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import imgNotFound from "../../img/catalog/imgNotFound.png";
import romb from "../../img/our-team/romb.png";
import Social from "../../components/SocialLink";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";

export const ItemTeam = ({item: {img, name, spec, desc, links, phone, email}, breakpoint}) => {
    return (
        <Grid sx={{
            backgroundColor: '#fff',
            marginBottom: '50px'
        }}
              item xs={12} sm={5.5}
        >
            <Box>
                <img style={{maxWidth: '100%'}} src={img || imgNotFound} alt='face'/>
            </Box>
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                padding='50px'
            >
                <Typography
                    textAlign='center'
                    variant='h5'
                    fontFamily='sarif'
                    letterSpacing='7px'
                    marginBottom='10px'
                >
                    { name || 'no name' }
                </Typography>
                <img style={{
                    width: '7px',
                    maxHeight: '7px',
                }} src={romb} alt='item'/>
                <Typography
                    textAlign='center'
                    variant='body1'
                    letterSpacing='5px'
                    marginBottom='10px'
                    marginTop='8px'
                    color='#616161'
                >
                    { spec || 'text' }
                </Typography>
                <Typography
                    textAlign='center'
                    variant='body2'
                    marginBottom='30px'
                    fontWeight='300'
                    color='#616161'
                    lineHeight='1.7em'
                >
                    { desc || 'description' }
                </Typography>
                <Box marginBottom='30px'>
                    {
                        links.map(item => <Social key={item.url} Icon={item.icon} link={item.url}/>)
                    }
                </Box>
                <Box
                    display='flex'
                    flexDirection={breakpoint ? 'column': 'row'}
                    justifyContent='space-between'
                    alignItems='center'
                    width='100%'
                >
                    <Typography
                        variant='body2'
                        fontWeight='400'
                        color='#616161'
                        display='flex'
                        flexDirection='row'
                        justifyContent='space-between'
                        alignItems='center'
                        marginBottom={breakpoint ? '15px': '0'}
                    >
                        <LocalPhoneIcon sx={{width: '15px', marginRight: '5px'}}/>
                        { phone || 'phone' }
                    </Typography>
                    <Typography
                        variant='body2'
                        fontWeight='400'
                        color="#616161"
                        display='flex'
                        flexDirection='row'
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <EmailIcon sx={{maxWidth: '15px', marginRight: '5px'}}/>
                        { email || 'email' }
                    </Typography>
                </Box>
            </Box>
        </Grid>
    )
}
