// Styles
import styles from './Loader.module.scss';
// Libs
import {BiLoaderCircle} from 'react-icons/bi';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <BiLoaderCircle size={50}/>
    </div>
  )
}
