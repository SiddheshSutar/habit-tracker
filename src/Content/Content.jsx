import List from '../DetailedView/List/List';
import Form from '../Form/Form';
import styles from './content.module.scss'

const Content = () => {
    return (
        <div className={`content ${styles['content']}`}>
          <div className={styles['flex-main']}>
            <Form />
            <List />
          </div>
        </div>
    );
}
 
export default Content;