// Next Imports
import Link from 'next/link';
import { useRouter } from 'next/router';

// Custom Component Imports
import { IconContext } from 'react-icons/lib';
import { IoSearchOutline } from 'react-icons/io5';

// Style Imports
import styles from './SearchBar.module.scss';
import { useState } from 'react';

const SearchBar = () => {
    const router = useRouter();
    const [searchText, setSearchText] = useState('');

    const search = () => {
        router.push({
            pathname: 'search-results',
            query: { searchText },
        });
    };

    return (
        <div className={styles.search}>
            <input
                className={styles.text}
                type='text'
                placeholder='Search'
                value={searchText}
                onInput={(e) => setSearchText(e.currentTarget.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        search();
                    }
                }}
            />
            <button
                className={styles.button}
                onClick={(e) => {
                    e.preventDefault;
                    search();
                }}>
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
