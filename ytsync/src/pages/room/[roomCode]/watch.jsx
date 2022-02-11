// Next Imports
import Head from 'next/head';

// Custom Component Imports
import HeaderBar from '../../../components/HeaderBar';
import ActiveVideo from '../../../components/ActiveVideo';
import SearchBar from '../../../components/SearchBar';
import Playlist from '../../../components/Playlist';
import Pusher from 'pusher-js';

// Style Imports
import styles from '../../../styles/watch.module.scss';
import { useEffect, useState } from 'react';

export async function getServerSideProps({ query }) {
    const { roomCode } = query;

    const dbRes = await fetch(
        `${process.env.CURRENT_URL}/api/room/${roomCode}/getDetails`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
    );

    const dbData = await dbRes.json();

    const playlist = await Promise.all(
        dbData.room.playlist.map(async (videoInfo) => {
            const [videoId, channelThumbnailURL] = videoInfo.split('|');

            const ytRes = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${process.env.YT_API_KEY}`
            );

            const ytData = await ytRes.json();

            const videoData = { ...ytData.items[0], channelThumbnailURL };

            return videoData;
        })
    );

    return {
        props: {
            playlist,
            roomCode,
        },
    };
}

const Watch = ({ playlist, roomCode }) => {
    const [activeVideo, setActiveVideo] = useState(playlist[0]);
    const [currentPlaylist, setCurrentPlaylist] = useState(playlist);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [ytPlayer, setYtPlayer] = useState(null);
    const [playerLoaded, setPlayerLoaded] = useState(false);

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        authEndpoint: '/api/pusher/auth',
        auth: {
            params: { user_id: username },
        },
    });

    useEffect(() => {
        setActiveVideo(currentPlaylist[0]);
    }, [currentPlaylist]);

    useEffect(() => {
        if (ytPlayer !== null && playerLoaded === false) {
            const channel = pusher.subscribe(`presence-${roomCode}`);

            // Play button pressed
            channel.bind('play-video', (data) => {
                const { username } = data;
                ytPlayer.playVideo();
            });

            // Pause button pressed
            channel.bind('pause-video', (data) => {
                const { username } = data;
                ytPlayer.pauseVideo();
            });

            // Delete button pressed
            channel.bind('delete-video', (data) => {
                const { username } = data;
            });

            // Loading first video
            ytPlayer.cueVideoById(activeVideo.id, 0);

            console.log('I HAVE BEEN TRIGGERED');

            setPlayerLoaded(true);
        }
        return () => {
            pusher.unsubscribe(`presence-${roomCode}`);
        };
    }, [ytPlayer]);

    useEffect(async () => {
        setUsername(sessionStorage.getItem('username'));
    }, []);

    const handleKeyPress = (e) => {
        const currentTime = ytPlayer.getCurrentTime();

        switch (e.code) {
            case 'Space':
                const playerState = ytPlayer.getPlayerState();
                if (playerState === 1) {
                    pauseVideo();
                } else {
                    playVideo();
                }
                break;

            case 'ArrowRight':
                ytPlayer.seekTo(currentTime + 5, true);
                break;

            case 'ArrowLeft':
                ytPlayer.seekTo(currentTime - 5, true);
                break;
        }
    };

    const playVideo = async () => {
        await fetch(`/api/room/${roomCode}/playVideo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ username: username }),
        });
    };

    const pauseVideo = async () => {
        await fetch(`/api/room/${roomCode}/pauseVideo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ username: username }),
        });
    };

    const fullScreenVideo = () => {
        const iFrame = ytPlayer.getIframe();
        iFrame.requestFullscreen();
    };

    const endOfVideo = async (endedVideoId) => {
        updatePlaylist(endedVideoId);
    };

    const updatePlaylist = async (videoId) => {
        const updatedPlaylist = await currentPlaylist.filter(
            (video) => video.id !== videoId
        );

        const res = await fetch(`/api/room/${roomCode}/deleteVideo`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ videoId: videoId }),
        });

        setCurrentPlaylist(updatedPlaylist);
    };

    return (
        <>
            <Head>
                <title>Watch</title>
                <meta name='description' content='Youtube Sync Watch' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main
                onKeyUp={(e) => {
                    e.preventDefault();
                    handleKeyPress(e);
                }}>
                <HeaderBar showSearch={true} />
                <div className={styles.watch}>
                    {currentPlaylist.length === 0 ? (
                        <div className={styles.noVideo}>
                            <h1>No Videos In Playlist</h1>
                            <SearchBar />
                        </div>
                    ) : (
                        <div className={styles.video}>
                            <ActiveVideo
                                video={activeVideo}
                                playVideo={playVideo}
                                pauseVideo={pauseVideo}
                                endOfVideo={endOfVideo}
                                fullScreenVideo={fullScreenVideo}
                                ytPlayer={ytPlayer}
                                setYtPlayer={setYtPlayer}
                            />
                            <Playlist
                                currentPlaylist={currentPlaylist}
                                setActiveVideo={setActiveVideo}
                                updatePlaylist={updatePlaylist}
                            />
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default Watch;
