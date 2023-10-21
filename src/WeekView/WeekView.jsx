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
                    <Grid container alignItems={'center'} className={styles['title-section']}>
                        <Grid item lg={7}>
                            <h2>Activities per day</h2>
                        </Grid>
                        <Grid item lg={5}>
                            {
                                selectedDay && <>
                                    <Button variant='text' type="button" size='sm'
                                        className={styles['clear-selected-date']}
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
                        </Grid>
                    </Grid>
                    {selectedDay && <Box className={styles['on-this-day']}>
                        On this day of {selectedDay.getDate()}/{selectedDay.getMonth()}/{selectedDay.getFullYear()} : 
                    </Box>}
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
