import { useDispatch, useSelector } from 'react-redux';
import styles from './detailedView.module.scss'
import { useEffect, useState } from 'react';
import { habitSelector, removeHabit } from '../reduxSlices/habitSlice';
import { getActivityStatus, daysShortTexts, generateDayArrAsPerCurrentDay } from '../helpers';
import { Box, Tooltip } from '@mui/material';

const DetailedView = () => {

    const { habits, selectedDay: selectedDayString, } = useSelector(habitSelector)
    const dispatch = useDispatch()
    const [hoveredItemIndex, setHoveredItemIndex] = useState(null)

    let selectedDay = ''
    if(selectedDayString) selectedDay = new Date(selectedDayString)

    useEffect(() => {
    }, [])

    const handleToggleButtonHover = hoveredIndex => {
        setHoveredItemIndex(hoveredIndex)
    }

    return <div className={styles['container']}>
        {
            habits.length === 0 &&
            <div className={`${styles['no-habits']} ${styles['rounded-container']}`}>
                No Habits found. Start creating !
            </div>
        }
        {
            habits.length > 0 &&
            <> 
                <Box className={styles['title-box']}>
                    <h2 className={`${styles['title']} ${styles['']}`}>
                        Your habits
                    </h2>
                    <div>
                        The scehdule of habits can be modified under Week View
                    </div>
                </Box>
                <ul>
                    {
                        habits.map((item, index) => (
                            <li key={index} className={`${styles['li-tag']} ${styles['rounded-container']}`}>
                                <div className={styles['item-row']}>
                                    <h2 className={`${styles['item-col']}`}
                                        style={{
                                            // textDecoration: item.completed ? 'line-through' : 'none'
                                        }}
                                    >
                                        {
                                            item.title.length > 28 ?
                                            `${item.title.substring(0,28)}...` :
                                            item.title
                                        }
                                    </h2>
                                    <div className={`${styles['item-col']} ${styles['right-col']}`}>
                                        <div className={`${styles['counts']}`}
                                        >
                                            {`${item.days.length
                                                } / 7 days logged`}
                                        </div>
                                        {
                                            generateDayArrAsPerCurrentDay(daysShortTexts).map((dayText, dayIndex) => (
                                                <Tooltip arrow key={dayIndex} title={
                                                    getActivityStatus(item, dayText, dayIndex) === 'completed' ?
                                                        'Task Completed' :
                                                        getActivityStatus(item, dayText, dayIndex) === 'partial' ?
                                                            'Task Not Completed' :
                                                            ''
                                                }>
                                                    <div className={`${styles['week-pill']
                                                        } ${styles[`week-pill-${getActivityStatus(item, dayText, dayIndex)}`]
                                                        }`}
                                                    >
                                                        {dayText}
                                                    </div>
                                                </Tooltip>
                                            ))
                                        }
                                        <div className={`${styles['icon']} ${styles['remove-icon']}`}
                                            title="Remove to do"
                                            onClick={e => dispatch(removeHabit(item))}
                                        >
                                            <div className={`${styles['symbol']}`}>+</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </>
        }
    </div>;
}

export default DetailedView;