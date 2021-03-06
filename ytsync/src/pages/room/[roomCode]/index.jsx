// Next Imports
import Head from 'next/head';
import { useState } from 'react';
import { useEffect } from 'react';

// Custom Component Imports
import HeaderBar from '../../../components/HeaderBar';
import SearchBar from '../../../components/SearchBar';

// Style Imports
import styles from '../../../styles/room.module.scss';

const Room = () => {
    // TODO: Implement a username input box
    const [username, setUsername] = useState('Ealder3301');

    useEffect(() => {
        sessionStorage.setItem('username', username);
    });

    return (
        <div>
            <Head>
                <title>YT Sync</title>
                <meta name='description' content='Youtube Sync App' />
                <link rel='icon' href='/favicon.ico' />
                <script src='https://www.youtube.com/iframe_api' />
            </Head>

            <main>
                <HeaderBar showSearch={true} />
                <div className={styles.room}>
                    <h1>Search</h1>
                    <SearchBar />
                </div>
            </main>
        </div>
    );
};

export default Room;
