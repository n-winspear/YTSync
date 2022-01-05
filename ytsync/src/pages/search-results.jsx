// Next Imports
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Custom Component Imports
import HeaderBar from '../components/HeaderBar';
import SearchResult from '../components/SearchResult';

// Style Imports
import styles from '../styles/search-results.module.scss';

const exData = {
    videoResults: [
        {
            kind: 'youtube#searchResult',
            etag: 'geprEHgnFh9z8nGRvn89y_tOJds',
            id: {
                kind: 'youtube#video',
                videoId: 'PzLvD24pbic',
            },
            snippet: {
                publishedAt: '2021-12-24T12:28:58Z',
                channelId: 'UCOgGAfSUy5LvEyVS_LF5kdw',
                title: 'I gave my best friend a Mullet for Christmas.',
                description:
                    'Go to https://NordVPN.com/JOLLY or use code jolly to get a 2-year plan plus a bonus gift with a huge discount. For a limited time ...',
                thumbnails: {
                    default: {
                        url: 'https://i.ytimg.com/vi/PzLvD24pbic/default.jpg',
                        width: 120,
                        height: 90,
                    },
                    medium: {
                        url: 'https://i.ytimg.com/vi/PzLvD24pbic/mqdefault.jpg',
                        width: 320,
                        height: 180,
                    },
                    high: {
                        url: 'https://i.ytimg.com/vi/PzLvD24pbic/hqdefault.jpg',
                        width: 480,
                        height: 360,
                    },
                },
                channelTitle: 'JOLLY',
                liveBroadcastContent: 'none',
                publishTime: '2021-12-24T12:28:58Z',
            },
        },
        {
            kind: 'youtube#searchResult',
            etag: 'IE5N_aK6VC6Ukk1bmifz6Hz37wU',
            id: {
                kind: 'youtube#video',
                videoId: 'MMltu4TVX6I',
            },
            snippet: {
                publishedAt: '2021-12-20T13:25:53Z',
                channelId: 'UCOgGAfSUy5LvEyVS_LF5kdw',
                title: 'The weirdest Christmas products online!?',
                description:
                    'Thanks to Karma for sponsoring this episode. Get the Karma shopping assistant https://shop.karmanow.com/jolly Deck the halls ...',
                thumbnails: {
                    default: {
                        url: 'https://i.ytimg.com/vi/MMltu4TVX6I/default.jpg',
                        width: 120,
                        height: 90,
                    },
                    medium: {
                        url: 'https://i.ytimg.com/vi/MMltu4TVX6I/mqdefault.jpg',
                        width: 320,
                        height: 180,
                    },
                    high: {
                        url: 'https://i.ytimg.com/vi/MMltu4TVX6I/hqdefault.jpg',
                        width: 480,
                        height: 360,
                    },
                },
                channelTitle: 'JOLLY',
                liveBroadcastContent: 'none',
                publishTime: '2021-12-20T13:25:53Z',
            },
        },
        {
            kind: 'youtube#searchResult',
            etag: 'GijCyzH0coNIyysUIfhzabc4T4U',
            id: {
                kind: 'youtube#video',
                videoId: 'rqjfTFyudYg',
            },
            snippet: {
                publishedAt: '2021-12-03T12:26:26Z',
                channelId: 'UCOgGAfSUy5LvEyVS_LF5kdw',
                title: "The World's Best Breakfast Pie!",
                description:
                    "Today we find uto-pie-a in a very unexpected place! Today's video is not sponsored, but let's support local businesses! You can ...",
                thumbnails: {
                    default: {
                        url: 'https://i.ytimg.com/vi/rqjfTFyudYg/default.jpg',
                        width: 120,
                        height: 90,
                    },
                    medium: {
                        url: 'https://i.ytimg.com/vi/rqjfTFyudYg/mqdefault.jpg',
                        width: 320,
                        height: 180,
                    },
                    high: {
                        url: 'https://i.ytimg.com/vi/rqjfTFyudYg/hqdefault.jpg',
                        width: 480,
                        height: 360,
                    },
                },
                channelTitle: 'JOLLY',
                liveBroadcastContent: 'none',
                publishTime: '2021-12-03T12:26:26Z',
            },
        },
        {
            kind: 'youtube#searchResult',
            etag: 'meJU0IwOWrWyJKQZso52fh9gYOk',
            id: {
                kind: 'youtube#video',
                videoId: 'mCg4vFfriT4',
            },
            snippet: {
                publishedAt: '2021-12-10T12:48:51Z',
                channelId: 'UCOgGAfSUy5LvEyVS_LF5kdw',
                title: "Unreal Feast at Scotland's oldest Whisky Distillery",
                description:
                    "Today we take Michelin Madness to the next level at Scotland's oldest distillery! Thanks to Emilio, Julian and everyone at The ...",
                thumbnails: {
                    default: {
                        url: 'https://i.ytimg.com/vi/mCg4vFfriT4/default.jpg',
                        width: 120,
                        height: 90,
                    },
                    medium: {
                        url: 'https://i.ytimg.com/vi/mCg4vFfriT4/mqdefault.jpg',
                        width: 320,
                        height: 180,
                    },
                    high: {
                        url: 'https://i.ytimg.com/vi/mCg4vFfriT4/hqdefault.jpg',
                        width: 480,
                        height: 360,
                    },
                },
                channelTitle: 'JOLLY',
                liveBroadcastContent: 'none',
                publishTime: '2021-12-10T12:48:51Z',
            },
        },
    ],
};

export async function getServerSideProps({ query }) {
    return {
        props: exData,
    };
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=date&q=${query.searchText}&key=${process.env.NEXT_PUBLIC_YT_API_KEY}`
    );

    const data = await response.json();

    const videoResults = data.items.filter(
        (video) => video.id.kind === 'youtube#video'
    );

    return {
        props: {
            videoResults,
        },
    };
}

export default function SearchResults({ videoResults }) {
    const router = useRouter();
    const { searchText } = router.query;
    const [videos, setVideos] = useState(videoResults);

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
                <HeaderBar />
                <div className={styles.searchResults}>
                    <h1>Search results for '{searchText}'</h1>
                    {videos.map((video) => (
                        <SearchResult video={video} key={video.id.videoId} />
                    ))}
                </div>
            </main>
        </>
    );
}
