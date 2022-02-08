// Next Imports
import Head from 'next/head';

// Custom Component Imports
import HeaderBar from '../../../components/HeaderBar';
import ActiveVideo from '../../../components/ActiveVideo';
import SearchBar from '../../../components/SearchBar';
import Playlist from '../../../components/Playlist';

// Style Imports
import styles from '../../../styles/watch.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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
        },
    };
}

const Watch = ({ playlist }) => {
    const router = useRouter();
    const { roomCode } = router.query;
    const [activeVideo, setActiveVideo] = useState(playlist[0]);
    const [currentPlaylist, setCurrentPlaylist] = useState(playlist);

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

    useEffect(() => {
        setActiveVideo(currentPlaylist[0]);
    }, [currentPlaylist]);

    return (
        <>
            <Head>
                <title>Watch</title>
                <meta name='description' content='Youtube Sync Watch' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main>
                <HeaderBar showSearch={true} />
                <div className={styles.watch}>
                    {currentPlaylist.length === 0 ? (
                        <div className={styles.noVideo}>
                            <h1>No Videos In Playlist</h1>
                            <SearchBar />
                        </div>
                    ) : (
                        <div className={styles.video}>
                            <ActiveVideo video={activeVideo} />
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
