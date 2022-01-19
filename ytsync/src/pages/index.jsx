// Next Imports
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Custom Component Imports
import HeaderBar from '../components/HeaderBar';

// Style Imports
import styles from '../styles/home.module.scss';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push({
            pathname: `/room/1`,
        });
    }, []);

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
                    {/* Add in "Generate Room Button Here" */}
                </div>
            </main>
        </div>
    );
}
