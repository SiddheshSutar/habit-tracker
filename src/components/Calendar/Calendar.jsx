import Calendar from 'react-calendar';
import styles from './calendar.module.scss';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

const CalendarComponent = () => {
    const [value, onChange] = useState(new Date());
    
    return (
        <div className={`${styles['container']}`}>
            <Calendar
                value={value}
                onChange={onChange}
                onClickDay={e => console.log('hex: ', e)}
            />
        </div>
    );
}
 
export default CalendarComponent;