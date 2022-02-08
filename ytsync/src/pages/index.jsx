// Next Imports
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Custom Component Imports
import HeaderBar from '../components/HeaderBar';
import { NIL, v4 as uuidv4 } from 'uuid';

// Style Imports
import styles from '../styles/home.module.scss';

export default function Home() {
    const router = useRouter(null);

    const [roomCode, setRoomCode] = useState(null);

    useEffect(async () => {
        setRoomCode(sessionStorage.getItem('roomCode'));
    }, []);

    const createRooom = async () => {
        const res = await fetch('/api/createRoom', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        const data = await res.json();

        const { code } = data.room;

        sessionStorage.setItem('roomCode', code);

        router.push({
            pathname: `/room/${code}`,
        });
    };

    const reJoinRoom = async () => {
        router.push({
            pathname: `/room/${roomCode}`,
        });
    };

    return (
        <div>
            <Head>
                <title>YT Sync</title>
                <meta name='description' content='Youtube Sync App' />
                <link rel='icon' href='/favicon.ico' />
                <script src='https://www.youtube.com/iframe_api' />
            </Head>

            <main>
                <HeaderBar showSearch={false} />
                <div className={styles.home}>
                    <h2>Welcome to</h2>
                    <h1>Youtube Sync</h1>
                    {roomCode === null ? (
                        <button
                            onClick={(e) => {
                                e.preventDefault;
                                createRooom();
                            }}>
                            Create Room
                        </button>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.preventDefault;
                                reJoinRoom();
                            }}>
                            Rejoin Room
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
}
