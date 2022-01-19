// Next Imports
import Link from 'next/link';
import { useRouter } from 'next/router';

// Custom Component Imports
import SearchBar from '../SearchBar';

// Style Imports
import styles from './HeaderBar.module.scss';

const HeaderBar = ({ showSearch }) => {
    const router = useRouter();

    return (
        <header className={styles.headerBar}>
            <div className={styles.logo}>
                <Link href='/' passHref>
                    <h1>YTS</h1>
                </Link>
            </div>
            <div className={styles.searchBarContainer}>
                <div className={styles.searchBar}>
                    {showSearch && <SearchBar />}
                </div>
            </div>
        </header>
    );
};

export default HeaderBar;
