import { Box, Button, Grid } from '@mui/material';
import styles from './weekview.module.scss'
import CalendarComponent from '../components/Calendar/Calendar';
import { useDispatch, useSelector } from 'react-redux';
import { habitSelector, setHabitState } from '../reduxSlices/habitSlice';

const WeekView = () => {

    const { selectedDay, habits } = useSelector(habitSelector)
    const dispatch = useDispatch()

    let matchedHabitOnSelectedDay = null

    selectedDay && habits.forEach((item) => {
        if (item.id === selectedDay.toString()) matchedHabitOnSelectedDay = item
    })

    return (
        <Box className={styles['container']}>
            <Grid container>
                <Grid item lg={4}>
                    <h2>Activities per day</h2>
                    <Box className={styles['activities-section']}>
                        {!selectedDay && <Box className={styles['unselected-msg']}>
                            "Choose one of the highlighted days to view activities"
                        </Box>}
                        {
                            selectedDay && !matchedHabitOnSelectedDay &&
                            <>
                                <Box className={styles['selected-date-info']}>
                                    No Habit found on selected day
                                </Box>
                            </>
                        }
                        {
                            selectedDay && matchedHabitOnSelectedDay &&
                            <Box className={styles['selected-date-info']}>
                                {
                                    matchedHabitOnSelectedDay.id
                                }
                            </Box>
                        }
                        {
                            selectedDay && <>
                                <Button variant='outlined' type="button" className={styles['clear-selected-date']}
                                    onClick={e => {
                                        dispatch(setHabitState({
                                            selectedDay: null
                                        }))
                                    }}
                                >
                                    Clear Selection
                                </Button>
                            </>
                        }
                    </Box>
                </Grid>
                <Grid item lg={8}>
                    <CalendarComponent />
                </Grid>
            </Grid>
        </Box>
    );
}

export default WeekView;
