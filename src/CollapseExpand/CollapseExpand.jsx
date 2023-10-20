import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const CollapseExpand = ({
    title,
    open,
    handleChange,
    children
}) => {
    return (
        <Box
            sx={{
                '.MuiPaper-root.MuiAccordion-root': {
                    background: 'transparent'
                }
            }}>
            <Accordion
                expanded={open}
                onChange={e => { handleChange(!open) }}
                sx={{
                    '.MuiAccordionSummary-content': {
                        display: 'flex',
                        justifyContent: 'center',
                        width: 'fit-content',
                        flexGrow: 0
                    }
                }
                }
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>
                        {title}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {children}
                </AccordionDetails>
            </Accordion>
        </Box >
    );
}
