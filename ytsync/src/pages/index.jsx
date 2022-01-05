// Next Imports
import Head from 'next/head';

// Custom Component Imports
import HeaderBar from '../components/HeaderBar';
import SearchBar from '../components/SearchBar';

// Style Imports
import styles from '../styles/home.module.scss';

export default function Home() {
    return (
        <div>
            <Head>
                <title>YT Sync</title>
                <meta name='description' content='Youtube Sync App' />
                <link rel='icon' href='/favicon.ico' />
                <script src='https://www.youtube.com/iframe_api' />
            </Head>

            <main>
                <HeaderBar />
                <div className={styles.home}>
                    <h2>Welcome to</h2>
                    <h1>Youtube Sync</h1>
                    <SearchBar />
                </div>
            </main>
        </div>
    );
}
