import { useDispatch, useSelector } from 'react-redux';
import styles from './detailedView.module.scss'
import { useEffect, useState } from 'react';
import { habitSelector, removeHabit } from '../reduxSlices/habitSlice';
import { getActivityStatus, daysShortTexts } from '../constants';

const DetailedView = () => {

    const { habits } = useSelector(habitSelector)
    const dispatch = useDispatch()
    const [hoveredItemIndex, setHoveredItemIndex] = useState(null)

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
                <div>
                    <h2 className={`${styles['title']} ${styles['']}`}>
                        Your habits
                    </h2>
                </div>
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
                                        {item.title}
                                    </h2>
                                    <div className={`${styles['item-col']} ${styles['right-col']}`}>
                                        {
                                            daysShortTexts.map((dayText, dayIndex) => (
                                                <div key={dayIndex} className={`${
                                                    styles['week-pill']
                                                } ${
                                                    styles[`week-pill${getActivityStatus(item, dayIndex)}`]
                                                }`}>
                                                    {dayText}
                                                </div>
                                            ))
                                        }
                                        {/* <div className={`${styles['icon']} ${styles['toggle-icon']}`}
                                            title={item.completed ? 'Mark as incomplete' : 'Mark as completed'}
                                            onMouseOver={e => { handleToggleButtonHover(index) }}
                                            onMouseOut={e => { handleToggleButtonHover(null) }}
                                            onClick={e => {
                                                dispatch(updateToDoAsync({
                                                    ...item,
                                                    completed: !item.completed
                                                }))
                                            }}
                                        >
                                            <div className={`${styles['toggle-text']}`}>
                                                {`${hoveredItemIndex === index ?
                                                        item.completed ? 'Mark as incomplete' : 'Mark as completed' :
                                                        'Toggle'
                                                    }`}
                                            </div>
                                        </div> */}
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