import { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import styles from './content.module.scss'
import { LS_STATE } from '../helpers';
import { useDispatch } from 'react-redux';
import { setHabitState } from '../reduxSlices/habitSlice';

const Content = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem(LS_STATE)) {
      dispatch(setHabitState({
        habits: JSON.parse(localStorage.getItem(LS_STATE))
      }))
    }
  }, [])

  return (
    <div className={`content ${styles['content']}`}>
      <div className={styles['flex-main']}>
        <Navbar
        />
      </div>
    </div>
  );
}

export default Content;