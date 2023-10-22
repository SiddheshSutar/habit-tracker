import { Box, Button, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import styles from './weekview.module.scss'
import CalendarComponent from '../components/Calendar/Calendar';
import { useDispatch, useSelector } from 'react-redux';
import { habitSelector, setHabitState } from '../reduxSlices/habitSlice';
import { STATUS_DONE, STATUS_NOT_DONE, STATUS_NONE, getStatusValue, compareDayStrings, LS_STATE } from '../helpers';
import { setStatus } from '../reduxSlices/alertSlice';
import { useEffect } from 'react';

const WeekView = () => {

    const { selectedDay: selectedDayString, habits } = useSelector(habitSelector)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     localStorage.setItem(LS_STATE, JSON.stringify(habits))
    // }, [habits])

    let selectedDay = ''
    if (selectedDayString) selectedDay = new Date(selectedDayString)


    const handleChangeStatus = (event, value, habitObj) => {

        /** When status buttons are toggled;
         * 1. Check for the correct habit to be modified
         * 2. Check for correct day to be modified in that habit
         * 3. Check if already entry is present then modify the value; else push new value to days array
         */
        let daysArrUpdated = [...habitObj.days]

        let foundEntry = false
        daysArrUpdated = daysArrUpdated.map(item => {
            if (compareDayStrings(item.day, selectedDayString)) {
                foundEntry = true
                return {
                    ...item,
                    status: value
                }
            } else return item
        })

        if (!foundEntry) {
            daysArrUpdated.push({
                day: selectedDayString,
                status: value
            })
        }

        let newhabitsArr = [...habits].map(item => {
            if (compareDayStrings(item.id, habitObj.id)) {
                return {
                    ...habitObj,
                    days: daysArrUpdated
                }
            } else return item
        })

        dispatch(setStatus({ editHabitStatus: 'completed' }))
        dispatch(setHabitState({
            habits: newhabitsArr
        }))
        localStorage.setItem(LS_STATE, JSON.stringify(newhabitsArr))


    }

    return (
        <Box className={styles['container']}>
            <Grid className={styles['lh-rh-flex']} container>
                <Grid item lg={6} xl={6} className={styles['rh-box']}>
                    <CalendarComponent />
                </Grid>
                <Grid item lg={6} xl={6} className={styles['lh-box']}>
                    <h2>Activities per day</h2>
                    {selectedDay && <Grid container alignItems={'center'} className={styles['title-section']}>
                        <Grid item lg={7}>
                            On the day of {selectedDay.getDate()}/{selectedDay.getMonth()}/{selectedDay.getFullYear()} :
                        </Grid>
                        <Grid item lg={5} className={styles['btn-col']}>
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
                    </Grid>}
                    <Box className={styles['activities-section']}>
                        {!selectedDay && <Box className={styles['unselected-msg']}>
                            "Choose one of the highlighted days to view activities"
                        </Box>}
                        {
                            selectedDay &&
                            <Box className={styles['selected-date-info']}>
                                {
                                    habits.map((habitObj, index) => (
                                        <Box key={index} className={`${styles['habit-box']} ${styles['rounded-container']}`}>
                                            <Grid container className={styles['sd-title']}>
                                                <Grid item className={styles['sd-title-col']}>
                                                    <Box className={styles['sd-title-task']}>Task:&nbsp;</Box>
                                                    <Box className={styles['sd-title-text']}>{
                                                        habitObj.title.length >= 30 ?
                                                            habitObj.title.substring(0, 30) + '...' :
                                                            habitObj.title
                                                    }</Box>
                                                </Grid>
                                                <Grid item className={styles['sd-title-col']}>
                                                    <Box className={styles['sd-title-task']}>Weekly count:&nbsp;</Box>
                                                    <Box className={styles['sd-title-text']}>{
                                                        `${habitObj.days.filter(habit => habit.status === STATUS_DONE).length} / 7 days achieved`
                                                    }</Box>
                                                </Grid>
                                            </Grid>
                                            {/* </Box> */}
                                            <Box className={styles['sd-status']}>
                                                <Box className={styles['sd-status-title']}>Status:&nbsp;</Box>
                                                <Box className={styles['btn-box']}>
                                                    <ToggleButtonGroup
                                                        color="primary"
                                                        value={getStatusValue(habitObj, selectedDayString)}
                                                        exclusive
                                                        onChange={(e, v) => handleChangeStatus(e, v, habitObj)}
                                                        aria-label="status"
                                                    >
                                                        <ToggleButton className={`${styles['sd-status-button']} ${styles['sd-status-done']} ${getStatusValue(habitObj, selectedDayString) === STATUS_DONE ?
                                                            styles['sd-current-status'] : ''
                                                            }`} value={STATUS_DONE}>done</ToggleButton>
                                                        <ToggleButton className={`${styles['sd-status-button']} ${styles['sd-status-not-done']} ${getStatusValue(habitObj, selectedDayString) === STATUS_NOT_DONE ?
                                                            styles['sd-current-status'] : ''
                                                            }`} value={STATUS_NOT_DONE}>Not Done</ToggleButton>
                                                        <ToggleButton className={`${styles['sd-status-button']} ${styles['sd-status-none']} ${getStatusValue(habitObj, selectedDayString) === STATUS_NONE ?
                                                            styles['sd-current-status'] : ''
                                                            }`} value={STATUS_NONE}>none</ToggleButton>
                                                    </ToggleButtonGroup>
                                                    <Box className={styles['guideline']}>
                                                        Click on any of the buttons to change the status
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))
                                }
                            </Box>
                        }
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default WeekView;
