// Next Imports
import Head from 'next/head';
import { useRouter } from 'next/router';

// Custom Component Imports
import HeaderBar from '../components/HeaderBar';
import { v4 as uuidv4 } from 'uuid';

// Style Imports
import styles from '../styles/home.module.scss';

export default function Home() {
    const router = useRouter();

    const createRooom = () => {
        const roomId = uuidv4().slice(0, 8);
        router.push({
            pathname: `/room/${roomId}`,
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
                    <button
                        onClick={(e) => {
                            e.preventDefault;
                            createRooom();
                        }}>
                        Create Room
                    </button>
                </div>
            </main>
        </div>
    );
}
