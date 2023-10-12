// Styles
import styles from './Search.module.scss';
// Libs
import { AiOutlineSearch } from 'react-icons/ai';

type SearchProps = {
    setFilter: (filter: string) => void;
};

export const Search = ({ setFilter }: SearchProps) => {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value.trim().toLowerCase());
    };

    return (
        <div className={styles.searchBar}>
            <AiOutlineSearch />
            <input
                onInput={handleInput}
                type='text'
                placeholder='Rechercher'
            />
        </div>
    );
};
