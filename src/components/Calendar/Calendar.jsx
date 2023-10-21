import Calendar from 'react-calendar';
import styles from './calendar.module.scss';
import 'react-calendar/dist/Calendar.css';
import './react-calendar-override.scss';
import { useState } from 'react';
import { Tooltip } from '@mui/material';

const CalendarComponent = () => {
    const [value, onChange] = useState(new Date());

    return (
        <div className={`${styles['container']}`}>
            <Calendar
                value={value}
                onChange={onChange}
                defaultValue={null}

                tileClassName={({ activeStartDate, date, view }) => {
                    const currentDate = (new Date()).getDate()
                    if (date.getDate() > (currentDate - 7) && date.getDate() <= currentDate) {
                        return ` ${styles['show-marked']}`
                    } else return ''
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
                onClickDay={e => console.log('hex: ', e)}
            />
        </div>
    );
}

export default CalendarComponent;