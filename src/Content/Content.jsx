import DetailedView from '../DetailedView/DetailedView';
import Form from '../Form/Form';
import Navbar from '../Navbar/Navbar';
import styles from './content.module.scss'


export const DetailsContent = () => {
    return <>
        <Form />
        <DetailedView />
    </>
}

const Content = () => {
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