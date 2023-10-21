import { Box, Button, Container, Grid, Tab, Tabs, Typography } from '@mui/material';
import styles from './navbar.module.scss'
import { useState } from 'react';
import { DetailsContent } from '../Content/Content';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { habitSelector, toggleSection } from '../reduxSlices/habitSlice';
import { CollapseExpand } from '../components/CollapseExpand/CollapseExpand';
import Form from '../Form/Form';
import DetailedView from '../DetailedView/DetailedView';
import WeekView from '../WeekView/WeekView';
// import CustomModal from '../DetailedView/CustomModal';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    if (!children) return <></>
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}
                >
                    <Typography
                    >{children}</Typography>
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

    const dispatch = useDispatch()
    const { sectionOpen } = useSelector(habitSelector)

    return (
        <Box
            className={styles['container']}
        >
            <Box className={styles['nav-strip']}>
                <Tabbs
                    className={styles['tabs-wrapper']}
                    value={value} onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Detailed View" />
                    <Tab label="Week View" />
                </Tabbs>
                {/* <Button type='button' variant='outlined'
                    className={styles['add-btn']}
                    startIcon={<AddIcon />}
                    onClick={e => {
                        dispatch(toggleSection(true))
                    }}
                >
                    Add Habit
                </Button> */}
            </Box>
            <CollapseExpand
                title={'Add Habit'}
                open={sectionOpen}
                handleChange={(flag) => dispatch(toggleSection(flag))}
            >
                <Form />
            </CollapseExpand>
            <CustomTabPanel value={value} index={0}>
                <DetailedView />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <WeekView />
            </CustomTabPanel>
        </Box>
    );
}

export default Navbar;