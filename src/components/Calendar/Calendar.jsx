import Calendar from 'react-calendar';
import styles from './calendar.module.scss';
import 'react-calendar/dist/Calendar.css';
import './react-calendar-override.scss';
import { useState } from 'react';
import { Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { habitSelector, setHabitState } from '../../reduxSlices/habitSlice';

const CalendarComponent = () => {
    const [value, onChange] = useState(new Date());
    const { selectedDay: selectedDayString } = useSelector(habitSelector)

    const dispatch = useDispatch()

    let selectedDay = ''
    if(selectedDayString) selectedDay = new Date(selectedDayString)

    return (
        <div className={`${styles['container']}`}>
            <Calendar
                value={value}
                onChange={onChange}
                defaultValue={null}

                tileClassName={({ activeStartDate, date, view }) => {
                    let className = ''
                    
                    /**Append if selected */
                    if(selectedDay && (selectedDay.getDate() === date.getDate())) {
                        className = `${className} selected-date ${styles['selected-date']}`
                    }

                    /** Append if falls within 7 day limit */
                    const currentDate = (new Date()).getDate()
                    if (date.getDate() > (currentDate - 7) && date.getDate() <= currentDate) {
                        className =  `${className} ${styles['show-marked']}`
                    }
                    return className
                }}
                tileDisabled={({ activeStartDate, date, view }) => {
                    const currentDate = (new Date()).getDate()
                    if (date.getDate() > (currentDate - 7) && date.getDate() <= currentDate) {
                        return false
                    } else return true
                }}
                tileContent={({ activeStartDate, date, view }) => {

                    const currentDate = (new Date()).getDate()
                    if (date.getDate() > (currentDate - 7) && date.getDate() <= currentDate) {
                        return <>
                            <div className={`${styles['date-box']}`}>
                                <Tooltip arrow title={
                                    'Click to view activities'
                                }>
                                    <div className={`${styles['date-value']}`}>
                                        {date.getDate()}
                                    </div>
                                </Tooltip>
                            </div>
                        </>
                    } else return <div>{date.getDate()}
                    </div>
                }}
                onClickDay={date => {
                    dispatch(setHabitState({
                        selectedDay: date.toString()
                    }))
                }}
            />
        </div>
    );
}

export default CalendarComponent;