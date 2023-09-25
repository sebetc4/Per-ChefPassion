// Styles
import styles from './Loader.module.scss';
// Librairies
import {BiLoaderCircle} from 'react-icons/bi';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <BiLoaderCircle size={50}/>
    </div>
  )
}
