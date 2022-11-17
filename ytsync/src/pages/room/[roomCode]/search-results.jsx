// Next Imports
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Custom Component Imports
import HeaderBar from '../../../components/HeaderBar';
import SearchResult from '../../../components/SearchResult';
import { IconContext } from 'react-icons/lib';
import { FaPlay } from 'react-icons/fa';

// Style Imports
import styles from '../../../styles/search-results.module.scss';

export async function getServerSideProps({ query }) {
    const { searchText, roomCode } = query;

    const ytRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${searchText}&key=${process.env.YT_API_KEY}`
    );

    const ytData = await ytRes.json();

    const filteredData = ytData.items.filter(
        (video) => video.id.kind === 'youtube#video'
    );

    const videoResults = await Promise.all(
        filteredData.map(async (video) => {
            const { channelId } = video.snippet;

            const chRes = await fetch(
                `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${process.env.YT_API_KEY}`
            );

            const chData = await chRes.json();

            video.channel = chData.items[0];

            return video;
        })
    );

    const roomRes = await fetch(
        `${process.env.CURRENT_URL}/api/room/${roomCode}/getDetails`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
    );

    console.log(roomRes);

    const roomData = await roomRes.json();

    const playlistLength = roomData.room.playlist.length;

    return {
        props: { videoResults, playlistLength },
    };
}

export default function SearchResults({ videoResults, playlistLength }) {
    const router = useRouter();
    const { searchText, roomCode } = router.query;
    const [videos, setVideos] = useState([]);
    const [videoCount, setVideoCount] = useState(playlistLength);

    useEffect(async () => {
        setVideos(
            videoResults
                .map((video) => {
                    let videoCopy = JSON.parse(JSON.stringify(video));

                    let parser = new DOMParser();

                    videoCopy.snippet.title = parser.parseFromString(
                        `<!doctype html><body>${video.snippet.title}`,
                        'text/html'
                    ).body.textContent;
                    videoCopy.snippet.description = parser.parseFromString(
                        `<!doctype html><body>${video.snippet.description}`,
                        'text/html'
                    ).body.textContent;

                    videoCopy.publishTime = new Date(video.snippet.publishedAt);

                    return videoCopy;
                })
                .sort((v1, v2) => {
                    return v1.publishTime - v2.publishTime;
                })
                .reverse()
        );
    }, [searchText]);

    const watch = () => {
        router.push({
            pathname: `/room/${roomCode}/watch`,
        });
    };

    return (
        <>
            <Head>
                <title>Search Results</title>
                <meta
                    name='description'
                    content='Youtube Sync search results'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main>
                <HeaderBar showSearch={true} />
                <div className={styles.resultsPage}>
                    <div className={styles.searchResults}>
                        <h1>Search results for '{searchText}'</h1>
                        {videos.map((video) => (
                            <SearchResult
                                video={video}
                                key={video.id.videoId}
                                videoCount={videoCount}
                                setVideoCount={setVideoCount}
                            />
                        ))}
                    </div>
                    {videoCount > 0 && (
                        <div className={styles.watchIndicator}>
                            <h2
                                className={
                                    styles.videoCount
                                }>{`${videoCount} videos in the playlist`}</h2>
                            <div className={styles.watch}>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        watch();
                                    }}>
                                    WATCH
                                    <IconContext.Provider
                                        value={{
                                            size: '44%',
                                            color: '#59a5d8ff',
                                            style: {
                                                verticalAlign: 'middle',
                                                marginLeft: '12px',
                                            },
                                        }}>
                                        <FaPlay />
                                    </IconContext.Provider>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
