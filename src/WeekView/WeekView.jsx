import { Box, Button, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import styles from './weekview.module.scss'
import CalendarComponent from '../components/Calendar/Calendar';
import { useDispatch, useSelector } from 'react-redux';
import { habitSelector, setHabitState } from '../reduxSlices/habitSlice';
import { STATUS_DONE, STATUS_NOT_DONE, STATUS_NONE, getStatusValue } from '../helpers';

const WeekView = () => {

    const { selectedDay: selectedDayString, habits } = useSelector(habitSelector)
    const dispatch = useDispatch()


    let selectedDay = ''
    if(selectedDayString) selectedDay = new Date(selectedDayString)

    
    const handleChangeStatus = (event, value, habitObj) => {

        let daysArrUpdated = [...habitObj.days]

        let foundEntry = false
        daysArrUpdated = daysArrUpdated.map(item => {
            if(item.day === selectedDayString) {
                return {
                    ...item,
                    status: value
                }
            } else return item
        })

        if(!foundEntry) {
            daysArrUpdated.push({
                day: selectedDayString,
                status: value
            })
        }

        let newhabitsArr = [...habits].map(item => {
            if(item.id === habitObj.id) {
                return {
                    ...habitObj,
                    days: daysArrUpdated
                }
            } else return item
        })

        dispatch(setHabitState({
            habits: newhabitsArr
        }))

        
    }

    return (
        <Box className={styles['container']}>
            <Grid container justifyContent={'space-between'} gap={1} style={{
                flexWrap: 'nowrap'
            }}>
                <Grid item lg={4} xl={3} className={styles['lh-box']}>
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
                            selectedDay &&
                            <Box className={styles['selected-date-info']}>
                                {
                                    habits.map((habitObj, index) => (
                                        <Box key={index} className={`${styles['habit-box']} ${styles['rounded-container']}`}>
                                            <Box className={styles['sd-title']}>
                                                {habitObj.title}
                                            </Box>
                                            <Box className={styles['sd-status']}>
                                                <ToggleButtonGroup
                                                    color="primary"
                                                    value={getStatusValue(habitObj, selectedDayString)}
                                                    exclusive
                                                    onChange={(e, v) =>  handleChangeStatus(e, v, habitObj)}
                                                    aria-label="status"
                                                >
                                                    <ToggleButton value={STATUS_DONE}>done</ToggleButton>
                                                    <ToggleButton value={STATUS_NOT_DONE}>Not Done</ToggleButton>
                                                    <ToggleButton value={STATUS_NONE}>none</ToggleButton>
                                                </ToggleButtonGroup>
                                            </Box>
                                        </Box>
                                    ))

                                }
                            </Box>
                        }

                    </Box>
                </Grid>
                <Grid item lg={8} xl={7} className={styles['rh-box']}>
                    <CalendarComponent />
                </Grid>
            </Grid>
        </Box>
    );
}

export default WeekView;
