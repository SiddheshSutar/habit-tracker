import { Box, Container, Grid, Tab, Tabs, Typography } from '@mui/material';
import styles from './navbar.module.scss'
import { useState } from 'react';
import { DetailsContent } from '../Content/Content';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const Tabbs = (props) => {
    return <Tabs
    {...props}
    sx={{
        '.MuiButtonBase-root': {
            fontWeight: 'bold',
            color: 'var(--grey-main)'
        },
        '& .MuiButtonBase-root.Mui-selected': {
            color: `var(--main-dark)`,
        },
        '& .MuiTabs-indicator': {
            backgroundColor: `var(--main-dark)`
        },
    }}
    />
}

const Navbar = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <Box>
                <Tabbs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Detailed View" />
                    <Tab label="Week View" />
                </Tabbs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <DetailsContent />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Item Two
            </CustomTabPanel>
        </Container>
    );
}

export default Navbar;