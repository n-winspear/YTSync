// Next Imports

// Custom Component Imports
import { IconContext } from 'react-icons/lib';
import { IoSearchOutline } from 'react-icons/io5';

// Style Imports
import styles from './SearchBar.module.scss';

const SearchBar = () => {
    return (
        <div className={styles.search}>
            <input className={styles.text} type='text' placeholder='Search' />
            <button className={styles.button}>
                <IconContext.Provider
                    value={{
                        size: '60%',
                        color: '#030303',
                        style: {
                            verticalAlign: 'middle',
                        },
                    }}>
                    <IoSearchOutline />
                </IconContext.Provider>
            </button>
        </div>
    );
};

export default SearchBar;
