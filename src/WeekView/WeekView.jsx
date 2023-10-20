import { Box, Grid } from '@mui/material';
import styles from './weekview.module.scss'
import CalendarComponent from '../components/Calendar/Calendar';

const WeekView = () => {
    return (
        <Box className={styles['container']}>
            <Grid container>
                <Grid item lg={4}>
                    <h2>Activities per day</h2>
                </Grid>
                <Grid item lg={8}>
                    <CalendarComponent />
                </Grid>
            </Grid>
        </Box>
    );
}
 
export default WeekView;
