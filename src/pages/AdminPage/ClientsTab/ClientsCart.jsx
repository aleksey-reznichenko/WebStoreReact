import React from 'react';
import {Avatar, Card, CardContent, CardHeader, Collapse} from "@mui/material";
import {backURL} from "../../../actions/PathDB";
import userDefault from "../../../img/header/userDefault.png";
import {useState} from "react";
import Box from "@mui/material/Box";
import {timeCalc} from "../../ProductPage/timeCalc";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {ItemAvatar} from "./ItemAvatar";
import {ItemAccordion} from "./ItemAccordion";

export const ClientsCart = ({_id, login, nick, avatar, createdAt, acl}) => {
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Card
            sx={{
                boxShadow: 'none',
                border: '1px solid #616161',
                marginBottom: '20px'
            }}
        >
            <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                padding='0 20px 0 10px'
                style={{cursor:'pointer'}}
                onClick={handleExpandClick}
            >
                <CardHeader
                    avatar={
                        avatar ?
                            <Avatar
                                alt="User"
                                src={avatar?.url && backURL + '/' + avatar.url}
                            />
                            :
                            <Avatar
                                alt="User"
                                src={userDefault}
                            />
                    }
                    title={`Login: ${login || 'login'}  ${nick ? '| Nick: ' + nick : ''} 
                        ${(acl && Array.isArray(acl) && acl.length > 1) ?
                        '| Status: ' + acl.slice(1, acl.length).toString() : ''}`
                    }
                    subheader={timeCalc(+createdAt || 0)}
                />
                <ExpandMoreIcon />
            </Box>
            <Collapse
                in={expanded}
                timeout="auto"
                unmountOnExit
            >
                <CardContent>
                    <ItemAvatar avatar={avatar}/>
                    <ItemAccordion
                        text={`Login: ${login || 'login'}`}
                    />
                    <ItemAccordion
                        size={'body1'}
                        text={`${nick ? 'Nick: ' + nick : ''}`}
                    />
                    <ItemAccordion
                        size={'body1'}
                        text={`${(acl && Array.isArray(acl) && acl.length > 1)
                            ? 'Status: ' + acl.slice(1, acl.length).toString()
                            : ''}`
                        }
                    />
                    <ItemAccordion
                        size={'body1'}
                        text={'Created at: '+timeCalc(+createdAt || 0)}
                    />
                </CardContent>
            </Collapse>
        </Card>
    )
}
