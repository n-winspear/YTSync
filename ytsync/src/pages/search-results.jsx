// Next Imports
import Head from 'next/head';
import { useState } from 'react';

// Custom Component Imports
import HeaderBar from '../components/HeaderBar';

// Style Imports

export default function SearchResults({ searchText }) {
    const [videos, setVideos] = useState([]);

    const fetchVideos = async () => {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=date&channelId=UCOgGAfSUy5LvEyVS_LF5kdw&q=jolly&key=${process.env.NEXT_PUBLIC_YT_API_KEY}`
        );

        const data = await response.json();

        setVideos(data.items);
    };

    return (
        <div>
            <Head>
                <title>Search</title>
                <meta
                    name='description'
                    content='Youtube Sync search results'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main>
                <HeaderBar />
                <button onClick={fetchVideos}>search</button>
                {videos.map((video) => {
                    return (
                        <>
                            <h1>{video.snippet.title}</h1>
                            <h2>{video.snippet.description}</h2>
                        </>
                    );
                })}
            </main>
        </div>
    );
}
