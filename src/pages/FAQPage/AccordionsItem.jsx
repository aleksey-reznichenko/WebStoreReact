import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    useMediaQuery}
    from "@mui/material";
import {useState} from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const AccordionsItem = ({id, title, content}) => {
    const matches = useMediaQuery('(max-width:768px)')
    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    return (
        <Accordion
            expanded={expanded === id}
            onChange={handleChange(id)}
            sx={{padding: matches ? '10px' : "20px"}}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography
                    variant={matches ? 'body1' : 'h5'}
                    letterSpacing='3px'
                >
                    { title.toUpperCase() || 'title' }
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography
                    variant='body1'
                    color='#616161'
                    lineHeight='1.7em'
                    fontWeight='300'
                >
                    { content || 'content' }
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}
