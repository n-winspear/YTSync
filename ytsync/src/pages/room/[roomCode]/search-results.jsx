// Next Imports
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Custom Component Imports
import HeaderBar from '../../../components/HeaderBar';
import SearchResult from '../../../components/SearchResult';

// Style Imports
import styles from '../../../styles/search-results.module.scss';

export async function getServerSideProps({ query }) {
    const { searchText } = query;

    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${searchText}&key=${process.env.YT_API_KEY}`
    );

    const data = await response.json();

    const filteredData = data.items.filter(
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

    return {
        props: { videoResults },
    };
}

export default function SearchResults({ videoResults }) {
    const router = useRouter();
    const { searchText } = router.query;
    const [videos, setVideos] = useState([]);

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
