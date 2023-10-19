import { addHabit, habitSelector, handleTextChange } from '../reduxSlices/habitSlice'
import styles from './form.module.scss'
import { useDispatch, useSelector } from 'react-redux'

const Form = () => {

    const { text } = useSelector(habitSelector)
    const dispatch = useDispatch()

    const handleKeyPress = e => {
        if (!text) return

        if (e.key === 'Enter') {
            dispatch(addHabit())

        }
    }

    return (
        <div className={styles['container']}>
            <input
                value={text}
                placeholder="What task to be planned now ?"
                onChange={e => {
                    dispatch(handleTextChange(e.target.value))
                }}
                onKeyDown={handleKeyPress}
            />
            <div className={styles['btn-row']}>
                <button type='button'
                    className={`${styles['btn']} ${styles['add']}`}
                    disabled={!text}
                    onClick={e => handleKeyPress({ key: 'Enter' })}
                >
                    Add
                </button>
                <div className={`${styles['clear-btn-wrapper']}`}>
                    <button type='button'
                        className={`${styles['btn']} ${styles['clear']} ${text ? styles['visible'] : ''}`}
                        onClick={e => dispatch(handleTextChange(''))}
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Form;