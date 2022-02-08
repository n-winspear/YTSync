// Next Imports
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Custom Component Imports
import HeaderBar from '../components/HeaderBar';
import OtpInput from 'react-otp-input';

// Style Imports
import styles from '../styles/home.module.scss';

export default function Home() {
    const router = useRouter(null);

    const [roomCode, setRoomCode] = useState(null);
    const [otp, setOtp] = useState('');
    const [errored, setErrored] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(async () => {
        setRoomCode(sessionStorage.getItem('roomCode'));
    }, []);

    const handleOtpChange = (newOtp) => {
        setOtp(newOtp);
    };

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

    const joinRoom = async () => {
        if (otp.length === 5) {
            setErrored(false);
            setErrorMessage('');
            const otpUpper = otp.toUpperCase();

            const roomRes = await fetch(`/api/room/${otpUpper}/getDetails`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            const roomData = await roomRes.json();

            if (roomData.room !== null) {
                router.push({
                    pathname: `/room/${otpUpper}/watch`,
                });
            } else {
                setErrored(true);
                setErrorMessage('Room Not Found');
            }
        } else {
            setErrored(true);
            setErrorMessage('Invalid Room Code');
        }
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
                    <div className={styles.options}>
                        {roomCode === null ? (
                            <button
                                onClick={(e) => {
                                    e.preventDefault;
                                    createRooom();
                                }}
                                className={styles.createBtn}>
                                Create Room
                            </button>
                        ) : (
                            <button
                                onClick={(e) => {
                                    e.preventDefault;
                                    reJoinRoom();
                                }}
                                className={styles.reJoinBtn}>
                                Rejoin Room
                            </button>
                        )}
                        <div className={styles.separator}>
                            <h3>or</h3>
                            <h4>Enter Room Code</h4>
                        </div>
                        <div
                            className={styles.code}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    joinRoom();
                                }
                            }}>
                            <OtpInput
                                value={otp}
                                containerStyle={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: 'flex-start',
                                    width: '100%',
                                    height: '100%',
                                }}
                                inputStyle={{
                                    height: '60px',
                                    width: '50px',
                                    border: 'solid 1px #d3d3d3ff',
                                    'border-radius': '4px',
                                    padding: '8px 12px',
                                    fontSize: '32px',
                                    textTransform: 'uppercase',
                                    color: '#090909',
                                    fontWeight: '300',
                                }}
                                errorStyle={{
                                    border: 'solid 1px #ff0033',
                                }}
                                onChange={handleOtpChange}
                                numInputs={5}
                                hasErrored={errored}
                            />
                        </div>
                        {errorMessage !== '' && (
                            <div className={styles.errorMessage}>
                                {errorMessage}
                            </div>
                        )}
                        <button
                            onClick={(e) => {
                                e.preventDefault;
                                joinRoom();
                            }}
                            className={styles.joinBtn}>
                            Join
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
