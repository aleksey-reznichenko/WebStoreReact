import React from 'react';
import {useState} from "react";
import Link from "react-router-dom/es/Link";
import {Accordion, AccordionDetails, AccordionSummary, Grid, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CategoryItem = ({object: {_id, name, subCategories}={}}) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <>
            {subCategories === null || !subCategories ?
                <li>
                    <Link
                        style={{textDecoration: 'none'}}
                        to={`/catalog/category/${_id}`}
                    >
                        <Typography
                            variant='body1'
                            color='#616161'
                            marginBottom='10px'
                        >
                            {name || 'no name'}
                        </Typography>
                    </Link>
                </li>
                :
                <li>
                    <Accordion
                        style={{
                            border: 'none',
                            borderRadius: '0',
                            marginTop: '-10px',
                            boxShadow: 'none'
                        }}
                        expanded={expanded === 'panel1'}
                        onChange={handleChange('panel1')}
                    >
                        <AccordionSummary
                            sx={{padding: '0'}}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Link
                                style={{textDecoration: 'none'}}
                                to={`/catalog/category/${_id}`}
                            >
                                <Typography
                                    variant='body1'
                                    color='#616161'
                                    padding='0'
                                >
                                    {name || 'no name'}
                                </Typography>
                            </Link>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul
                                style={{
                                    listStyle: 'none',
                                    padding: '0 0 0 10px',
                                    marginBottom: '10px'
                                }}
                            >
                                {subCategories && Object.values(subCategories).map(item =>
                                    <CategoryItem key={item['_id']} object={item}/>
                                )}
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                </li>
            }
        </>
    )
}
export const CategoryAside = ({category}) => {
    return (
        <Grid
            sx={{
                backgroundColor: '#fff', padding: '30px'
            }}
            xs={12} lg={3} item
        >
            <Typography
                variant='h6'
                letterSpacing='3px'
                lineHeight='1.3em'
                marginBottom='20px'
            >
                PRODUCT CATEGORIES
            </Typography>
            <ul style={{listStyle: 'none', padding: '0'}}>
                {category && Object.values(category).map(item =>
                    <CategoryItem key={item['_id']} object={item}/>
                )}
            </ul>
        </Grid>
    )
}
